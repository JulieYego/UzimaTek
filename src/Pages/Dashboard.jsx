import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, useTheme, useMediaQuery, Tabs, Tab, MenuItem, IconButton, Menu, Box } from '@mui/material';
import {
  LocalHospital as FacilitiesIcon,
  People as PatientsIcon,
  ImportExport as ReferralsInIcon,
  Outbound as ReferralsOutIcon,
  Group as PractitionersIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const iconColors = {
  facilities: '#4caf50', // Green
  patients: '#2196f3', // Blue
  referralsIn: '#ff9800', // Orange
  referralsOut: '#f44336', // Red
  practitioners: '#9c27b0', // Purple
};

const dailyReferralData = [
  { day: '01', referrals: 5 },
  { day: '02', referrals: 8 },
  { day: '03', referrals: 6 },
  { day: '04', referrals: 10 },
  { day: '05', referrals: 7 },
  { day: '06', referrals: 12 },
  { day: '07', referrals: 4 },
  // Add more data as needed for the current month
];

const weeklyReferralData = [
  { week: 'Week 1', referrals: 30 },
  { week: 'Week 2', referrals: 40 },
  { week: 'Week 3', referrals: 35 },
  { week: 'Week 4', referrals: 50 },
  // Add more data as needed for the current month
];

const monthlyReferralData = [
  { month: 'January', referrals: 150 },
  { month: 'February', referrals: 200 },
  { month: 'March', referrals: 180 },
  // Add more data as needed
];

const dailyPatientData = [
  { day: '01', patients: 10 },
  { day: '02', patients: 12 },
  { day: '03', patients: 15 },
  { day: '04', patients: 18 },
  { day: '05', patients: 20 },
  { day: '06', patients: 25 },
  { day: '07', patients: 30 },
  // Add more data as needed for the current month
];

const weeklyPatientData = [
  { week: 'Week 1', patients: 70 },
  { week: 'Week 2', patients: 80 },
  { week: 'Week 3', patients: 75 },
  { week: 'Week 4', patients: 90 },
  // Add more data as needed for the current month
];

const monthlyPatientData = [
  { month: 'January', patients: 300 },
  { month: 'February', patients: 350 },
  { month: 'March', patients: 320 },
  // Add more data as needed
];

const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [referralTabIndex, setReferralTabIndex] = useState(0);
  const [patientTabIndex, setPatientTabIndex] = useState(0);
  const [referralDropdownValue, setReferralDropdownValue] = useState('Daily');
  const [patientDropdownValue, setPatientDropdownValue] = useState('Daily');
  const [referralMenuAnchorEl, setReferralMenuAnchorEl] = useState(null);
  const [patientMenuAnchorEl, setPatientMenuAnchorEl] = useState(null);

  const handleReferralTabChange = (event, newValue) => {
    setReferralTabIndex(newValue);
  };

  const handlePatientTabChange = (event, newValue) => {
    setPatientTabIndex(newValue);
  };

  const handleReferralDropdownChange = (event) => {
    const value = event.target.value;
    setReferralDropdownValue(value);
    switch (value) {
      case 'Weekly':
        setReferralTabIndex(1);
        break;
      case 'Monthly':
        setReferralTabIndex(2);
        break;
      default:
        setReferralTabIndex(0);
    }
    setReferralMenuAnchorEl(null); // Close the menu
  };

  const handlePatientDropdownChange = (event) => {
    const value = event.target.value;
    setPatientDropdownValue(value);
    switch (value) {
      case 'Weekly':
        setPatientTabIndex(1);
        break;
      case 'Monthly':
        setPatientTabIndex(2);
        break;
      default:
        setPatientTabIndex(0);
    }
    setPatientMenuAnchorEl(null); // Close the menu
  };

  const getReferralData = () => {
    switch (referralTabIndex) {
      case 1:
        return weeklyReferralData;
      case 2:
        return monthlyReferralData;
      default:
        return dailyReferralData;
    }
  };

  const getPatientData = () => {
    switch (patientTabIndex) {
      case 1:
        return weeklyPatientData;
      case 2:
        return monthlyPatientData;
      default:
        return dailyPatientData;
    }
  };

  const stats = [
    { icon: <FacilitiesIcon fontSize="small" sx={{ color: iconColors.facilities }} />, label: 'Facilities', value: 10 },
    { icon: <PatientsIcon fontSize="small" sx={{ color: iconColors.patients }} />, label: 'Patients', value: 200 },
    { icon: <ReferralsInIcon fontSize="small" sx={{ color: iconColors.referralsIn }} />, label: 'Referrals In', value: 15 },
    { icon: <ReferralsOutIcon fontSize="small" sx={{ color: iconColors.referralsOut }} />, label: 'Referrals Out', value: 5 },
    { icon: <PractitionersIcon fontSize="small" sx={{ color: iconColors.practitioners }} />, label: 'Practitioners', value: 25 },
  ];

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
      <Grid container spacing={2} justifyContent="space-between">
        {/* Stats Section */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Paper elevation={2} sx={{ 
              padding: 1, 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              height: isSmallScreen ? '40px' : '60px', // Adjust height based on screen size
              overflow: 'hidden'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: isSmallScreen ? 0.5 : 1,
                flexDirection: 'row', // Keep icon and label in a row
                textAlign: 'center'
              }}>
                {stat.icon}
                <Typography 
                  variant="caption" 
                  sx={{ 
                    marginLeft: 0.5, 
                    fontSize: isSmallScreen ? '0.75rem' : '0.85rem' // Adjust font size based on screen size
                  }}
                >
                  {stat.label}
                </Typography>
              </div>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 'bold', 
                  fontSize: isSmallScreen ? '0.85rem' : '1rem' // Adjust font size based on screen size
                }}
              >
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Charts Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: isSmallScreen ? 1 : 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ fontSize: isSmallScreen ? '1rem' : '1.2rem' }}>Referrals</Typography>
            {isSmallScreen ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={(event) => setReferralMenuAnchorEl(event.currentTarget)}
                  sx={{ fontSize: '1rem', marginRight: 1 }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  anchorEl={referralMenuAnchorEl}
                  open={Boolean(referralMenuAnchorEl)}
                  onClose={() => setReferralMenuAnchorEl(null)}
                  sx={{ '& .MuiMenuItem-root': { fontSize: '0.7rem' } }}
                >
                  <MenuItem onClick={() => handleReferralDropdownChange({ target: { value: 'Daily' } })}>Daily</MenuItem>
                  <MenuItem onClick={() => handleReferralDropdownChange({ target: { value: 'Weekly' } })}>Weekly</MenuItem>
                  <MenuItem onClick={() => handleReferralDropdownChange({ target: { value: 'Monthly' } })}>Monthly</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Tabs
                value={referralTabIndex}
                onChange={handleReferralTabChange}
                variant="fullWidth"
                orientation="horizontal"
                sx={{ 
                  '& .MuiTab-root': { fontSize: isSmallScreen ? '0.7rem' : '0.8rem', padding: isSmallScreen ? '0.5rem' : '0.75rem' },
                  padding: 0, // Remove padding
                  marginBottom: isSmallScreen ? 1 : 2 // Adjust margin
                }}
              >
                <Tab label="Daily" />
                <Tab label="Weekly" />
                <Tab label="Monthly" />
              </Tabs>
            )}
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300} style={{ paddingLeft: 0 }}>
              <BarChart data={getReferralData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={referralTabIndex === 0 ? 'day' : referralTabIndex === 1 ? 'week' : 'month'} 
                  style={{ fontSize: '0.7rem' }} 
                />
                <YAxis style={{ fontSize: '0.7rem' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="referrals" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ padding: isSmallScreen ? 1 : 2, textAlign: 'center', height: '100%' }}>
            <Typography variant="h6" sx={{ fontSize: isSmallScreen ? '1rem' : '1.2rem' }}>Patients</Typography>
            {isSmallScreen ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton 
                  onClick={(event) => setPatientMenuAnchorEl(event.currentTarget)}
                  sx={{ fontSize: '1rem', marginRight: 1 }}
                >
                  <ArrowDropDownIcon />
                </IconButton>
                <Menu
                  anchorEl={patientMenuAnchorEl}
                  open={Boolean(patientMenuAnchorEl)}
                  onClose={() => setPatientMenuAnchorEl(null)}
                  sx={{ '& .MuiMenuItem-root': { fontSize: '0.7rem' } }}
                >
                  <MenuItem onClick={() => handlePatientDropdownChange({ target: { value: 'Daily' } })}>Daily</MenuItem>
                  <MenuItem onClick={() => handlePatientDropdownChange({ target: { value: 'Weekly' } })}>Weekly</MenuItem>
                  <MenuItem onClick={() => handlePatientDropdownChange({ target: { value: 'Monthly' } })}>Monthly</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Tabs
                value={patientTabIndex}
                onChange={handlePatientTabChange}
                variant="fullWidth"
                orientation="horizontal"
                sx={{ 
                  '& .MuiTab-root': { fontSize: isSmallScreen ? '0.7rem' : '0.8rem', padding: isSmallScreen ? '0.5rem' : '0.75rem' },
                  padding: 0, // Remove padding
                  marginBottom: isSmallScreen ? 1 : 2 // Adjust margin
                }}
              >
                <Tab label="Daily" />
                <Tab label="Weekly" />
                <Tab label="Monthly" />
              </Tabs>
            )}
            <ResponsiveContainer width="100%" height={isSmallScreen ? 200 : 300} style={{ paddingLeft: 0 }}>
              <BarChart data={getPatientData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey={patientTabIndex === 0 ? 'day' : patientTabIndex === 1 ? 'week' : 'month'} 
                  style={{ fontSize: '0.7rem' }} 
                />
                <YAxis style={{ fontSize: '0.7rem' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
