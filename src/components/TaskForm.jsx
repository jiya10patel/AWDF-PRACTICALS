import { useState } from 'react';

function TaskForm({ onCreate, isCreating }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Validate: title cannot be empty
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    // Send data to App.jsx via onCreate callback
    onCreate({
      title: title.trim(),
      description: description.trim(),
      completed: false,
      priority: 'medium'
    });

    // Clear form after submit
    setTitle('');
    setDescription('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Task Title *</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isCreating}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <input
          type="text"
          placeholder="Enter task description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isCreating}
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isCreating}
      >
        {isCreating ? 'Adding Task...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;