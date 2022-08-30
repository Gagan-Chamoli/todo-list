const router = require('express').Router();

const Task= require('../models/Task.js');
const { verifyTokenAndAuthorization } = require('./verifyToken.js');

// Create a task
router.post('/', verifyTokenAndAuthorization , async (req,res)=>{
    const newTask = new Task({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
        due: req.body.due 
    });

    try {
        const savedTask = await newTask.save();
        const { userId, ...others } = savedTask._doc; 
        res.status(201).json(others);   
    } catch (error) {
        res.status(500).json(error);
    }  
});

// Update a task
router.put('/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try {
       const updatedTask = await Task.findByIdAndUpdate(req.params.id, {
        $set: req.body
       }, { new: true });
       
       res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);    
        res.status(200).send('task has been deleted');
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET
router.get('/find/:id', verifyTokenAndAuthorization, async (req,res)=>{
    try {
        const task = await Task.findById(req.params.id);  
        const { userId, ...others } = task._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL Tasks
router.get('/', verifyTokenAndAuthorization, async (req,res)=>{
    const query = req.query.new;
    try {
        const tasks = (query)? await Task.find().sort({ _id: -1 }).limit(5) : await Task.find();  
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;