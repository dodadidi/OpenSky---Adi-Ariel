const flight = require('../models/flight');

exports.flightDbController = {
    getFlights(req,res){
        flight.find({})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    addFlight(req,res){
        const newFlight = new flight({
            //check, validations
            "_id": req.body.id,
            "flight_number": req.body.flight_number,
            "departure_date": req.body.departure_date,
            "departure_city": req.body.departure_city,
            "landing_city":  req.body.landing_city,
            "company_name":  req.body.company_name,
            "price": req.body.price,
            "stops": req.body.stops,
            "surpriseMe": req.body.surpriseMe,
            "buyer_id":  req.body.buyer_id,
            "new_price":  req.body.new_price
        });
        const result = newFlight.save();
        if (result){
            res.json(result)
        } else{
            res.status(404).send("Error saving a flight");
        }
    },
    getFlight(req,res) {
        const id = req.params.id;
        flight.findOne({id: id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateFlight(req,res){
      flight.updateMany({id:req.params.id},{first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,color:req.body.color,job:req.body.job})
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating flight from db: ${err}`));  
    },
  deleteFlight(req,res){
    //flight.deleteMany({id:{$in: [1,3,5,7,9]}})
    flight.deleteOne({id:req.params.id})
    .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error deleting flight from db: ${err}`));  
  },

}

