const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  // const isLoggedIn = req.get('Cookie').split(';')[1]?.trim().split('=')[1];
  const isLoggedIn = req.session.isLoggedIn;
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  // res.setHeader('Set-Cookie', 'loggedIn=true')
  User.findById("66ca514d4a39b93e9ab7dd68")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save((err)=>{
        res.redirect("/");
      })
    })
    .catch((err) => console.log(err));
  
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
