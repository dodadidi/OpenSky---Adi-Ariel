const user = require('../models/user');

exports.userDbController = {
    getUsers(req,res){
        user.find({})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    addUser(req,res){
        const newUser = new user({
            //check, validations
            "id": req.body.id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "registration_date": req.body.registration_date,
            "like_flights": req.body.like_flights
        });
        const result = newUser.save();
        if (result){
            res.json(result)
        } else{
            res.status(404).send("Error saving a user");
        }
    },
    getUser(req,res) {
        const id = req.params.id;
        user.findOne({id: id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateUser(req,res){
      user.updateMany({id:req.params.id},{first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,color:req.body.color,job:req.body.job})
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating user from db: ${err}`));  
    },
  deleteUser(req,res){
    //user.deleteMany({id:{$in: [1,3,5,7,9]}})
    user.deleteOne({id:req.params.id})
    .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error deleting user from db: ${err}`));  
  },

}

