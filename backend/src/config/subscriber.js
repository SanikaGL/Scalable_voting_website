const {redisSubscriber} = require("./redis.clients");
module.exports = (io)=>{
    redisSubscriber.subscribe("pending-candidate-chanel",(message)=>{//for admin page
        console.log("pending_candidate_chanel");
        io.emit("pending-candidate-event",JSON.parse(message));
    })
    redisSubscriber.subscribe("approved_candidate_chanel",(message)=>{//for voter page
        io.emit("approved_candidate_event",JSON.parse(message));
    })
    redisSubscriber.subscribe("reject_candidate_chanel",(message)=>{//for admin page
        io.emit("reject_candidate_event",JSON.parse(message));
    }
    )
}
