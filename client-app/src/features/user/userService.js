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

export const authService={
    register,
    login,
    getUserWishlist,
    addToCart,

};