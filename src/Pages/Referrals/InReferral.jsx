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
import '../styles.css';

const { Search } = Input;
const { Option } = Select;

const InReferral = () => {
  const [inreferrals, setInreferrals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingInreferral, setEditingInreferral] = useState(null);
  const [form] = Form.useForm();

  // Dummy data
  const dummyInreferrals = [
    {
      id: 1,
      patientName: 'John',
      facilityName: 'A.',
      practitionerName: 'Doe',
      entryDate: '2024-01-01',
      reason: 'Inreferral with flu symptoms',
    },
    {
      id: 2,
      inreferralNumber: '002',
      patientName: 'Jane',
      facilityName: 'B.',
      practitionerName: 'Smith',
      entryDate: '2024-02-01',
      reason: 'Inreferral with cold symptoms',
    },
  ];

  useEffect(() => {
    fetchInreferrals();
  }, []);

  const fetchInreferrals = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay as if fetching from an API
      setInreferrals(dummyInreferrals);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredInreferrals = dummyInreferrals.filter(
      (inreferral) =>
        inreferral.firstName.toLowerCase().includes(value.toLowerCase()) ||
        inreferral.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setInreferrals(filteredInreferrals);
  };

  const handleAddInreferral = () => {
    form.resetFields();
    setEditingInreferral(null);
    setIsModalVisible(true);
  };

  const handleEditInreferral = (record) => {
    setEditingInreferral(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteInreferral = (id) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for deletion
      setInreferrals(inreferrals.filter((inreferral) => inreferral.id !== id));
      message.success('Inreferral deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for submit
      if (editingInreferral) {
        setInreferrals(
          inreferrals.map((inreferral) =>
            inreferral.id === editingInreferral.id
              ? { ...editingInreferral, ...values }
              : inreferral
          )
        );
        message.success('Inreferral updated');
      } else {
        setInreferrals([...inreferrals, { ...values, id: Date.now() }]);
        message.success('Inreferral added');
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
      width: '150px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => handleEditInreferral(record)}>Edit</Button>
          <Button onClick={() => handleDeleteInreferral(record.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='inreferrals'>
      <h1>Inreferrals</h1>
      <Table
        title={() => (
          <>
            <Row>
              <Col span={12}>
                <Search
                  placeholder='Search inreferrals'
                  onSearch={handleSearch}
                />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={handleAddInreferral}>
                  Add Inreferral
                </Button>
              </Col>
            </Row>
          </>
        )}
        columns={columns}
        dataSource={inreferrals}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
      />
      <Modal
        title={editingInreferral ? 'Edit Inreferral' : 'Add Inreferral'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item
                name='patient_name'
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
                name='facility_name'
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
                name='practitioner_name'
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
                  {editingInreferral ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InReferral;
