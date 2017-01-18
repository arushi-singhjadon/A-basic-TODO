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
		type:Boolean,
		default:false
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
