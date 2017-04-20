/**
 * Created by tehetenamasresha on 19/04/2017.
 */
const passport = require('passport')

module.exports = (app) => {
    app.get('/', (req, res, next) => {
        res.render('index', {title: 'index || brana'})

    })
    app.get('/signup', (req, res) => {
        const errors = req.flash ('error')
        res.render('user/signup', {title: 'signup || brana', messages: errors, hasErrors: errors.length > 0 })
    })

    app.post('/signup',validate, passport.authenticate('local.signup', {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true,
    }))
    app.get('/signin', (req, res) => {
        const errors = req.flash('error')
        res.render('user/login', {title: 'login || brana',messages: errors, hasErrors: errors.length > 0});
    })

    app.post('/signin', loginValidation , passport.authenticate('local.login', {
        successRedirect: '/home',
       // failureRedirect: '/signin',
        failureFlash: true,
    })
        ,(req, res)=>{
        if(req.body.rememberme){
           req.session.cookie.maxAge = 30*24*60*60*1000; // 30 days
        } else{
           req.session.cookie.expires = null;
       }
       res.redirect('/home')
    })
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.get('/home', (req, res) => {
          res.render('home', {title: 'Home || RateMe', user: req.user});
    })
}


function validate(req, res, next){
   req.checkBody('email', 'Email is Required').notEmpty();
   req.checkBody('email', 'Email is Invalid').isEmail();
   req.checkBody('password', 'Password is Required').notEmpty();
   req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min:5});
   req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

   const loginErrore = req.validationErrors();

   if(loginErrore){
      const messages = [];
       loginErrore.forEach((error) => {
           messages.push(error.msg);
       });

       req.flash('error', messages);
       res.redirect('/signup');
   }else{
       return next();
   }
}
 function loginValidation(req, res, next){
   req.checkBody('email', 'Email is Required').notEmpty();
   req.checkBody('email', 'Email is Invalid').isEmail();
   req.checkBody('password', 'Password is Required').notEmpty();
   req.checkBody('password', 'Password Must Not Be Less Than 5 Characters').isLength({min:5});
   req.check("password", "Password Must Contain at least 1 Number.").matches(/^(?=.*\d)(?=.*[a-z])[0-9a-z]{5,}$/, "i");

   const loginErrors = req.validationErrors();

   if(loginErrors){
       const messages = [];
       loginErrors.forEach((error) => {
           messages.push(error.msg);
       });

       req.flash('error', messages);
       res.redirect('/login');
   }else{
       return next();
   }
}