import LoginForm from '../components/LoginForm.jsx';

const LoginPage = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={'flex flex-col items-center justify-center min-w-96 mx-auto'}>
      <div className={"h-full w-full bg-blue-700 rounded-lg bg-clip-padding " +
        "backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 " +
        "p-6 shadow-md"}
      >
        {/* Login title */}
        <h1 className={'text-3xl font-semibold text-center text-gray-300'}>
          Login <span className={'text-blue-500'}>ChatWithMe!</span>
        </h1>

        {/* Login form */}
        <LoginForm onFinish={onFinish}/>
      </div>
    </div>
  );
};

export default LoginPage;