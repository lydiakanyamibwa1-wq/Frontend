import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Cart() {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Simulate auth check
  useEffect(() => {
    const user = localStorage.getItem("user"); // Assume login stores "user" in localStorage
    if (!user) {
      navigate("/account"); // Redirect to login if not logged in
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  if (!isAuthenticated) return null; // Prevent rendering until auth check

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    navigate("/payment"); // redirect to payment selection page
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-500">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Quantity controls */}
                  <button
                    onClick={() =>
                      addToCart({ ...item, quantity: 1 }) // increase
                    }
                    className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    +
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        removeFromCart(item.id); // reduce
                        addToCart({ ...item, quantity: item.quantity - 1 });
                      } else {
                        removeFromCart(item.id); // remove if only 1 left
                      }
                    }}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    -
                  </button>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline ml-3"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex gap-3">
              <button
                onClick={handlePlaceOrder}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Place Order
              </button>
              <button
                onClick={clearCart}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
