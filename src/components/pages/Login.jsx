import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../../api';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        await login(email, password);
        alert('Login successful!');
        onLoginSuccess();
        navigate('/');
      } else {
        // Register
        await register(email, password);
        alert('Registration successful! Now login.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <h2>{isLogin ? 'Login' : ' Register'}</h2>
      
      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password123"
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>

      <p className="help-text">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError(null);
            setEmail('');
            setPassword('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: '#fb923c',
            cursor: 'pointer',
            fontWeight: '600',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </section>
  );
}