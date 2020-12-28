const { Router } = require ('express' );
const {flightDbController} = require ('../controllers/flight.ctrl');

const flightRouter = new Router();

flightRouter.get('/', flightDbController.getFlights);
flightRouter.get('/:id', flightDbController.getFlight);
flightRouter.post('/', flightDbController.addFlight);
flightRouter.put('/:id', flightDbController.updateFlight);
flightRouter.delete('/:id', flightDbController.deleteFlight);

module.exports = {flightRouter};
