import { TiMessages } from 'react-icons/ti';

const NoChat = () => {
  const authUser = JSON.parse(localStorage.getItem('authUser'))

  return (
    <div className={'flex items-center justify-center w-full h-full'}>
      <div
        className={'px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'}>
        <p>Welcome 👋 {authUser.name}</p>
        <p>Start a conversation by selecting a chat</p>
        <TiMessages className={'text-3xl md:text-6xl text-center'}/>
      </div>
    </div>
  );
};

export default NoChat;