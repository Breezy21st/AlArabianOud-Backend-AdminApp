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

          export const getOrders = createAsyncThunk(
            "order/get-orders",
            async (thunkAPI) => {
              try {
                return await authService.getOrders();
              } catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
            }
          );
          
          export const getOrder = createAsyncThunk(
            "order/get-order",
            async (id, thunkAPI) => {
              try {
                return await authService.getOrder(id);
              } catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
            }
          );

          export const fetchOrdersByUserId = createAsyncThunk(
            'user/fetchOrdersByUserId',
            async (userId, thunkAPI) => {
              try {
                return await authService.getOrdersByUserId(userId);// Assuming that the response has a `data` field with the orders
              } catch (error) {
                return thunkAPI.rejectWithValue(error);
              }
            }
          );

          // Define async thunks
export const updateUserDetails = createAsyncThunk(
    'user/updateDetails',
    async (userData, { rejectWithValue }) => {
      try {
        const data = await authService.updateUser(userData);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const saveUserAddressDetails = createAsyncThunk(
    'user/saveAddress',
    async (addressData, { rejectWithValue }) => {
      try {
        const data = await authService.saveUserAddress(addressData);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
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
    // ordersByUserId: [],
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
        .addCase(getOrders.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrders.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.orders = action.payload;
            state.message = "success";
          })
          .addCase(getOrders.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(getOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getOrder.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.singleorder = action.payload;
            state.message = "success";
          })
          .addCase(getOrder.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(fetchOrdersByUserId.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchOrdersByUserId.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.ordersByUserId = action.payload;
            state.message = "success";
          })
          .addCase(fetchOrdersByUserId.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(updateUserDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updateUserDetails.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.updateUserDetails = action.payload;
            state.message = "success";
          })
          .addCase(updateUserDetails.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
          .addCase(saveUserAddressDetails.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(saveUserAddressDetails.fulfilled, (state, action) => {
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.saveUserAddress = action.payload;
            state.message = "success";
          })
          .addCase(saveUserAddressDetails.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            state.isLoading = false;
          })
    },
});

export default authSlice.reducer;
