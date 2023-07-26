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

import axios from 'axios';

function BuyButton(props) {
  const buyTicketOnSale = async () => {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(process.env.REACT_APP_CONTRACT_ADDRESS, Ticketing.abi, signer);
    try {
      var response = await contract.buyOnSaleTicket(
        props._ticketId, { value: props._price});
      
      // LOG TRANSFER TICKET
      const body = {
        contract_id: process.env.REACT_APP_CONTRACT_ADDRESS,
        from_wallet_id: await contract.ownerOf(props._ticketId),
        to_wallet_id: JSON.parse(localStorage.getItem("walletData")).accounts[0],
        ticket_id: props._ticketId,
        data: {
          value: props._price,
          gas_fees: parseInt(response.gasPrice._hex)
        }
      }

      axios.post(process.env.REACT_APP_EVENT_CAPTURE_BACKEND_URL+"/transferticket", 
        body,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then((response) => response.data)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alert(err.message);
        });
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
          var response = await contract.sellTicket(props._ticketId, props._price);

          // LOG ON-SALE TICKET
          const body = {
            contract_id: process.env.REACT_APP_CONTRACT_ADDRESS,
            from_wallet_id: JSON.parse(localStorage.getItem("walletData")).accounts[0],
            ticket_id: props._ticketId,
            data: {
              gas_fees: parseInt(response.gasPrice._hex)
            }
          }

          axios.post(process.env.REACT_APP_EVENT_CAPTURE_BACKEND_URL+"/onsaleticket", 
            body,
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                alert(err.message);
            });
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
      var response = await contract.cancelSale(props._ticketId);

      // LOG OFF-SALE TICKET
      const body = {
        contract_id: process.env.REACT_APP_CONTRACT_ADDRESS,
        from_wallet_id: JSON.parse(localStorage.getItem("walletData")).accounts[0],
        ticket_id: props._ticketId,
        data: {
          gas_fees: parseInt(response.gasPrice._hex)
        }
      }

      axios.post(process.env.REACT_APP_EVENT_CAPTURE_BACKEND_URL+"/offsaleticket", 
        body,
        {
            headers: {
                'Content-Type': 'text/plain'
            }
        })
        .then((response) => response.data)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            alert(err.message);
        });
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
          Event details: {process.env.REACT_APP_EVENT_DETAILS}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Sell Ticket</Button> */}
        {props.action === "buy" ? <BuyButton _ticketId={props._ticketId} _price={props._price}/> :
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