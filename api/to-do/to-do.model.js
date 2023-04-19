const mongoose = require('mongoose');

const { Schema } = mongoose;

const toDoSchema = new Schema({
    userId: {
        index: true,
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
	content: {
		required: true,
		type: Schema.Types.String,
	},
    is_completed: {
		required: true,
		type: Schema.Types.Boolean,
        default: false,
	},
    dateTime: {
        require: false,
        type: Schema.Types.Date,
    }
}, { timestamps: true });


const ToDo = mongoose.model('toDos', toDoSchema);

module.exports = { ToDo };