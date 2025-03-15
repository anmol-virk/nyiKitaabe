import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import BookListing from "./pages/BookListing";
import BookDetails from "./pages/BookDetails";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import store from "./app/store";
import AddressManagement from "./pages/AddressManagement";
import Checkout from "./pages/CheckOut";
import Profile from "./components/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/books",
    element: <BookListing />,
  },
  {
    path: "/books/:bookId",
    element: <BookDetails />
  },
  {
    path: "/wishlist",
    element: <Wishlist />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/addresses",
    element: <AddressManagement />,
  },
  {
    path: "/checkout",
    element: <Checkout />
  },
  {
    path: "/profile",
    element: <Profile />
  }
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
