import React, { useEffect } from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Hero from '../images/Hero-image.png';
import Perfume from '../images/Perfume.jpeg';
import Oud from '../images/oud.jpeg';
import Scarves from '../images/scarves.jpeg';
import Difuser from '../images/diffuser.png';
import {CiDeliveryTruck} from 'react-icons/ci';
import {PiConfettiThin} from 'react-icons/pi';
import {BiSupport} from 'react-icons/bi';
import {MdPriceCheck} from 'react-icons/md';
import {RiSecurePaymentFill} from 'react-icons/ri';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import  moment from 'moment';
// import { services } from "../utils/Data";
import ProductCard from '../components/ProductCard';
import BlogCard from '../components/BlogCard';
import { getAllProducts } from "../features/products/productSlice";
import { addToWishlist } from "../features/products/productSlice";
import wish from "../images/wish.svg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import prodcompare from "../images/prodcompare.svg";
import ReactStars from "react-rating-stars-component";

const Home = (props) => {
  const blogState = useSelector ((state) => state?.blog?.blog);
  const productState = useSelector ((state) => state.product.product)
  let location = useLocation();
  const navigate = useNavigate();
  const { grid, data } = props;
  

  const dispatch = useDispatch();
  useEffect(() => {
     getBlogs();
     getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    
    dispatch(addToWishlist(id));
  }

  return (
    <>
    <Container class1="background">
    
      <div className="row align-items-center justify-content-center min-vh-100">
        <div className="col-12 col-md-6 col-lg-4 text-center">
         <div className="text-container ">
          <h1>Discover the Magic of Arabian Oud - Elevate Your Senses with the Finest Oud Perfumes and Oils. </h1>
          <h6>Shop Now for Timeless Elegance and Unforgettable Fragrance Experiences.</h6>
          <button onClick={() => navigate("product")} >Shop Now</button>
        
      </div>
    </div>
  </div>
</Container>



<Container>
      <div className='row pt-3 pb-3'>
        <div className='col-12'>
          <div className='services d-flex flex-wrap align-items-center justify-content-around justify-content-md-between'>
            <div className="service-item d-flex align-items-center gap-3 gap-md-15 my-3 my-md-0">
              <span className='fs-1'><CiDeliveryTruck/></span>
              <div>
                <h6>Free Shipping</h6>
                <p className="mb-0">From all orders over R1000</p>
              </div>
            </div>
            <div className="service-item d-flex align-items-center gap-3 gap-md-10 my-3 my-md-0">
              <span className='fs-1'><PiConfettiThin/></span>
              <div>
                <h6>Daily Surprise Offers</h6>
                <p className="mb-0">Save up to 25% off</p>
              </div>
            </div>
            <div className="service-item d-flex align-items-center gap-3 gap-md-10 my-3 my-md-0">
              <span className='fs-1'><BiSupport/></span>
              <div>
                <h6>Support 24/7</h6>
                <p className="mb-0">Shop with an expert</p>
              </div>
            </div>
            <div className="service-item d-flex align-items-center gap-3 gap-md-10 my-3 my-md-0">
              <span className='fs-1'><MdPriceCheck/></span>
              <div>
                <h6>Affordable Prices</h6>
                <p className="mb-0">Get Factory Default Prices</p>
              </div>
            </div>
            <div className="service-item d-flex align-items-center gap-3 gap-md-10 my-3 my-md-0">
              <span className='fs-1'><RiSecurePaymentFill/></span>
              <div>
                <h6>Secure Prices</h6>
                <p className="mb-0">100% Protected payments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>

      
    <Container>
      <div className='cat-container row pt-3 pb-5'>
        <div className='col-12 mb-3'>
          <h1 className="text-white text-center text-md-left">Categories</h1>
        </div>
        <div className='col-6 col-md-3 mb-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='categories d-flex flex-column align-items-center'>
            <img className="img-fluid" src={Perfume} alt="Perfumes"/>
            <h6 className="cat-text py-3">Perfumes</h6>
          </div>
        </div>
        <div className='col-6 col-md-3 mb-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='categories d-flex flex-column align-items-center'>
            <img className="img-fluid" src={Oud} alt="Oud"/>
            <h6 className="cat-text py-3">Oud</h6>
          </div>
        </div>
        <div className='col-6 col-md-3 mb-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='categories d-flex flex-column align-items-center'>
            <img className="img-fluid" src={Scarves} alt="Scarves"/>
            <h6 className="cat-text py-3">Scarves</h6>
          </div>
        </div>
        <div className='col-6 col-md-3 mb-4' style={{ display: 'flex', justifyContent: 'center' }}>
          <div className='categories d-flex flex-column align-items-center'>
            <img className="img-fluid" src={Difuser} alt="Home Fragrances"/>
            <h6 className="cat-text py-3">Home Fragrances</h6>
          </div>
        </div>
      </div>
    </Container>

      <Container >
        <div className="row pt-3 pb-5">
          <div className="col-12">
            <h1> Featured Products</h1>
            <div className="row">

            {
            productState && productState?.map((item, index) => {
              if (item.tags === "featured") {
                return(
                  <div
          key={index}
          className={"col-lg-3 col-md-4 col-sm-6 col-12 mb-4"} 
        >
          <div
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              <button 
                className="border-0 bg-transparent" 
                onClick={(e)=>{addToWish(item?._id)}}
              >
                <img src={wish} alt="wishlist" />
              </button>
            </div>
            <div className="product-image">
              <img 
                src={item?.images[0]?.url} 
                className="img-fluid mx-auto" 
                alt="product" 
                width={160}
              />
              <img src={item?.images[0]?.url} 
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
              <button className="view-btn border-0 bg-transparent position-absolute bottom-0 end-0 p-5">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                  {"  "} View
                </button>
            </div>
            
          </div>
        </div>
                )
              }
              
            })
          }
          </div>
        </div>

      </div>

      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-3">
        <div className="row">
          <div className="col-12">

            <h3 className="section-heading">Products on Special</h3>

          </div>
        </div>
        <div className="row">
          {
            productState && productState?.map((item, index) => {
              if (item.tags === "special") {
                return(
                  <SpecialProduct 
                    key= {index} 
                    id = {item?._id}
                    image = {item?.images[0]?.url}
                    brand = {item?.brand}
                    title={item?.title} 
                    totalrating = {parseFloat(item?.totalrating)}
                    price= {item?.price}
                    sold={item?.sold}
                    quantity={item?.quantity}
                    />
                )
              }
              
            })
          }
         
        </div>
      </Container>

      <Container class1="popular-wrapper py-5">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
        {
            productState && productState?.map((item, index) => {
              if (item.tags === "popular") {
                return(
                  <div
          key={index}
          className={"col-lg-3 col-md-4 col-sm-6 col-12 mb-4"} 
        >
          <div
            
            className="product-card position-relative"
          >
            <div className="wishlist-icon position-absolute">
              <button 
                className="border-0 bg-transparent" 
                onClick={(e)=>{addToWish(item?._id)}}
              >
                <img src={wish} alt="wishlist" />
              </button>
            </div>
            <div className="product-image">
              <img 
                src={item?.images[0]?.url} 
                className="img-fluid mx-auto" 
                alt="product" 
                width={160}
              />
              <img src={item?.images[0]?.url} 
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
              <button className="view-btn border-0 bg-transparent position-absolute bottom-0 end-0 p-5">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                  {"  "} View
                </button>
            </div>
          </div>
        </div>
                )
              }
              
            })
          }
        </div>
      </Container>
      

      {/* <Container class1="blog-wrapper py-5 home-wrapper-2">

        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
        {
                  blogState?.map((item, index) => {
                    if(index < 3){
                      return (
                        <div key={index} className="col-3">
                          <BlogCard 
                            id={item?._id} 
                            title={item?.title} 
                            description={item?.description}
                            image={item?.images[0]?.url}
                            date={moment(item?.createdAt).format('MMMM Do YYYY, h:mm a')}
                          />
                        </div>
                      );
                    }
                  })
                }
        </div>

      </Container> */}

    </>
  )
}

export default Home