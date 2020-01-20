const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)

const dbConfig = require("./data/dbConfig")
const usersRouter = require("./users/user-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: "keep it secret, keep it safe!", 
  cookie: {
    httpOnly: true, 
    maxAge: 1000 * 60 * 60 * 24 * 30, 
    secure: false, 
  },
  store: new KnexSessionStore({
    knex: dbConfig, 
    createtable: true, 
  }),
}))


server.use("/api", usersRouter)

server.get("/", (req, res, next) => {
  res.json({
    message: "Welcome to our API",
  })
})

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.status(500).json({
    message: "Something went wrong",
  })
})


server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`)
})