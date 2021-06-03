const express = require("express")
const router = express.Router();
const db = require("../models");
const bcrypt = require("bcryptjs");

/*
GET - /register Pres.
POST -/register Func.

GET - /login Pres.
POST - /login Func.
*/

router.get("/register", function(req, res) {
    res.render("auth/register")
});

router.post("/register", async function(req, res) {
    const foundUser = await db.User.findOne({email: req.body.email})

    try {
    if (foundUser) {
        return res.redirect("/login")
    }

    // this hashes out the password so that it's encrypted in the database
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash;


    const newUser = await db.User.create(req.body)
    return res.redirect("/login")

    } catch(err) {
        console.log(err);
        return res.send(err)
    }
});


router.get("/login", function(req, res) {
    res.render("auth/login")
});

router.post("/login", function(req, res) {
    res.send(req.body)
});

module.exports = router;
