import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import Ticketing from '../../assets/Ticketing.json';

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

import QRCodeComponent from '../../components/QRCodeComponent/QRCodeComponent';

import axios from "axios";

function MyTicketsPage() {
    const [open, setOpen] = React.useState(false);
    const [ownedTickets, setOwnedTickets] = useState([])
    const [qrCodeValue, setQrCodeValue] = useState("")

    async function getQrCodeData() {
        axios.post(process.env.REACT_APP_VERIFICATION_BACKEND_URL+"/id", 
            {
                wallet_address: JSON.parse(localStorage.getItem("walletData")).accounts[0],
                password_hash: localStorage.getItem("passwordHash")
            })
            .then((response) => response.data)
            .then((data) => {
              setQrCodeValue(data.id);
            })
            .catch((err) => {
              console.log(err.message);
            });
    }

    const handleClickOpen = () => {
        getQrCodeData();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function getOwnedTickets() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
            try {
                let response = await contract.getOwnedTicket(
                    JSON.parse(localStorage.getItem("walletData")).accounts[0])
                setOwnedTickets(response)
                localStorage.setItem("ownedTicketId", JSON.stringify(response.map((r) => r._ticketId._hex)))
            } catch (e) {
                console.log("Err", e)
            }
        }
        async function getContractData() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
            const max_transfer_price = parseInt((await contract._maxTransferPrice())._hex)
            const totalTickets = await contract._maxTicketCount()
            const primaryTicketPrice = await contract._initialPrice()
            localStorage.setItem("totalTickets", totalTickets)
            localStorage.setItem("maxTransferPrice", max_transfer_price)
            localStorage.setItem("primaryTicketPrice", primaryTicketPrice)
        }
        getOwnedTickets()
        getContractData()
    }, [])

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
                        <DialogContent align="center" justify="center" alignitems="center">
                            <DialogContentText id="alert-dialog-description">
                                {/* QR CODE COMPONENT BELOW */}
                                <QRCodeComponent value={qrCodeValue} size={250} />
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
                    {ownedTickets.map((ticket) => (
                        <Grid key={parseInt(ticket._ticketId._hex)} item xs={4}>
                            <Ticket key={parseInt(ticket._ticketId._hex)}
                                action="sell"
                                _price={parseInt(ticket._price._hex)}
                                _onSale={ticket._onSale}
                                _ticketId={parseInt(ticket._ticketId._hex)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default MyTicketsPage