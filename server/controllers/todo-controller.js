const Todo = require('../db/models/todoSchema');

// 1. Get Project
module.exports.getProjects = async (req, res) => {
  try {
    const todo = await Todo.find();
    res.status(200).json({ message: 'Get all projects', todo });
  } catch (error) {
    console.error('Error finding projects', error);
    res.status(500).json({ message: 'Error finding projects' });
  }
};

// 2) POST Projects

module.exports.postProjects = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const newTodo = await Todo.create({
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      date: req.body.date,
      // userID: req.body.userId,
      completed: false,
    });

    res.status(201).json({
      message: 'Project created successfully',
      projectName: newTodo,
    });
  } catch (error) {
    console.error('Error posting project:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 3) PATCH projects by id

module.exports.patchProjectsById = async (req, res) => {
  const { id } = req.params;
  const { completed, projectName } = req.body;
  try {
    const updatedData = {
      projectName,
      completed: completed !== undefined ? Boolean(completed) : undefined,
    };
    const project = await Todo.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project updated successfully', project });
  } catch (e) {
    console.error('Error updating project:', e); // For better debugging
    res.status(500).json({
      message: 'Error updating project',
      error: e.message || e,
    });
  }
};

// 4) DELETE Project by id

module.exports.deleteProjectByID = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'delete project by id', project });
  } catch (e) {
    res.status(500).json({ message: 'Error', e });
  }
};

//5) Delete all
module.exports.deleteAllProjects = async (req, res) => {
  try {
    const deletedProjects = await Todo.deleteMany();
    res.status(200).json({
      message: 'All projects deleted successfully',
      deletedCount: deletedProjects.deletedCount,
    });
  } catch (e) {
    res.status(500).json({ message: 'Error deleting projects', error: e.message });
  }
};
