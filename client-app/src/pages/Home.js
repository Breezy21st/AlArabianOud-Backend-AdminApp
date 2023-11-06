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
    <Container className='home-wrapper-1'>
          <div className='col-6'>
              <div className="hero-section">
                  <img className="hero" 
                    alt="hero" 
                    src={Hero} />
<<<<<<< HEAD
                <div className='text-container' style={{ textAlign: 'left',  }}>
                  <h1>Discover the Magic of Arabian Oud - Elevate Your Senses with the Finest Oud Perfumes and Oils. 
                  </h1>
                  <br></br>
                  <h6>Shop Now for Timeless Elegance and Unforgettable Fragrance Experiences.</h6>
                  <button href="/product" > Shop Now</button>
=======
                <div className='text-container'>
                  <h1>LOREM IPSUM DOLOR SIT AMET,
                      CONSECTETUR ADIPISCING ELIT.
                  </h1>
                  <br></br>
                  <h6>LOREM</h6>
                  <button>BUY NOW</button>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
              </div>
            </div>
          </div>
    </Container>

<<<<<<< HEAD
    <Container className='home-wrapper-3 ' >
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex align-items-center justify-content-between'>
                <div className="d-flex align-items-center gap-15 pt-5 pb-5">
                
                <span className='fs-1'>
                <CiDeliveryTruck/>
                </span>
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over R1000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <PiConfettiThin/>
                </span>
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <BiSupport/>
                </span>
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <MdPriceCheck/>
                </span>
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get Factory Default Prices</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <RiSecurePaymentFill/>
                </span>
                  <div>
                    <h6>Secure Prices</h6>
                    <p className="mb-0">100% Protected payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>

      {/* To be made Dynamic */}
      <Container >
          <div className='cat-container row pt-3 pb-5'>
          <h1 className="text-white">Categories</h1>
            <div className='col-12'>
              <div className=' d-flex justify-content-between align-items-center'>
                <div className='categories gap-3 align-items-center pt-2 '>
=======

      {/* To be made Dynamic */}
      <Container className='home-wrapper-2 py-5'>
          <div className='row'>
          <h1>Categories</h1>
            <div className='col-12'>
              <div className=' d-flex justify-content-between align-items-center'>
                <div className='categories gap-3 align-items-center'>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
                    <img 
                    className="img-fluid" 
                    src={Perfume} 
                    alt="Perfumes"/>
                    <div>
                      <h6 className="cat-text py-3">Perfumes</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                    className="img-fluid"
                    src={Oud} 
                    alt="Perfumes"/>
                    <div>
                      <h6 className="cat-text py-3">Oud</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                      className="img-fluid" 
                      src={Scarves} 
                      alt="Perfumes"
                      />
                    <div>
                      <h6 className="cat-text py-3">Scarves</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                    className="img-fluid"
                    src={Difuser} 
                    alt="Perfumes"/>
                    <div>
                      <h6 className="cat-text py-3">Home Fragrances</h6>
                      
                    </div>
                </div>

              </div>
            </div>
          </div>
        

      </Container>

<<<<<<< HEAD
      

      

      <Container >
        <div className="row">
          <div className="col-12">
            <h1> Featured Products</h1>
            <div className="row">
=======
      <Container className='home-wrapper-3 py-5'>
          <div className='row'>
            <div className='col-12'>
              <div className='services d-flex align-items-center justify-content-between'>
                <div className="d-flex align-items-center gap-15">
                
                <span className='fs-1'>
                <CiDeliveryTruck/>
                </span>
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders over R1000</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <PiConfettiThin/>
                </span>
                  <div>
                    <h6>Daily Surprise Offers</h6>
                    <p className="mb-0">Save up to 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <BiSupport/>
                </span>
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <MdPriceCheck/>
                </span>
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Get Factory Default Prices</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-10">
                <span className='fs-1'>
                <RiSecurePaymentFill/>
                </span>
                  <div>
                    <h6>Secure Prices</h6>
                    <p className="mb-0">100% Protected payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </Container>

      

      <Container featured-wrapper py-5 home-wrapper-2>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading"> Featured Products</h3>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
            {
            productState && productState?.map((item, index) => {
              if (item.tags === "featured") {
                return(
                  <div
          key={index}
          className={
<<<<<<< HEAD
            "col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
=======
            "col-3"
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
          } 
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
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
<<<<<<< HEAD
                
                <button className="border-0 bg-transparent">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                </button>
                
=======
                <button className="border-0 bg-transparent">
                  <img src={prodcompare} alt="compare" />
                </button>
                <button className="border-0 bg-transparent">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
              </div>
            </div>
          </div>
        </div>
                )
              }
              
            })
          }
          </div>
        </div>
<<<<<<< HEAD
      </div>
=======
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-3">
        <div className="row">
          <div className="col-12">
<<<<<<< HEAD
            <h3 className="section-heading">Products on Special</h3>
=======
            <h3 className="section-heading">Special Products</h3>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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

      <Container class1="popular-wrapper py-5 home-wrapper-3">
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
          className={
            "col-3"
          } 
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
            </div>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
<<<<<<< HEAD
                
                <button className="border-0 bg-transparent">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                </button>
                
=======
                <button className="border-0 bg-transparent">
                  <img src={prodcompare} alt="compare" />
                </button>
                <button className="border-0 bg-transparent">
                  <img onClick={() => navigate("product/" +item?._id)} src={view} alt="view" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
              </div>
            </div>
          </div>
        </div>
                )
              }
              
            })
          }
        </div>
      </Container>
      
<<<<<<< HEAD
      {/* <Container class1="blog-wrapper py-5 home-wrapper-2">
=======
      <Container class1="blog-wrapper py-5 home-wrapper-2">
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
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
<<<<<<< HEAD
      </Container> */}
=======
      </Container>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
    </>
  )
}

export default Home