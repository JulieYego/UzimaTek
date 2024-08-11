import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Layout, Menu, Grid } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

import Login from './Auth/Login';
import Home from './Pages/Home';
import Facilities from './Pages/Facilities/Facilities';
import Patients from './Pages/Patients/Patients';
import Practitioner from './Pages/Practitioner/Practitioner';
import InReferral from './Pages/Referrals/InReferral';
import OutReferral from './Pages/Referrals/OutReferral';
import Referrals from './Pages/Referrals/Referrals';
import './index.css';

const { Content, Header, Sider } = Layout;
const { useBreakpoint } = Grid;

const App = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const items = [
    { key: '/', label: 'Home', icon: <HomeOutlined /> },
    { key: '/facilities', label: 'Facilities', icon: <AppstoreOutlined /> },
    { key: '/patients', label: 'Patients', icon: <UserOutlined /> },
    { key: '/referrals', label: 'Referrals', icon: <SolutionOutlined /> },
    { key: '/practitioners', label: 'Practitioner', icon: <TeamOutlined /> },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
        className="sider"
      >
        <div className="logo" onClick={handleLogoClick}>
          <img src="src/assets/Logo_transparent.png" alt="Logo" className="logo-img" />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[]}
          className="sidebar"
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className="header">
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggleCollapsed,
          })}
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/practitioners" element={<Practitioner />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/inreferral" element={<InReferral />} />
            <Route path="/outreferral" element={<OutReferral />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
