import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Form, message, Row, Col } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './styles.css';

const { Search } = Input;

const Facilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [form] = Form.useForm();

  // Dummy data
  const dummyFacilities = [
    { id: 1, name: 'Facility A', description: 'Description A' },
    { id: 2, name: 'Facility B', description: 'Description B' },
    { id: 3, name: 'Facility C', description: 'Description C' },
  ];

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = () => {
    setLoading(true);
    setTimeout(() => {
      setFacilities(dummyFacilities);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredFacilities = dummyFacilities.filter((facility) =>
      facility.name.toLowerCase().includes(value.toLowerCase())
    );
    setFacilities(filteredFacilities);
  };

  const handleAddFacility = () => {
    form.resetFields();
    setEditingFacility(null);
    setIsModalVisible(true);
  };

  const handleEditFacility = (record) => {
    setEditingFacility(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteFacility = (id) => {
    setLoading(true);
    setTimeout(() => {
      setFacilities(facilities.filter((facility) => facility.id !== id));
      message.success('Facility deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingFacility) {
        setFacilities(
          facilities.map((facility) =>
            facility.id === editingFacility.id
              ? { ...editingFacility, ...values }
              : facility
          )
        );
        message.success('Facility updated');
      } else {
        setFacilities([...facilities, { ...values, id: Date.now() }]);
        message.success('Facility added');
      }
      setIsModalVisible(false);
      setLoading(false);
    }, 1000);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      width: '100px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon={<EditOutlined />}
            style={{ fontSize: '16px', color: '#1890ff' }}
            onClick={() => handleEditFacility(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            style={{ fontSize: '16px', color: '#ff4d4f' }}
            onClick={() => handleDeleteFacility(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className='facilities'>
      <h1>Facilities</h1>

      <Table
        title={() => (
          <Row className='table-header'>
            <Col span={12}>
              <Search
                className='search-bar'
                placeholder='Search facilities'
                onSearch={handleSearch}
                enterButton
              />
            </Col>
            <Col span={12} className='add-button-container'>
              <Button type='primary' onClick={handleAddFacility}>
                Add Facility
              </Button>
            </Col>
          </Row>
        )}
        columns={columns}
        dataSource={facilities}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
      />
      <Modal
        title={editingFacility ? 'Edit Facility' : 'Add Facility'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter the name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label='Description'
            rules={[
              { required: true, message: 'Please enter the description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading}>
              {editingFacility ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Facilities;
