import React, { useState } from 'react';
import { ethers } from 'ethers'
import Ticketing from '../../assets/Ticketing.json';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function BuyButton(props) {
  const buyTicketOnSale = async () => {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
    try {
      await contract.buyOnSaleTicket(
        props._ticketId);
    } catch (e) {
      console.log("Err: ", e)
    }
  }
  return (
    <Button size="small" onClick={buyTicketOnSale}>Buy</Button>
  );
}

function SellButton(props) {
  const sell = async () => {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
    try {
      if (props._price > parseInt(JSON.parse(localStorage.getItem("maxTransferPrice"))
      )) {
        alert(`Max price to sell this ticket is ${localStorage.getItem("maxTransferPrice")} wei`)
      }
      else {
        try {
          await contract.sellTicket(props._ticketId, props._price);
        } catch (e) {
          console.log("Err: ", e)
        }
      }
    }
    catch (e) {
      console.log("Err: ", e)
    }
  }
  return (
    <Button size="small" onClick={sell}>Sell</Button>
  );
}

function KeepButton(props) {
  const keep = async () => {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
    try {
      await contract.cancelSale(props._ticketId);
    } catch (e) {
      console.log("Err: ", e)
    }
  }
  return (
    <Button size="small" onClick={keep}>Keep</Button>
  );
}


function Ticket(props) {
  const [price, setPrice] = useState({
    "price": ""
  })

  const handlePriceChange = (event) => {
    const { name, value } = event.target
    setPrice(prevPrice => ({
      ...prevPrice,
      [name]: value
    }))
  }
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Ticket ID: {props._ticketId}
        </Typography>
        <Typography variant="h5" component="div">
          Price: {props._price} wei
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          onSale: {props._onSale ? "Yes" : "No"}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Event details: XYZ Concert (13/10/23 9:00-18:00)
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Sell Ticket</Button> */}
        {props.action === "buy" ? <BuyButton _ticketId={props._ticketId} /> :
          <>
            <TextField
              size="small"
              id="price"
              label="Price"
              name='price'
              value={price.price}
              onChange={handlePriceChange}
            />
            <SellButton _ticketId={props._ticketId} _price={price.price} />
            <KeepButton _ticketId={props._ticketId} />
          </>}
      </CardActions>
    </Card>
  );
}

export default Ticket;