const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('user/register');
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registerUser = await User.register(user, password);
        req.login(registerUser, err =>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register')
    }
}

module.exports.renderLogin = (req, res) => {
    res.render('user/login')
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect(req.session.returnTo || '/campgrounds');
    delete req.session.returnTo;
}

module.exports.logOut = (req, res, next) => {
    req.logOut(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!')
        res.redirect('/campgrounds');
    });
}