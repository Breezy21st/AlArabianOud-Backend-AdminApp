import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails, saveUserAddressDetails } from '../features/user/userSlice';
import { toast } from 'react-toastify';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  useEffect(() => {
    // Initialize form data with user information if available
    if (user) {
      setUserDetails({
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't prefill password for security reasons
      });
      // Assuming `address` is part of the user's data
      setAddressDetails(user.address || {
        address: '',
        city: '',
        postalCode: '',
        country: '',
      });
    }
  }, [user]);

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitUserDetails = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(userDetails))
      .unwrap()
      .then(() => {
        toast.success('User details updated successfully!');
      })
      .catch((error) => {
        toast.error(`Update failed: ${error.message || 'Could not update user details.'}`);
      });
  };

  const handleSubmitAddressDetails = (e) => {
    e.preventDefault();
    dispatch(saveUserAddressDetails(addressDetails))
      .unwrap()
      .then(() => {
        toast.success('Address details updated successfully!');
      })
      .catch((error) => {
        toast.error(`Update failed: ${error.message || 'Could not save address details.'}`);
      });
  };

  return (
    <div className="settings-container">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmitUserDetails}>
        <h2>Edit Profile</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleDetailChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleDetailChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleDetailChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      <form onSubmit={handleSubmitAddressDetails}>
        <h2>Shipping Address</h2>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={addressDetails.address}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={addressDetails.city}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={addressDetails.postalCode}
            onChange={handleAddressChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={addressDetails.country}
            onChange={handleAddressChange}
          />
        </div>
        <button type="submit">Update Address</button>
      </form>
    </div>
  );
};

export default Settings;
