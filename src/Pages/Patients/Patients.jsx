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
      // Simulating a delay as if fetching from an API
      setPatients(dummyPatients);
      setLoading(false);
    }, 1000);
  };

  const handleSearch = (value) => {
    const filteredPatients = dummyPatients.filter(
      (patient) =>
        patient.firstName.toLowerCase().includes(value.toLowerCase()) ||
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
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeletePatient = (id) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for deletion
      setPatients(patients.filter((patient) => patient.id !== id));
      message.success('Patient deleted');
      setLoading(false);
    }, 1000);
  };

  const handleSubmit = (values) => {
    setLoading(true);
    setTimeout(() => {
      // Simulating a delay for submit
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
      title: 'Patient Number',
      dataIndex: 'patientNumber',
      key: 'patientNumber',
    },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Middle Name', dataIndex: 'middleName', key: 'middleName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Sex', dataIndex: 'sex', key: 'sex' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
    { title: 'Entry Date', dataIndex: 'entryDate', key: 'entryDate' },
    {
      title: 'Patient Category',
      dataIndex: 'patientCategory',
      key: 'patientCategory',
    },
    { title: 'Country', dataIndex: 'country', key: 'country' },
    { title: 'Diagnosis', dataIndex: 'diagnosis', key: 'diagnosis' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Actions',
      key: 'actions',
      width: '150px',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={() => handleEditPatient(record)}>Edit</Button>
          <Button onClick={() => handleDeletePatient(record.id)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='patients'>
      <h1>Patients</h1>
      <Table
        title={() => (
          <>
            <Row>
              <Col span={12}>
                <Search placeholder='Search patients' onSearch={handleSearch} />
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <Button type='primary' onClick={handleAddPatient}>
                  Add Patient
                </Button>
              </Col>
            </Row>
          </>
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
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='patientNumber' label='Patient Number'>
                <Input />
              </Form.Item>
            </Col>
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
              <Form.Item name='birthDate' label='Birth Date'>
                <DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='age' label='Age'>
                <Input type='number' />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='sex' label='Sex'>
                <Select>
                  <Option value='Male'>Male</Option>
                  <Option value='Female'>Female</Option>
                  <Option value='Other'>Other</Option>
                </Select>
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
              <Form.Item name='entryDate' label='Entry Date'>
                <DatePicker format='YYYY-MM-DD' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='patientCategory' label='Patient Category'>
                <Select>
                  <Option value='General'>General</Option>
                  <Option value='Pediatric'>Pediatric</Option>
                  <Option value='Senior'>Senior</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='country' label='Country'>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='diagnosis' label='Diagnosis'>
                <Input />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
              <Form.Item name='description' label='Description'>
                <Input.TextArea rows={1} />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
