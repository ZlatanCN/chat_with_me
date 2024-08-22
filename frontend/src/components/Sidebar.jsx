import { Input, Button, Popconfirm, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Contact from './Contact.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import PropTypes from 'prop-types';

const Sidebar = (props) => {
  const { setAuthUser } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();

  const logout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (data.error) {
        messageApi.open({
          type: 'error',
          content: data.error,
        });
      } else {
        messageApi.open({
          type: 'success',
          content: 'Logout successful',
        });
        setTimeout(() => {
          localStorage.removeItem('authUser');
          setAuthUser(null);
        }, 500);
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.message,
      });
      console.log('Error in Sidebar:', error.message);
    }
  };

  return (
    <div>
      {contextHolder}
      <div>
        {/*Search bar*/}
        <Input.Search
          placeholder="Search"
          enterButton={true}
          onSearch={(value) => console.log(value)}
          style={{
            backgroundColor: 'transparent',
          }}
        />
        {/*Contact list*/}
        <Contact contacts={props.contacts}/>

        {/*Logout button*/}
        <div className={'-ml-3 mt-3'}>
          <Popconfirm
            title={'Logout ChatWithMe'}
            description={'Are you sure you want to logout?'}
            onConfirm={logout}
            onCancel={() => {
              messageApi.open({
                type: 'info',
                content: 'Logout canceled',
              });
            }}
            okText={'Yes'}
            cancelText={'No'}
          >
            <Button
              shape={'circle'}
              type={'link'}
              icon={<LeftOutlined/>}
            />
          </Popconfirm>
        </div>
      </div>
    </div>
  );
};

Sidebar.proptypes = {
  contacts: PropTypes.array.isRequired,
};

export default Sidebar;