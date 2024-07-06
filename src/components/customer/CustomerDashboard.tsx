import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllToppings, addToPizza, getUserCart } from '../../api/index';

interface Topping {
  id: string;
  name: string;
}

interface CartItem {
  id: number;
  pizzaId: number;
  pizza: {
    id: number;
    name: string;
    toppings: Topping[];
  };
}

const CustomerDashboard: React.FC = () => {
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [flavor, setFlavor] = useState<string>('Fajita');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const fetchedToppings = await getAllToppings();
        setToppings(fetchedToppings.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching toppings', error);
        setError('Failed to fetch toppings. Please try again.');
      }
    };

    fetchToppings();
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const fetchedCart = await getUserCart();
      setCart(fetchedCart.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cart', error);
      setError('Failed to fetch cart. Please try again.');
    }
  };

  const handleToppingChange = (toppingId: string) => {
    setSelectedToppings(prevSelectedToppings =>
      prevSelectedToppings.includes(toppingId)
        ? prevSelectedToppings.filter(id => id !== toppingId)
        : [...prevSelectedToppings, toppingId]
    );
  };

  const handleAddToPizza = async () => {
    try {
      await addToPizza({ name: flavor, toppings: selectedToppings });
      alert('Pizza added to cart successfully');
      setSelectedToppings([]);
      setFlavor('Fajita');
      fetchCart(); // Refresh the cart after adding a new pizza
    } catch (error) {
      console.error('Error adding pizza to cart', error);
      setError('Failed to add pizza to cart. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <h2>Customer Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleLogout}>Logout</button>

      <h3>Select Flavor</h3>
      <select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
        <option value="Fajita">Fajita</option>
        <option value="Tikka">Tikka</option>
        <option value="Supreme">Supreme</option>
      </select>

      <h3>Select Toppings</h3>
      <div>
        {toppings.map(topping => (
          <div key={topping.id}>
            <input
              type="checkbox"
              id={topping.id}
              name={topping.name}
              value={topping.id}
              checked={selectedToppings.includes(topping.id)}
              onChange={() => handleToppingChange(topping.id)}
            />
            <label htmlFor={topping.id}>{topping.name}</label>
          </div>
        ))}
      </div>

      <h3>Selected Toppings</h3>
      <ul>
        {selectedToppings.map(toppingId => {
          const topping = toppings.find(t => t.id === toppingId);
          return <li key={toppingId}>{topping?.name}</li>;
        })}
      </ul>
      
      <button onClick={handleAddToPizza} disabled={selectedToppings.length === 0}>
        Add to Pizza
      </button>

      <h3>Your Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map(cartItem => (
            <div key={cartItem.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
              <h4>Pizza: {cartItem.pizza.name}</h4>
              <p>Toppings:</p>
              <ul>
                {cartItem.pizza.toppings.map(topping => (
                  <li key={topping.id}>{topping.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
