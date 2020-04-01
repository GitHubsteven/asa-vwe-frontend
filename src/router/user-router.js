let express = require('express');
let UserModel = require("../models/UserModel.js");
let SessionModel = require("../models/SessionModel.js");

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
  UserModel.find({email: loginInfo.email, password: loginInfo.pass})
    .then((users) => {
      //如果登录成功的话
      if (users && users.length > 0) {
        let user = users[0];
        req.session.isLogined = true;
        req.session.email = user.email;
        req.session.pass = user.pass;
        req.session.name = user.name;
        req.session._id = user._id;
        res.cookie("username", user.name);
        res.cookie("userId", user._id);
        let sessionBean = new SessionModel();
        sessionBean.content = JSON.stringify(req.session);
        sessionBean.sessionId = req.session.id;
        sessionBean.save().then((sess) => {
          console.log("saved session: %o", sess);
          return res.json(user);
        }).catch(err => {
          return res.json(err);
        })
      }
    }, error => {
      return res.json({message: "user not found!", error: error});
    })
});
