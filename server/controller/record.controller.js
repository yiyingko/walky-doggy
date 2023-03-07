const recordModel = require('../models/record');

exports.getEventRecords = (req,res)=>{
    //console.log("Request.body: " + JSON.stringify(req.body));
    recordModel.find({eventId: req.params["eventId"]})
        .exec((err,docs)=>{
                console.log("records from db:" + JSON.stringify(docs));
                const data = JSON.stringify(docs);
                console.log(data,'data')
                res.status(200)
                res.send(data)
        });
};

exports.postRecord = (req,res)=>{
    console.log("From POST:" + JSON.stringify(req.body));
    recordModel.create(req.body).then(newRecord => res.status(201).json(newRecord));
}

exports.deleteRecord = (req,res)=>{
    console.log("From DELETE:" + JSON.stringify(req.params));
    recordModel.deleteOne({_id: req.params["id"]}).then(res.json(req.params))
}