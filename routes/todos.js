var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();

var task = require('../services/task.service.js');

router.get('/',function(req,res,next){
		count = req.body;
		console.log(count);
		task.getTasks(count,function(err,tasks){
		console.log("something");
		
		if(err){
			throw err;
		} else{
			count=count+1;
			res.json(tasks);
		}
		
	});
});


router.get('/:id', function(req, res, next) {
	task.getTaskById(req.params.id, function (err, tasks) {
	    if (err){
	    	 return next(err);
		} else {
			
			res.status(200).send(tasks);
			//res.json(tasks);
		}
    });
});

router.post('/', function(req,res,next){
	var newTask = req.body;
	
	task.addTask(newTask, function (err, newTask) {
		if(err){
			//console.log(err);
			throw err;
			//return next(err);
		} else{
			res.status(200).send(newTask);
			//res.json(tasks);
		}
	
	});
	
});

router.put('/:id', function(req,res,next){
	var id= req.params.id;
	var updatedTask = req.body;
	console.log(updatedTask);
	task.updateTitle(updatedTask,id,function(err,tasks){
		if(err){
			throw err;
		} else{
			res.status(200).send(tasks);
		}
		
	});
});

router.delete('/:_id', function(req,res,next){
	var id= req.params._id;
	 console.log(id);
	task.deleteTask(id,function(err,tasks){
		if(err){
			throw err;
		} else {
			res.status(200).send(tasks);
		}
		
	});
});


/*
router.post('/completed/:_id', function(req,res,next){
	res.send("Particular task completed");
});

router.delete('/:_id', function(req,res,next){
		var id= req.params._id;
		 
		deleteTask(id,function(err,tasks){
			if(err){
				throw err;
			}
			res.json(tasks);
		});
});

router.post('/allCompleted', function(req,res,next){
	res.send("All tasks completed");
});

/*

router.get('/',function(req,res){
	res.send("A TODO");
});*/



module.exports = router;