import { Avatar, List } from 'antd';

const Contact = () => {
  const AVATAR_SIZE = 48;

  return (
    <List className={'mt-2'}>
      <List.Item
        onClick={() => console.log('Chat clicked')}
        actions={['🍔']}
      >
        <List.Item.Meta
          avatar={
            <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=111`} size={AVATAR_SIZE}/>
          }
          title={'汤汤'}
        />
      </List.Item>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=111`} size={AVATAR_SIZE}/>}
          title={'倩倩'}
        />
      </List.Item>
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=111`} size={AVATAR_SIZE}/>}
          title={'茜茜'}
        />
      </List.Item>
    </List>
  );
};

export default Contact;