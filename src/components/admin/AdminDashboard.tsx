import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCustomer, getAllCustomers } from '../../api/index';

interface Customer {
  name: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [customers, setCustomers] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer({ email });
      setEmail('');
      setError(null);
      fetchCustomers();
      alert('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer', error);
      setError('Failed to add customer. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const fetchCustomers = async () => {
    try {
      const cust = await getAllCustomers();
      setCustomers(cust.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching customers', error);
      setError('Failed to fetch customers. Please try again.');
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAddCustomer}>
        <div>
          <label>Customer Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Customer</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: any, index: any) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
