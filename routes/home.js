var express = require('express');
var app= express();
var path = require('path');
var router = express.Router();

Task = require('../models/taskmodel');



// GET home page. 
router.get('/', function(req, res,next) {
  res.render('index', { title: 'TODO' });
  //res.send("A TODO");
});


module.exports = router;



/*
router.get('/todos',function(req,res,next){
	Task.getTasks(function(err,tasks){
		if(err){

			throw err;
		}
		res.json(tasks);
	});
});

router.get('/todos/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err)
    	 return next(err);
    res.json(post);
  });
});

router.post('/todos', function(req,res,next){
		var tasks = req.body;
		Task.addTask(tasks,function(err,tasks){
		if(err){
			console.log(err);
			//throw err;
		}
		res.json(tasks);
	});
});

router.put('/todos/:_id', function(req,res,next){
		var id= req.params._id;
		var tasks = req.body;
		Task.updateTitle(tasks,id,{},function(err,tasks){
			if(err){
				throw err;
			}
			res.json(tasks);
		});
});

router.post('/task/completed/:_id', function(req,res,next){
	res.send("Particular task completed");
});

router.delete('/todos/:_id', function(req,res,next){
		var id= req.params._id;
		 
		Task.deleteTask(id,function(err,tasks){
			if(err){
				throw err;
			}
			res.json(tasks);
		});
});

router.post('/todos/allCompleted', function(req,res,next){
	res.send("All tasks completed");
});

/*

router.get('/',function(req,res){
	res.send("A TODO");
});*/



