import React, { useState, useEffect } from 'react';
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  message,
  Row,
  Col,
  Select,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles.css';

const { Search } = Input;
const { Option } = Select;

const Practitioner = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPractitioner, setEditingPractitioner] = useState(null);
  const [form] = Form.useForm();

  // Dummy data
  const dummyPractitioners = [
    {
      id: 1,
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      specialization: 'General',
    },
    {
      id: 2,
      firstName: 'Jane',
      middleName: 'B.',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      specialization: 'Pediatric',
    },
  ];

  useEffect(() => {
    fetchPractitioners();
  }, []);

  const fetchPractitioners = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay as if fetching from an API
      setPractitioners(dummyPractitioners);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredPractitioners = dummyPractitioners.filter(
      (practitioner) =>
        `${practitioner.firstName} ${practitioner.middleName} ${practitioner.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase())
    );
    setPractitioners(filteredPractitioners);
  };

  const handleAddPractitioner = () => {
    form.resetFields();
    setEditingPractitioner(null);
    setIsModalVisible(true);
  };

  const handleEditPractitioner = (record) => {
    setEditingPractitioner(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeletePractitioner = (id) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for deletion
      setPractitioners(
        practitioners.filter((practitioner) => practitioner.id !== id)
      );
      message.success('Practitioner deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for submit
      if (editingPractitioner) {
        setPractitioners(
          practitioners.map((practitioner) =>
            practitioner.id === editingPractitioner.id
              ? { ...editingPractitioner, ...values }
              : practitioner
          )
        );
        message.success('Practitioner updated');
      } else {
        setPractitioners([...practitioners, { ...values, id: Date.now() }]);
        message.success('Practitioner added');
      }
      setIsModalVisible(false);
      setLoading(false);
    }, 1000);
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (text, record) => `${record.firstName} ${record.middleName} ${record.lastName}`,
    },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    {
      title: 'Specialization',
      dataIndex: 'specialization',
      key: 'specialization',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '100px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon={<EditOutlined />}
            style={{ fontSize: '12px', color: '#1890ff' }}
            onClick={() => handleEditPractitioner(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ fontSize: '12px', color: '#ff4d4f' }}
            onClick={() => handleDeletePractitioner(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className='practitioners'>
      <h1>Practitioners</h1>
      <Table
        title={() => (
          <>
            <Row>
              <Col span={12}>
                <Search
                  placeholder='Search practitioners'
                  onSearch={handleSearch}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={handleAddPractitioner}>
                  Add Practitioner
                </Button>
              </Col>
            </Row>
          </>
        )}
        columns={columns}
        dataSource={practitioners}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
        scroll={{ x: 'max-content' }} // Allow horizontal scrolling if needed
      />
      <Modal
        title={editingPractitioner ? 'Edit Practitioner' : 'Add Practitioner'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='firstName'
                label='First Name'
                rules={[
                  { required: true, message: 'Please enter the first name' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='middleName' label='Middle Name'>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='lastName'
                label='Last Name'
                rules={[
                  { required: true, message: 'Please enter the last name' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='email' label='Email'>
                <Input type='email' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='phoneNumber' label='Phone Number'>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='specialization' label='Specialization'>
                <Select>
                  <Option value='General'>General</Option>
                  <Option value='Pediatric'>Pediatric</Option>
                  <Option value='Senior'>Senior</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  {editingPractitioner ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Practitioner;
