# My Book Store

An online bookstore built using React, Express and MongoDB that allows users to browse, search, and purchase books with a smooth shopping experience.

---
## Demo Link
[Live Demo](https://www.loom.com/share/fa6b3f6b350446b496fdaff6b0c4a3b0?sid=f0791cdf-b8d1-43e3-8537-854ef12732fe)

---
## Quick Start
```
git clone https://github.com/anmol-virk/nyiKitaabe.git
cd <nyiKitaabe>
npm install
npm start
```

---

## Technologies
- React JS
- React Router
- Node JS
- Express
- MongoDB
- JWT

---

## Features
**Home**
- Display a list of all Books Categories
- Navbar to navigate to Cart, Wishlist and User

**Category Details**
- Display books of selected Category
- filter books by ratings and category
- Search bar to search a book by its Title
- Sorting books by price and a button to clear filters

**Wishlist**
- Display books that are added to wishlist
- Button to remove the book from wishlist or to add to Cart

**Cart**
- Display books that are added to Cart
- Display the quantity and total amount of Books
- Button to select or add a new address to deliver books
- Finally a checkout button to place an order.

---
## API Reference
### **GET /api/categories**
Get all the categories

### **GET /api/categories/:categoryId**
Get the category by its ID

### **GET /api/books**
Get all the Books

### **GET /api/books/:bookId**
Get the specific book by its ID

### **Post /api/addresses<br>**
To add a new Address

### **Post /api/addresses/:id**
To update an existing Address

### **DELETE /api/addresses/:id**
To delete an existing address

---

## Contact

For bugs or feature request, please reach out to anmolthisside@gmail.com