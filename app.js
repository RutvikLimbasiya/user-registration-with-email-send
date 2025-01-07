require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { registerUser } = require('./registerController');

const app = express();

app.use(bodyParser.json());

app.post('/register', registerUser);

app.listen(3000, () => {
  console.log('Server running on port: 3000');
});
