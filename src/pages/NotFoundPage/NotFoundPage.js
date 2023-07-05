import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

const primary = blue[100]; // #f44336

export default function Error() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
      }}
    >
      <Typography variant="h1" style={{ color: 'black' }}>
        404 Error :(((
      </Typography>
      <Typography variant="h6" style={{ color: 'black' }}>
        The page you are looking for does not exist.
      </Typography>
      <Button variant="contained" sx={{ my: 2 }} onClick={() => {navigate(-1)}}>Back</Button>
    </Box>
  );
}