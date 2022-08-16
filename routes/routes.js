const express = require('express');
const router = express.Router()
module.exports = router;
const Model = require('../models/model');
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.status(400).json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/filterbybranch/:br',async (req,res) => {
        const br=req.params.br;
        Model.find( {branch:req.params.br} , function(err, brnch){
            if(err){
                res.status(500).json({msg:"Cant find collection",err}) 
            }
            if(!brnch.length){
                res.status(400).json(req.params.br+ " Not Found");
            
            }
            else{
            res.status(400).json(brnch);
            console.log(brnch);
            console.log(brnch[0].name);
        }

        });
        
        console.log(br);
})

 //Get by ID Method

router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.post('/post', async (req, res) => {
    const data = new Model({
        name: req.body.name,
        branch: req.body.branch,
        rollnumber: req.body.rollnumber,
        userid: req.body.userid

    })
    Model.find( {rollnumber:req.body.rollnumber} , function(err, rn){
        if(err){
            res.status(500).json({msg:"Cant find collection",err}) 
        }
        if(!rn.length){
            try {
                const dataToSave =  data.save();
                res.status(200).json(data)
                //console.log(dataToSave)
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
        else{
        res.status(400).json(req.body.rollnumber+ " Already Exists");
    }

    });
    
  
})