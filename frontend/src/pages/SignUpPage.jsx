import SignUpForm from '../components/SignUpForm.jsx';
import { useState } from 'react';
import { message } from 'antd';
import { useAuthContext } from '../context/AuthContext.jsx';

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { authUser, setAuthUser } = useAuthContext();

  const showErrorMessage = (error) => {
    messageApi.open({
      type: 'error',
      content: error,
    });
  };

  const onFinish = async (values) => {
    setLoading(true);

    const {
      nickname: name,
      username,
      password,
      confirm: confirmedPassword,
      gender,
    } = values;

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          { name, username, password, confirmedPassword, gender }),
      });

      const data = await res.json();
      if (data.message) {
        showErrorMessage(data.message);
      } else {
        localStorage.setItem('authUser', JSON.stringify(data));
        setAuthUser(data);
      }
    } catch (error) {
      console.log('Error in SignUpPage:', error.message);
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
          {/* Sign up title */}
          <h1 className={'text-3xl font-semibold text-center text-gray-300'}>
            Sign Up <span className={'text-blue-500'}>ChatWithMe!</span>
          </h1>

          {/* Sign up form */}
          <SignUpForm onFinish={onFinish} isLoading={loading}/>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;