import React, { useEffect, useState } from 'react'

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import Ticketing from '../../assets/Ticketing.json';

import Header from '../../components/Header/Header';
import Ticket from '../../components/Ticket/Ticket';

function BuyTicketsPage() {

    const [ticketsOnSale, setTicketsOnSale] = useState([{ _ticketId: '', _price: '', _onSale: false }])
    const [mintedTicketsCount, setMintedTicketsCount] = useState('0')

    useEffect(() => {
        async function getMintedTicketsCount() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);

            try {
                let response = await contract._tokenIds()
                setMintedTicketsCount(response._hex)
            }
            catch (e) {
                console.log("Err", e)
            }
        }
        getMintedTicketsCount()
    }, [])

    useEffect(() => {
        async function getTicketsOnSale() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
            try {
                const secondaryMarketTickets = []
                for (let i = 0; i < parseInt(mintedTicketsCount); i++) {
                    let response = await contract.getTicket(i)
                    if (response[2] && JSON.parse(localStorage.getItem("ownedTicketId")).indexOf(response[0]._hex) === -1) {
                        secondaryMarketTickets.push({ _ticketId: response[0]._hex, _price: response[1]._hex, _onSale: response[2] })
                    }
                }
                setTicketsOnSale(secondaryMarketTickets)
            } catch (e) {
                console.log("Err", e)
            }
        }
        getTicketsOnSale()
    }, [])

    const mintTicket = async () => {
        //ethereum is usable get reference to the contract
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
        try {
            if (mintedTicketsCount === localStorage.getItem("totalTickets")) {
                alert('All the tickets for this event have been sold.')
            }
            else {
                await contract.buyTicketFromOrganizer(
                    JSON.parse(localStorage.getItem("walletData")).accounts[0], { value: JSON.parse(localStorage.getItem("primaryTicketPrice")) });
            }
        } catch (e) {
            console.log("Err: ", e)
        }
    }

    return (
        <div className="MyTicketsPage">
            <Header />
            <Box sx={{ mx: 2, my: 2, color: 'white', display: 'block' }}>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={mintTicket}>Mint Ticket</Button>
                </Stack>
            </Box>
            <Divider sx={{ my: 2 }}>
                <Chip label="Secondary Marketplace" />
            </Divider>
            <Box>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {ticketsOnSale.map((ticket) => (
                        <Grid key={parseInt(ticket._ticketId)} item xs={4}>
                            <Ticket key={parseInt(ticket._ticketId)}
                                action="buy"
                                _price={parseInt(ticket._price)}
                                _onSale={ticket._onSale}
                                _ticketId={parseInt(ticket._ticketId)} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default BuyTicketsPage