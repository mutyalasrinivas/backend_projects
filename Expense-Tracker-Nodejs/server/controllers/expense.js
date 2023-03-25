const { NUMBER } = require('sequelize');
const Expense = require('../models/expense');
const User = require('../models/users');
const sequelize = require('../utils/database');

exports.addExpense = async(req, res, next) => {
    let t;
    try {
        console.log(req.body);
        t = await sequelize.transaction();
        const { money, description, category } = req.body;

        const expense = await Expense.create({
            money,
            description,
            category,
            userId: req.user.id
        }, { transaction: t });
        const totalExpense = Number(req.user.totalExpenses) + Number(money);
        console.log(totalExpense);
        await User.update({
            totalExpenses: totalExpense
        }, {
            where: { id: req.user.id },
            transaction: t
        });
        await t.commit();
        res.status(200).json({ expense: expense });
    } catch (err) {
        if (t) await t.rollback();
        console.log("expense controller err------>" + err);
        res.status(500).send("Failed to add expense to db");
    }
};

exports.getList = async(req, res, next) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ allexpenses: expenses, success: true });
    } catch (err) {
        console.log("getlist controller error---->" + err);
        res.status(500).send("Failed to get expenses from db");
    }
};
// exports.deleteEle = async(req, res, next) => {
//     try {
//         console.log(req.body);
//         console.log(req.params.id);
//         const id = req.params.id;

//         const expense = await Expense.destroy({ where: { id: id } });
//         console.log("deleted item" + expense);
//         res.status(202).json("successfully deleted");
//     } catch (err) {
//         console.log("deleteEle controller error---->" + err);
//         res.status(500).send("Failed to delete expense from db");
//     }
// };
exports.deleteEle = async(req,res,next)=>{
    const id = req.params.id;
    let t;
    console.log("req.user--->",req.user)
    try {
         t = await sequelize.transaction();
         console.log("req.user--->",req.user)

        // Get the expense to be deleted
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).send('Expense not found');
        }

        // Update the user's totalExpenses value (if user is authenticated)
         
            const totalExpense = Number(req.user.totalExpenses) - Number(expense.money);
            await User.update({
                totalExpenses: totalExpense
            }, {
                where: {id: req.user.id},
                transaction: t
            });
        
         

        // Delete the expense
        await Expense.destroy({
            where: {id: id},
            transaction: t
        });

        // Commit the transaction and return success response
        await t.commit();
        return res.status(202).json("Successfully deleted expense");
    } catch (err) {
        await t.rollback();
        console.log("deleteEle controller error---->"+err);
        return res.status(500).send("Failed to delete expense from db");
    }
}

