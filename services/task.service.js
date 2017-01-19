Task = require('../models/taskmodel');

//get all tasks
module.exports.getTasks = function(begin,end,callback){
   	var e = parseInt(end);
   	var b = parseInt(begin);
   	console.log("e= "+e+" and b= "+b);
   	//Task.find({status:{$ne:false}})
   	Task.find()
   			.limit(e)
   			.skip(e*(b-1))
   			.sort({update_date: -1})
   			.exec(function(err,result){
			    if(err) {
			    		console.log(err);
						throw err;
				} else {
						return callback(null,result);
				}
  			});
}
//get total number of tasks in database
module.exports.getCount = function(callback){
	Task.count({},function(err,count) {
		if(err) {
			throw err;
		} else {
			return callback(null, count);
		}
	})
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

//update status task
module.exports.updateStatus = function(task,id,callback){
	// var query = {_id: id};
	// var update = {
	// 	status:st
		
	// };
	// Task.findOneAndUpdate(query,update,function(err,result){
	// 	if(err) {
	// 		console.log(err);
	// 		throw err;
	// 	} else {
	// 		console.log(result);
	// 		return callback(null,result);
	// 	}
	// });
	console.log("calling updateStatus");
	Task.update({_id: id}, {$set: {status: task.status}}, function(err,result){
		if(err) {
			console.log(err);
			throw err;
		} else {
			//console.log(result);
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
