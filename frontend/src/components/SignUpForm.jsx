import { Button, Checkbox, Form, Input, Select } from 'antd';
import { QuestionCircleTwoTone } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SignUpForm = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={props.onFinish}
      style={{
        maxWidth: 600,
        width: 475,
      }}
      scrollToFirstError
      colon={false}
      requiredMark={false}
    >
      <Form.Item
        name="nickname"
        label={<span className={'text-gray-300'}>Nickname</span>}
        tooltip={{
          title: 'What do you want others to call you?',
          icon: <QuestionCircleTwoTone/>,
        }}
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input style={{ backgroundColor: 'transparent' }}/>
      </Form.Item>

      <Form.Item
        name="username"
        label={<span className={'text-gray-300'}>Username</span>}
        rules={[
          {
            required: true,
            message: 'Please input your username!',
            whitespace: true,
          },
        ]}
      >
        <Input style={{ backgroundColor: 'transparent' }}/>
      </Form.Item>

      <Form.Item
        name="password"
        label={<span className={'text-gray-300'}>Password</span>}
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            whitespace: true,
          },
        ]}
        hasFeedback
      >
        <Input.Password className="text-gray-300" style={{
          backgroundColor: 'transparent',
        }}/>
      </Form.Item>

      <Form.Item
        name="confirm"
        label={<span className={'text-gray-300'}>Confirm Password</span>}
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
            whitespace: true,
          },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password className="text-gray-300" style={{
          backgroundColor: 'transparent',
        }}/>
      </Form.Item>

      <Form.Item
        name="gender"
        label={<span className={'text-gray-300'}>Gender</span>}
        rules={[
          {
            required: true,
            message: 'Please select gender!',
          },
        ]}
      >
        <Select
          placeholder={
            <span className={'text-gray-400'}>select your gender</span>
          }
        >
          <Option value="male">Male</Option>
          <Option value="female">Female</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(
                new Error('Should accept agreement')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          <span className={'text-gray-300'}>I have read the</span> <a
          href="">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" className={'font-semibold'}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

SignUpForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
};

export default SignUpForm;