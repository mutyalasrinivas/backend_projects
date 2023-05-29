const Sib=require('sib-api-v3-sdk')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const  User  =require('../models/users');
const Forgotpassword = require('../models/forgotpassword');
const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config()

 
const { SendSmtpEmail, EmailTo } = SibApiV3Sdk;

const forgotpassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const id = uuid.v4();
    console.log('uuid', id);

    const newForgotPassword = new ForgotPassword({
      id,
      userId: user._id,
      active: true
    });

    const sender = {
      email: 'srinivasmutyala54@gmail.com',
      name: 'srinivas'
    };

    const receivers = [
      {
        email: email,
      },
    ];

    const emailParams = {
      sender,
      to: receivers,
      subject: 'Reset Password',
      textContent: 'Follow the link and reset password',
      htmlContent: `<p>Click on the link below to reset password:</p><a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,
    };

    const apiInstance = new SendSmtpEmail();
    apiInstance.sendTransacEmail(emailParams)
      .then(() => {
        newForgotPassword.save();
        res.status(202).json({ success: true, message: 'Password reset email sent successfully' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
      });
  }
};

const resetpassword = async (req, res) => {
  const id = req.params._id;

  try {
    const forgotPasswordRequest = await ForgotPassword.findOne({ id });

    if (forgotPasswordRequest) {
      forgotPasswordRequest.active = false;
      await forgotPasswordRequest.save();

      res.status(200).send(`
        <html>
          <form action="/password/updatepassword/${id}" method="get">
            <div style="text-align: center;">
              <h2 style="color: deepskyblue">Expense Tracker App</h2>
              <label for="newpassword" style="color: deepskyblue">Enter New password</label>
              <input name="newpassword" type="password" required style="color: deepskyblue; margin: 20px; padding: 10px; background-color: whitesmoke" ></input></br>
              <button style="color: deepskyblue">Reset password</button>
            </div>
          </form>
        </html>
      `);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

const updatepassword = (req, res) => {

try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findOne({ id: resetpasswordid }).then(resetpasswordrequest => {
        User.findOne({ id : resetpasswordrequest.userId}).then(user => {
            // console.log('userDetails', user)
            if(user) {
                //encrypt the password

                const saltRounds = 10;
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    if(err){
                        console.log(err);
                        throw new Error(err);
                    }
                    bcrypt.hash(newpassword, salt, function(err, hash) {
                        // Store hash in your password DB.
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        user.updateOne({ password: hash }).then(() => {
                            res.status(201).json({message: 'Successfuly update the new password'})
                        })
                    });
                });
        } else{
            return res.status(404).json({ error: 'No user Exists', success: false})
        }
        })
    })
} catch(error){
    return res.status(403).json({ error, success: false } )
}

}


module.exports = {
forgotpassword,
updatepassword,
resetpassword
}












// const forgotpassword = async (req, res) => {

//         const { email } =  req.body;
//         const user = await User.findOne({ email });
//         if(user){
//             const id = uuid.v4();
//             console.log('uuid',id);
//             user.createForgotpassword({ id , active: true })
//                 .catch(err => {
//                     throw new Error(err)
//                 })
              
//    const client = Sib.ApiClient.instance

//    const apiKey = client.authentications['api-key']
//    apiKey.apiKey = process.env.API_KEY
//    const tranEmailApi = new Sib.TransactionalEmailsApi()

//    const sender = {
//     email:'srinivasmutyala54@gmail.com',
//     name:'srinivas'
//     }

//    const receivers = [
//      {
//         email:email,
//      },
//     ]

//     tranEmailApi.sendTransacEmail({
//        sender,
//        to:receivers,
//        subject:'Reset Password',
//        textContent:`Follow the link and reset password`,
//        htmlContent: `Click on the link below to reset password<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,

//     }).then((response)=>{
//       return res.status(202).json({sucess: true, message: "password mail sent Successful"});

//     }).catch(err=>console.log(err))
//  }
// }     

// const resetpassword = (req, res) => {
//     const id =  req.params.id;
//     // console.log('id---',id)
//     Forgotpassword.findOne({ where : { id }}).then(forgotpasswordrequest => {
//         if(forgotpasswordrequest){
//             forgotpasswordrequest.update({ active: false});
//             res.status(200).send(`<html>
//                                     <script>
//                                         function formsubmitted(e){
//                                             e.preventDefault();
//                                             console.log('called')
//                                         }
//                                     </script>

//                                     <form action="/password/updatepassword/${id}" method="get">
//                                     <div style="text-align:center;">
//                                       <h2 style="color:deepskyblue">Expense Tracker App</h2>
//                                         <label for="newpassword" style="color:deepskyblue">Enter New password</label>
//                                         <input name="newpassword" type="password" required style="color:deepskyblue; margin:20px; padding:10px ;background-color:whitesmoke" ></input></br>
//                                         <button style="color:deepskyblue">reset password</button>
//                                         </div>
//                                     </form>
//                                 </html>`
//                                 )
//             res.end()

//         }
//     })
// }

// const updatepassword = (req, res) => {

//     try {
//         const { newpassword } = req.query;
//         const { resetpasswordid } = req.params;
//         Forgotpassword.findOne({ where : { id: resetpasswordid }}).then(resetpasswordrequest => {
//             User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
//                 // console.log('userDetails', user)
//                 if(user) {
//                     //encrypt the password

//                     const saltRounds = 10;
//                     bcrypt.genSalt(saltRounds, function(err, salt) {
//                         if(err){
//                             console.log(err);
//                             throw new Error(err);
//                         }
//                         bcrypt.hash(newpassword, salt, function(err, hash) {
//                             // Store hash in your password DB.
//                             if(err){
//                                 console.log(err);
//                                 throw new Error(err);
//                             }
//                             user.update({ password: hash }).then(() => {
//                                 res.status(201).json({message: 'Successfuly update the new password'})
//                             })
//                         });
//                     });
//             } else{
//                 return res.status(404).json({ error: 'No user Exists', success: false})
//             }
//             })
//         })
//     } catch(error){
//         return res.status(403).json({ error, success: false } )
//     }

// }


// module.exports = {
//     forgotpassword,
//     updatepassword,
//     resetpassword
// }
