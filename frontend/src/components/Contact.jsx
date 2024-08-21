import { Avatar, List } from 'antd';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useChatStore from '../store/useChatStore.js';

const AVATAR_SIZE = 48;

const Contact = (props) => {
  const { selectedChat, setSelectedChat } = useChatStore();

  return (
    <List className={'mt-2'}>
      {props.contacts.map((contact) => (
        <List.Item
          onClick={() => setSelectedChat(contact)}
          key={contact._id}
          className={`cursor-pointer rounded-xl ${(selectedChat !== null && selectedChat._id === contact._id)
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
            title={contact.name}
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