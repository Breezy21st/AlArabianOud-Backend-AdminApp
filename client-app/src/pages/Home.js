import React, { useEffect } from "react";
import {Link} from 'react-router-dom';
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

const Home = () => {
  const blogState = useSelector ((state) => state?.blog?.blog)
  const dispatch = useDispatch();
  useEffect(() => {
     getBlogs() ;
  }, []);
  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
    <Container className='home-wrapper-1'>
          <div className='col-6'>
              <div className="hero-section">
                  <img className="hero" 
                    alt="hero" 
                    src={Hero} />
                <div className='text-container'>
                  <h1>LOREM IPSUM DOLOR SIT AMET,
                      CONSECTETUR ADIPISCING ELIT.
                  </h1>
                  <br></br>
                  <h6>LOREM</h6>
                  <button>BUY NOW</button>
              </div>
            </div>
          </div>
    </Container>

      <Container className='home-wrapper-2 py-5'>
          <div className='row'>
          <h1>Categories</h1>
            <div className='col-12'>
              <div className=' d-flex justify-content-between align-items-center'>
                <div className='categories gap-3 align-items-center'>
                    <img 
                    class="img-fluid" 
                    src={Perfume} 
                    alt="Perfumes"/>
                    <div>
                      <h6 className="cat-text py-3">Perfumes</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                    class="img-fluid"
                    src={Oud} 
                    alt="Perfumes"/>
                    <div>
                      <h6 className="cat-text py-3">Oud</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                      class="img-fluid" 
                      src={Scarves} 
                      alt="Perfumes"
                      />
                    <div>
                      <h6 className="cat-text py-3">Scarves</h6>
                      
                    </div>
                </div>

                <div className='categories gap-3 align-items-center'>
                    <img 
                    class="img-fluid"
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

      {/* <Container class1="home-wrapper-3 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container> */}

      <Container class1="special-wrapper py-5 home-wrapper-3">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-3">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>
      
      <Container class1="blog-wrapper py-5 home-wrapper-2">
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
      </Container>
    </>
  )
}

export default Home