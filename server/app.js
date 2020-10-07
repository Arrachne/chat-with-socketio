const express = require('express');
const path = require("path");
const cors = require('cors');
const router = require('./router');

const app = express();

// folder with react app
app.use(express.static(path.join(__dirname, "client", "build")));

app.use(cors());
app.use(router);

// in case of unevident requests server will answer with main page
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", 'build', 'index.html'));
});

module.exports = app;
