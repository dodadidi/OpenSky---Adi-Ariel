const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: { type: Number, required: true },
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: { type: String, required: true},
    registration_date: { type: String, required: true},
    like_flights: { type: Array }
}, { collection: 'Users', strict: false });
/* Setters */

/* Validate() */

/* Middleware: pre-save */

const User = model('User', userSchema);

module.exports = User;
