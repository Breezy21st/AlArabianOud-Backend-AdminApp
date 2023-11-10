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
    getOrder

};