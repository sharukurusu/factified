const db = require("../models");
require('dotenv').config();

const PointsController = {
// Defining methods for the booksController

    findAll: function(req, res) {
        db.Point
        .find({ parent : { $exists: false } })
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    myPoints: function(req, res) {
        // console.log(req.body.user)

        db.Point
        .find({author: req.body.user})
        .then(function(searchReturned) {
            // console.log(searchReturned)
            res.json(searchReturned)})
        .catch(err => res.status(422).json(err))
    },
    search: function(req, res) {
        db.Point
        .find({_id: req.body.user})
        .then(function(searchReturned) {
            // console.log(searchReturned.data)
            res.json(searchReturned.data)})
        .catch(err => res.status(422).json(err))
    },
    findById: function(req, res) {
        db.Point
        .findById(req.params.id)
        .then(dbModel => {
            res.json(dbModel)
            })
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Point
        .create(req.body)
        .then(function(dbModel) {
            // Automatically vote in favor
            dbModel.upvote(req.body.author)
            // dbModel.upvoteRel(req.body.author)
            dbModel.save()
            res.json(dbModel)
        })
        .catch(err => res.status(422).json(err));
    },
    createSubPoint: function(req, res) {
    // Create the sub point
    db.Point
        .create(req.body)
        .then(function(dbModel) {
            // Automatically vote in favor
            dbModel.upvote(req.body.author)
            dbModel.upvoteRel(req.body.author)
            dbModel.save()

            // update parent and return new parent
            if (dbModel.relationToParent === "agree") {
                db.Point
                .findOneAndUpdate( { _id: dbModel.parent}, 
                    {$push: {agreeChildren: dbModel}}, 
                    {new: true} )
                .then(moddedParent => res.json(moddedParent))
            } else {
                db.Point
                .findOneAndUpdate( { _id: dbModel.parent}, 
                    {$push: {disagreeChildren: dbModel}}, 
                    {new: true} )
                .then(moddedParent => res.json(moddedParent))
            }
            
        })
        .catch(err => res.status(422).json(err));
    },
    vote: function(req, res) {
        console.log("vote req.body.voteType", req.body.voteType)
        db.Point
        .findById({ _id: req.params.id })
        .then((dbModel) => {
            if (req.body.voteType === 'upvote') {
                dbModel.upvote(req.body.user)
            } else if (req.body.voteType === 'downvote') {
                dbModel.downvote(req.body.user)
            } else if (req.body.voteType === 'relevant') {
                dbModel.upvoteRel(req.body.user)
            } else if (req.body.voteType === 'irrelevant') {
                dbModel.downRel(req.body.user)
            }
            dbModel.save()
            PointsController.sendVotesToParents(dbModel, res, req.body.main, true)

        })
        .catch(err => res.status(422).json(err));
    },
    sendVotesToParents: function(dbModel, res, isMainPoint, isFirstPass){
        // If they voted on a subpoint that was the displayed main point, they need to get back that subpoint, if it wasn't (IE it was displayed underneath) they get back the parent. Either way the database needs to continue passing the votes upwards, without returning more
        console.log("dbModel entering sendVotesToParents", dbModel)

        if (isFirstPass && isMainPoint) {
            console.log("~~~isFirstPass and isMainPoint~~~")
            res.json(dbModel)
            PointsController.sendVotesToParents(dbModel)
        } 
        if (dbModel.parent) {
            console.log("~~~dbModel.parent true~~~")
            if (dbModel.relationToParent === "agree") {
                db.Point
                .findOneAndUpdate( 
                    { _id: dbModel.parent, "agreeChildren._id": dbModel._id}, 
                    {$set: {"agreeChildren.$" : dbModel}}, 
                    {new: true})
                .then(moddedParent => {
                    if (isFirstPass && !isMainPoint) {
                        console.log("~~~isFirstPass and !isMainPoint~~~")
                        res.json(moddedParent)
                    }
                    PointsController.sendVotesToParents(moddedParent)
                    })
            } else {
                db.Point
                .findOneAndUpdate( 
                    { _id: dbModel.parent, "disagreeChildren._id": dbModel._id}, 
                    {$set: {"disagreeChildren.$" : dbModel}}, 
                    {new: true})                
                    .then(moddedParent => {
                        if (isFirstPass && !isMainPoint) {
                            console.log("~~~isFirstPass and !isMainPoint~~~")
                            res.json(moddedParent)
                        }
                        PointsController.sendVotesToParents(moddedParent)
                        })            
            }
        }


    },
    update: function(req, res) {
        db.Point
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.Point
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};

module.exports = PointsController