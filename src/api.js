const BASE_URL = 'http://localhost:5000';

// Get token from localStorage
function getToken() {
  return localStorage.getItem('jwtToken');
}

async function handleResponse(res) {
  let body = null;
  try {
    body = await res.json();
  } catch {
    // Response had no JSON body
  }

  if (!res.ok) {
    const message = (body && body.error) || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

// REGISTER - Create new user
export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
}

// LOGIN - Get JWT token
export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await handleResponse(res);
  // Save token to localStorage
  if (data.token) {
    localStorage.setItem('jwtToken', data.token);
  }
  return data;
}

// LOGOUT - Clear token
export function logout() {
  localStorage.removeItem('jwtToken');
}

// GET all tasks (with auth token)
export async function getTasks() {
  const token = getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers
  });
  const result = await handleResponse(res);
  return result.data || result || [];
}

// POST create task (with auth token)
export async function createTask(task) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  const result = await handleResponse(res);
  return result.data || result;
}

// PUT update task (with auth token)
export async function updateTask(id, updates) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  const result = await handleResponse(res);
  return result.data || result;
}

// DELETE task (with auth token)
export async function deleteTask(id) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const result = await handleResponse(res);
  return result;
}