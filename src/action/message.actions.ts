"use server"

import { Message } from "@/db/dummy";
import { redis } from "@/lib/db"; // Importing the Redis client
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; 
// Importing Kinde server session for authentication
import { pusherServer } from "@/lib/pusher";

// Define the types for the function's arguments
type SendMessageActionArgs = {
    content: string;         // The content of the message
    receiverId: string;      // The ID of the message recipient
    messageType: "text" | "image";  // The type of message (either text or image)
}

// Function to handle sending a message
export async function sendMessageAction({ content, messageType, receiverId }: SendMessageActionArgs) {
    const { getUser } = getKindeServerSession(); // Retrieve the session user using Kinde
    const user = await getUser(); // Get the current authenticated user

    // Check if the user is authenticated
    if (!user) return { success: false, message: "User is not authenticated" };

    // Get the sender's ID from the authenticated user
    const senderId = user.id;

    // Construct a conversation ID based on senderId and receiverId
    // The conversation ID should be consistent regardless of who initiates the conversation,
    // so the IDs are sorted to avoid duplication.

    // Example cases:
    // 1. Madara sends a message to Obito
    //    senderId: 123, receiverId: 456
    //    conversationId: `conversation:123:456`

    // 2. Obito sends a message to Madara
    //    senderId: 456, receiverId: 123
    //    conversationId: `conversation:123:456`
    // The conversationId is the same in both cases because of the ID sorting.

    // You can now use `conversationId` to store or retrieve the conversation in your database

    const conversationId = `conversation:${[senderId, receiverId].sort().join(":")}`;

    // Check if the conversation already exists in Redis
    const conversationExists = await redis.exists(conversationId);

    // If the conversation does not exist, create it
    if (!conversationExists) {
        await redis.hset(conversationId, {
            participant1: senderId,  // Store the first participant's ID
            participant2: receiverId // Store the second participant's ID
        });

        // Add the conversation ID to each user's list of conversations
        await redis.sadd(`user:${senderId}:conversation`, conversationId);
        await redis.sadd(`user:${receiverId}:conversation`, conversationId);
    }

    // Generate a unique message ID
    const messageId = `message:${Date.now()}:${Math.random().toString(36).substring(2, 9)}`;

    // Get the current timestamp
    const timestamp = Date.now();

    // Store the message details in Redis using the message ID
    await redis.hset(messageId, {
        senderId,    // Store the sender's ID
        content,     // Store the content of the message
        messageType, // Store the type of the message (text or image)
        timestamp    // Store the timestamp when the message was sent
    });

    // Add the message ID to the sorted set of messages in the conversation
    // The score is the timestamp, which orders the messages chronologically
    await redis.zadd(`${conversationId}:messages`, { score: timestamp, member: JSON.stringify(messageId) });

    const channelName = `${senderId}__${receiverId}`.split('__').sort().join("__");

    await pusherServer?.trigger(channelName, "newMessage" ,{
        message: {senderId, content, timestamp, messageType},
    })

    // Return a success response with the conversation ID and message ID
    return { success: true, conversationId, messageId }
};


export async function getMessages(selectedUserId: string, currentUserId: string) {
	// conversation:kp_87f4a115d5f34587940cdee58885a58b:kp_a6bc2324e26548fcb5c19798f6459814:messages

	const conversationId = `conversation:${[selectedUserId, currentUserId].sort().join(":")}`;
	const messageIds = await redis.zrange(`${conversationId}:messages`, 0, -1);

	if (messageIds.length === 0) return [];

	const pipeline = redis.pipeline();
	messageIds.forEach((messageId) => pipeline.hgetall(messageId as string));
	const messages = (await pipeline.exec()) as Message[];

	return messages;
}


