Task = require('../models/taskmodel');

//get all tasks
module.exports.getTasks = function(count,callback){
	
	//Task.find({status:{$ne:'done'}}).paginate(count, 2).exec(function(err, docs) {
   	//Task.find().paginate(count, 2).exec(function(err,docs) {
   	Task.find({status:{$ne:'done'}}).sort({update_date: -1}).exec(function(err,result){
	    if(err) {
	    		console.log(err);
				throw err;
		} else {
				return callback(null,result);
		}
  });
}



//get one task by id
module.exports.getTaskById = function(id,callback){
	
	Task.findById(id,function(err,result){
		if(err){
			throw err;
		} else {
			return callback(null,result);
		}
	});
}

//Insert a new task
module.exports.addTask = function(newTask,callback){
	console.log("inside service");
	Task.create(newTask,function(err,result){
		if(err){
			console.log(err);
			throw err;
		} else {
			console.log(result);
			return callback(null,result);
		}
	});
}

//update a task

module.exports.updateTitle = function(task,id,callback){
	var query = {_id: id};
	var update = {
		title:task.title,
		note:task.note,
		update_date:new Date()
	};
	Task.findOneAndUpdate(query,update,function(err,result){
		if(err) {
			console.log(err);
			throw err;
		} else {
			console.log(result);
			return callback(null,result);
		}
	});
}
//delete a task

module.exports.deleteTask = function(id,callback){
	Task.remove({ _id: id },function(err,result){
		if(err){
			console.log(err);
			throw err;
		} else {
			console.log(result);
			return callback(null,result);
		}
	});
}
