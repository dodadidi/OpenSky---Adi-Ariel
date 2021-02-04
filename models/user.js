const { Schema, model } = require('mongoose');
//const { isEmail } = require('validator');
 

const userSchema = new Schema({
    id: { type: Number },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { 
        type: String 
        //required: [true, 'please enter an email'],
        //unique: true,
        //lowercase: true,
        //validate: [isEmail, 'Please enter a valid email']
    },
    username: {type: String, required: true} ,
    googleId: {type: String, required: true },
   // password: {
//    type: String,
   //     required: [true, 'please enter an password'],
    //    minlength: [6, 'minimum password length is 6 characters']
    //},
    registration_date: { type: String },
    like_flights: { type: Array }
}, { collection: 'Users', strict: false });

//userSchema.pre('save', function(next) {
//    next();
//});

const User = model('User', userSchema);

module.exports = User;