const mongoose=require('mongoose')
const Schema = mongoose.Schema;



//Define Schema
const noteBookSchema = new Schema({
  id:Number,
  title: String,
  content: String,
});
//Model
const NoteBook = mongoose.model("NoteBook", noteBookSchema);


module.exports=NoteBook;
