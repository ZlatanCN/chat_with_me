import ChatMessage from './ChatMessage.jsx';
import useChatStore from '../store/useChatStore.js';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'antd';

const ChatMessages = () => {
  const { messages, setMessages, selectedChat } = useChatStore();
  const [loading, setLoading] = useState(false);

  const getMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`api/messages/${selectedChat._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      if (data.error) {
        console.log('Error in ChatMessages:', data.error);
      } else {
        setMessages(data.messages);
      }
    } catch (error) {
      console.log('Error in ChatMessages:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedChat?._id) {
      getMessages();
    }
    console.log('Selected chat:', selectedChat);
    console.log('Messages:', messages);
  }, [selectedChat?._id, setMessages]);

  return (
    <>
      {loading ? (
        <div>
          <Skeleton active={true} paragraph={{
            rows: 6,
          }}/>
        </div>
      ) : (
        <div
          className={'px-4 flex-1 flex flex-col gap-5 max-h-80 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-600'}>
          {messages?.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              avatar={message.senderId !== selectedChat._id
                ? (JSON.parse(localStorage.getItem('authUser')).avatar)
                : (selectedChat.avatar)}
              isSender={(message.senderId !== selectedChat._id) ||
                (message.senderId === message.receiverId)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default ChatMessages;