import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useRef } from 'react';

const ChatInput = () => {
  const [form] = useForm();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();

    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const onFinish = (values) => {
    console.log('Received values:', values.message);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
    >
      <Form.Item name={'message'} id={'message'}>
        <Input
          placeholder="Type a message..."
          prefix={<SendOutlined className="text-gray-300"/>}
          className={'mt-3'}
          onPressEnter={handleSubmit}
          ref={inputRef}
        />
      </Form.Item>
    </Form>
  );
};

export default ChatInput;
