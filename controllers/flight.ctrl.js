const flight = require('../models/flight');

exports.flightDbController = {
    getFlights(req,res){
        const keys = Object.keys(req.query);
        const findFlights = flight.find({});
        for(let i = 0 ; i < keys.length; i++){
            if(keys[i] == 'departure_date') {
                findFlights.find({departure_date:req.query.departure_date});
            }
            else if(keys[i] == 'departure_city') {
                findFlights.find({departure_city:req.query.departure_city});
            }
            else if(keys[i] == 'landing_city') {
                findFlights.find({landing_city:req.query.landing_city});
            }
            else if(keys[i] == 'stops'){
                findFlights.find({stops: {$lte: req.query.stops}});
            }
            
            else{res.status(404).send("Error: wrong key");}
        }
        findFlights.find({})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));  
    },
    addFlight(req,res){
        const newFlight = new flight({
            "flight_number": req.body.flight_number,
            "departure_date": req.body.departure_date,
            "time": req.body.time,
            "departure_city": req.body.departure_city,
            "landing_city":  req.body.landing_city,
            "company_name":  req.body.company_name,
            "price": req.body.price,
            "stops": req.body.stops,
            "surpriseMe": req.body.surpriseMe,
            "buyer_id":  req.body.buyer_id,
            "new_price":  req.body.new_price
        });
        newFlight.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
    getFlight(req,res) {
        const flight_number = req.params.flight_number;
        flight.findOne({flight_number:flight_number})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },

    updateFlight(req,res){
      flight.updateOne({ flight_number: (req.params.flight_number) }, req.body)
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating flight from db: ${err}`));  
    },
   
  deleteFlight(req,res){
    flight.deleteOne({flight_number:req.params.flight_number})
    .then(docs => { res.json(docs)})
    .catch(err => console.log(`Error deleting flight from db: ${err}`));  
  },

}

