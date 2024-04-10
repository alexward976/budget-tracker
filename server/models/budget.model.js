const mongoose = require('mongoose');

module.exports = mongoose.model('Budget', {
    name : {type:String},
    date : {type:String},
    income : {type:Number},
    expenses : {type:Number},
    net : {type:Number}
})