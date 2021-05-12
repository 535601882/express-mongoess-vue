import mongoose from "./db.js"
const Schema = mongoose.Schema

const noteSchema = new Schema({
  title:{type:String},
  completed:{type:Boolean}
})

const note = mongoose.model('todo',noteSchema)
export default note