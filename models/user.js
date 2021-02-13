const { Schema, model } = require('mongoose');
//const { isEmail } = require('validator');
 

const userSchema = new Schema({
    //id: { type: Number },
    admin: {type: Boolean},
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: {type: String, required: true} ,
    googleId: {type: String, required: true },
    like_flights: { type: Array },
    picture: {type: String },
}, { collection: 'Users', strict: false });

//userSchema.pre('save', function(next) {
//    next();
//});

const User = model('User', userSchema);

module.exports = User;