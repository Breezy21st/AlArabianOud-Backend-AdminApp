const express = require('express');
const { createUser,
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
    // emptyCart,
    // applyCoupon,
    createOrder,
    // getOrders,
    updateOrderStatus,
    getAllOrders,
    getOrderByUserId,
    getMonthWiseOrderIncome,
    getYearlyTotalOrders,
    // getMyOrders,
    getSingleOrder,
    removeProductFromCart,
    updateProductQuantityFromCart} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');

const {
    initiateOnsitePayment,
    handleITN,
  } = require('../controller/paymentCtrl');

const router = express.Router();


router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.post('/login', loginUserCtrl);
router.post("/admin-login", loginAdmin);

// Payment routes
router.post('/payment/initiate', authMiddleware, initiateOnsitePayment);

// The route for handling ITN post-back from PayFast
router.post('/payment/itn', handleITN);

router.post("/cart/create-order", authMiddleware, createOrder);

router.post("/cart", authMiddleware, userCart);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);

router.get('/all-users', getallUser);
// router.get("/get-orders", authMiddleware, getOrders);
// router.get("/getmyorders", authMiddleware, getMyOrders);
router.get("/getallorders", authMiddleware, isAdmin, getAllOrders);
router.get("/getaOrder/:id", authMiddleware, getSingleOrder);
router.put("/updateOrder/:id", authMiddleware, isAdmin, updateOrderStatus)
router.get("/getorderbyuser/:id", authMiddleware, getOrderByUserId);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);

router.get("/getyearlyorders", authMiddleware, getYearlyTotalOrders);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);

router.get('/:id', authMiddleware, isAdmin, getaUser);

// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete("/delete-product-cart/:cartItemId", authMiddleware, removeProductFromCart);
router.delete("/update-product-cart/:cartItemId/:newQuantity", authMiddleware, updateProductQuantityFromCart);
router.delete('/:id', deleteaUser);
router.put(
    "/order/update-order/:id",
    authMiddleware,
    isAdmin,
    updateOrderStatus
  );
router.put('/edit-user', authMiddleware, updatedUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


module.exports = router;