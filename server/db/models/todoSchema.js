const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    trim: true,
  },
  projectDescription: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  // userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
