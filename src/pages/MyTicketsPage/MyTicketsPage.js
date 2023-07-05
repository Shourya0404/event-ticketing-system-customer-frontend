import React from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Header from '../../components/Header/Header'; 
import Ticket from '../../components/Ticket/Ticket';

const tickets = ['ticket 1', 'ticket 2','ticket 1', 'ticket 2','ticket 1', 'ticket 2'];

function MyTicketsPage() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <div className="MyTicketsPage">
        <Header />
        <Box sx={{ mx: 2, my: 2, color: 'white', display: 'block' }}>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={handleClickOpen}>Verification QR-Code</Button>
                {/* <Button variant="contained">Sell Ticket</Button> */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Please present this QR-Code to the organizers..."}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {/* PUT THE QR CODE COMPONENT HERE */}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
        <Divider sx={{ my: 2 }}>
        <Chip label="My Tickets" />
      </Divider>
        <Box>
            <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {tickets.map((ticket) => (
                    <Grid item xs={4}>
                        <Ticket action="sell" />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </div>
  )
}

export default MyTicketsPage