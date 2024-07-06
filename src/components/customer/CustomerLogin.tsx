import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, customerLogin } from '../../api';

const CustomerLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await customerLogin({ email, password });
      localStorage.setItem('token', response.data.access_token); // Store the JWT token
      localStorage.setItem('role', 'customer');
      navigate('/customer/dashboard');
    } catch (error) {
      console.error('Error during customer login', error);
      setError('Failed to login. Please check your email and password and try again.');
    }
  };

  return (
    <div>
      <h2>Customer Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
