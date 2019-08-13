//uvodimo module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var bookingSchema = new Schema({
    creditCard             : String,
    roomType               : String,
    checkInDate            : Date,
    checkOutDate           : Date,
    hotel                  : { type: Schema.Types.ObjectId, ref: 'Hotel' },
    user                   : { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Booking', bookingSchema);