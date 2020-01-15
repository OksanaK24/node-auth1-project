const bcrypt = require("bcryptjs")
const express = require("express")
const usersModel = require("./user-model")

const router = express.Router()

function restricted() {
  const authError = {
    message: "You shall not pass!",
  }

  return async (req, res, next) => {
    try {
      const {username, password} = req.headers
      if(!username || !password){
        return res.status(401).json(authError)
      }

      const user = await usersModel.findBy({ username }).first()
      if (!user){
        return res.status(401).json(authError)
      }

      const passwordValid = await bcrypt.compare(password, user.password)
      if(!passwordValid) {
        return res.status(401).json(authError)
      }

      next()
    } catch (err) {
      next(err)
    }
  }
}

router.get("/users", restricted(), async (req, res, next) => {
  try {
    const users = await usersModel.find()
    
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.post("/register", async (req, res, next) => {
    try {
      const saved = await usersModel.add(req.body)
      
      res.status(201).json(saved)
    } catch (err) {
      next(err)
    }
})
  
router.post("/login", restricted(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await usersModel.findBy({ username }).first()

        res.status(200).json({
            message: `Welcome ${user.username}!`,
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router