import Sidebar from '../components/Sidebar.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import { useEffect, useState } from 'react';
import { message, Spin } from 'antd';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const getAllContacts = async () => {
    try {
      setLoading(true);
      const res = await fetch('api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log('Error in HomePage:', error.message);
      messageApi.open({
        type: 'error',
        content: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <>
      {loading ? (
        <Spin
          fullscreen={true}
          size={'large'}
          tip={'Loading'}
          percent={'auto'}
        />
      ) : (
        <div
          className={'flex flex-col items-center justify-center min-w-96 mx-auto h-[508px]'}>
          <div
            className={'h-full w-full bg-blue-700 rounded-lg bg-clip-padding ' +
              'backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ' +
              'p-6 shadow-md flex flex-row gap-4'}
          >
            <Sidebar contacts={users}/>
            <div>
              <ChatContainer/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;