const taskEvents = require('./events');

taskEvents.on('task-created', (task) => {
  setTimeout(() => {
    try {
      console.log(`[Notification] Task "${task.title}" created at ${new Date().toISOString()}`);
    } catch (err) {
      taskEvents.emit('error', err);
    }
  }, 2000);
});

taskEvents.on('task-deleted', (task) => {
  console.log(`[Notification] Task "${task.title}" deleted at ${new Date().toISOString()}`);
});

// Catches any error emitted by a listener and logs it
taskEvents.on('error', (err) => {
  console.error(`[Listener Error] ${err.message} at ${new Date().toISOString()}`);
});