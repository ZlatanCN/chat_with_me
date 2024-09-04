import { Avatar, List } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useChatStore from '../store/useChatStore.js';
import { useSocketContext } from '../context/SocketContext.jsx';
import { useAblyContext } from '../context/AblyContext.jsx';

const AVATAR_SIZE = 48;

const Contact = (props) => {
  const { selectedChat, setSelectedChat } = useChatStore();
  const { onlineUsers } = useSocketContext();
  const { ablyOnlineUsers } = useAblyContext();

  return (
    <List
      className={'mt-2 max-h-[428px] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'}>
      {props.contacts.map((contact) => (
        <List.Item
          actions={[ablyOnlineUsers.includes(contact._id) ? '🟢' : '🔴']}
          onClick={() => setSelectedChat(contact)}
          key={contact._id}
          className={`cursor-pointer rounded-xl ${(selectedChat !== null &&
            selectedChat._id === contact._id)
            ? ('bg-sky-500')
            : ('hover:bg-blue-500 hover:bg-opacity-30')}`}
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={contact.avatar}
                size={AVATAR_SIZE}
                className={'ml-2'}
              />
            }
            title={
              <span
                className={'whitespace-nowrap overflow-hidden text-ellipsis'}>
                {contact.name}
              </span>
            }
          >

          </List.Item.Meta>
        </List.Item>
      ))}
    </List>
  );
};

Contact.propTypes = {
  contacts: PropTypes.array,
};

export default Contact;