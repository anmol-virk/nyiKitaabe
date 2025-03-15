import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from './wishlistSlice';
import { addToCart } from './cartSlice';
import Header from '../components/Header';

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Could not save wishlist to localStorage", error);
    }
  }, [wishlist])
  
  return (
    <>
    <Header />
    <div className='container py-3'>
      <h2 style={{textAlign: 'center'}}>Your Wishlist</h2>
      <div className='d-flex flex-wrap'>
      {wishlist.map(book => (
          <div className="card mb-4" key={book._id}  style={{width: "20rem", maxHeight: "30rem", marginLeft: "25px"}} >
  <img src={book.imgUrl} style={{width: "20rem", maxHeight: "15rem"}} className="img-fluid" />
  <div className="card-body">
    <h5 className="card-title">{book.title}</h5>
    <h4>{book.price || "nAN"}</h4>
    <button className='btn btn-primary' onClick={() => dispatch(addToCart(book))}>Add to Cart</button><br/>
          <button className='btn btn-danger' onClick={() => dispatch(removeFromWishlist(book._id))}>Remove from Wishlist</button>
  </div>
</div>
        
      ))}
      </div>
    </div>
    </>
  );
};
export default Wishlist;
