import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from './cartSlice';
import { addToWishlist } from './wishlistSlice';
import AddressManagement from './AddressManagement';
import Header from '../components/Header';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  console.log("cart:", cart)
  const dispatch = useDispatch();
  
  const totalPrice = cart.reduce((sum, book) => sum + book.price * book.quantity, 0);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart to localStorage", error);
    }
  }, [cart])


  return (
    <>
    <Header />
    <div className='container text-bg-light py-3'>
      <h2 style={{textAlign: "center"}} className='mb-4'>Your Cart</h2>
      {cart.map(book => (
        <div key={book._id}>
          <div className="card mb-3" style={{ margin: "10px", width: "60%", }}>
  <div className="row g-0">
    <div className="col-md-4">
      <img src={book.imgUrl} className="img-fluid rounded-start" style={{ height: "100%", objectFit: "cover", borderRadius: "15px" }} />
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">{book.price || "nan"}</p>
        Quantity: <button className='mx-2 my-1' onClick={() => dispatch(increaseQuantity(book._id))}>+</button>
        {book.quantity}
          <button className='mx-2 my-1' onClick={() => dispatch(decreaseQuantity(book._id))}>-</button><br/>
          <button className='btn btn-danger mx-2 my-1' onClick={() => dispatch(removeFromCart(book._id))}>Remove From Cart</button><br/>
          <button className='btn btn-primary' onClick={() => dispatch(addToWishlist(book))}>
            Move to Wishlist
          </button>
          <p>Total for this Book: ${book.price * book.quantity}</p>
      </div>
    </div>
  </div>
</div>
        </div>
      ))}
      <hr/>
      <AddressManagement />
    </div>
    </>
  );
};

export default Cart;
