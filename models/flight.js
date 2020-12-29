const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
    id: { type: Number, required: true },
    flight_number: { type: Number, required: true },
    departure_date: { type: String, required: true },
    time: { type: String, required: true },
    departure_city: { type: String, required: true },
    landing_city: { type: String, required: true },
    company_name: { type: String, required: true },
    //TODO: change to number
    price: { type: String, required: true },
    stops: { type: Number, required: true },
    surpriseMe: { type: Boolean, required: true },
    buyer_id: { type: Number },
    new_price: {type: Number}
}, { collection: 'Flights', strict: false });
/* Setters */

/* Validate() */

/* Middleware: pre-save */

const Flight = model('Flight', flightSchema);

module.exports = Flight;
