import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete, busyTaskId }) {
  // Safety check: ensure tasks is an array
  if (!tasks || !Array.isArray(tasks)) {
    return <p className="empty-state">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="empty-state">No tasks yet. Create one above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          isBusy={busyTaskId === task._id}
        />
      ))}
    </ul>
  );
}

export default TaskList;