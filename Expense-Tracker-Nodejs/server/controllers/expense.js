const Expense = require('../models/expense');
const User = require('../models/users');
 const S3Service = require('../services/S3service');
 const mongoose=require('mongoose');
 
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
     
    try {
        console.log(req.body);
       const session = await mongoose.startSession();
        session.startTransaction();
        const { money, description, category } = req.body;
        console.log(req.body)

        const expense = await Expense.create([{
            money,
            description,
            category,
            userId: req.user.id
        }], { session });
        const totalExpense = Number(req.user.totalExpenses) + Number(money);
        console.log(totalExpense);
        await User.updateOne(
            {_id:req.user.id},
            {totalExpenses: totalExpense},
            {session }
        );
        await session.commitTransaction();
        session.endSession();
        res.status(200).json({ expense});
    } catch (err) {
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        console.log("expense controller err------>" + err);
        res.status(500).send("Failed to add expense to db");
    }
};

 
    exports.getExpenses = async (req, res) => {
        try {
             
            const { page, rows } = req.query;
             const limit = parseInt(rows);
             const skip=(parseInt(page)-1)*limit;
            const expenseCount = await Expense.countDocuments({userId:req.user.id});
            const expenses = await Expense.find({ userId:req.user.id})
            .skip(skip)
            .limit(limit);
            res.status(200).json({ expenses, totalCount: expenseCount });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong!', error: error });
            console.log(error);
        }
    };
     
 
exports.deleteEle = async(req, res, next) => {
    const id = req.params.id;
    
     let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        // Get the expense to be deleted
        const expense = await Expense.findById(id).session(session);

        if (!expense) {
             await session.abortTransaction();
             session.endSession();
            return res.status(404).send('Expense not found');
        }

        // Update the user's totalExpenses value (if user is authenticated)
        if (req.user && req.user.totalExpenses) {
            const totalExpense = Number(req.user.totalExpenses) - Number(expense.money);
            await User.findByIdAndUpdate(req.user.id,
            {totalExpenses: totalExpense},
            {session}
            );
        }

        // Delete the expense
        await Expense.findByIdAndDelete(id,{session});

        // Commit the transaction and return success response
        await session.commitTransaction();
        session.endSession();
        return res.status(202).json("Successfully deleted expense");
    } catch (err) {
          session.abortTransaction();
        console.log("deleteEle controller error---->" + err);
        return res.status(500).send("Failed to delete expense from db");
    }
}
