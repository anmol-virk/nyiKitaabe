import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom"
import Header from "../components/Header"
import { fetchBooks } from "./BookSlice"
import { addToWishlist } from "./wishlistSlice"
import { addToCart } from "./cartSlice"

const BookDetails = () => {
   const { bookId } = useParams()
   const dispatch = useDispatch()

   useEffect(() => {
    dispatch(fetchBooks())
   }, [dispatch])
   const {books: bookArray} = useSelector((state) => state.books)

    const bookData = bookArray.find((book) => book._id === bookId)
    return(
        <>
        <Header />
        <div className="container-fluid py-3">
      <div className="d-flex">
    <div className="p-3 border-end" style={{ width: "650px" }}>
    <div className="card">
  <img src={bookData.imgUrl} style={{ maxHeight: "15rem", objectFit: "cover", borderRadius: "5px" }} className="card-img-top" alt="Image" />
  <div className="card-body">
    <h5 className="card-title">{bookData.title}</h5>
    <p className="card-text">Price: ${bookData.price}</p>
    <button className="btn btn-primary mb-2" onClick={() => dispatch(addToWishlist(bookData))}>Add to Wishlist</button><br/>
    <button className="btn btn-outline-secondary" onClick={() => dispatch(addToCart(bookData))} >Add to Cart</button>
                            
  </div>
</div>
        </div>
      
        <div className="flex-grow-1 p-3" key={bookData._id}>
            <p className="fs-3">{bookData.title}</p>
            <h2>${bookData.price}</h2>
            <ul><strong>Description:</strong>
                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li>
                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li>
                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li>
                <li> Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</li>
            </ul>
            </div>
            </div>
            </div>
            <hr />
            <div className="container">
                <h2>More Books you may like here</h2>
                
            </div>
        </>
    )
}

export default BookDetails