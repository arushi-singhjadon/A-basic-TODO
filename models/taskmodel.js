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
	},

	update_date:{
		type:Date,
		default:Date.now
	},
	complete_date:{
		type:Date,
		default:Date.now
	},

	status:{
		type:String,
		enum: ['done', 'progress', 'new'],
		default:'new'
	},

	user:{
		type:String,
		required:false
	},

	category:{
		type:String,
		enum: ['Personal', 'Grocery', 'Office'],
		default:'Personal'
	},

	assigner:{
		type:String,
		required:false
	},

	reminder_preference:{
		type:String,
		enum: ['E-Mail', 'Txt-Message', 'Alarm', 'DND'],
		default:'Alarm'
	},
	note:{
		type:String,
		required:false
	}

});

var Task = module.exports = mongoose.model('todolist',taskSchema);
/*
//get all tasks
module.exports.getTasks = function(callback){
	console.log("calling get");
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
	Task.findOneAndUpdate(query,update,options,callback,function(err){
		if(err)
			throw err;
	});
}
//delete
module.exports.deleteTask = function(id,callback){
	var query = {_id: id};
	
	Task.remove(query,callback);
}

module.exports.getTaskById = function(id,callback){
	
	Task.findById(id,callback);
}*/