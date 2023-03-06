const imageModel = require('../models/image');

exports.getEventImages = (req,res)=>{
    //console.log("Request.body: " + JSON.stringify(req.params));
    imageModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                //console.log("Images from db:" + JSON.stringify(docs));
                res.status(200).json(docs);
        });
};

exports.postImage = (req,res)=>{
    //console.log("From POST:" + JSON.stringify(req.body));
    imageModel.create(req.body).then(newImage => res.status(201).json(newImage));
}

exports.deleteImage = (req,res)=>{
    //console.log("From DELETE:" + JSON.stringify(req.params));
    imageModel.deleteOne({_id: req.params["id"]}).then(res.json(req.params))
}