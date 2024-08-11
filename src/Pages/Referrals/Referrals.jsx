import { Tabs } from 'antd';
import React from 'react';
import InReferral from './InReferral';
import OutReferral from './OutReferral';

const Referrals = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'In Referrals',
      children: <InReferral />,
    },
    {
      key: '2',
      label: 'Out Referrals',
      children: <OutReferral />,
    },
  ];
  return <Tabs defaultActiveKey='1' items={items} onChange={onChange} />;
};

export default Referrals;
