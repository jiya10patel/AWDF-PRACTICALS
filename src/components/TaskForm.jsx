import { useState } from 'react';

function TaskForm({ onCreate, isCreating }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiNote, setAiNote] = useState('');

  const handleGenerate = async () => {
    if (!title.trim()) {
      alert('Type a task title first');
      return;
    }

    setAiLoading(true);
    setAiNote('');

    try {
            const token = localStorage.getItem('jwtToken');

      const res = await fetch('http://localhost:5000/api/ai/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title: title.trim() })
      });

      const data = await res.json();

      if (data.fallback || !data.description) {
        setAiNote('AI suggestion is not available right now. You can type the description yourself.');
      } else {
        setDescription(data.description);
        setAiNote('AI-generated suggestion. Please review and edit it before adding the task.');
      }
    } catch (err) {
      setAiNote('AI suggestion is not available right now. You can type the description yourself.');
    } finally {
      setAiLoading(false);
    }
  };

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
    setAiNote('');
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
        type="button"
        className="btn"
        onClick={handleGenerate}
        disabled={isCreating || aiLoading}
      >
        {aiLoading ? 'Generating...' : 'Generate description'}
      </button>

      {aiNote && <p className="ai-note">{aiNote}</p>}

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