/*import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

const Home = () => {
  return <>Home</>;
};

export default Home;
*/

import React from 'react';
import { Container } from '@mui/material';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <Container>
      <Dashboard />
    </Container>
  );
};

export default Home;
