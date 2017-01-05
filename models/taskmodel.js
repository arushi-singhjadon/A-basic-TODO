var mongoose = require('mongoose');
//genre schema
var taskSchema = mongoose.Schema({
	
	title:{
		type:String,
		required: true
	},
	create_date:{
		type:Date,
		default:Date.now
	}
});

var Task = module.exports = mongoose.model('todolist',taskSchema);

//get all tasks
module.exports.getTasks = function(callback){
	Task.find(callback);
}

//Insert a new task
module.exports.addTask = function(task,callback){
	console.log(task);
	Task.create(task,callback);
}

//update title of task

module.exports.updateTitle= function(task,id,options,callback){
	var query = {_id: id};
	var update = {
		title:task.title
	};
	Task.findOneAndUpdate(query,update,options,callback);
}
//delete
module.exports.deleteTask = function(id,callback){
	var query = {_id: id};
	
	Task.remove(query,callback);
}