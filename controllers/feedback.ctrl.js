const feedback = require('../models/feedback');

exports.feedbackDbController = {
    getFeedbacks(req,res){
        const keys = Object.keys(req.query);
        const findFeedbacks = feedback.find({});
        for(let i = 0 ; i < keys.length; i++){
            if(keys[i] == 'company_name') {
                findFeedbacks.find({company_name:req.query.company_name});
            }
            else{res.status(404).send("Error: wrong key");}
        }
        findFeedbacks.find({})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    getFeedback(req,res) {
        const id = req.params.id;
        feedback.findOne({id: id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },

    addFeedback(req,res){
        const newFeedback = new feedback({
            //check, validations
            "id": req.body.id,
            "user_id": req.body.user_id,
            "published_date": req.body.published_date,
            "feedback": req.body.feedback,
            "rating":  req.body.rating,
        });
        const result = newFeedback.save();
        if (result){
            res.json(result)
        } else{
            res.status(404).send("Error saving a feedback");
        }
    },
    updateOneFeedback(req,res){
        user.updateOne({id:req.params.id},{feedback:req.body.feedback, rating:req.body.rating})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error updating user from db: ${err}`));  
      },
    // updateOneFeedback(req, res) {
    //     try {
    //         const id = req.params.id;
    //         feedback.findOne({id: id})

    //         if (req.body._user_id) obj._user_id = req.body._user_id;
    //         if (req.body.company_name) obj.company_name = req.body.company_name;
    //         if (req.body.published_date) obj.published_date = req.body.published_date;
    //         if (req.body.feedback) obj.feedback = req.body.feedback;
    //         if (req.body.rating) obj.rating = req.body.rating;

    //         let data = feedback.updateOne({ id: req.params.id }, obj, err => {
    //             if (err) throw err;
    //         });
    //         res.status(200).send("updated");
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send("Error occured");
    //     }
    // }, 
    
  deleteFeedback(req,res){
    //feedback.deleteMany({id:{$in: [1,3,5,7,9]}})
    feedback.deleteOne({id:req.params.id})
    .then(docs => { res.json(docs)})
    .catch(err => console.log(`Error deleting feedback from db: ${err}`));  
  }

}

