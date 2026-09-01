require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// In-memory "dynamic" data (replace with a DB later)
let visitors = 0;

// Routes
app.get('/', (req, res) => {
  visitors++;
  res.render('index', {
    title: 'My Dynamic Site',
    time: new Date().toLocaleString(),
    visitors
  });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});