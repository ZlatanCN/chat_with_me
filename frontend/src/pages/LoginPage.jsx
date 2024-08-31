import LoginForm from '../components/LoginForm.jsx';
import { useState } from 'react';
import { message } from 'antd';
import { useAuthContext } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setAuthUser } = useAuthContext();

  const onFinish = async (values) => {
    const { username, password } = values;
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/login`, {
        origin: 'https://chat-with-me-chi.vercel.app',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      console.log('Response:', res);
      const data = await res.json();
      console.log('Data:', data);
      if (data.message) {
        messageApi.open({
          type: 'error',
          content: data.message,
        });
      } else {
        messageApi.open({
          type: 'success',
          content: 'Login successful',
        });
        setTimeout(() => {
          localStorage.setItem('authUser', JSON.stringify(data));
          setAuthUser(data);
        }, 500);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
      console.log('Error in LoginPage:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div
        className={'flex flex-col items-center justify-center min-w-96 mx-auto'}>
        <div
          className={'h-full w-full bg-blue-700 rounded-lg bg-clip-padding ' +
            'backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ' +
            'p-6 shadow-md'}
        >
          {/* Login title */}
          <h1 className={'text-3xl font-semibold text-center text-gray-300'}>
            Login <span className={'text-blue-500'}>ChatWithMe!</span>
          </h1>

          {/* Login form */}
          <LoginForm onFinish={onFinish} isLoading={loading}/>
        </div>
      </div>
    </>
  );
};

export default LoginPage;