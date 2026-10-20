const express = require('express');
const Task = require('../models/Task');
const validateTask = require('../middleware/validateTask');
const cache = require('../utils/cache');
const taskEvents = require('../utils/events');

const router = express.Router();

// GET /tasks - Get all tasks for logged-in user (cached per user)
router.get('/', async (req, res) => {
  try {
    const cacheKey = `tasks_${req.user.id}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const tasks = await Task.find({ owner: req.user.id }).lean();
    cache.set(cacheKey, tasks);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /tasks - Create new task (user is owner)
router.post('/', validateTask, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({
      title,
      description,
      owner: req.user.id  // Automatically set to logged-in user
    });

    await newTask.save();

    // Invalidate this user's cached task list
    cache.del(`tasks_${req.user.id}`);

    console.log(`[API] Response sent at ${new Date().toISOString()}`);
    res.status(201).json(newTask);

    // Emit AFTER the response is sent, so listeners never delay the API
    taskEvents.emit('task-created', newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /tasks/:id - Update task (only if user is owner)
router.put('/:id', validateTask, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if user owns this task
    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this task' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();

    // Invalidate this user's cached task list
    cache.del(`tasks_${req.user.id}`);

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /tasks/:id - Delete task (only if user is owner)
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if user owns this task
    if (task.owner.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);

    // Invalidate this user's cached task list
    cache.del(`tasks_${req.user.id}`);

    res.json({ message: 'Task deleted' });

    // Emit AFTER the response is sent
    taskEvents.emit('task-deleted', task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;