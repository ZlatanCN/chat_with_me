import ChatMessage from './ChatMessage.jsx';
import useChatStore from '../store/useChatStore.js';
import { useEffect, useRef, useState } from 'react';
import { Skeleton } from 'antd';
import { useSocketContext } from '../context/SocketContext.jsx';
import notificationSound from '../assets/notification.mp3';

const ChatMessages = () => {
  const { messages, setMessages, selectedChat } = useChatStore();
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef(null);
  const {socket} = useSocketContext();
  console.log('messages:', messages);

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
  }, [selectedChat?._id, setMessages]);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  }, [messages]);

  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      const notification = new Audio(notificationSound);
      notification.play();
      setMessages([...messages, newMessage]);
    })

    return () => socket?.off('newMessage');
  }, [socket, messages, setMessages]);


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
          className={'px-4 flex-1 flex flex-col gap-5 max-h-[420px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-600'}>
          {messages?.map((message, index) => (
            <div key={index} ref={lastMessageRef}>
              <ChatMessage
                message={message}
                avatar={message.senderId !== selectedChat._id
                  ? (JSON.parse(localStorage.getItem('authUser')).avatar)
                  : (selectedChat.avatar)}
                isSender={(message.senderId !== selectedChat._id) ||
                  (message.senderId === message.receiverId)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatMessages;