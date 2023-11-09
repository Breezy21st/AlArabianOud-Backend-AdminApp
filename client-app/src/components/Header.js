import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch, BsPerson } from 'react-icons/bs';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Logo from '../images/Logo.png';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [user, setUser] = useState({});
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  

  useEffect(() => {
    
    const storedUser = JSON.parse(localStorage.getItem('customer'));
    
    setUser(storedUser);
  }, [setUser]);

  const handleLogout = (dispatch) => {
    localStorage.clear(); // Clear all local storage
    navigate('/'); 
    window.location.reload();
  }

  
  useEffect(() => {
    let sum = 0;

    cartState.forEach((item) => {
      sum += Number(item.quantity) * Number(item.price);
    });

    setTotal(sum);
  }, [cartState]);

  return (
    <>
      <header className="header-top-strip py-2">
        <div className="container-xl">
          <div className="row">
            <div className="col-md-6">
              <p className="text-white mb-0">Free Shipping Over R1000 & Free Returns</p>
            </div>
          </div>
        </div>
      </header>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img className="lg-logo img-fluid" alt="Logo" src={Logo} />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
            <div className="container-fluid">
              <ul className="navbar-nav justify-content-center">
                <li className="nav-item px-2">
                  <NavLink className="nav-link" to="/" exact activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link" to="/about" activeClassName="active">
                    About
                  </NavLink>
                </li>
                <li className="nav-item px-2">
                  <NavLink className="nav-link" to="/contact" activeClassName="active">
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item px-2 dropdown">
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
                </ul>
                </li>
              </ul>
            </div>
            
            <div className="nav-icons d-flex align-items-center justify-content-end gap-2">
            
            <div className="nav-icons d-flex align-items-center justify-content-end gap-2">
  <ul className="navbar-nav"> 
  
    {user && user.token ? (
      <li className="nav-item dropdown"> 
        <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <BsPerson className="nav-item text-white fs-5" />
          Hi, {user.firstname}
        </a>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><NavLink className="dropdown-item" to="/settings">Settings</NavLink></li>
          <li><NavLink className="dropdown-item" to="/settings">Orders</NavLink></li>
          <li className="dropdown-item" onClick={handleLogout}>Logout</li>
        </ul>
      </li>
    ) : (
      <>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link text-white">Login</NavLink>
        </li>
        <li className="nav-item">
          
        </li>
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link text-white">Signup</NavLink>
        </li>
      </>
    )}
  </ul>
  <NavLink to="/cart" className="nav-item text-white">
    <span className="badge bg-white text-dark fs-6">
      <AiOutlineShoppingCart /> {cartState.length || 0}
    </span>
    <div className="d-flex flex-column gap-1 text-center">
      <p className="mb-0">R {total.toFixed(2)}</p>
    </div>
  </NavLink>
</div>
</div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
