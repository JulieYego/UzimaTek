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
  DatePicker,
  Select,
} from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../styles.css';

const { Search } = Input;
const { Option } = Select;

const OutReferral = () => {
  const [outreferrals, setOutreferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOutreferral, setEditingOutreferral] = useState(null);
  const [form] = Form.useForm();

  // Dummy data
  const dummyOutreferrals = [
    {
      id: 1,
      patientName: 'John',
      facilityName: 'A.',
      practitionerName: 'Doe',
      entryDate: '2024-01-01',
      reason: 'Outreferral with flu symptoms',
    },
    {
      id: 2,
      OutreferralNumber: '002',
      patientName: 'Jane',
      facilityName: 'B.',
      practitionerName: 'Smith',
      entryDate: '2024-02-01',
      reason: 'Outreferral with cold symptoms',
    },
  ];

  useEffect(() => {
    fetchOutreferrals();
  }, []);

  const fetchOutreferrals = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay as if fetching from an API
      setOutreferrals(dummyOutreferrals);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredOutreferrals = dummyOutreferrals.filter(
      (outreferral) =>
        outreferral.patientName.toLowerCase().includes(value.toLowerCase()) ||
        outreferral.facilityName.toLowerCase().includes(value.toLowerCase())
    );
    setOutreferrals(filteredOutreferrals);
  };

  const handleAddOutreferral = () => {
    form.resetFields();
    setEditingOutreferral(null);
    setIsModalVisible(true);
  };

  const handleEditOutreferral = (record) => {
    setEditingOutreferral(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteOutreferral = (id) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for deletion
      setOutreferrals(
        outreferrals.filter((outreferral) => outreferral.id !== id)
      );
      message.success('Outreferral deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for submit
      if (editingOutreferral) {
        setOutreferrals(
          outreferrals.map((outreferral) =>
            outreferral.id === editingOutreferral.id
              ? { ...editingOutreferral, ...values }
              : outreferral
          )
        );
        message.success('Outreferral updated');
      } else {
        setOutreferrals([...outreferrals, { ...values, id: Date.now() }]);
        message.success('Outreferral added');
      }
      setIsModalVisible(false);
      setLoading(false);
    }, 1000);
  };

  const columns = [
    { title: 'Patient Name', dataIndex: 'patientName', key: 'patientName' },
    { title: 'Facility Name', dataIndex: 'facilityName', key: 'facilityName' },
    {
      title: 'Practitioner Name',
      dataIndex: 'practitionerName',
      key: 'practitionerName',
    },
    { title: 'Entry Date', dataIndex: 'entryDate', key: 'entryDate' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    {
      title: 'Actions',
      key: 'actions',
      width: '100px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon={<EditOutlined style={{ fontSize: '12px' , color: '#1890ff' }} />}
            onClick={() => handleEditOutreferral(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined style={{ fontSize: '12px' }} />}
            onClick={() => handleDeleteOutreferral(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className='outreferrals'>
      <h1>Outreferrals</h1>
      <Table
        title={() => (
          <>
            <Row>
              <Col span={12}>
                <Search
                  placeholder='Search outreferrals'
                  onSearch={handleSearch}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={handleAddOutreferral}>
                  Add Outreferral
                </Button>
              </Col>
            </Row>
          </>
        )}
        columns={columns}
        dataSource={outreferrals}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
      />
      <Modal
        title={editingOutreferral ? 'Edit Outreferral' : 'Add Outreferral'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='patientName'
                label='Patient Name'
                rules={[
                  { required: true, message: 'Please enter the patient name' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='facilityName'
                label='Facility Name'
                rules={[
                  { required: true, message: 'Please enter the facility name' },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='practitionerName'
                label='Practitioner Name'
                rules={[
                  {
                    required: true,
                    message: 'Please enter the practitioner name',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='entryDate' label='Entry Date'>
                <DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='reason' label='Reason'>
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  {editingOutreferral ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default OutReferral;
