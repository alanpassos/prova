const mongoose  = require('mongoose')

var schema = new mongoose.Schema({
    advertiser_name:{
        type: String,
        required: true,
        unique: true,
    },
    url: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    starts_at: {
        type: String,
        required: true
    },
    ends_at: {
        type: String,
        required: false
    },
    premium:{
        type: Boolean,
        required: false,
        default: false
    },
    disabled:{
        type: Boolean,
        required: true,
        default: true
    }
});

const Offerdb = mongoose.model('offerdb', schema);

module.exports = Offerdb;