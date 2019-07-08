let express = require('express');
let UserModel = require("../models/UserModel.js");

let userRouter = express.Router();

module.exports = userRouter;

userRouter.post("/user-register", (req, res) => {
  let userInfo = req.body;
  console.log(userInfo);
  let user = new UserModel();
  user.name = userInfo.name;
  user.password = userInfo.pass;
  user.email = userInfo.email;
  UserModel.find({email: user.email}).then(users => {
    console.log(users);
    if (users && users.length > 0) {
      let msg = {
        errorCode: "5555",
        message: "email has be registered!"
      };
      res.json(msg);
    } else {
      console.log(user);
      user.save().then((user) => {
        return res.json(user);
      }).catch(err => {
        return res.json(err);
      })
    }
  })
});

/**
 * 登录
 */
userRouter.post("/user-login", (req, res) => {
  let loginInfo = req.body;
  UserModel.find({email: loginInfo.email, password: loginInfo.pass}).then((users) => {
    if (users && users.length > 0) {
      return res.json(users[0])
    }
    return res.json({message: "user not found!"});
  })
});
