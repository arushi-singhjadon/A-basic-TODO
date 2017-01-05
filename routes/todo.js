var express = require('express');
var app= express();

var router = express.Router();

Task = require('../models/taskmodel');



// GET home page. 
router.get('/', function(req, res,next) {
  //res.render('index', { title: 'Express Home Page' });
  res.send("A TODO");
});

router.get('/task',function(req,res,next){
	Task.getTasks(function(err,tasks){
		if(err){

			throw err;
		}
		res.json(tasks);
	});
});

router.post('/task', function(req,res,next){
		var tasks = req.body;
		Task.addTask(tasks,function(err,tasks){
		if(err){
			console.log(err);
			//throw err;
		}
		res.json(tasks);
	});
});

router.put('/task/:_id/', function(req,res,next){
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

router.delete('/task/:_id', function(req,res,next){
		var id= req.params._id;
		 
		Task.deleteTask(id,function(err,tasks){
			if(err){
				throw err;
			}
			res.json(tasks);
		});
});

router.post('/task/allCompleted', function(req,res,next){
	res.send("All tasks completed");
});

/*

router.get('/',function(req,res){
	res.send("A TODO");
});*/



module.exports = router;