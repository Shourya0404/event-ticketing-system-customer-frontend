import React from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';

import Header from '../../components/Header/Header'; 
import Ticket from '../../components/Ticket/Ticket';

const tickets = ['ticket 1', 'ticket 2','ticket 1', 'ticket 2'];

function BuyTicketsPage() {
  return (
    <div className="MyTicketsPage">
        <Header />
        <Box sx={{ mx: 2, my: 2, color: 'white', display: 'block' }}>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={null}>Mint Ticket</Button>
            </Stack>
        </Box>
        <Divider sx={{ my: 2 }}>
        <Chip label="Secondary Marketplace" />
      </Divider>
        <Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {tickets.map((ticket) => (
                    <Grid item xs={4}>
                        <Ticket action="buy" />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </div>
  )
}

export default BuyTicketsPage