import { Input, Button, Popconfirm, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Contact from './Contact.jsx';
import { useAuthContext } from '../context/AuthContext.jsx';
import PropTypes from 'prop-types';
import useChatStore from '../store/useChatStore.js';
import { useState } from 'react';

const Sidebar = (props) => {
  const { setAuthUser } = useAuthContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [contacts, setContacts] = useState(props.contacts);

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

  const handleSearch = (value) => {
    const search = value.replace(/\s*/g, '').toLowerCase();
    const filteredContacts = props.contacts.filter((contact) => {
      const name = contact.name.replace(/\s*/g, '').toLowerCase();
      return name.includes(search);
    })
    console.log('filteredContacts:', filteredContacts);
    setContacts(filteredContacts);
  };

  return (
    <div>
      {contextHolder}
      <div className={'flex flex-col h-full'}>
        {/*Search bar*/}
        <Input.Search
          placeholder="Search"
          enterButton={true}
          onSearch={handleSearch}
          style={{
            backgroundColor: 'transparent',
          }}
        />

        {/*Contact list*/}
        <Contact contacts={contacts}/>

        {/*Logout button*/}
        <div className={'-ml-3 mt-3 mt-auto'}>
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