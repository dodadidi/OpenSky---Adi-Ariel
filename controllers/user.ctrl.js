const { docs } = require('googleapis/build/src/apis/docs');
const user = require('../models/user');

exports.userDbController = {
    getUsers(req, res) {
        user.find({})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    async addUser(req, res) {
        const temp = await user.findOne({}).sort({ id: -1 }).limit(1);
        let id = temp.id;
        const newUser = new user({
            "id": id + 1,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "registration_date": req.body.registration_date,
            "like_flights": req.body.like_flights
        });
        newUser.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting user from db: ${err}`));

    },
    getUser(req, res) {
        const id = req.params.id;
        user.findOne({ id: id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateUser(req, res) {
        user.updateOne({ id: (req.params.id) }, req.body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error updating user from db: ${err}`));
    },
    deleteUser(req, res) {
        user.findOneAndDelete({ id: parseInt(req.params.id) })
            .then(docs => { res.json(docs) }, console.log(`User deleted`))
            .catch(err => console.log(`Error deleting user from db: ${err}`));
    },
}