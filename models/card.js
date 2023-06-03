const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  description: String,
  listId: mongoose.Types.ObjectId,
  position: Number,
  color: String
});

cardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Card', cardSchema);