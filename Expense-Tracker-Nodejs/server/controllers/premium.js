const User = require('../models/users');
 

 
const getUserLeaderBoard = async (req,res)=>{
    try{
        // const leaderboardofusers = await User.find( {
             
        //     order:[['totalExpenses','DESC']]
        // })
        const leaderboardofusers = await User.find().sort({totalExpenses:-1});
        
        
         
         res.status(200).json(leaderboardofusers)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports={
    getUserLeaderBoard
}