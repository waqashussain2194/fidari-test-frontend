import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignup from './components/admin/AdminSignup';
import ProtectedRoute from './AdminProtectedRoute';
import CustomerDashboard from './components/customer/CustomerDashboard';
import CustomerLogin from './components/customer/CustomerLogin';
import CustomerProtectedRoute from './CustomerProtectedRoute';
import AdminProtectedRoute from './AdminProtectedRoute';
import PublicRoute from './PublicRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/admin/signup" 
          element={<PublicRoute element={AdminSignup} redirectPath="/admin/dashboard" />} 
        />
        <Route 
          path="/admin/dashboard" 
          element={<AdminProtectedRoute element={AdminDashboard} />} 
        />
        <Route 
          path="/customer/login" 
          element={<PublicRoute element={CustomerLogin} redirectPath="/customer/dashboard" />} 
        />
        <Route 
          path="/customer/dashboard" 
          element={<CustomerProtectedRoute element={CustomerDashboard} />} 
        />
        <Route 
          path="/" 
          element={<PublicRoute element={AdminLogin} redirectPath="/admin/dashboard" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
