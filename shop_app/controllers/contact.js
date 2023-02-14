const path=require('path')

exports.details=(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','contact.html'));
}

exports.success=(req,res)=>{
    res.send('<h1>succesfully submited</h1>')
}