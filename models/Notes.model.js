const mongoose=require("mongoose");

const notesSchema=mongoose.Schema({
    title:String,
    category:String,
    description:String,
    author:String,
    authorId:String
},{
    versionKey:false
})

const NotesModel=mongoose.model("note",notesSchema);

module.exports={
    NotesModel
}