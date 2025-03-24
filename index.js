const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const app = express();
app.use(cors({ origin: '*', methods: 'POST' }));
app.use(express.json()); // <— this line ensures your backend accepts JSON!

const stripe = new Stripe('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');

app.post('/create-customer', async (req, res) => {
  const { token } = req.body;

  try {
    const customer = await stripe.customers.create({ source: token });
    res.json({ customerId: customer.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
