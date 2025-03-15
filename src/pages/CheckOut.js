import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Checkout = () => {
  const [message, setMessage] = useState('');
  const cart = useSelector(state => state.cart);

  const addresses = useSelector(state => state.addresses.addresses);
  const selectedAddressId = useSelector(state => state.addresses.selectedAddressId);

  const selectedAddress = addresses.find(addr => addr._id === selectedAddressId);
  const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);

  if (!selectedAddress) {
    return <h3 className="position-absolute top-50 start-50 translate-middle">Please select an address for delivery before checking out.</h3>;
  }
  const orderHandle = () => {
    setMessage('Your order has been placed and will be delivered soon!');
  }

  return (
    <div className="container py-3">
      <h2>Order Summary</h2>
      <div>
        <h4>Delivery Address:</h4>
        <p>{selectedAddress.address}</p>
        <p>{selectedAddress.city}</p>
        <p>{selectedAddress.state}</p>
        <p>{selectedAddress.zipCode}</p>
      </div>
      <div>
        <h4>Cart Items:</h4>
        {cart.map(book => (
          <p key={book._id}>
            {book.title} - {book.quantity} x ${book.price.toFixed(2)} = ${(
              book.quantity * book.price
            ).toFixed(2)}
          </p>
        ))}
      </div>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button onClick={orderHandle} className='btn btn-primary'>Place Order</button>
      {message && <p className="mt-3 text-success">{message}</p>}
    </div>
  );
};

export default Checkout;
