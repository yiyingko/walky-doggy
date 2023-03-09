const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const locationSchema = new Schema({
  eventId : String,
  coordinates: [Number]
});

const locationModel = mongoose.model("locations", locationSchema);

module.exports = locationModel;