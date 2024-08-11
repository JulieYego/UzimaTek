import React from 'react';
import { Form, Input, Button, Row, Col, Card } from 'antd';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    navigate('/');
  };

  return (
    <div className='container'>
      <Row justify='center' align='middle' style={{ height: '100vh' }}>
        <Col span={8}>
          <Card className='card'>
            <div className='logoContainer'>
              <img
                src='src/assets/Logo_transparent.png'
                alt='Logo'
                className='logo'
              />
            </div>
            <Form
              name='login'
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className='form'
            >
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your Email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
              >
                <Input placeholder='Email' className='input' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your Password!' },
                ]}
              >
                <Input.Password placeholder='Password' className='input' />
              </Form.Item>
              <Form.Item>
                <Button type='primary' htmlType='submit' className='button'>
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
