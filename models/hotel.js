//uvodimo module
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var hotelSchema = new Schema({
    name         : String,
    price        : Number,
    category     : String,
    roomCount    : Number
});

hotelSchema.methods.cancelHotel = function(callback) {
    this.roomCount += 1;
    this.save(callback);
};

hotelSchema.methods.bookHotel = function(callback) {
    this.roomCount -= 1;
    this.save(callback);
};

module.exports = mongoose.model('Hotel', hotelSchema);