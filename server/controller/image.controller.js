const imageModel = require('../models/image');

exports.getEventImages = (req,res)=>{
    imageModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                res.status(200).json(docs);
        });
};

exports.postImage = (req,res)=>{
    imageModel.create(req.body).then(newImage => res.status(201).json(newImage));
}

exports.deleteImage = (req,res)=>{
    imageModel.deleteOne({_id: req.params["id"]}).then(res.json(req.params))
}