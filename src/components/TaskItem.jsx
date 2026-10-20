import { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete, isBusy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description || '');

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    onUpdate(task._id, {
      title: editTitle.trim(),
      description: editDesc.trim(),
      completed: task.completed,
      priority: task.priority
    });

    setIsEditing(false);
  };

  // Handle delete
  const handleDelete = () => {
    const confirm = window.confirm(`Delete "${task.title}"?`);
    if (confirm) {
      onDelete(task._id);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        // EDIT MODE
        <div className="task-edit">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            disabled={isBusy}
          />
          <input
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            disabled={isBusy}
          />
          <button
            className="btn btn-success"
            onClick={handleSaveEdit}
            disabled={isBusy}
          >
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsEditing(false)}
            disabled={isBusy}
          >
            Cancel
          </button>
        </div>
      ) : (
        // VIEW MODE
        <div className="task-view">
          <label className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() =>
                onUpdate(task._id, {
                  ...task,
                  completed: !task.completed
                })
              }
              disabled={isBusy}
            />
            <span className="task-text">
              <strong>{task.title}</strong>
              {task.description && <p>{task.description}</p>}
              <span className="task-priority">{task.priority}</span>
            </span>
          </label>

          <div className="task-actions">
            <button
              className="btn btn-edit"
              onClick={() => setIsEditing(true)}
              disabled={isBusy}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isBusy}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;