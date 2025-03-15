import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { Link, useLocation } from "react-router-dom";
import { addToWishlist } from "./wishlistSlice";
import { fetchBooks } from "./BookSlice";
import { addToCart } from "./cartSlice";

const BookListing = () => {
  const dispatch = useDispatch()
  const { books: bookArray , status, error } = useSelector(state => state.books)

  const location = useLocation()
  const [ categoryFilter, setCategoryFilter ] = useState("All")
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("lowToHigh")

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBooks());
    }
  }, [dispatch, status]);
  console.log("Booksss:", bookArray);


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setCategoryFilter(category);
    }
  }, [location.search])

   
  const filteredBooks = bookArray.filter((book) => (categoryFilter === "All" || book.category?.name === categoryFilter)
   && book.rating >= ratingFilter
   && book.title.toLowerCase().includes(searchQuery.toLowerCase()))
.sort((a, b) => {
  if (sortOrder === "lowToHigh") {
    return a.price - b.price;
  } else if (sortOrder === "highToLow") {
    return b.price - a.price;
  }
})
console.log("Filtered Books: ", filteredBooks)
  const clearFilters = () => {
    setCategoryFilter("All");
    setRatingFilter(0);
    setSearchQuery("")
    setSortOrder("")
  };

  const handleSearch = (query) => {
    setSearchQuery(query)
  }
   
   const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoryFilter(selectedCategory);
  };
  return(
    <>
    <Header onSearch= {handleSearch} />
    <div className="container-fluid py-3">
      <div className="d-flex">
    <div className="p-3 border-end" style={{ width: "500px" }}>

    <label htmlFor="categoryFilter">Filter by Category:</label>
    <select id="categoryFilter" className="form-control" onChange={handleCategoryChange}>
      <option value="All">All Categories</option>
      <option value="Science">Science</option>
      <option value="Philosophy">Philosophy</option>
      <option value="Literature">Literature</option>
      <option value="Classic">Classic</option>
      <option value="History">History</option>
    </select>
   

    <div className="mt-3">
          <label htmlFor="ratingFilter">Filter by Minimum Rating: {ratingFilter}</label>
          <input
            type="range"
            id="ratingFilter"
            min="1"
            max="10"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="form-range"
          />
        </div>

        <div className="mt-3">
              <label>Sort by Price:</label>
              <div>
                <input
                  type="radio"
                  id="lowToHigh"
                  name="sortOrder"
                  value="lowToHigh"
                  checked={sortOrder === "lowToHigh"}
                  onChange={() => setSortOrder("lowToHigh")}
                />
                <label className="mx-1" htmlFor="lowToHigh">Low to High</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="highToLow"
                  name="sortOrder"
                  value="highToLow"
                  checked={sortOrder === "highToLow"}
                  onChange={() => setSortOrder("highToLow")}
                />
                <label className="mx-1" htmlFor="highToLow">High to Low</label>
              </div>
            </div>

        <button onClick={clearFilters} className="btn btn-secondary mt-3">
          Clear Filters
        </button>
        </div>

       <div className="flex-grow-1 p-3">
        <div className="row my-3">
        {status === "loading" && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {filteredBooks.map(book => (
        <div className="col-sm-4 mb-3 mb-sm-4" key={book._id}>
          <div className="card pb-3" style={{width: "20rem", maxHeight: "30rem",}} >
       
          <Link to={`/books/${book._id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
          <img src={book.imgUrl} style={{width: "20rem", maxHeight: "15rem"}} className="card-img-top" alt="image" />
          <div className="card-body">
            <h5 className="card-title">{book.title}</h5>
            <div className="card-text">Price: {book.price}</div>
            <div className="card-text">Rating: {book.rating}</div>
            <p className="card-text">Category: {book.category?.name}</p>
            </div>
            </Link>
                  <div className="d-flex mx-2">           
                  <button className="btn btn-primary mx-3" 
                  onClick={() => dispatch(addToWishlist(book))}
                  >Add to Wishlist</button><br/>
                  <button className="btn btn-primary" 
                  onClick={() => dispatch(addToCart(book))}
                  >Add to Cart</button>
                  </div>
            </div> 
        </div> 
        ))}
    </div>
    </div>
    </div>
    </div>
    </>
  )
};

export default BookListing;
