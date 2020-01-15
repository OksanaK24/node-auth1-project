const express = require("express")
const helmet = require("helmet")
const usersRouter = require("./users/user-router")

const server = express()
const port = process.env.PORT || 5000

server.use(helmet())
server.use(express.json())

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