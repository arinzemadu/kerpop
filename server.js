const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Sample hero flavour menu (replace with Drupal / DB in production)
const sampleMenu = [
  {
    id: 'KP-01',
    family: 'Hero flavour 01',
    name: 'Black Cocoa Crunch',
    description: 'Deep cocoa-dusted popcorn with a very light sweetness.',
    price: 4.2,
    unitsPerCase: 80,
    weightGrams: 25,
    image: '/assets/hero-flavour-card.png',
    isPopular: true
  },
  {
    id: 'KP-02',
    family: 'Hero flavour 02',
    name: 'Vanilla Cloud',
    description: 'Soft vanilla glaze on extra fluffy kernels.',
    price: 4.0,
    unitsPerCase: 90,
    weightGrams: 24,
    image: '/assets/hero-flavour-card.png',
    isPopular: true
  },
  {
    id: 'KP-03',
    family: 'Hero flavour 03',
    name: 'Berry Glaze',
    description: 'Pale berry notes with a light, crispy crackle.',
    price: 4.1,
    unitsPerCase: 88,
    weightGrams: 24,
    image: '/assets/hero-flavour-card.png',
    isPopular: false
  },
  {
    id: 'KP-04',
    family: 'Hero flavour 04',
    name: 'Golden Caramel',
    description: 'Buttery caramel with a soft toasted edge.',
    price: 4.3,
    unitsPerCase: 84,
    weightGrams: 25,
    image: '/assets/hero-flavour-card.png',
    isPopular: true
  },
  {
    id: 'KP-05',
    family: 'Hero flavour 05',
    name: 'Pink Marshmallow',
    description: 'Light marshmallow notes with a pastel pink tint.',
    price: 4.0,
    unitsPerCase: 92,
    weightGrams: 23,
    image: '/assets/hero-flavour-card.png',
    isPopular: false
  },
  {
    id: 'KP-06',
    family: 'Hero flavour 06',
    name: 'Mint Matcha',
    description: 'Gentle mint and matcha dusting, very pale green.',
    price: 4.2,
    unitsPerCase: 86,
    weightGrams: 23,
    image: '/assets/hero-flavour-card.png',
    isPopular: false
  },
  {
    id: 'KP-07',
    family: 'Hero flavour 07',
    name: 'Plum Violet',
    description: 'Soft plum-inspired glaze with a lilac tone.',
    price: 4.1,
    unitsPerCase: 80,
    weightGrams: 24,
    image: '/assets/hero-flavour-card.png',
    isPopular: false
  },
  {
    id: 'KP-08',
    family: 'Hero flavour 08',
    name: 'Citrus Zest',
    description: 'Bright citrus notes in a soft orange hue.',
    price: 4.0,
    unitsPerCase: 96,
    weightGrams: 22,
    image: '/assets/hero-flavour-card.png',
    isPopular: true
  },
  {
    id: 'KP-09',
    family: 'Hero flavour 09',
    name: 'Sea Salt Sky',
    description: 'Light sea-salt popcorn with a hint of blue branding.',
    price: 3.9,
    unitsPerCase: 100,
    weightGrams: 22,
    image: '/assets/hero-flavour-card.png',
    isPopular: false
  }
];

app.get('/api/menu', (req, res) => {
  res.json({ items: sampleMenu });
});

app.post('/api/order', (req, res) => {
  const order = req.body || {};
  console.log('Received Kerpop order/enquiry:', JSON.stringify(order, null, 2));
  const orderId = 'KP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  res.json({
    success: true,
    orderId,
    message: 'Order/enquiry received (stub). Wire this into your real backend.'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Kerpop server running on http://localhost:${PORT}`);
});
