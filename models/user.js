var mongoose = require('mongoose');
//jer je javljalo bag
mongoose.set('useCreateIndex', true);
var Schema   = mongoose.Schema;
//var bcrypt   = require('bcrypt-nodejs');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    email        : {required: true, unique: true, type: String },
    password     : {required: true, type: String },
    firstName    : {required: true, type: String },
    lastName     : {required: true, type: String },
    isAdmin      : {default: false, type: Boolean}
});

userSchema.plugin(mongooseUniqueValidator);

/*
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};


userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
*/


module.exports = mongoose.model('User', userSchema);