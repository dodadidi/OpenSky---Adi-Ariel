const flight = require('../models/flight');

exports.flightDbController = {
    getFlights(req,res){
        const keys = Object.keys(req.query);
        const findFlights = flight.find({});
        for(let i = 0 ; i < keys.length; i++){
            // if(keys[i] == 'departure_date') {
            //     findFlights.find({departure_date:{$gte: req.query.departure_date}});
            // }
            if(keys[i] == 'departure_city') {
                findFlights.find({departure_city:req.query.departure_city});
            }
            else if(keys[i] == 'landing_city') {
                findFlights.find({landing_city:req.query.landing_city});
            }
            else if(keys[i] == 'stops'){
                //TODO: cast to int and increase in 1
                findFlights.find({stops: {$lt: req.query.stops}});
            }
            else{res.status(404).send("Error: wrong key");}
        }
        findFlights
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));  
    },
    addFlight(req,res){
        const newFlight = new flight({
            //check, validations
            "id": req.body.id,
            "flight_number": req.body.flight_number,
            "departure_date": req.body.departure_date,
            // "departure_time": req.body.departure_time,
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
        const flight_number = req.params.flight_number;
        flight.findOne({flight_number:flight_number})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateFlight(req,res){
      flight.updateMany({id:req.params.id},{first_name:req.body.first_name,last_name:req.body.last_name,departure_city:req.body.departure_city,stops:req.body.stops,color:req.body.color,landing_city:req.body.landing_city})
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating flight from db: ${err}`));  
    },
  deleteFlight(req,res){
    //flight.deleteMany({id:{$in: [1,3,5,7,9]}})
    flight.deleteOne({id:req.params.flight_number})
    .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error deleting flight from db: ${err}`));  
  },

}

