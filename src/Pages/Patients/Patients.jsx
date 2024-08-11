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
import moment from 'moment'; // Import moment
import '../styles.css';

const { Search } = Input;
const { Option } = Select;

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [form] = Form.useForm();

  // Dummy data
  const dummyPatients = [
    {
      id: 1,
      patientNumber: '001',
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      birthDate: '1990-01-01',
      age: 34,
      sex: 'Male',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      entryDate: '2024-01-01',
      patientCategory: 'General',
      country: 'USA',
      diagnosis: 'Flu',
      description: 'Patient with flu symptoms',
    },
    {
      id: 2,
      patientNumber: '002',
      firstName: 'Jane',
      middleName: 'B.',
      lastName: 'Smith',
      birthDate: '1985-05-15',
      age: 39,
      sex: 'Female',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      entryDate: '2024-02-01',
      patientCategory: 'Pediatric',
      country: 'USA',
      diagnosis: 'Cold',
      description: 'Patient with cold symptoms',
    },
  ];

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = () => {
    setLoading(true);
    setTimeout(() => {
      setPatients(dummyPatients);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredPatients = dummyPatients.filter(
      (patient) =>
        (patient.firstName + ' ' + patient.middleName + ' ' + patient.lastName)
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setPatients(filteredPatients);
  };

  const handleAddPatient = () => {
    form.resetFields();
    setEditingPatient(null);
    setIsModalVisible(true);
  };

  const handleEditPatient = (record) => {
    setEditingPatient(record);
    form.setFieldsValue({
      ...record,
      birthDate: moment(record.birthDate),
      entryDate: moment(record.entryDate),
    });
    setIsModalVisible(true);
  };

  const handleDeletePatient = (id) => {
    setLoading(true);
    setTimeout(() => {
      setPatients(patients.filter((patient) => patient.id !== id));
      message.success('Patient deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      if (editingPatient) {
        setPatients(
          patients.map((patient) =>
            patient.id === editingPatient.id
              ? { ...editingPatient, ...values }
              : patient
          )
        );
        message.success('Patient updated');
      } else {
        setPatients([...patients, { ...values, id: Date.now() }]);
        message.success('Patient added');
      }
      setIsModalVisible(false);
      setLoading(false);
    }, 1000);
  };

  const columns = [
    {
      title: 'Name',
      key: 'fullName',
      render: (text, record) => `${record.firstName} ${record.middleName} ${record.lastName}`.toUpperCase(),
    },
    {
      title: 'PNo.',
      dataIndex: 'patientNumber',
      key: 'patientNumber',
    },
    {
      title: 'Birth',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Date',
      dataIndex: 'entryDate',
      key: 'entryDate',
    },
    {
      title: 'Category',
      dataIndex: 'patientCategory',
      key: 'patientCategory',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            icon={<EditOutlined style={{ fontSize: '12px', color: '#1890ff' }} />}
            onClick={() => handleEditPatient(record)}
            style={{ marginRight: 8 }}
            type='link'
          />
          <Button
            icon={<DeleteOutlined style={{ fontSize: '12px' }} />}
            onClick={() => handleDeletePatient(record.id)}
            danger
            type='link'
          />
        </div>
      ),
    },
  ];

  return (
    <div className='patients'>
      <h1>Patients</h1>
      <Table
        title={() => (
          <Row className='table-header'>
            <Col span={12}>
              <Search
                className='search-bar'
                placeholder='Search patients'
                onSearch={handleSearch}
                enterButton
              />
            </Col>
            <Col span={12} className='add-button-container'>
              <Button type='primary' onClick={handleAddPatient}>
                Add Patient
              </Button>
            </Col>
          </Row>
        )}
        columns={columns}
        dataSource={patients}
        loading={loading}
        rowKey='id'
        pagination={{ pageSize: 5, hideOnSinglePage: true }}
      />
      <Modal
        title={editingPatient ? 'Edit Patient' : 'Add Patient'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleSubmit} layout='vertical'>
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='patientNumber' label='Patient Number'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='middleName' label='Middle Name'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
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
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='birthDate' label='Birth Date'>
                <DatePicker
                  format='YYYY-MM-DD'
                  style={{ width: '100%' }}
                  value={form.getFieldValue('birthDate') ? moment(form.getFieldValue('birthDate')) : null}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='age' label='Age'>
                <Input type='number' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='sex' label='Sex'>
                <Select>
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                  <Option value='Other'>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='email' label='Email'>
                <Input type='email' />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='phoneNumber' label='Phone Number'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='entryDate' label='Entry Date'>
                <DatePicker
                  format='YYYY-MM-DD'
                  style={{ width: '100%' }}
                  value={form.getFieldValue('entryDate') ? moment(form.getFieldValue('entryDate')) : null}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='patientCategory' label='Patient Category'>
                <Select>
                  <Option value='General'>General</Option>
                  <Option value='Pediatric'>Pediatric</Option>
                  <Option value='Senior'>Senior</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='country' label='Country'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
              <Form.Item name='diagnosis' label='Diagnosis'>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xxl={12}>
              <Form.Item name='description' label='Description'>
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item>
                <Button type='primary' htmlType='submit' loading={loading}>
                  {editingPatient ? 'Update' : 'Add'}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Patients;
