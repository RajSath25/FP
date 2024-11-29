let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let cipher = require("../model/cipher");


router.get('/', async(req, res, next) => {
    try{
        const Cipher = await cipher.find()
        res.render("Cipher/list", {title: "Cipher List", cipherList: Cipher});
    }
    catch (err)
    {
        console.error(err);
        res.render("Cipher/list",{
            error:"Error on Server"})
    }
});

router.get("/add",async(req,res,next)=>{
    try {
        res.render("Cipher/add",{
            title: "Add a cipher"
        });
    } 
    catch (err) {
        console.error(err)
        res.render("Cipher/list",{
            error:"Error on Server"})
    }
});

router.post("/add", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let newCipher = cipher({
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "plaintext":req.body.plaintext,
            "key":req.body.key,
            "encryption":req.body.encryption
        })
        cipher.create(newCipher).then(()=>{
            res.redirect("/cipher")
        cipher.updateMany({_id:id},{$set: {$encryption:""}})
        }
    )}
    
    catch (err) {
        console.error(err)
        res.render("Cipher/list",{
            error:"Error on Server"})
    }
});

router.get("/edit/:id", async(req,res,next)=>{
    try {
        const id = req.params.id;
        const CipherToEdit = await cipher.findById(id);
        res.render("Cipher/edit", {
            title: "Edit Cipher Entry",
            cipher: CipherToEdit
        })
    } 
    catch (err) {
        console.error(err)
        next(err);
    }
});


router.post("/edit/:id", async(req,res,next)=>{
    try {
        let id = req.params.id;
        let updatedCipher = cipher({
            "_id":id,
            "firstname":req.body.firstname,
            "lastname":req.body.lastname,
            "plaintext":req.body.plaintext,
            "key":req.body.key,
        })
        cipher.findByIdAndUpdate(id,updatedCipher).then(()=>{
            res.redirect("/cipher");
        })
    } 
    catch (err) {
        console.error(err)
        res.render("Cipher/list", {
            error: "Error on server"
        }) 
    }
});

router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        cipher.deleteOne({_id:id}).then(()=>{
            res.redirect('/cipher')
        })
    }
    catch(error){
        console.error(err);
        res.render('Cipher/list',{
            error:'Error on the server'
        })
    }
});


  module.exports = router;