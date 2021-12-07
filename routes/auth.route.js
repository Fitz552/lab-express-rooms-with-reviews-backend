const express = require("express")
const bcrypt = require("bcryptjs");

const router = express.Router();

const SALT_ROUNDS = 10;
const generateToken = require("../configs/jwt.config");

const User = require("../models/User.model");

router.get ("/", (req, res) => {
  res.status(200).json("Is Nodemon on?")
})

router.post("/signup", (req, res) => {
  const {name, email, password} = req.body;

  if (
    !password ||
    !password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm
    )
  ) {
    return res.status(400).json({
      msg: "A senha deve conter pelo menos 8 caracteres, letras maiúscula e minúsculas, números e caracteres especiais",
    });
  }

  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  const passwordHash = bcrypt.hashSync(password, salt);


  User.create({name, email, passwordHash})
  .then((result) => {
    res.status(201).json(result)
  })
  .catch (err => {
    console.log(err)
    res.status(500).json(err)
  })

})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    
  User.findOne({ email })
  .then(response => {
    if (!bcrypt.compareSync(password, response.passwordHash)) {
      return res.status(400).json({ msg: "E-mail ou senha incorretos." });
    }
    
    const token = generateToken(response);

    res.status(200).json(token);  

  })
  .catch(err => {

    res.status(400).json({ msg: "E-mail ou senha incorretos." })
    console.log(err);
  })

  
});


module.exports = router