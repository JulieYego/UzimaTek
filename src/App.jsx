// import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Auth/Login';
import Home from './Pages/Home';
import Facilities from './Pages/Facilities/Facilities';
import Patients from './Pages/Patients/Patients';
import Practitioner from './Pages/Practitioner/Practitioner';
import InReferral from './Pages/Referrals/InReferral';
import OutReferral from './Pages/Referrals/OutReferral';
import Referrals from './Pages/Referrals/Referrals';
import { Flex, Menu, Layout } from 'antd';
import { useState } from 'react';
import Sidebar from './Sidebar';
import './index.css';

const { Content, Header, Sider } = Layout;

function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    { key: '/', label: 'Home' },
    { key: '/facilities', label: 'Facilities' },
    { key: '/patients', label: 'Patients' },
    { key: '/referrals', label: 'Referrals' },
    { key: '/practitioners', label: 'Practitioner' },
  ];

  return (
    <Layout>
      <Sider
        theme='light'
        trigger={null}
        collapsible
        collapsed={collapsed}
        className='sider'
      >
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
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header></Header>
        {/* <Content className='content'>
          <Facilities />
        </Content> */}
        <Content />
      </Layout>
    </Layout>
  );

  function Content() {
    return (
      <div>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/facilities' element={<Facilities />} />
          <Route path='/patients' element={<Patients />} />
          <Route path='/practitioners' element={<Practitioner />} />
          <Route path='/referrals' element={<Referrals />} />
          <Route path='/inreferral' element={<InReferral />} />
          <Route path='/outreferral' element={<OutReferral />} />
        </Routes>
      </div>
    );
  }
}

export default App;
