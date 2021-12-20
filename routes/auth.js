const router = require("express").Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");


const saltRounds = 10;

router.post("/register", async function (req, res) {
  try {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(req.body.password, salt, async function (err, hash) {
        const newUser = new User({
          username: req.body.username,
          password: hash,
          email: req.body.email,
        });
        const user = await newUser.save();

        res.status(200).json(user);
      });
    });
  } catch (err) {
    console.log(err);
  }
});


router.post("/login",async function(req,res){
    try{
        const user= await User.findOne({username:req.body.username})
        !user && res.status(400).json("User not found");

        const validPassword = await bcrypt.compare(req.body.password,user.password);
        !validPassword && res.status(400).json("password incorrect");
        
        res.status(200).json(user)

    }
    catch(err){
        console.log(err) 
        res.status(402).json("IT was this")
    }

})

module.exports=router;
