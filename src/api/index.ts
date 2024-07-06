import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // Change to your backend URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminSignup = (data: any) => API.post('/admin/signup', data);
export const adminLogin = (data: any) => API.post('/admin/login', data);
export const createCustomer = (data: any) => API.post('/admin/create-customer', data);
export const getAllCustomers = () => API.get('/admin/customers/all');
export const customerLogin = (data: any) => API.post('/customer/login', data);
export const getAllToppings = () => API.get('/topping');
export const addToPizza = (data: any) => API.post('/pizza', data);
export const getUserCart = () => API.get('/cart');

export default API;
