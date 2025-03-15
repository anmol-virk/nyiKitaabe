import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = ({onSearch}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if(onSearch){
      onSearch(e.target.value);

    }
  }
  return(
    <>
  <header className="bg-lightgrey text-dark py-3">
    <nav className="container">
      <div className="roww">
      <p className="title"><a className="navbar-brand" href="/">My Book Store</a></p>
      <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control d-inline-block w-50 ms-3"
        />
        <ul className="nav">
        <li className="nav-item"><NavLink className="nav-link" to="/cart">Cart</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/wishlist">Wishlist</NavLink></li>
        <li className="nav-item"><NavLink className="nav-link" to="/profile">User</NavLink></li>
      </ul>
      </div>
    </nav>
  </header>
  </>
  )
}

export default Header;
