const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  eventId: { type: String, required: true },
  url: { type: String, required: true },
});

const imageModel = mongoose.model('images', imageSchema);

module.exports = imageModel;
