const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.authenticate = async (req, res, next) => {
     try {
          const token = req.header('Authorization');
          console.log(token);
          const decoded = jwt.verify(token, 'secretkey');
          console.log('userId-------->', decoded.userId);
          const user = await User.findById(decoded.userId);
          if (!user) {
               return res.status(401).json({ success: false, message: "User not found" });
          }
          req.user = user;
          next();
     } catch (err) {
          console.error(err);
          return res.status(401).json({ success: false, message: "Invalid token" });
     }
}
