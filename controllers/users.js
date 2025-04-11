const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs", {
        emailError: false,      
        passwordError: false,  
        emailValue: "",
        usernameValue: ""
    });
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            req.flash("error", "Password must be at least 8 characters long, contain one uppercase letter, one digit, and one special character.");
            return res.render("users/signup", {
                emailError: false,
                passwordError: true,  
                emailValue: email,
                usernameValue: username
            });
        }

        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        const isEmailError = e.message.toLowerCase().includes("email");
        req.flash("error", e.message);
        res.render("users/signup", {
            emailError: isEmailError,
            emailValue: req.body.email,
            usernameValue: req.body.username,
            passwordError: false,  
        });
    }
};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to wanderlust");
    const redirectUrl = req.session.returnTo || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "you are logged out");
        res.redirect("/listings");
    });
};