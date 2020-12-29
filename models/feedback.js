const { Schema, model } = require('mongoose');
//https://vegibit.com/mongoose-validation-examples/
const feedbackSchema = new Schema({
    id: { type: Number, required: true },
    user_id: {type: Number, required: true},
    published_date: { type: String, required: true },
    company_name:{type:String, required:true},
    //published_date: { type: Date, default: Date.now, required: true },
    feedback: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 } //TODO: check validation
}, { collection: 'Feedbacks', strict: false });
/* Setters */

/* Validate() */
//https://medium.com/javascript-in-plain-english/store-clean-data-by-validating-models-with-mongoose-f6453dbdbff9
/* Middleware: pre-save */

const Feedback = model('Feedback', feedbackSchema);

module.exports = Feedback;
