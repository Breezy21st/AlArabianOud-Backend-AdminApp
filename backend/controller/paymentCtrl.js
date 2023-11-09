// paymentCtrl.js
const axios = require("axios");
const crypto = require("crypto");
const Order = require("../models/orderModel"); // Adjust with the correct path to your order model
require('dotenv').config();
const dns = require('dns');


const buildQueryString = (params) => {
  return Object.keys(params)
    .map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
    })
    .join('&');
};


// PayFast credentials from your environment variables
const PAYFAST_MERCHANT_ID = process.env.PAYFAST_MERCHANT_ID;
const PAYFAST_MERCHANT_KEY = process.env.PAYFAST_MERCHANT_KEY;
const PAYFAST_PASSPHRASE = process.env.PAYFAST_PASSPHRASE;
const PAYFAST_HOST = process.env.NODE_ENV === 'production' ? "www.payfast.co.za" : "sandbox.payfast.co.za";
const NOTIFY = process.env.NOTIFY_URL;
const RETURN = process.env.RETURN_URL;

// PayFast URLs
const PAYFAST_URL = process.env.NODE_ENV === 'production' 
  ? 'https://www.payfast.co.za/eng/process' 
  : 'https://sandbox.payfast.co.za/eng/process';

// Generate signature

const generateSignature = (data) => {
  const passphrase = process.env.PAYFAST_PASSPHRASE; // Use the passphrase from your .env file

  // Create parameter string
  let pfOutput = "";
  for (let key in data) {
    if(data.hasOwnProperty(key)){
      if (data[key] !== "") {
        pfOutput += `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}&`
      }
    }
  }

  // Remove the last ampersand
  let getString = pfOutput.slice(0, -1);
  if (passphrase) {
    getString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
  }

  return crypto.createHash("md5").update(getString).digest("hex");
};



// Express route handler to initiate payment
const initiateOnsitePayment = async (req, res) => {
  const { totalAmount, userState, internalPaymentID } = req.body;

// Check if totalAmount is a number and is not undefined
if (typeof totalAmount !== 'number' || isNaN(totalAmount)) {
  return res.status(400).json({ message: "Total amount is invalid or not provided." });
}

  // Prepare the data for PayFast
  const data = [];
  data["merchant_id"] = PAYFAST_MERCHANT_ID;
  data["merchant_key"] = PAYFAST_MERCHANT_KEY;
  data["return_url"] = RETURN;
  data["cancel_url"] = "http://www.yourdomain.co.za/cancel_url";
  data["notify_url"] = NOTIFY;
// Buyer details
  data["name_first"] = userState.firstname;
  data["name_last"] = userState.lastname;
  data["email_address"] = userState.email;
// Transaction details
  data["m_payment_id"] = internalPaymentID;
  data["amount"] = totalAmount.toFixed(2);
  data["item_name"] = `Order#${internalPaymentID}`;

 


 // Generate the signature
 const myPassphrase = PAYFAST_PASSPHRASE;
 data["signature"] = generateSignature(data, myPassphrase);

//  const signature = generateSignature(data, PAYFAST_PASSPHRASE);
//  data.signature = signature;

 // Construct the redirect URL for PayFast using the custom buildQueryString function
 const queryString = buildQueryString(data);
 const paymentUrl = `${PAYFAST_URL}?${queryString}`;

 // Send the payment URL to the client to redirect to PayFast
 res.json({ paymentUrl });
  
};


// Utility function to perform a DNS lookup and return an array of IPs
async function ipLookup(domain) {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, { all: true }, (err, addresses) => {
      if (err) {
        reject(err);
      } else {
        resolve(addresses.map(addr => addr.address));
      }
    });
  });
}

// Validate that the IP address of the request is from a known PayFast IP
async function isValidPayfastIP(req) {
  const validHosts = [
    'www.payfast.co.za',
    'sandbox.payfast.co.za',
    'w1w.payfast.co.za',
    'w2w.payfast.co.za',
  ];

  const pfIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  let validIps = [];

  for (const host of validHosts) {
    const ips = await ipLookup(host);
    validIps = [...validIps, ...ips];
  }

  return validIps.includes(pfIp);
}

// Express route handler to receive ITN post-back from PayFast
const handleITN = async (req, res) => {
  const pfData = req.body;
  
  // Generate parameter string
  let pfParamString = Object.keys(pfData)
    .filter(key => key !== 'signature')
    .sort()
    .map(key => `${key}=${encodeURIComponent(pfData[key].trim()).replace(/%20/g, "+")}`)
    .join('&');

  // Verify the source IP
  if (!await isValidPayfastIP(req)) {
    return res.status(401).send('Unauthorized IP address');
  }

  // Verify the signature
  const calculatedSignature = generateSignature(pfData, pfParamString, PAYFAST_PASSPHRASE);
  if (pfData.signature !== calculatedSignature) {
    return res.status(400).send('Invalid signature');
  }

  // Optionally confirm the details with PayFast
  const isValid = await pfValidServerConfirmation(PAYFAST_HOST, pfParamString);
  if (!isValid) {
    return res.status(400).send('Invalid server confirmation');
  }

  // Retrieve the order using the m_payment_id
  const order = await Order.findById(pfData.m_payment_id);
  if (!order) {
    return res.status(400).send('Order not found');
  }

  // Verify the payment amount
  const amountGross = parseFloat(pfData.amount_gross);
  if (isNaN(amountGross) || amountGross.toFixed(2) !== order.totalPrice.toFixed(2)) {
    return res.status(400).send('Incorrect payment amount');
  }

  // Update order status to 'Paid'
  order.paymentInfo = {
    payfastOrderId: pfData.pf_payment_id,
    payfastPaymentId: pfData.m_payment_id,
  };
  order.orderStatus = 'Paid';
  await order.save();

  // Respond to PayFast that the ITN was successfully processed
  res.status(200).send('OK');
};


module.exports = {
  initiateOnsitePayment,
  handleITN,
  
};
