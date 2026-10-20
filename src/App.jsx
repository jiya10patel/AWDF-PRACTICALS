import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Spinner from './components/Spinner';
import ErrorMessage from './components/ErrorMessage';

import { getTasks, createTask, updateTask, deleteTask, logout } from './api';
import './App.css';

   const Projects = lazy(() => import('./components/pages/Projects'));
   const Contact = lazy(() => import('./components/pages/Contact'));

function App() {
  const location = useLocation();
  
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Task Manager state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setIsLoggedIn(!!token);
  }, []);

  // Load tasks when logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadTasks();
    }
  }, [isLoggedIn]);

  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setIsCreating(true);
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      alert('Task created successfully!');
    } catch (err) {
      alert('Failed to create task: ' + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    setBusyTaskId(id);
    try {
      const updatedTask = await updateTask(id, updates);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updatedTask : t))
      );
      alert('Task updated successfully!');
    } catch (err) {
      alert('Failed to update task: ' + err.message);
    } finally {
      setBusyTaskId(null);
    }
  };

  const handleDeleteTask = async (id) => {
    setBusyTaskId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      alert('Task deleted successfully!');
    } catch (err) {
      alert('Failed to delete task: ' + err.message);
    } finally {
      setBusyTaskId(null);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setTasks([]);
  };

  const isHomePage = location.pathname === '/';

  // If not logged in, show login page
  if (!isLoggedIn) {
    return (
      <div className="App">
        <Header name="Jiya" />
        <Login onLoginSuccess={() => setIsLoggedIn(true)} />
        <Footer />
      </div>
    );
  }

  // If logged in, show portfolio
  return (
    <div className="App">
      <Header name="Jiya" />
      <NavBar />

      {/* Logout Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={handleLogout}
          className="submit-btn"
          style={{ background: '#f44336' }}
        >
          Logout
        </button>
      </div>

      {/* TASK MANAGER - Only show on home page */}
      {isHomePage && (
        <div className="task-manager-section">
          <h2>📋 My Task Manager</h2>
          <TaskForm onCreate={handleCreateTask} isCreating={isCreating} />
          
          {loading && <Spinner label="Loading tasks..." />}
          {!loading && error && (
            <ErrorMessage message={error} onRetry={loadTasks} />
          )}
          {!loading && !error && (
            <TaskList 
              tasks={tasks}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              busyTaskId={busyTaskId}
            />
          )}
        </div>
      )}

            <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
}

export default App;