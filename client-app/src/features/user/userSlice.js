import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk('auth/register',async (userData,thunkAPI) => {
    try {
        console.log('Attempting registration with data:', userData);
        const response = await authService.register(userData);
        console.log('Registration successful. Response:', response);
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const loginUser = createAsyncThunk('auth/login',async (userData,thunkAPI) => {
    try {
        console.log('Attempting registration with data:', userData);
        const response = await authService.login(userData);
        console.log('Registration successful. Response:', response);
        return response;
    } catch (error) {
        console.error('Registration error:', error);
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist=createAsyncThunk(
    "user/wishlist", 
    async (thunkAPI) => {
        try{
            return await authService.getUserWishlist();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    })

export const addProdToCart = createAsyncThunk(
        "user/cart/add", 
        async (cartData, thunkAPI) => {
            try{
                return await authService.addToCart(cartData);
            } catch (error) {
                return thunkAPI.rejectWithValue(error);
            }
        })

        export const getUserCart = createAsyncThunk(
            'user/cart/get', 
            async ( thunkAPI) => {
            try {
                return await authService.getCart();
                
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        });
        
        
        export const deleteCartProduct = createAsyncThunk(
            'user/cart/product/delete', 
            async (id, thunkAPI) => {
            try {
                return await authService.removeProductFromCart(id);
                
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        });

        export const updateCartProduct = createAsyncThunk(
            'user/cart/product/update', 
            async (cartDetail, thunkAPI) => {
            try {
                return await authService.updateProductFromCart(cartDetail);
                
            } catch (error) {
                return thunkAPI.rejectWithValue(error.message);
            }
        });

        export const createPaymentOrder = createAsyncThunk(
            "user/create-order", 
            async (orderData, thunkAPI) => {
              try {
                const response = await authService.createOrder(orderData);
                // Here you handle the response which includes the internalPaymentID
                return response;
              } catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
            }
          );


const getCustomerFromLocalStorage = localStorage.getItem("customer")
? JSON.parse(localStorage.getItem("customer"))
: null;



const initialState={
    user:getCustomerFromLocalStorage,
    wishlist: [],
    cartProducts: [],
    createdOrder: [],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
};



export const authSlice = createSlice({
    name: "auth",
    initialState:initialState,

    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser = action.payload;
            if(state.isSuccess===true){
                toast.info("User Created Successfully");
            }
        }).addCase(registerUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true) {
                toast.error(action.error)
            }
            
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload;
            
            if(state.isSuccess===true){
                localStorage.setItem("token",action.payload.token)
                toast.info("User Logged In Successfully");
            }
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isError===true) {
                toast.error(action.error.message || "Incorrect email or password, try again.")
            }
        })
        .addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUserProductWishlist.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist = action.payload;
        })
        .addCase(getUserProductWishlist.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(addProdToCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addProdToCart.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProducts = action.payload;
            if(state.isSuccess) {
                toast.success("Product Added To Cart")
            }
        })
        .addCase(addProdToCart.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(getUserCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUserCart.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cartProducts = action.payload;
            
        })
        .addCase(getUserCart.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        .addCase(deleteCartProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(deleteCartProduct.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.deletedCartProduct = action.payload;
            if(state.isSuccess) {
                toast.success("Product Deleted From Cart Successfully!")
            };
            
        })
        .addCase(deleteCartProduct.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if(state.isSuccess===false) {
                toast.error("Something Went Wrong!")
            };
        })
        .addCase(updateCartProduct.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateCartProduct.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.updatedCartProduct = action.payload;
            if(state.isSuccess) {
                toast.success("Product Updated Cart Successfully!")
            };
            
        })
        .addCase(updateCartProduct.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        })
        .addCase(createPaymentOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(createPaymentOrder.fulfilled,(state, action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdOrder = action.payload;
            if(state.isSuccess) {
                toast.success("Your payment was successful and your order is being processed")
            };
            
        })
        .addCase(createPaymentOrder.rejected,(state, action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            
        })
    },
});

export default authSlice.reducer;
