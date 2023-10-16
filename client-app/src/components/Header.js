import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsPerson } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Logo from '../images/Logo.png';

const Header = () => {
  return (
    <>
     <header className="header-top-strip py-2">
        <div className="container-xl">
          <div className='row'>
            <div className='col-md-6'>
              <p className='text-white mb-0'>
                Free Shipping Over R1000 & Free Returns
              </p>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <img className='lg-logo img-fluid' href='/' alt='' src={Logo} />
          
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          
          <div className='container fluid'>
            <ul className="navbar-nav  justify-content-center">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">HOME</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">ABOUT US</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact">CONTACT US</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/products" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  PRODUCTS
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/cat1">PERFUME CAT 1</a></li>
                  <li><a className="dropdown-item" href="/cat2">PERFUME CAT 2</a></li>
                  <li><a className="dropdown-item" href="/cat3">PERFUME CAT 3</a></li>
                </ul>
                
              </li>
            </ul>
            </div>
            
            
            
            
      <div className='nav-icons d-flex align-items-center justify-content-end gap-2'>
        <Link to={'/login/'} className='nav-item text-white'>
          <span className='fs-9 text-white'>
             LOGIN
          </span>
        </Link>
        <span> | </span>
        <Link to={'/login/'} className='nav-item text-white'>
          <span className='fs-9 text-white'>
             SIGNUP
          </span>
        </Link>


    {/* search functionality To be added */}
        <Link className='nav-item text-white'>
          <span className=' fs-9 text-white'>
            <BsSearch />
          </span>
        </Link>

        <Link className='nav-item text-white'>
          <div className='d-flex flex-column gap-1 text-center'>
            <span className=' text-light fs-6'>
              <AiOutlineShoppingCart/> 0
            </span>
          </div>
        </Link>
      
        </div>
  </div>
</div>


          
        
      </nav>
    </>
  )
}

export default Header;
