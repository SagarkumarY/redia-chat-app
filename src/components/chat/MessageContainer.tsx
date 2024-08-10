"use client"
import React, { useEffect } from 'react' 
import MessageList from './MessageList'
import ChatBottonBar from './ChatBottonBar'
import ChatTopbar from './ChatTopBar'
import { useSelectedUser } from '@/store/useSelectedUser'


function MessageContainer() {

  const {setSelectedUser} = useSelectedUser();

  useEffect(() => {

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setSelectedUser(null); // Close the selected user menu when the escape key is pressed.
        
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape); // Clean up the event listener when the component unmounts.
   
  }, [setSelectedUser])
  
  return (
    <div className="flex flex-col justify-between w-full h-full">
       <ChatTopbar />

        <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
            <MessageList />
            <ChatBottonBar />
        </div>
    </div>
  )
}

export default MessageContainer