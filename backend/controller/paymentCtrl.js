// paymentCtrl.js

const axios = require('axios');
const Order = require('../models/orderModel'); // Import your order model here

const merchantId = 'YOUR_MERCHANT_ID'; // Replace with your PayFast merchant ID
const merchantKey = 'YOUR_MERCHANT_KEY'; // Replace with your PayFast merchant key

const checkout = async (req, res) => {
  try {
    const paymentData = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      amount: req.body.amount,
      item_name: 'Your Product',
      return_url: 'https://yourwebsite.com/payment/success',
      cancel_url: 'https://yourwebsite.com/payment/cancel',
      notify_url: 'https://yourwebsite.com/payment/notify',
      email_address: req.body.email,
    };

    const response = await axios.post('https://api.payfast.co.za/eng/process', paymentData);
    
    // Redirect the user to PayFast for payment
    res.redirect(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment request failed' });
  }
};

const paymentVerification = async (req, res) => {
  try {
    // Extract the PayFast response data from the request
    const {
      m_payment_id, // PayFast payment ID
      pf_payment_id, // PayFast payment ID
      payment_status, // Payment status
      item_name, // Product name
      amount, // Payment amount
    } = req.body;

    // Validate the payment data using PayFast's security checks
    // You can implement your own validation logic here

    // Update the order status in your database
    const order = await Order.findOneAndUpdate(
      { 
        paymentInfo: { payfastPaymentId: pf_payment_id },
      },
      { $set: { orderStatus: payment_status } },
      { new: true }
    );

    if (!order) {
      return res.status(400).json({ error: 'Order not found' });
    }

    // Respond to PayFast with a success message
    return res.send('VALID');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

module.exports = {
  checkout,
  paymentVerification,
};
