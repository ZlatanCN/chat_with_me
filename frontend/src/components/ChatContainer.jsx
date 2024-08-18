import ChatHeader from './ChatHeader.jsx';
import ChatMessages from './ChatMessages.jsx';
import ChatInput from './ChatInput.jsx';
import NoChat from './NoChat.jsx';

const ChatContainer = () => {
  const noChat = false;

  return (
    <div className={'md:min-w-[450px] flex flex-col'}>
      {noChat ? (
        <NoChat/>
      ) : (
        <>
          <ChatHeader/>
          <ChatMessages/>
          <ChatInput/>
        </>
      )}
    </div>
  );
};

export default ChatContainer;