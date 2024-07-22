import { Flex, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const items = [
    { key: '/', label: 'Home' },
    { key: '/facilities', label: 'Facilities' },
    { key: '/patients', label: 'Patients' },
    { key: '/referrals', label: 'Referrals' },
    { key: '/practitioners', label: 'Practitioner' },
  ];

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
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </>
  );
};

export default Sidebar;
