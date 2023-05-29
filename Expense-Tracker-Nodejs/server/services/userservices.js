const Expense = require('../models/expense')

const getExpenses = async (req) => {
  const expenses = await Expense.find({ userId: req.user.id });
  return expenses;
};

const countExpenses = async (user, where) => {
  const count = await Expense.countDocuments(where);
  return count;
};

module.exports = {
  getExpenses,
  countExpenses
};




// const getExpenses = (req)=>{
//        return req.user.getExpenses();
// }
// const countExpenses =(user,where)=>{
//     return user.countExpenses(where);
// }


// module.exports={
//     getExpenses,
//     countExpenses
// }