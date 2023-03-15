const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoWalkSchema = new Schema({
  name: String, 
  date: Date,
  venue: String, 
  records:{
      pee: Boolean,
      poo: Boolean,
    },
  image: String,
  coordinates: [Number]
})

const InfoWalk = mongoose.model("infoWalk", infoWalkSchema);
module.exports = InfoWalk;