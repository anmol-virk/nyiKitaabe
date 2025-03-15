import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import { Link } from "react-router-dom";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://bucherei-bts.vercel.app/categories");
        setCategories(response.data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const handleSearch = (query) => {
    setSearch(query)
  }
  return (
    <div className="container-fluid text-bg-light py-2">
      <Header onSearch={handleSearch} />
      <section className="container">
      <div className="row my-3">
          {categories.map((category) => (
            <div key={category._id} className="col-sm-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{category.name}</h5>
                  <p className="card-text">
                    Explore books in the {category.name} category.
                  </p>
                  <Link to={`/books?category=${category.name}`} className="btn btn-primary">
                    View {category.name} Books
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="text-center">
        <img
          src="https://images.stockcake.com/public/9/b/9/9b9d276d-8e20-4bd3-8fe6-521db45dbf1f_large/quaint-bookstore-exterior-stockcake.jpg"
          className="img-fluid"
        />
      </div>
    </div>
  );
}
