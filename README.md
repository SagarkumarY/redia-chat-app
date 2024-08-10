# **Next.js Redis Chat App**
This is a real-time chat application built using Next.js, Redis, and various modern front-end technologies. The application supports real-time messaging, user authentication, and media uploads.

## **Features**
- **Real-time Messaging:** Messages are instantly delivered using Redis and Pusher for real-time communication.
- **User Authentication:** User authentication is managed using the `@kinde-oss/kinde-auth-nextjs` library.
- **Media Uploads:** Cloudinary is integrated for uploading and storing media files.
- **Responsive UI:** The UI is built using Tailwind CSS and React components for a seamless experience across devices.
- **Emoji Support:** Users can add emojis to their messages using `@emoji-mart/react`.

## **Tech Stack**

### **Frontend:**
- **Next.js**
- **React**
- **Tailwind CSS**
- **Framer Motion** for animations
- **Zustand** for state management
- **Lucide Icons** for icons

### **Backend:**
- **Redis** (via Upstash) for message storage and retrieval
- **Pusher** for real-time communication
- **Cloudinary** for media storage

### **Others:**
- **React Query** for data fetching and caching
- **Pusher Client** for real-time updates on the client-side


git clone https://github.com/your-username/next-chat-app.git
cd next-chat-app
npm install
