const recordModel = require('../models/record');

exports.getEventRecords = (req,res)=>{
    recordModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                console.log("records from db:" + JSON.stringify(docs));
                res.status(200).json(docs);
        });
};

exports.postRecord = (req,res)=>{
    console.log("From POST:" + JSON.stringify(req.body));
    recordModel.create(req.body).then(newRecord => res.status(201).json(newRecord));
}

exports.deleteRecord = (req,res)=>{
    console.log("From DELETE:" + JSON.stringify(req.params));
    recordModel.deleteOne({eventId: req.params["id"]}).then(res.json(req.params))
}