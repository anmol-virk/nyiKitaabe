import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addAddressAsync, updateAddressAsync, deleteAddressAsync, selectAddress, fetchAddresses } from '../pages/AddressSlice';
import { Link } from 'react-router-dom';

const AddressManagement = () => {
  const addresses = useSelector(state => state.addresses.addresses);
  const selectedAddressId = useSelector(state => state.addresses.selectedAddressId);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ id: null, address: '', city: '', state: '', zipCode: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = () => {
    if (isEditing) {
      dispatch(updateAddressAsync(form));
    } else {
      dispatch(addAddressAsync(form));
    }
    setForm({ id: null, address: '', city: '', state: '', zipCode: '' });
    setIsEditing(false);
  };

  const handleEdit = (address) => {
    setForm(address);
    setIsEditing(true);
  };

  return (
    <div className="container py-3">
      <h2>Manage Addresses</h2>
      <form className='col-md-8' onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <input 
        className='form-control'
          type="text" 
          placeholder="Address" 
          value={form.address} 
          onChange={(e) => setForm({ ...form, address: e.target.value })} 
        />
        <input 
        className='form-control'
          type="text" 
          placeholder="City" 
          value={form.city} 
          onChange={(e) => setForm({ ...form, city: e.target.value })} 
        />
        <input 
        className='form-control'
          type="text" 
          placeholder="State" 
          value={form.state} 
          onChange={(e) => setForm({ ...form, state: e.target.value })} 
        />
         <input 
         className='form-control'
          type="text" 
          placeholder="Zipcode" 
          value={form.zipCode} 
          onChange={(e) => setForm({ ...form, zipCode: e.target.value })} 
        />
        <button className='btn btn-primary' type="submit">{isEditing ? 'Update' : 'Add'}</button>
      </form>

      <div className='card my-3 col-md-8'>
      <ul className='list-group list-group-flush '>
        {addresses.map(addr => (
          <li className='list-group-item' key={addr._id}>
            <div>{addr.address} - {addr.city} - {addr.state} - {addr.zipCode}</div>
            <div className='btnGroup'>
            <button className=' btn btn-primary' onClick={() => dispatch(selectAddress(addr._id))}>
              {selectedAddressId === addr._id ? 'Selected' : 'Select'}
            </button>
            <button className=' btn btn-secondary' onClick={() => handleEdit(addr)}>Edit</button>
            <button className='my-2 btn btn-danger' onClick={() => dispatch(deleteAddressAsync(addr._id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <Link className='btn btn-primary' to="/checkout">Checkout</Link>
    </div>
  );
};

export default AddressManagement;
