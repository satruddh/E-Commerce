

module.exports = (req, res) => {
    if (req.session.isAuthenticated){
        res.render("home", {
            activeUser: req.session.username,
            definedControl: "Logout",
        })
    }
    else
    {
        res.render("home",{
            activeUser : "",
            definedControl : "Login",
        })
    }
}