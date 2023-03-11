const recordModel = require('../models/record');

exports.getEventRecords = (req,res)=>{
    recordModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                res.status(200).json(docs);
        });
};

exports.postRecord = (req,res)=>{
    recordModel.create(req.body).then(newRecord => res.status(201).json(newRecord));
}

exports.deleteRecord = (req,res)=>{
    recordModel.deleteOne({eventId: req.params["id"]}).then(res.json(req.params))
}