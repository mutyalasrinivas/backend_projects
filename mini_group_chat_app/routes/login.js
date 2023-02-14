const express = require('express');
const fs = require('fs');

const router = express.Router();



 

router.get('/',(req,res)=>{
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data='no chat found'
        }
        res.send(
            `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
              <input type='text'name='message' id='message'>
               <input type='hidden'id='username' name='username' >
               <br/>
               <button type='submit'>Send</button> </form>`)
    })
     
})

router.post('/',(req,res)=>{
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt",`${req.body.username} : ${req.body.message}  `,{flag : 'a'},(err)=>
        err?console.log(err):res.redirect("/")
    )
})

router.get('/login',(req,res,next)=>{
    res.send('<form onSubmit="localStorage.setItem(`username`,document.getElementById(`username`).value)" action="/" method="get"><h1>Login Form</h1><input type="text" id="username" name="username" placeholder="Enter Username"><button type="submit">Submit</button></form>')
})









module.exports=router;