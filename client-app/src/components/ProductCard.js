import React, {useState} from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
const ProductCard = (props) => {
  const { grid, data } = props;

  const dispatch = useDispatch();

  

  let location = useLocation();

  const addToWish = (id) => {
    
    dispatch(addToWishlist(id));
  }


  return (
    <>
      {Array.isArray(data) ? (
        data?.map((item, index) => {
        return (
          <div
          key={index}
          className={` ${
            location.pathname === "/product" ? `gr-${grid}` : "col-3"
          } `}
        >
          <div
            
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              <button 
                className="border-0 bg-transparent" 
                onClick={(e)=>{addToWish(item?._id)}}
              >
                
               <i class="wishlist-icon"> < AiOutlineHeart/>  </i>
              </button>
            </div>
            <div className="product-image">
              <img 
                src={item?.images[0]?.url} 
                className="img-fluid mx-auto" 
                alt="product" 
                width={160}
              />
              <img src={watch2} 
                className="img-fluid mx-auto" 
                alt="product2" 
                width={160}
              />
            </div>
            <div className="product-details">
              <h6 className="brand">{item?.brand}</h6>
              <h5 className="product-title">
                {item?.title}
              </h5>
              <ReactStars
                count={5}
                size={24}
                value={parseFloat(item?.totalrating)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className={`description ${
                grid === 12 ? "d-block" : "d-none"
                }`}
                dangerouslySetInnerHTML={{ __html: item?.description}}
                >
                
              </p>
              <p className="price">R {item?.price}</p>
              <Link 
                to={'/product/'+item?._id} 
                >
                  <button
                    className="view-btn border-0 bg-transparent position-absolute bottom-0 end-0 p-5"
                  > <img src={view} alt="view" /> View</button>
                </Link>
                
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">

                
                

              </div>
            </div>
          </div>
        </div>
        );
      })
      ) : (
        <p>No data Available.</p>
      )
      };
    
      
      
    </>
  );
};

export default ProductCard;
