import React from 'react'
import { BsInstagram, BsLinkedin, BsMailbox, BsSearch, BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import pfLogo from '../images/Payfast By Network_light.png'

const Footer = () => {
  return (
    <>
      
      <footer className='bg-dark text-light py-3'>
        <div className='container-xxl'>
          <div className='row text-center text-md-start'>
            <div className='col-12 col-md-4 mb-3 mb-md-0'>
              <h4 className='text-white mb-4'> Products</h4>
              
              <div className='footer-links '>
                  <Link className='text-white d-block py-2'>Womens</Link>
                  <Link className='text-white d-block py-2'>Mens</Link>
                                   
              </div>
            </div>
            <div className='col-12 col-md-3 mb-3 mb-md-0'> 
            
              <h4 className='text-white mb-4'>Contact us</h4>
             
              
              
            <div className='social_icons'>
              <a href='mailto:nooreinahmed@gmail.com' className='text-white py-1'>
                <BsMailbox className='text-white fs-5 icon-spacing'/>
                  nooreinahmed@gmail.com
              </a>
              <br/>
              <a href='https://www.instagram.com/al_arabianoud/?utm_source=ig_web_button_share_sheet' className='text-white  py-1'>
                <BsInstagram className='text-white fs-5 icon-spacing'/>
                  @al_arabianOud
              </a>
              <br/>
              <a href='https://wa.me/720544448' className='text-white  py-1'>
                <BsWhatsapp className='text-white fs-5 icon-spacing'/>
                  072 054 4448
              </a>
            </div>                       
            </div>
            <div className='col-12 col-md-3 mb-3 mb-md-0'> 
              <h4 className='text-white mb-4'>Account</h4>
            
              <div className='footer-links'>
                  <Link to="/orders"className='text-white mb-1'>View Orders</Link>
                  <br/>
                  <Link to="/wishlist" className='text-white mb-1'>Wishlist</Link>
                  <br/>
                  <Link to="/login" className='text-white mb-1'>Login</Link>
                  <br/>
                  <Link to="/signup" className='text-white mb-1'>Signup</Link>
                                   
              </div>
            </div>
            <div className='col-12 col-md-2'> 
              <h4 className='text-white mb-4'>Payments</h4>
              <div className='footer-links d-flex flex-column'>
                  
                  <img src={pfLogo} alt='pflogo' className='img-fluid'/>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='bg-dark text-light py-4'>
      <div className='container-xxl'> 
        <div className='row'>
          <div className='col-12'>
              <p className='text-center mb-0 text-white'> 
                Copyright  {new Date().getFullYear()} &copy; Al Arabian Oud. All Rights Reserved
               </p>
               <p className='text-center mb-0 text-white'> Designed and Developed by Verzion Zero </p>
          </div>
        </div>
      </div>
      </footer>
      
    </> 
  )
}

export default Footer