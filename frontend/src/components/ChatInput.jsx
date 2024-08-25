import { Button, Form, Input, message, Upload } from 'antd';
import { PictureOutlined, SendOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useRef } from 'react';
import useChatStore from '../store/useChatStore.js';

const ChatInput = () => {
  const [form] = useForm();
  const inputRef = useRef(null);
  const { selectedChat, messages, setMessages } = useChatStore();
  const [messageApi, contextHolder] = message.useMessage();

  const sendMessage = async (message) => {
    let body;
    let headers = {};
    if (typeof message === 'string') {
      body = JSON.stringify({ message });
      headers['Content-Type'] = 'application/json';
    } else {
      const formData = new FormData();
      formData.append('imageObj', message);
      body = formData;
    }

    try {
      const res = await fetch(`api/messages/send/${selectedChat._id}`, {
        method: 'POST',
        headers,
        body,
      });
      const data = await res.json();
      console.log('message:', data.message);
      if (data.error) {
        console.log('Error sending message:', data.error);
      } else {
        setMessages([...messages, data.message]);
      }
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.submit();
  };

  const onFinish = async (values) => {
    console.log('Received values:', values.message);
    if (!values.message) {
      return;
    }
    await sendMessage(values.message);
    form.resetFields();
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 0);
    }
  };

  const beforeImageUpload = (file) => {
    const isLt16MB = file.size / 1024 / 1024 < 16;
    if (!isLt16MB) {
      messageApi.open({
        type: 'error',
        content: 'Image must be smaller than 16MB!',
      });
    }
    return isLt16MB;
  };

  const handleUpload = async (options) => {
    await sendMessage(options.file);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        className={'flex flex-row justify-between items-center'}
      >
        <Form.Item name={'message'} id={'message'} className={'w-full'}>
          <Input
            placeholder="Type a message..."
            prefix={<SendOutlined className="text-gray-300"/>}
            className={'mt-3'}
            onPressEnter={handleSubmit}
            ref={inputRef}
          />
        </Form.Item>
        <Form.Item className={'mt-[12px]'}>
          <Upload
            accept="image/*"
            beforeUpload={beforeImageUpload}
            listType={'picture'}
            showUploadList={false}
            maxCount={1}
            customRequest={handleUpload}
          >
            <Button icon={<PictureOutlined/>} type={'link'}
                    className={'text-gray-400'}/>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChatInput;
