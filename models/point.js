const mongoose = require('mongoose');
const voting = require('./voting');

const PointSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, required: true },
    // Id or null if no parent
    parent: mongoose.Schema.Types.ObjectId,
    // Agree, disagree, or null if no parent
    relationToParent: String,
    underlyingSupport: {type: Number},
    agreeChildren: [{}],
    disagreeChildren: [{}],
    date: { type: Date, default: Date.now }
})

PointSchema.plugin(voting)

const Point = mongoose.model("Point", PointSchema);

module.exports = Point;