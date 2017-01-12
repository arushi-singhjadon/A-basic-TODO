Task = require('../models/taskmodel');
//var page = require('mongoose-pagination');

  //  assert.equal(query.exec().constructor, require('bluebird'));

//get all tasks
module.exports.getTasks = function(count,callback){
	/*console.log("calling get");
	Task.find(function(err,result){
		if(err)
			throw err;
		else
			return callback(null,result);
	});*/

	//Task.find({status:{$ne:'done'}}).paginate(count, 2).exec(function(err, docs) {
   	//Task.find().paginate(count, 2).exec(function(err,docs) {
   	Task.find({status:{$ne:'done'}}).exec(function(err,result){
	    if(err)
	    	{
	    		console.log(err);
				throw err;
			}
			else{
				//console.log(result);
				return callback(null,result);
				//console.log('docs: ', docs)
			}
  });
}


//get one task by id
module.exports.getTaskById = function(id,callback){
	
	Task.findById(id,function(err,result){
		if(err){
			throw err;
		}
		else{
			//console.log(result);
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
		}
		else{
			console.log(result);
			return callback(null,result);
		}
	});
}

//update title of task

module.exports.updateTitle= function(task,id,callback){
	var query = {_id: id};
	var update = {
		title:task.title,
		note:task.note,
		update_date:task.update_date
	};
	Task.findOneAndUpdate(query,update,function(err,result){
		if(err){
			console.log(err);
			throw err;
		}
		else{
			console.log(result);
			return callback(null,result);
		}
	});
}
//delete

module.exports.deleteTask = function(id,callback){
	
	var query = {_id: id};
	var update = {
		status:'done'
	};
	Task.findOneAndUpdate(query,update,function(err,result){
		if(err){
			console.log(err);
			throw err;
		}
		else{
			console.log(result);
			return callback(null,result);
		}
	});
	
}
