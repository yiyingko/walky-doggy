const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const recordSchema = new Schema({
  eventId : {
    type: String,
    unique: true
  },
  pee: Boolean,
  poo: Boolean
});

const recordModel = mongoose.model("records", recordSchema);

module.exports = recordModel;


