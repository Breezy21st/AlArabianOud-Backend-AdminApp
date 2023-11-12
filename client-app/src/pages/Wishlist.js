import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { ImBin2 } from 'react-icons/im';

const Wishlist = () => {

  const dispatch = useDispatch();
  useEffect(() => {
     getWishlistFromDb() ;
  }, []);
  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist());
  };

  const wishlistState = useSelector ((state) => state.auth.wishlist.wishlist)
  const removeFromWishList = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(()=>{
      dispatch(getUserProductWishlist())
    },300);
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {
            wishlistState && wishlistState.length === 0 ? (
            <div
              className="text-center fs-3"
            >
              No Data
            </div>
            
            ):(
          
          
           wishlistState && wishlistState?.map((item, index) => {
              
              return(
                <div 
                className="col-3"
                key={index}
                >
            <div className="wishlist-card position-relative bg-white">
              <ImBin2 
                onClick={()=>{
                  removeFromWishList(item?._id)}}
                  src="images/cross.svg"
                  alt="cross"
                  className="position-absolute cross img-fluid"
                  >
              </ImBin2>
              
              <div className="wishlist-card-image ">
                <img
                  src={item?.images[0]?.url
                        ? item?.images[0]?.url
                      : "images/watch.jpg"}
                  className="img-fluid w-100 d-block mx-auto"
                  alt="prodImage"
                  width={160}
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                 {item?.title}
                </h5>
                <h6 className="price">R {item?.price}</h6>
              </div>
            </div>
          </div>
              )
            })
            )
          }


          
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
