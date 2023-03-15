const imageModel = require('../models/image');

exports.getEventImages = (req, res) => {
  imageModel.find({ eventId: req.params['eventId'] }).exec((err, docs) => {
    res.status(200).json(docs);
  });
};

exports.postImage = (req, res) => {
  console.log('posted a image')
  try {
    imageModel
      .create(req.body)
      .then((newImage) => res.status(201).json(newImage));
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

exports.deleteImage = (req, res) => {
  imageModel.deleteOne({ _id: req.params['id'] }).then(res.json(req.params));
};
