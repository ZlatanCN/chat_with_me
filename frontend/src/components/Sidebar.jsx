import { Input, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import Contact from './Contact.jsx';

const Sidebar = () => {
  return (
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
      <Contact/>

      {/*Logout button*/}
      <div className={'-ml-3 mt-3'}>
        <Button
          shape={'circle'}
          type={'link'}
          icon={<LeftOutlined/>}
          className={''}
          onClick={() => console.log('Logout clicked')}
        />
      </div>
    </div>
  );
};

export default Sidebar;