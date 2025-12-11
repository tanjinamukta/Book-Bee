import React from 'react';
import { useCart } from '../context/CartContext';
// ...existing code...
import '../styles.css';
// ...existing code...

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h3>{item.title}</h3>
        <p className="author">by {item.author}</p>
        <p className="price">${item.price.toFixed(2)}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="btn btn-sm"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="btn btn-sm"
          >
            +
          </button>
        </div>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
