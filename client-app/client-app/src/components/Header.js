import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Logo from '../images/Logo.png';

const Header = () => {
  return (
    <>
      <header className="header-top-strip py-3">
        <div className="container-xl">
          <div className='row'>
            <div className='col-md-6'>
              <p className='text-white mb-0'>
                Free Shipping Over R1000 & Free Returns
              </p>
            </div>
            <div className='col-md-6 text-end'>
              <p className='text-white mb-0'>
                Hotline: <a className='text-white' href='tel:011 264 8130'>011 264 8130</a>
              </p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-2">
        <div className='container-xl'>
          <div className='row align-items-center'>
            <div className='col-lg-3 col-md-6'>
              <div className="logo">
                <img className='lg-logo' alt='' src={Logo} />
              </div>
            </div>
            <div className='col-lg-6 col-md-12 text-center'>
              <div className='header-upper-links d-flex align-items-center justify-content-center flex-wrap'>
                <div className='mb-2'>
                  <Link className='d-flex align-items-center gap-2 text-white ms-4'>
                    <p className='text-white'>HOME</p>
                  </Link>
                </div>
                <div className='mb-2'>
                  <Link className='d-flex align-items-center gap-2 text-white ms-4'>
                    <p className='text-white'>ABOUT US</p>
                  </Link>
                </div>
                <div className='menu-button d.flex align-items-center mb-2'>
                  <div></div>
                  <div className='menu-links'> 
                    <div className='d.flex align-items-center gap-15'> 
                      <NavLink></NavLink>
                      <NavLink></NavLink>
                      <NavLink></NavLink>
                      <NavLink></NavLink>
                    </div>
                  </div>
                  <Link className='d-flex align-items-center gap-2 text-white ms-4'>
                    {/* use this to display categories */}
                    <p className='text-white'>PRODUCTS</p> 

                  </Link>
                </div>
                <div className='mb-2'>
                  <Link className='d-flex align-items-center gap-2 text-white ms-4'>
                    <p className='text-white'>CONTACT US</p>
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-lg-3 col-md-6 text-end'>
              <div className='right-icons d-flex align-items-center justify-content-end gap-3'>
                <Link className='d-flex align-items-center gap-2 text-white ms-2'>
                  <p className='text-white'>LOGIN</p>
                </Link>
                <span className="py-3">
                  <BsSearch className='fs-5 text-white' />
                </span>
                <Link className='d-flex align-items-center gap-2 text-white ms-2'>
                  <span className='py-3'>
                    <AiOutlineHeart className='fs-5 text-white' />
                  </span>
                </Link>
                <Link className='d-flex align-items-center gap-2 text-white ms-2'>
                <AiOutlineShoppingCart className='fs-2 text-white' />
                  <div className='d-flex flex-column gap-1 text-center'>
                    <span className='badge bg-white text-dark fs-10'>0</span>
                    <p className="fs-10">R 1000</p>
                  </div>
                </Link>
                
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;
