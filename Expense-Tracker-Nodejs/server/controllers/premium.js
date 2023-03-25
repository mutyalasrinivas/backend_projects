const User = require('../models/users');
const Expense = require('../models/expense')
const sequelize = require('../utils/database')

// const getUserLeaderBoard = async (req, res) => {
//     try {
//         const [users, expenses] = await Promise.all([User.findAll({attributes:['userId','name']}), Expense.findAll({attributes:['userId','money']})]);

//         const userAggregatedExpenses = expenses.reduce((acc, expense) => {
//             acc[expense.userId] = (acc[expense.userId] || 0) + expense.money;
//             return acc;
//         }, {});

//         const userLeaderBoardDetails = users.map(user => ({
//             name: user.name,
//             total_cost: userAggregatedExpenses[user.id] || 0,
//         }));

//         userLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);
//         console.log(userLeaderBoardDetails);

//         res.status(200).json(userLeaderBoardDetails);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }

// module.exports = {
//     getUserLeaderBoard
// }



 
const getUserLeaderBoard = async (req,res)=>{
    try{
        const leaderboardofusers = await User.findAll( {
             
            order:[['totalExpenses','DESC']]
        })
        
        
         
         res.status(200).json(leaderboardofusers)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports={
    getUserLeaderBoard
}