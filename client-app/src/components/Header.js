import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BsSearch, BsPerson } from 'react-icons/bs';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import Logo from '../images/Logo.png';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

  const dispatch = useDispatch();
  const cartState = useSelector(state => state.auth.cartProducts)
  const [total, setTotal] = useState(null);

useEffect(() => {
  let sum = 0;

  for (let index = 0; index < cartState.length; index++) {
    sum = sum + (Number(cartState[index].quantity) * Number(cartState[index].price))
    setTotal(sum);
  }
}, [cartState])

  return (
    <>
<<<<<<< HEAD
     
=======
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
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <img className='lg-logo img-fluid' href='/' alt='' src={Logo} />
          
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
          
          <div className='container fluid'>
            <ul className="navbar-nav  justify-content-center">
<<<<<<< HEAD
              <li className="nav-item px-2">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" href="contact">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/products" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li><a className="dropdown-item" href="/product">All Products</a></li>
                  <li><a className="dropdown-item" href="/cat2">Perfumes</a></li>
                  <li><a className="dropdown-item" href="/cat3">Oud</a></li>
                  <li><a className="dropdown-item" href="/cat3">Scarves</a></li>
                  <li><a className="dropdown-item" href="/cat3">Home Fragrance</a></li>
                  <li><a className="dropdown-item" href="/cat3">Bakhoor</a></li>
                  <li><a className="dropdown-item" href="/cat3">Burners</a></li>
=======
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
                  <li><a className="dropdown-item" href="/product">All Products</a></li>
                  <li><a className="dropdown-item" href="/cat2">PERFUME CAT 2</a></li>
                  <li><a className="dropdown-item" href="/cat3">PERFUME CAT 3</a></li>
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
                </ul>
                
              </li>
            </ul>
            </div>
            
            
            
            
      <div className='nav-icons d-flex align-items-center justify-content-end gap-2'>
        <Link to={'/login/'} className='nav-item text-white'>
          <span className='fs-9 text-white'>
<<<<<<< HEAD
             Login
=======
             LOGIN
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
          </span>
        </Link>
        <span> | </span>
        <Link to={'/signup/'} className='nav-item text-white'>
          <span className='fs-9 text-white'>
<<<<<<< HEAD
             Signup
=======
             SIGNUP
>>>>>>> 28296f3c9e4640e593df6fc16a09a9645b131d6b
          </span>
        </Link>


    {/* search functionality To be added */}
        <Link className='nav-item text-white'>
          <span className=' fs-9 text-white'>
            <BsSearch />
          </span>
        </Link>

        <Link to={'/cart/'} className='nav-item text-white'>
          <div className='d-flex flex-column gap-1 text-center'>
          
            <span className='badge bg-white text-dark fs-6'> 
            <AiOutlineShoppingCart/> {cartState?.length ? cartState?.length : 0}
            </span>
            <p className='mb-0'>R {total ? total : 0}</p>
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
