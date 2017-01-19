var express = require('express');
var app = express();
var path = require('path');
var router = express.Router();

var task = require('../services/task.service.js');

router.get('/',function(req,res,next) {
    if(req.query.countonly == "false") {
    	console.log("in there");
    	task.getTasks(req.query.begin,req.query.end,function(err,tasks) {
			if(err){
				throw err;
			} else {
				res.json(tasks);
			}
	
		});
    } else {
    	console.log("in here");
    	task.getCount(function(err,count) {
    		if(err){
				throw err;
			} else {
				res.json(count);
			}
    	});
    } 	
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
			throw err;
		} else{
			res.status(200).send(newTask);
		}
	
	});
	
});

router.put('/:id', function(req,res,next){
	var id= req.params.id;
		var updatedTask = req.body;
		if(req.query.toChange == "false"){
			//console.log("task= "+updatedTask);
			console.log("updating title and note");
			task.updateTitle(updatedTask,id,function(err,tasks){
				if(err){
					throw err;
				} else {
					res.status(200).send(tasks);
				}
			
			});	
		} else {
			console.log("updating only status");
			task.updateStatus(updatedTask,id,function(err,tasks){
				if(err){
					throw err;
				} else {
					res.status(200).send(tasks);
				}
			
			});
		}
			
	
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
module.exports = router;