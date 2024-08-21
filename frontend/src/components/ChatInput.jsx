import { Form, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useRef } from 'react';
import useChatStore from '../store/useChatStore.js';

const ChatInput = () => {
  const [form] = useForm();
  const inputRef = useRef(null);
  const { selectedChat } = useChatStore();

  const sendMessage = async (message) => {
    try {
      const res = await fetch(`api/messages/send/${selectedChat._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) {
        console.log('Error sending message:', data.error);
      }
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();

    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const onFinish = async (values) => {
    console.log('Received values:', values.message);
    if (!values.message) {
      return;
    }
    await sendMessage(values.message);
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
