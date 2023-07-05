import React from 'react'
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import Logo from '../../assets/logo.png';
import MetamaskLogo from '../../assets/metamask_logo.png';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
      // login checks - metamask wallet connected, password field not empty
      navigate('/mytickets');
    };

  return (
    <div>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
                height: 60,
                mr: 2,
            }}
            alt="logo"
            src={Logo}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monaco',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TIXTRONIC
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    <Box sx={{ width: '100%' }}>
    <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="75vh"
    >
      <Stack spacing={2} 
        alignItems="center">
        <Typography variant="subtitle1" gutterBottom>
            1. Connect your MetaMask wallet. 
        </Typography>
        <Box
            component="img"
            sx={{
                height: 150,
                width: 150,
            }}
            alt="logo"
            src={MetamaskLogo}
        />
        <Button variant="contained" onClick={null}>Connect Wallet</Button>
        <Typography variant="subtitle1" gutterBottom>
            2. Fill in the password and keep it a secret.
        </Typography>
        <TextField
            id="outlined"
            label="Password"
            defaultValue=""
        />
        <Button variant="contained" onClick={() => {handleLogin()}}>Login</Button>
      </Stack>
      </Grid>
    </Box>
    </div>
  )
}

export default LandingPage