const { NUMBER } = require('sequelize');
const Expense = require('../models/expense');
const User = require('../models/users');
const sequelize = require('../utils/database');
const S3Service = require('../services/S3service');
 
const UserServices = require('../services/userservices');
const DownloadedFile = require('../models/downloadedfile');
 

exports.downloadexpense = async(req,res)=>{
    try{
        const expenses =await UserServices.getExpenses(req);
        console.log(expenses)
        const stringifiedExpenses = JSON.stringify(expenses);
    
        // based on userId
        const userId = req.user.id;
        const fileName =`Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3Service.uploadToS3(stringifiedExpenses, fileName);
        console.log(fileURL);

          // record the downloaded file
          const downloadedFile = await DownloadedFile.create({
            fileName,
            downloadDate: new Date(),
            userId: req.user.id
        });
        res.status(200).json({fileURL, success:true })
    }
    catch(err){
        console.log(err);
        res.status(500).json({fileURL:'',success:false,err:err})
        
    }
}






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

//1 

exports.getList = async(req, res, next) => {
    try {
        const expenses = await Expense.findAll({ where: { userId: req.user.id } });
        res.status(200).json({ allexpenses: expenses, success: true });
    } catch (err) {
        console.log("getlist controller error---->" + err);
        res.status(500).send("Failed to get expenses from db");
    }
};
 
exports.deleteEle = async(req, res, next) => {
    const id = req.params.id;
    let t;

    try {
        t = await sequelize.transaction();

        // Get the expense to be deleted
        const expense = await Expense.findByPk(id);

        if (!expense) {
            return res.status(404).send('Expense not found');
        }

        // Update the user's totalExpenses value (if user is authenticated)
        if (req.user && req.user.totalExpenses) {
            const totalExpense = Number(req.user.totalExpenses) - Number(expense.money);
            await User.update({
                totalExpenses: totalExpense
            }, {
                where: {id: req.user.id},
                transaction: t
            });
        }

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
        console.log("deleteEle controller error---->" + err);
        return res.status(500).send("Failed to delete expense from db");
    }
}
