const { Router } = require('express');
const List = require('../models/list');

const router = Router();

// Return all lists
router.get('/', async (req, res) => {
  const lists = await List.find({});
  res.send(lists);
});

// Create a new list
router.post('/', async (req, res) => {
  const list = new List(req.body);
  try {
    await list.save();
    res.send(list);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a list
router.delete('/:id', async (req, res) => {
  if (req.params.id) {
    res.sendStatus(400);
  } else {
    await List.findByIdAndDelete(req.params.id)
    res.sendStatus(200);
  }
});

module.exports = router;