const { Router } = require('express');
const Card = require('../models/card');

const router = Router();

// Return all cards
router.get('/', async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);
});

// Create a new card
router.post('/', async (req, res) => {
  const card = new Card(req.body);
  try {
    await card.save();
    res.send(card);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a card
router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  } else {
    await Card.findByIdAndDelete(req.params.id)
    res.sendStatus(200);
  }
});

// Update a card
router.put('/:id', async (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
  } else {
    const card = new Card(req.body);
    await Card.findByIdAndUpdate(req.params.id, card);
    res.sendStatus(200);
  }
});

module.exports = router;