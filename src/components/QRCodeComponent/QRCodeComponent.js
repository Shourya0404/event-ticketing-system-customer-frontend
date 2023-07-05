import React from 'react';
import QRCode from 'react-qr-code';

function QRCodeComponent(props) {
  return (
    <QRCode
        title="QRCode"
        value={props.value}
        bgColor="black"
        fgColor="white"
        size={props.size === '' ? 50 : props.size}
    />
  )
}

export default QRCodeComponent;