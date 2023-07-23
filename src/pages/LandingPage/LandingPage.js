import React, { useState, useEffect } from 'react'
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
import detectEthereumProvider from '@metamask/detect-provider'

import Logo from '../../assets/logo.png';
import MetamaskLogo from '../../assets/metamask_logo.png';


function LandingPage(props) {
  const navigate = useNavigate();

  // metamask resource: https://dev.to/rounakbanik/building-a-web3-frontend-with-react-340c

  const handleLogin = () => {
    // login checks - metamask wallet connected, password field not empty
    navigate('/mytickets');
  };

  const initialState = { accounts: '' }
  const [wallet, setWallet] = useState(initialState)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        // if length 0, user is disconnected                    
        setWallet(initialState)
      }
    }
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      if (provider) {
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
      }
    }
    getProvider()
    localStorage.setItem("walletData", JSON.stringify(wallet))
    return () => {
      window.ethereum.removeListener('accountsChanged', refreshAccounts)
    }
  }, [wallet])

  const updateWallet = async (accounts) => {
    setWallet({ accounts })
  }

  const handleConnect = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    })
      .then((accounts) => {
        setError(false)
        updateWallet(accounts)
      })
      .catch((err) => {
        setError(true)
        setErrorMessage(err.message)
      })
  }

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
            <Button variant="contained" onClick={handleConnect}>Connect Wallet</Button>
            {error && (
              <div onClick={() => setError(false)}>
                <strong>Error:</strong> {errorMessage}
              </div>
            )
            }
            <Typography variant="subtitle1" gutterBottom>
              2. Fill in the password and keep it a secret.
            </Typography>
            <TextField
              id="password"
              label="Password"
              type="password"
              defaultValue=""
            />
            <Button variant="contained" onClick={() => { handleLogin() }}>Login</Button>
          </Stack>
        </Grid>
      </Box>
    </div>

  )
}

export default LandingPage