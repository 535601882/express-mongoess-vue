const mongoose = require("./db.js")
const Schema = mongoose.Schema

const usersSchema = new Schema({
  date:{type:Date},
  birthday:{type:Date},
  name:{type:String},
  address:{type:String}
})

module.exports = mongoose.model('users',usersSchema)
