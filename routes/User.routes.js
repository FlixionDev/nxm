const express = require("express");
const { UserModel } = require("../models/User.model")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserRouter=express.Router();
UserRouter.post("/register", async (req, res) => {
    try {
        let { name, age, email, pass } = req.body;
        bcrypt.hash(pass, 5, async (err, secure_password) => {
            if (err) {
                console.log(err);
                res.send({ "message": err })
            } else {
                let user = new UserModel({ name, age, email, pass: secure_password });
                user.save();
                res.send("Register")
            }
        });
    }
    catch (err) {
        console.log(err)
        res.send("not register")
    }

})
UserRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        let data = await UserModel.find({ email });
        if (data.length > 0) {
            bcrypt.compare(pass, data[0].pass, (err, result) => {
                if (result) {
                    let {_id,email}=data[0];
                    const token = jwt.sign({_id,email}, 'masai');
                    res.send({ "meassage": "Login Done", "token": token })
                } else {
                    res.send("Wrong Credentials")
                }
            });
        }
    } catch (err) {
        console.log(err)
        res.send("Something went wrong")
    }
})
module.exports={
    UserRouter
}