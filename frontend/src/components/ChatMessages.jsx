import ChatMessage from './ChatMessage.jsx';

const ChatMessages = () => {
  return (
    <div className={'px-4 flex-1 flex flex-col gap-5 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-sky-600'}>
      <ChatMessage
        isSender={true}
        message={'Hello, how are you? I hope you are doing well today. I am doing great. I am testing this chat application.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=111'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well. Thank you for asking. I am also testing this chat application.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well. Thank you for asking. I am also testing this chat application. It seems to be working well so far.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well. Thank you for asking. I am also testing this chat application. It seems to be working well so far.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well. Thank you for asking. I am also testing this chat application. It seems to be working well so far.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
      <ChatMessage
        isSender={false}
        message={'Hello, I am doing well. Thank you for asking. I am also testing this chat application. It seems to be working well so far.'}
        avatar={'https://api.dicebear.com/7.x/miniavs/svg?seed=222'}
      />
    </div>
  );
};

export default ChatMessages;