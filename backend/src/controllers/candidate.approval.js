//requirement import
const { redisPublisher } = require("../config/redis.clients");
const Candidate = require("../models/candidate");
const { sendMsg } = require("../services/email-service");
const s3command = require("../utils/s3");


const candidate_approval = async (req, res) => {
    console.log("accept fetch reached backend");
   
    //first check if id exists 
     const { candidate_id } = req.body;

  // ✅ correct query + await
     const get_candidate = await Candidate.findOne({ _id: candidate_id });

    if (!get_candidate){
        return res.json({
            message:"candidate not found"
        })
    }
    if (get_candidate.status == "approved") {
        return
        res.json({
            message: "candidate already approved"
        })//based on this display pop up in frontend
    }
    //update status
    await Candidate.updateOne(
        { _id: candidate_id },
        { $set: { status: "approved" } }
    );
    const message = "your application accepted";

    const candidate_gmail = get_candidate.email;
    sendMsg(candidate_gmail,message);
    
    //take complete detail of the candidate from db to publish
    const candidate_data = await Candidate.findById(candidate_id);


    //publish event
    redisPublisher.publish("approved_candidate_chanel", JSON.stringify(candidate_data));
    res.status(100).json({
        message: "status updated"
})//based on this update the frontend 

}
const candidate_reject = async (req, res) => {
    const candidate_id = req.candidate_id;
    const get_candidate = Candidate.findOne("candidate_id");
    const candidate_gmail = get_candidate.email;
    const message = "your application rejected";
    sendMsg(candidate_gmail, message);
    redisPublisher.publish("rejected_candidate_chanel", JSON.stringify(candidate_id));//frontend delete that candidate from page
    const image_key = get_candidate.key;

    await s3command.deleteFromS3(image_key);
    await Candidate.findByIdAndDelete(candidate_id);
    res.status(200).json({message:"ok"})

}
module.exports = {
   candidate_approval,candidate_reject
}