const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const imageSchema = new Schema({
  eventId : String,
  url: String
});

const imageModel = mongoose.model("images", imageSchema);

module.exports = imageModel;


