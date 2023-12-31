const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const Cart = require("../models/cartModel");
const Product = require('../models/productModel');
const Coupon = require('../models/couponModel');
const Order =  require('../models/orderModel');
const uniqid = require('uniqid'); 
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbid');
const { generateRefreshToken } = require('../config/refreshtoken');
const jwt = require('jsonwebtoken');
const sendEmail =require('./emailCtrl');
const crypto = require('crypto');
const { log } = require('console');


//create a user
const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if(!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        //user already exists
        throw new Error("User Already Exists");
    }
});

//Login a user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password} = req.body;
    //check if user exists
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id, 
            {
                refreshToken: refreshToken,
            },
            {
                new: true.valueOf,
            });
        res.cookie('refreshToken', refreshToken, 
        {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        })
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });

    } else {
        throw new Error("Invalid Credentials");
    }
    
});

// admin login
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists or not
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== "admin") throw new Error("Not Authorised");
    if (findAdmin && (await findAdmin.isPasswordMatched(password))) {
      const refreshToken = await generateRefreshToken(findAdmin?._id);
      const updateuser = await User.findByIdAndUpdate(
        findAdmin.id,
        {
          refreshToken: refreshToken,
        },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.json({
        _id: findAdmin?._id,
        firstname: findAdmin?.firstname,
        lastname: findAdmin?.lastname,
        email: findAdmin?.email,
        mobile: findAdmin?.mobile,
        token: generateToken(findAdmin?._id),
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  });

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    console.log(cookie);
    if(!cookie?.refreshToken) throw new Error('No Refresh Token in Cookies');

    const refreshToken = cookie.refreshToken;
    

    const user = await User.findOne({ refreshToken });
    if(!User) throw new Error('No Refresh Token Present in db or not matched');
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('Ther is something wrong with refresh token');

        } 

        const accessToken = generateToken(user?._id);
        res.json({ accessToken });

    });
});

//logout functionality

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshToken;
    
    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
      });
      return res.sendStatus(204); // forbidden
    }
    
    await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" });
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    res.sendStatus(204); // forbidden
  });
  

//Update a user
const updatedUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);

    try {
        const updatedUser = await User.findByIdAndUpdate(
        _id, 
        {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        }, 
        {
            new: true,
        }
        );
        res.json(updatedUser);

    } catch (error){
        throw new Error(error);
    }
});

// save user Address

const saveAddress = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all users

const getallUser = asyncHandler(async (req, res) => {
    
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }
    catch (error) {
        throw new Error(error);
    }
});

//Get a Single User

const getaUser = asyncHandler(async (req, res) => {

    
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const getaUser = await User.findById(id);
        res.json({
            getaUser,
        });
    } 
    catch (error) {
        throw new Error(error);

    }
});


//delete a user
const deleteaUser = asyncHandler(async (req, res) => {

    console.log(req.params);
    const { id } = req.params;
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({
            deleteaUser,
        });
    } 
    catch (error) {
        throw new Error(error);

    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const blockusr = await User.findByIdAndUpdate(
            id, 
            {
                isBlocked: true,
            }, 
            {
                new: true,
            }
         ); 
         res.json(blockusr);
         
    } catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
        const unblock = await User.findByIdAndUpdate(
            id, 
            {
                isBlocked: false,
            }, 
            {
                new: true,
            }
         ); 
         res.json({
            message: "User Unblocked",
         });
    } catch (error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
    const user = await User.findById(_id);
    if (password) {
      user.password = password;
      const updatedPassword = await user.save();
      res.json(updatedPassword);
    } else {
      res.json(user);
    }
  });

  const forgotPasswordToken = asyncHandler(async (req, res) => {
    const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "No Reply",
      subject: "Forgot Password Link",
      html: resetURL,
    };
    sendEmail(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) throw new Error(" Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
  });

  const getWishlist = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    try {
      const findUser = await User.findById(_id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  });


  // const userCart = asyncHandler(async (req, res) => {
  //   const { cart } = req.body;
  //   const { _id } = req.user;
  //   validateMongoDbId(_id);
  //   try {
  //     let products = [];
  //     const user = await User.findById(_id);
  //     // check if user already have product in cart
  //     await Cart.deleteMany({ orderby: user._id });

  //     for (let i = 0; i < cart.length; i++) {
  //       let object = {};
  //       object.product = cart[i]._id;
  //       object.count = cart[i].count;
  //       object.color = cart[i].color;
  //       let getPrice = await Product.findById(cart[i]._id).select("price").exec();
  //       object.price = getPrice.price;
  //       products.push(object);
  //     }
      
  //     let cartTotal = products.reduce((total, product) => total + product.price * product.count, 0);


  //     let newCart = await new Cart({
  //       products,
  //       cartTotal,
  //       orderby: user._id,
  //     }).save();
  //     res.json(newCart);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // });
  
  const userCart = asyncHandler(async (req, res) => {
    const { productId, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
  
    try {
      // Create a new cart entry for the user
      const newCart = await new Cart({
        userId: _id,
        productId,
        quantity,
        price,
      }).save();
      
      res.json(newCart);
    } catch (error) {
      throw new Error(error);
    }
  });
  
  
  const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    
    try {
      // Retrieve the user's cart and populate the product information
      const cart = await Cart.find({ userId: _id }).populate("productId");
      res.json(cart);
    } catch (error) {
      throw new Error(error);
    }
  });
  

// const emptyCart = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const user = await User.findOne({ _id });
//     const cart = await Cart.findOneAndRemove({ userId: user._id });
//     res.json(cart);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

const removeProductFromCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);

  try {
   
    const deleteProductFromCart = await Cart.deleteOne({userId: _id, _id: cartItemId});
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
})

const updateProductQuantityFromCart = asyncHandler(async (req, res) =>{
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);

  try {
    const cartItem = await Cart.findOne({userId: _id, _id: cartItemId});
    
    cartItem.quantity = newQuantity
    cartItem.save()
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

const createOrder = asyncHandler(async (req, res) => {
  // Extract data from request body
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
    orderStatus
  } = req.body;

  // Extract user ID from request user
  const { _id: userId } = req.user;

  // Initialize session variable
  let session = null;

  try {
    // Start transaction session
    session = await mongoose.startSession();
    session.startTransaction();

    // Create order with session and structure as an array
    const order = await Order.create([{
      user: userId,
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
      orderStatus
    }], { session });

    // If order creation was successful but the order object is still not structured correctly
    if (!order || !Array.isArray(order) || !order.length || !order[0]._id) {
      throw new Error('Order creation failed');
    }

    // Convert the order ID to string format
    const internalPaymentID = order[0]._id.toString();

    // Clear the cart after order creation using the user ID and session
    await Cart.deleteMany({ user: userId }, { session });

    // Update the product quantities
    for (const item of orderItems) {
      // Since the product ID is a string, use it directly
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { quantity: -item.quantity, sold: item.quantity } },
        { session, new: true }
      );
    }

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Respond with order and payment information
    res.json({
      order: order[0],
      internalPaymentID,
      success: true
    });
  } catch (error) {
    // Abort transaction in case of error
    if (session) {
      await session.abortTransaction();
    }
    console.error('Order creation failed:', error);
    res.status(500).json({ message: "Error creating order", error: error.toString() });
  } finally {
    // End session if it exists
    if (session) {
      session.endSession();
    }
  }
});



const applyCoupon = asyncHandler(async (req, res) => {
 
  const { _id } = req.user;
  validateMongoDbId(_id);

  let { coupon } = req.body;
  
  // Convert coupon to a string if it's not already one
  if (coupon && typeof coupon !== 'string') {
    // If it's an object with a 'coupon' field, access that field instead
    if (typeof coupon === 'object' && coupon.coupon) {
      coupon = coupon.coupon;
    } else {
      // If coupon is something else, cast it to a string or throw an error
      coupon = String(coupon);
    }
  }

  // Add a check for empty string after conversion
  if (!coupon) {
    throw new Error("Coupon code is empty");
  }

  const validCoupon = await Coupon.findOne({ name: coupon.toUpperCase() });
  if (validCoupon === null) {
    throw new Error("Invalid Coupon");
  }

  const user = await User.findOne({ _id });
  const cartItems = await Cart.find({ userId: user._id }).populate('productId');

  if (!cartItems) {
    throw new Error("No cart found for this user");
  }

  let cartTotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
// Assign cartTotal directly without destructuring

  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
});


// const createOrder = asyncHandler(async (req, res) => {
//   const { COD, couponApplied } = req.body;
//   const { _id } = req.user;
//   validateMongoDbId(_id);

//   try {
//     if (!COD) throw new Error("Create cash order failed");

//     const user = await User.findById(_id);
//     let userCart = await Cart.findOne({ orderby: user._id });

//     let finalAmount = 0;
//     let totalAfterDiscount = 0;
//     let totalPrice = 0;

//     // Calculate total prices
//     for (const product of userCart.products) {
//       totalPrice += product.price * product.count;
//       totalAfterDiscount += product.price * product.count; // Assuming no discount
//     }

//     // Apply discount if applicable
//     if (couponApplied && userCart.totalAfterDiscount) {
//       totalAfterDiscount = userCart.totalAfterDiscount;
//       finalAmount = totalAfterDiscount;
//     } else {
//       finalAmount = totalPrice;
//     }

//     let newOrder = await new Order({
//       products: userCart.products,
//       totalAfterDiscount,
//       totalPrice,
//       paymentIntent: {
//         id: uniqid(),
//         method: "COD",
//         amount: finalAmount,
//         status: "Cash on Delivery",
//         created: Date.now(),
//         currency: "zar",
//       },
//       orderby: user._id,
//       orderStatus: "Cash on Delivery",
//     }).save();

//     let update = userCart.products.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.product._id },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await Product.bulkWrite(update, {});

//     res.json({ message: "success" });
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  const user = req.user;
  validateMongoDbId(user._id);

  const orders = await Order.find({ user: user._id }).populate('orderItems.product');
  res.json(orders);
};


// const getOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   validateMongoDbId(_id);
//   try {
//     const userorders = await Order.findOne({ orderby: _id })
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// Get all orders (Admin)
const getAllOrders = async (req, res) => {
  // This should be protected and only accessible by admins
  const orders = await Order.find().populate('user', 'name').populate('orderItems.product');
  res.json(orders);
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  validateMongoDbId(orderId);

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.orderStatus = req.body.status;
  const updatedOrder = await order.save();
  res.json(updatedOrder);
};

// const getAllOrders = asyncHandler(async (req, res) => {
//   try {
//     const alluserorders = await Order.find()
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(alluserorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const updateOrderStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const updateOrderStatus = await Order.findByIdAndUpdate(
//       id,
//       {
//         orderStatus: status,
//         paymentIntent: {
//           status: status,
//         },
//       },
//       { new: true }
//     );
//     res.json(updateOrderStatus);
//   } catch (error) {
//     throw new Error(error);
//   }
// });


// Get orders by user ID (Admin)
const getOrderByUserId = async (req, res) => {
  const user = req.user;
  validateMongoDbId(user._id);

  const orders = await Order.find({ user: user._id }).populate('orderItems.product');
  res.json(orders);
};

// Get a single order by order ID
const getSingleOrder = async (req, res) => {
  const orderId = req.params.id;
  validateMongoDbId(orderId);

  const order = await Order.findById(orderId).populate('orderItems.product');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  res.json(order);
};
// const getOrderByUserId = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const userorders = await Order.findOne({ orderby: id })
//       .populate("products.product")
//       .populate("orderby")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// Update order (General user)
const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  validateMongoDbId(orderId);

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Update the order with new info from req.body if needed
  // ...

  const updatedOrder = await order.save();
  res.json(updatedOrder);
};

// const getMyOrders = asyncHandler(async (req, res) => {
//   const { _id } = req.user;

//   try {
//     const orders = await Order.find({ user:_id })
    
//     res.json({
//       orders
//     })
//   } catch (error) {
//     throw new Error(error)
//   }
// })

// const getSingleOrders = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const orders = await Order.findOne({ _id: id })
//     .populate("products.product")
//     .populate("orderby");
//     res.json({
//       orders
//     })
//   } catch (error) {
//     throw new Error(error)
//   }
// })

// const updateOrder = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   validateMongoDbId(id);
//   try {
//     const orders = await Order.findById(id)
//     orders.orderStatus = req.body.status;
//     await Order.save()

//     res.json({
//       orders
//     })
//   } catch (error) {
//     throw new Error(error)
//   }
// })
const getMonthWiseOrderIncome = async (req, res) => {
   let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date();
  let endDate= "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth()-1)
    endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
  }



  const data=await Order.aggregate([
    {
      $match: {
        createdAt:{
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    }, 
    {  
      $group: {
      _id: {
        month: { $subtract: [{$month: "$createdAt"}, 1]  },
      }, amount: {$sum: "$totalPriceAfterDiscount"},
      count: {$sum: 1}

    }
    }

  ])

  res.json(data)
  
};

const getYearlyTotalOrders = async (req, res) => {
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let d = new Date();
  let endDate= "";
  d.setDate(1)
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth()-1)
    endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
  }
  const data=await Order.aggregate([
    {
      $match: {
        createdAt:{
          $lte: new Date(),
          $gte: new Date(endDate)
        }
      }
    }, 
    {  
      $group: {
      _id: null, 
      count: {$sum: 1},
      amount: {$sum: "$totalPriceAfterDiscount"}
    }
    }

  ])

  res.json(data)
};

module.exports = {
  getMonthWiseOrderIncome,
  getYearlyTotalOrders
};


// const getMonthWiseOrderIncome = asyncHandler(async (req, res) => {
//   let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   let d = new Date();
//   let endDate= "";
//   d.setDate(1)
//   for (let index = 0; index < 11; index++) {
//     d.setMonth(d.getMonth()-1)
//     endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
//   }
//   const data=await Order.aggregate([
//     {
//       $match: {
//         createdAt:{
//           $lte: new Date(),
//           $gte: new Date(endDate)
//         }
//       }
//     }, 
//     {  
//       $group: {
//       _id: {
//         month: "$month"
//       }, amount: {$sum: "$totalAfterDiscount"},
//       count: {$sum: 1}

//     }
//     }

//   ])

//   res.json(data)
// });

// const getYearlyTotalOrders = asyncHandler(async (req, res) => {
//   let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
//   let d = new Date();
//   let endDate= "";
//   d.setDate(1)
//   for (let index = 0; index < 11; index++) {
//     d.setMonth(d.getMonth()-1)
//     endDate=monthNames[d.getMonth()]+ " " + d.getFullYear()
//   }
//   const data=await Order.aggregate([
//     {
//       $match: {
//         createdAt:{
//           $lte: new Date(),
//           $gte: new Date(endDate)
//         }
//       }
//     }, 
//     {  
//       $group: {
//       _id: null, 
//       count: {$sum: 1},
//       amount: {$sum: "$totalAfterDiscount"}
//     }
//     }

//   ])

//   res.json(data)

// });

module.exports = { createUser,
     loginUserCtrl, 
     getallUser, 
     getaUser, 
     deleteaUser, 
     updatedUser, 
     blockUser, 
     unblockUser, 
     handleRefreshToken, 
     logout,
     updatePassword,
     forgotPasswordToken, 
     resetPassword,
     loginAdmin,
     getWishlist,
     saveAddress, 
     userCart,
     getUserCart,
    //  emptyCart,
    applyCoupon,
     createOrder,
    //  getOrders,
     updateOrderStatus,
     getAllOrders,
     getOrderByUserId,
    //  getMyOrders,
     getMonthWiseOrderIncome,
     getYearlyTotalOrders,
     getSingleOrder,
     updateOrder,
     removeProductFromCart,
     updateProductQuantityFromCart,
     };