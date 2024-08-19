import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import HomePage from './pages/HomePage.jsx';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';

const App = () => {
  const { authUser, setAuthUser } = useAuthContext();
  return (
    <div
      className={'p-0 mt-[-8px] mb-[-8px] h-screen flex items-center justify-center'}>
      <Routes>
        <Route path={'/'} element={authUser ? <HomePage/> : <Navigate to={'/login'}/>}/>
        <Route path={'/login'} element={authUser ? <Navigate to={'/'}/> : <LoginPage/>}/>
        <Route path={'/signup'} element={authUser ? <Navigate to={'/'}/> : <SignUpPage/>}/>
      </Routes>
    </div>
  );
};

export default App;