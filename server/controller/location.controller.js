const locationModel = require('../models/location');

exports.getEventLocations = (req,res)=>{
    locationModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                res.status(200).json(docs);
        });
};

exports.postLocation = (req,res)=>{
    locationModel.create(req.body).then(newlocation => res.status(201).json(newlocation));
}

