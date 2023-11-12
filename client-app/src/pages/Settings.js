import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserDetails, saveUserAddressDetails } from '../features/user/userSlice'; 
import CustomInput from '../components/CustomInput';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
export const Settings = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
  });

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };



  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Dispatch the updateUserDetails action with the user information
      await dispatch(updateUserDetails({
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
      })).unwrap();

      // Dispatch the saveUserAddressDetails action with the address information
      await dispatch(saveUserAddressDetails({
        address: userDetails.address,
      })).unwrap();

      
      toast.success("User details updated successfully")
    } catch (error) {
      toast.error("Error Updating User details")
      console.error('Failed to update user details or address:', error);
    }
  };


  return (
    <div className="settings-container">
      <h1>User Settings</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          classname="first-name"
          value={userDetails.firstName}
          onChange={handleInputChange}
        />
        <CustomInput
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          classname="last-name"
          value={userDetails.lastName}
          onChange={handleInputChange}
        />
        <CustomInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          classname="email"
          value={userDetails.email}
          onChange={handleInputChange}
        />
        <CustomInput
          type="text"
          name="mobileNumber"
          label="Mobile Number"
          placeholder="Enter your mobile number"
          classname="mobile-number"
          value={userDetails.mobileNumber}
          onChange={handleInputChange}
        />
        <CustomInput
          type="text"
          name="address"
          label="Address"
          placeholder="Enter your address"
          classname="address"
          value={userDetails.address}
          onChange={handleInputChange}
        />

        <div className="submit-button-container">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
       
      </form>

      <div className="submit-button-container py-3">
        <Link to="/forgot-password" className="btn btn-primary text-dark bg-transparent">
            Reset password
          </Link>
        </div>
    </div>
  );
};

export default Settings;
