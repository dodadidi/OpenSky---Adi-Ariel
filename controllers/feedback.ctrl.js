const feedback = require('../models/feedback');

exports.feedbackDbController = {
    getFeedbacks(req,res){
        const keys = Object.keys(req.query);
        const findFeedbacks = feedback.find({});
        for(let i = 0 ; i < keys.length; i++){
            if(keys[i] == 'company_name') {
                findFeedbacks.find({company_name:req.query.company_name});
            }
            else if(keys[i] == 'published_date'){
                findFeedbacks.find({published_date:req.query.published_date});
            }
            else{res.status(404).send("Error: wrong key");}
        }
        //findFeedbacks.sort({published_date: -1})
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
    addFeedback(req, res) {
        const newFeedback = new feedback({
            "id": req.body.id,
            "user_id": req.body._user_id,
            "company_name": req.body.company_name,
            "published_date": req.body.published_date,
            "feedback": req.body.feedback,
            "rating": req.body.rating
        });
    
        newFeedback.save()
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    
    },
    
    updateOneFeedback(req,res) {
        feedback.updateOne({ id: (req.params.id) }, req.body)
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from DB: ${err}`));
    },
   

  deleteFeedback(req,res){
    //feedback.deleteMany({id:{$in: [1,3,5,7,9]}})
    feedback.deleteOne({id:req.params.id})
    .then(docs => { res.json(docs)})
    .catch(err => console.log(`Error deleting feedback from db: ${err}`));  
  }

}

