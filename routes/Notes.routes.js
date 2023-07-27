const express = require("express");
const NotesRouter=express.Router();
const {NotesModel}=require("../models/Notes.model")
NotesRouter.get("/",async (req,res)=>{
    try{
        let All_Notes=await NotesModel.find();
        res.send({"data":All_Notes})
    }catch(err){
        console.log(err);
        res.send({"error":err})
    }
})

NotesRouter.get("/:id",async (req,res)=>{
    let {id}=req.params;
    console.log({"_id":id})
    try{
        let All_Notes=await NotesModel.find({_id:id});
        res.send({"data":All_Notes})
    }catch(err){
        console.log(err);
        res.send({"error":err})
    }
})
NotesRouter.post("/create",async (req,res)=>{
    try{
        let notes=new NotesModel(req.body);
        await notes.save();
        res.send({"message":"Your notes is uploaded"})
    }catch(err){
        console.log(err);
        res.send({"error":err})
    }
})


NotesRouter.patch("/update/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        let userId=req.body.authorId;
        let data= await NotesModel.find({_id:id});
        if(data.length>0){
            if(data[0].authorId==userId){
                await NotesModel.findByIdAndUpdate({_id:id},req.body)
                res.send({"message":"Notes is updated"})
            }else{
                res.send({"message":"You are not authorize"})
            }
        }else{
            res.status(404).send({"message":`Notes not found`})
        }
    }catch(err){
        console.log(err);
        res.send({"error":err})
    }
})


NotesRouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params;
    try{
        let userId=req.body.authorId;
       let data= await NotesModel.find({_id:id});
       if(data.length > 0){
        if(data[0].authorId==userId){
            await NotesModel.findOneAndDelete({_id:id});
            res.send({"message":`Notes is deleted of ${id} id`})
        }else{
            res.send({"message":"You are not authorize"})
        }
       }else{
        res.status(404).send({"message":`Notes not found`})
       }
    }catch(err){
        console.log(err);
        res.send({"error":err})
    }
})

module.exports={
    NotesRouter
}