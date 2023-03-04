const eventModel = require('../models/event');


exports.getEvents = (req,res)=>{
    //console.log("Request.body: " + JSON.stringify(req.body));
    eventModel.find({date:{ $gte: new Date().toISOString()}})
        .sort({date: 1})
        .exec((err,docs)=>{
                //console.log("From db:" + JSON.stringify(docs));
                res.status(200).json(docs);
        });
};


exports.getPastEvents = (req,res)=>{
    //console.log("Request.body: " + JSON.stringify(req.body));
    eventModel.find({date:{ $lte: new Date().toISOString()}})
        .sort({date: 1})
        .exec((err,docs)=>{
                //console.log("From db:" + JSON.stringify(docs));
                res.status(200).json(docs);
        });
};


exports.postEvent = (req,res)=>{
    //console.log("From POST:" + JSON.stringify(req.body));
    eventModel.create(req.body).then(newEvent => res.status(201).json(newEvent));
}

exports.deleteEvent = (req,res)=>{
    console.log("From DELETE:" + JSON.stringify(req.params));
    eventModel.deleteOne({_id: req.params["id"]}).then(res.json(req.params))
}