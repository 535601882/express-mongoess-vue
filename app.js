const express = require('express')
const app = express()

const database = require("./database/index.js")

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/getUsers",database.getUsers)
app.post("/addUser",database.addUser)
app.delete("/delUser",database.delUser)
app.put("/editUser",database.editUser)

app.listen(3001,()=>{
  console.log("app listening on port 3001")
})
