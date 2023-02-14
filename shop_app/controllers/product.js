const path=require('path');

exports.pageNot=((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'..','views','page_not.html'));
})