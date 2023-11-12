import React from 'react'
import { BsInstagram, BsLinkedin, BsMailbox, BsSearch, BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import pfLogo from '../images/Payfast By Network_light.png'

const Footer = () => {
  return (
    <>
      
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'> Products</h4>
              
              <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Womens</Link>
                  <Link className='text-white py-2 mb-1'>Mens</Link>
                                   
              </div>
            </div>
            <div className='col-3'> 
              <h4 className='text-white mb-4'>Contact us</h4>
              
              
            <div className='social_icons d-flex flex-column'>
              <a href='mailto:nooreinahmed@gmail.com' className='text-white d-flex align-items-center py-1'>
                <BsMailbox className='text-white fs-5 icon-spacing'/>
                  nooreinahmed@gmail.com
              </a>

              <a href='https://www.instagram.com/al_arabianoud/?utm_source=ig_web_button_share_sheet' className='text-white d-flex align-items-center py-1'>
                <BsInstagram className='text-white fs-5 icon-spacing'/>
                  @al_arabianOud
              </a>
  
              <a href='https://wa.me/720544448' className='text-white d-flex align-items-center py-1'>
                <BsWhatsapp className='text-white fs-5 icon-spacing'/>
                  072 054 4448
              </a>
            </div>                       
            </div>
            <div className='col-3'> 
              <h4 className='text-white mb-4'>Account</h4>
            
              <div className='footer-links d-flex flex-column'>
                  <Link to="/orders"className='text-white mb-1'>View Orders</Link>
                  <Link to="/wishlist" className='text-white mb-1'>Wishlist</Link>
                  <Link to="/login" className='text-white mb-1'>Login</Link>
                  <Link to="/signup" className='text-white mb-1'>Signup</Link>
                                   
              </div>
            </div>
            <div className='col-2'> 
              <h4 className='text-white mb-4'>Payments</h4>
              <div className='footer-links d-flex flex-column'>
                  
                  <img src={pfLogo} alt='pflogo'/>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className='py-4'>
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