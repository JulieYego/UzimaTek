import { Flex, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex align='center' justify='center'>
        <div className='logo'>
          <img
            src='src/assets/Logo_transparent.png'
            alt='Logo'
            className='logo'
          />
        </div>
      </Flex>

      <Menu
        mode='inline'
        defaultSelectedKeys={[]}
        className='sidebar'
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item key='/' icon={<HomeOutlined />}>
          Home
        </Menu.Item>
        <Menu.Item key='/facilities' icon={<AppstoreOutlined />}>
          Facilities
        </Menu.Item>
        <Menu.Item key='/patients' icon={<UserOutlined />}>
          Patients
        </Menu.Item>
        <Menu.Item key='/referrals' icon={<SolutionOutlined />}>
          Referrals
        </Menu.Item>
        <Menu.Item key='/practitioners' icon={<TeamOutlined />}>
          Practitioners
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Sidebar;
