import Sidebar from '../components/Sidebar.jsx';
import ChatContainer from '../components/ChatContainer.jsx';

const HomePage = () => {
  return (
    <div className={'flex flex-col items-center justify-center min-w-96 mx-auto'}>
      <div className={'h-full w-full bg-blue-700 rounded-lg bg-clip-padding ' +
        'backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ' +
        'p-6 shadow-md flex flex-row gap-4'}
      >
        {/* Sidebar */}
        <div>
          <Sidebar/>
        </div>
        {/*ChatContainer*/}
        <div>
          <ChatContainer/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;