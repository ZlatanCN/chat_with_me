import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Flex, Form, Input, ConfigProvider } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';

const LoginForm = (props) => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #698aed, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;

  return (
    <ConfigProvider button={{ className: linearGradientButton }}>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        onFinish={props.onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined/>}
            placeholder="Username"
            style={{
              backgroundColor: 'transparent',
            }}
            className={'text-gray-300'}
          />

        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined/>}
            type="password"
            placeholder="Password"
            style={{ backgroundColor: 'transparent' }}
            className={'text-gray-300'}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className={'text-gray-300'}>Remember me</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            loading={props.isLoading}
            className={'font-semibold'}
          >
            Log in
          </Button>
          <div className={'mt-3'}>
            <span className={'text-gray-300'}>or</span> <a href="/signup"
                                                           className={'text-blue-500'}>Register
            now!</a>
          </div>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};

LoginForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoginForm;