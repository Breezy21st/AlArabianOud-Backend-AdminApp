import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";



const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState({});
  const [totalAmount, setTotalAmount] = useState(null);
  
  const userCartState = useSelector((state) => state?.auth?.cartProducts) 
  
  
  useEffect(()=> {
    dispatch(getUserCart());
  }, []);

  useEffect(()=> {
    if(productUpdateDetail !== null ){
      dispatch(updateCartProduct({cartItemId: productUpdateDetail?.cartItemId, quantity:productUpdateDetail?.quantity}))
      setTimeout(() => {
        dispatch(getUserCart())
      }, 20);
    }
  }, [productUpdateDetail])
  
  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id))
    setTimeout(() => {
      dispatch(getUserCart())
    }, 20 )
  }

useEffect(() => {
 let sum=0;
 for (let index = 0; index < userCartState.length; index++) {
  sum = sum + (Number(userCartState[index].quantity) * userCartState[index].price)
  setTotalAmount(sum);
  setTimeout(() => {
    dispatch(getUserCart())
  }, 20 )
 }
}, [userCartState])



  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {Array.isArray(userCartState) ? (userCartState?.map((item, index) => {
              return(
              <div key={index} className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1 gap-15 d-flex align-items-center">
                <div className="w-25">
                
            <img src={item.productId.images[0].url} className="img-fluid" alt="product image" />

                  
                  </div>
                <div className="w-75">
                  <p>Title: {item?.productId.title} </p>
                  
                  
                </div>
              </div>
              <div className="cart-col-2">
                <h5 className="price"> R {item?.price} </h5>
              </div>
              <div className="cart-col-3 d-flex align-items-center gap-15">
                <div>
                  <input
                    className="form-control"
                    type="number"
                    name=""
                    min={1}
                    max={10}
                    id=""
                    value={productUpdateDetail.cartItemId === item?._id ? productUpdateDetail.quantity : item?.quantity}
                    onChange={(e) => {
                      setProductUpdateDetail({ cartItemId: item?._id, quantity: e.target.value });
                    }}
                  />
                </div>
                <div>
                  <AiFillDelete onClick={() => deleteACartProduct(item?._id)}  className="text-danger " />
                </div>
              </div>
              <div className="cart-col-4">
                <h5 className="price"> R {item?.price * item?.quantity} </h5>
              </div>
            </div> 
              )
            } )) : (<p>Your cart is empty</p>)
              
            }
            
          </div>
          
                      
          <div className="col-12 py-2 mt-4">
            <div className="d-flex justify-content-between align-items-baseline">
              <Link to="/product" className="button">
                Continue To Shopping
              </Link>
              {
                (totalAmount !== null || totalAmount !== 0) && 
                <div className="d-flex flex-column align-items-end">
                <h4>SubTotal: R {totalAmount}</h4>
                <p>Taxes and shipping calculated at checkout</p>
                <Link to="/checkout" className="button">
                  Checkout
                </Link>
              </div>
              }
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
