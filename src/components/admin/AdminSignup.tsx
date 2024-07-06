import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminSignup } from '../../api/index';

const AdminSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminSignup({ email, password });
      navigate('/');
    } catch (error) {
      console.error('Error during admin signup', error);
      setError('Failed to sign up. Please check your email and password and try again.');
    }
  };

  return (
    <div>
      <h2>Admin Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default AdminSignup;
