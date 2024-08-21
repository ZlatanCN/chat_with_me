import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatInput from './ChatInput.jsx';
import NoChat from './NoChat.jsx';
import useChatStore from '../store/useChatStore.js';
import { useEffect, useState } from 'react';

const ChatContainer = () => {
  const { selectedChat, setSelectedChat } = useChatStore();


  useEffect(() => {
    // Cleanup function when the component unmounts
    return () => {
      setSelectedChat(null);
    }
  }, []);

  return (
    <div className={'md:min-w-[450px] flex flex-col'}>
      {!selectedChat ? (
        <NoChat/>
      ) : (
        <>
          <ChatHeader receiver={selectedChat.name}/>
          <ChatMessages/>
          <ChatInput/>
        </>
      )}
    </div>
  );
};

export default ChatContainer;