import PusherServer from 'pusher'
import PusherClient from "pusher-js";


// in development this will create multiple instances of Pusher,
// which might cause you to  hit the connnection limit in free tier

// export const pusherServer = new PusherServer({
//  appId:process.env.PUSHER_APP_ID!,
//  key: process.env.PUSHER_APP_KEY!,
//  secret: process.env.PUSHER_APP_SECRET!,
//  cluster: process.env.PUSHER_APP_CLUSTER!,
//  useTLS:true
// })

// export const pusherClient = new PusherClient(process.env.NEXT_PUSHER_APP_KEY!,{
//     cluster:"ap2"
// })


// Declare global variables for the server and client Pusher instances
declare global {
    var pusherServer: PusherServer | undefined;
    var pusherClient: PusherClient | undefined;
}

// Reuse the existing Pusher server instance if it exists, or create a new one
const pusherServer = global.pusherServer || new PusherServer({
    appId: process.env.PUSHER_APP_ID!, // Pusher App ID from environment variables
    key: process.env.PUSHER_APP_KEY!, // Pusher App Key from environment variables
    secret: process.env.PUSHER_APP_SECRET!, // Pusher App Secret from environment variables
    cluster: process.env.PUSHE_APP_CLUSTER!, // Pusher App Cluster from environment variables
    useTLS: true // Use TLS for secure connections
});

// Reuse the existing Pusher client instance if it exists, or create a new one
const pusherClient = global.pusherClient || new PusherClient(process.env.NEXT_PUBLIC_APP_KEY!, {
    cluster: "ap2" // Pusher cluster (set to "ap2" as an example)
});

// Export the Pusher server and client instances
export { pusherServer, pusherClient };