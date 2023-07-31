# event-ticketing-system-customer-frontend
## Event Ticketing System Customer Frontend

## Setup
1. Follow the setups for these:
   - Smart Contract: Deploy a local blockchain and deploy smart contract on this local node: 
   - Verification Backend: https://github.com/bratinghosh/event-ticketing-system-verification-backend/tree/main
   - Event Capture Backend: https://github.com/bratinghosh/event-ticketing-system-event-capture-backend
Make sure the backends are running and the smart contract is deployed in the local node before starting the frontend
    
2. Download the npm packages:
```
npm install
```
3. Create `.env` file and the following:
```
PORT=3000
REACT_APP_CONTRACT_ADDRESS: Obtained when smart contract is deployed on local blockchain
REACT_APP_EVENT_DETAILS = "Event Name (DD/MM/YY START_TIME-END_TIME)"
REACT_APP_VERIFICATION_BACKEND_URL = <URL>
REACT_APP_EVENT_CAPTURE_BACKEND_URL = <URL>
```
## Start Server in Local Machine
`npm start`

## Packages
* @metamask/detect-provider
* @metamask/sdk
* axios
* crypto-js
* ethers
* react-qr-code

