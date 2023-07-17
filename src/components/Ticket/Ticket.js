import * as React from 'react';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function BuyButton() {
    return (
        <Button size="small">Buy</Button>
    );
  }

function SellButton() {
    return (
        <Button size="small">Sell</Button>
    );
  }

function KeepButton() {
    return (
        <Button size="small">Keep</Button>
    );
  }


function Ticket(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Ticket ID: dskfnsdk3425kn34jn43k5
        </Typography>
        <Typography variant="h5" component="div">
          Price: 2.02 eth
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          onSale: True
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Event details: XYZ Concert (13/10/23 9:00-18:00)
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Sell Ticket</Button> */}
        {props.action === "buy" ? <BuyButton /> : 
        <>
          <TextField
            size="small"
            id="price"
            label="Price"
            defaultValue=""
          />
          <SellButton />
          <KeepButton />
        </>}
      </CardActions>
    </Card>
  );
}

export default Ticket;