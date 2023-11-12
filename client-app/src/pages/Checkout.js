import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import* as yup from 'yup';
import { applyCoupon, createPaymentOrder } from '../features/user/userSlice';
import { toast } from "react-toastify";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { base_url } from "../utils/baseUrl";

const shippingSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address details are required"),
  province: yup.string().required("Province is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  zipcode: yup.string()
    .required("Zip Code is required")
    .matches(/^[0-9]{4}$/, "Zip Code must be exactly 4 digits")
    .test('is-within-range', 'Zip Code must be between 0001 and 9999', value => {
      const num = parseInt(value, 10);
      return num >= 1 && num <= 9999;
    }),
});

const calculateTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + (item.quantity * item.price);
  }, 0);
};

// page is static as it stands currently
const Checkout = () => {
  const dispatch = useDispatch()
  const cartState = useSelector((state) => state.auth.cartProducts)
  const orderState = useSelector((state) => state.auth.createdOrder)
  const userState = useSelector((state) => state.auth.user)
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const [totalAmount, setTotalAmount] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    let sum = cartState.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    setTotalAmount(sum);
    
  }, [cartState]);

  const handleApplyCoupon = () => {
    if (couponCode) {
      // Assuming applyCoupon is an async thunk you have already set up in userSlice
      dispatch(applyCoupon({ coupon: couponCode }))
        .unwrap()
        .then((newTotal) => {
          setTotalAmount(newTotal);
          setIsCouponApplied(true);
          toast.success("Coupon applied successfully!");
        })
        .catch((error) => {
          toast.error(`Failed to apply coupon: ${error.message || 'Unknown error'}`);
        });
    } else {
      toast.error("Please enter a coupon code.");
    }
  };
  

  const formik = useFormik({
    initialValues: {
      firstName: userState?.firstname || "",
      lastName: userState?.lastname || "",
      address: "",
      city: "",
      province: "",
      zipcode: "",
      country: "South Africa",
      other: ""
    },
 


    validationSchema: shippingSchema,
    onSubmit: (values) => {

      const paymentInfo = {
        // These should be provided after the payment process is completed
        // For now, you can use placeholders or remove these validations from your backend model if they are not applicable yet
        payfastPaymentId: "placeholder-payment-id",
        payfastOrderId: "placeholder-order-id",
      };

      const validCartItems = cartState.filter(item => item && item.productId && item.productId._id && item.quantity && item.productId.price);

      const orderItems = validCartItems.map(item => ({
        product: item.productId._id, // assuming productId is always there after filter
        quantity: item.quantity,
        price: item.productId.price,
      }));
      
      const orderData = {
        shippingInfo: values,
        orderItems: orderItems,
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount, // Modify as per discount logic if needed
        paymentInfo,
        orderStatus: "Ordered" 
      };
      dispatch(createPaymentOrder(orderData))
        .unwrap()
        .then(({ internalPaymentID }) => {
          // Proceed to payment
          handlePayment(internalPaymentID);
        })
        .catch(error => {
          toast.error(`Error creating order: ${error.message}`);
        });
    },
  });

  const handlePayment = async (internalPaymentID) => {
    try {
      // Send a request to your backend to initiate the payment process
      const response = await axios.post(`${base_url}user/payment/initiate`, {
        totalAmount, // Total amount to be paid
        userState, // User details, including first name, last name, and email
        internalPaymentID: internalPaymentID // The ID of the order just created
      }, config); // Pass any required Axios config, e.g., headers with tokens
 
      // Redirect user to PayFast for payment
      if (response.data && response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        // Handle any error or missing data
        toast.error('Failed to initiate payment process.');
      }
    } catch (error) {
      console.error('Failed to initiate payment:', error);
      toast.error('Payment initiation failed: ' + error.message);
    }
  };
  
  

  return (
    <>
      <Container class1="checkout-wrapper py-5">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Al Arabian Oud </h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details">
                Full Name: {userState?.firstname} {userState?.lastname} 
              </p>
              <p>
                Email Address: {userState?.email}
              </p>
              <h4 className="mb-3">Shipping Address</h4>


              <form onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select name="country" value={formik.values.country} onChange={formik.handleChange("country")} onBlur={formik.handleChange("country")} className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="South Africa">
                      South Africa
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.country && formik.errors.country
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName} 
                    onChange={formik.handleChange("firstName")} 
                    onBlur={formik.handleChange("firstName")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.firstName && formik.errors.firstName
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    value={formik.values.lastName} 
                    onChange={formik.handleChange("lastName")} 
                    onBlur={formik.handleChange("lastName")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.lastName && formik.errors.lastName
                    }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="address"
                    value={formik.values.address} 
                    onChange={formik.handleChange("address")} 
                    onBlur={formik.handleChange("address")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.address && formik.errors.address
                    }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="other"
                    value={formik.values.other} 
                    onChange={formik.handleChange("other")} 
                    onBlur={formik.handleChange("other")}
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    value={formik.values.city} 
                    onChange={formik.handleChange("city")} 
                    onBlur={formik.handleChange("city")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.city && formik.errors.city
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select 
                    className="form-control form-select" 
                    id=""
                    name="province"
                    value={formik.values.province} 
                    onChange={formik.handleChange("province")} 
                    onBlur={formik.handleChange("province")}
                      >
                    <option value="" selected disabled>
                      Select Province
                    </option>
                    <option value="Gauteng">
                      Gauteng
                    </option>
                    <option value="NorthWest">
                      NorthWest
                    </option>
                    <option value="KwaZuluNatal">
                      KwaZuluNatal
                    </option>
                    <option value="Limpopo">
                      Limpopo
                    </option>
                    <option value="EasternCape">
                      EasternCape
                    </option>
                    <option value="WesternCape">
                      WesternCape
                    </option>
                    <option value="NorthernCape">
                      NorthernCape
                    </option>
                  </select>
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.province && formik.errors.province
                    }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zip Code"
                    className="form-control"
                    name="zipcode"
                    value={formik.values.zipcode} 
                    onChange={formik.handleChange("zipcode")} 
                    onBlur={formik.handleChange("zipcode")}
                  />
                  <div className="error ms-2 my-1">
                    {
                      formik.touched.zipcode && formik.errors.zipcode
                    }
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/product" className="button">
                      Continue to Shopping
                    </Link>
                    <button className="button" type="submit"> Pay Now </button>

                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                Array.isArray(cartState) ? (cartState?.map((item, index) => {
                  return(
                  <div key={index} className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {item?.quantity}
                    </span>
                    <img width={100} height={100} src={item?.productId?.images[0].url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">Title:{item?.productId?.title} </h5>
                    <p className="total-price">Size: </p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">Price: R {item?.price * item?.quantity}</h5>
                </div>
              </div>
                  )
              } )) : (<p> No Items to checkout</p>) 
              }
              
            </div>
          <div className="coupon-input">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon Code"
                />
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>


            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">R {totalAmount?totalAmount: "0"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">R 60</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              {isCouponApplied && <p>Discount applied!</p>}
            <p>Total: R {isCouponApplied ? totalAmount : totalAmount + 60 /* Assuming 60 is shipping */}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};


export default Checkout;
