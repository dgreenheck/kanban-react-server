const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan')

const listsRouter = require('./routes/lists');
const cardsRouter = require('./routes/cards');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message)
  })

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/cards', cardsRouter);
app.use('/lists', listsRouter);
app.use('/test', (request, response) => {
  response.send('Hello there!');
});

const server = app.listen(process.env.PORT, () => {
  const address = server.address();
  console.log(`Listening on ${address.port}`);
})