import axios from 'axios';
import { config } from "../../utils/axiosConfig";
import { base_url } from '../../utils/baseUrl';

const register=async(userData)=> { 
    const response = await axios.post(`${base_url}user/register`, userData);
    if(response.data){
        
        return response.data;
    }
}

const login=async(userData)=> { 
    const response = await axios.post(`${base_url}user/login`, userData);
    if(response.data){
        if(response.data) {
            localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
    }
}

const getUserWishlist = async()=>{
    const response=await axios.get(`${base_url}user/wishlist`, config);
    if(response.data){
        return(response.data)
    }
}

const addToCart = async(cartData)=>{
    const response=await axios.post(`${base_url}user/cart`, cartData, config);
    if(response.data){
        return(response.data)
    }
}

const getCart = async()=>{
    const response=await axios.get(`${base_url}user/cart`, config);
    if(response.data){
        return(response.data)
    }
}

const removeProductFromCart = async (cartItemId) => {
    const response=await axios.delete(
        `${base_url}user/delete-product-cart/${cartItemId}`,
        config);
    if(response.data){
        return(response.data)
    }
}

const updateProductFromCart = async (cartDetail) => {
    console.log(cartDetail);
    const response=await axios.delete(
        `${base_url}user/update-product-cart/${cartDetail?.cartItemId}/${cartDetail.quantity}`,
        config);
    if(response.data){
        return(response.data)
    }
}

const createOrder = async (orderData) => {
    try {
      const response = await axios.post(`${base_url}user/cart/create-order`, orderData, config);
      return response.data; // This should include { order, internalPaymentID, success }
    } catch (error) {
      console.error('Error creating order:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Error creating order');
    }
  };
  
  const getOrders = async () => {
    const response = await axios.get(
      `${base_url}user/getallorders`, 
      
      config
      );
  
    return response.data;
  };
  const getOrder = async (id) => {
    const response = await axios.get(
      `${base_url}user/getaOrder/${id}`,
      config
    );
  
    return response.data;
  };


  // Function to get orders by user ID
const getOrdersByUserId = async (userId) => {
    try {
      const response = await axios.get(`${base_url}user/getorderbyuser/${userId}`, config);
      return response.data; // Assuming your backend is set to respond with order data
    } catch (error) {
      console.error(`Error fetching orders for user ID ${userId}:`, error);
      throw error;
    }
  };

  const updateUser = async (userData) => {
    const response = await axios.put(`${base_url}user/edit-user`, userData, config);
    return response.data;
  };
  
  const saveUserAddress = async (addressData) => {
    const response = await axios.put(`${base_url}user/save-address`, addressData, config);
    return response.data;
  };

  const forgotPassToken = async (data) => {
    const response = await axios.post(`${base_url}user/forgot-password-token`, data);
    return response.data;
  };

  const resetPass = async (data) => {
    const response = await axios.put(`${base_url}user/reset-password/${data.token}`, {password: data?.password});
    return response.data;
  };

  const applyCouponToCart = async (couponCode) => {
    try {
      const response = await axios.post(`${base_url}user/cart/apply-coupon`, { coupon: couponCode }, config);
      return response.data; // The expected response should be the total after discount
    } catch (error) {
      console.error('Error applying coupon:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Error applying coupon');
    }
  };
  
export const authService={
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getOrders,
    getOrder,
    getOrdersByUserId,
    updateUser,
    saveUserAddress,
    forgotPassToken,
    resetPass,
    applyCouponToCart

};