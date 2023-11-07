import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
const SpecialProduct = (props) => {
  const { title, brand, totalrating, price, sold, quantity, id, image }=props; 
  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div>
              <img src={image} className="img-fluid" alt="Perfume" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">
                  {title}

              </h6> Rating

              <ReactStars
                count={5}
                size={24}
                value={totalrating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">R {price}</span> &nbsp; 
                {/* <strike>R200</strike> */}
              </p>

              
              <div className="prod-count my-3">
                <p>Products in stock: {quantity - sold}</p>

              </div>
              <Link className="button" to={ '/product/'+id } >View</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
