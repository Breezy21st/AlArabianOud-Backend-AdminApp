import React from 'react'
import { BsInstagram, BsLinkedin, BsMailbox, BsSearch, BsWhatsapp } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <footer className='py-4'>
      <div className='container-xxl'> 
        <div className='row align-align-items-center'>
          <div className='col-5'>
            <div className='footer-top-data d-flex gap-30 align-items-center'>
              <h2 className='mb-0 text-white'>
                Sign Up for Newsletter
              </h2>
            </div>
          </div>
          <div className='col-7'>
            <div className='input-group'>
                <input
                  type="text"
                  className='form-control py-1'
                  placeholder='Your Email Address'
                  aria-label='Your Email Address'
                  aria-describedby='basic-addon2'
                
                />
                <span className='input-group-text p-2 ' id="basic-addon2">
                  Subscribe
                </span>
            </div>
          </div>
        </div>
      </div>
      </footer>
      <footer className='py-3'>
        <div className='container-xxl'>
          <div className='row'>
            <div className='col-4'>
              <h4 className='text-white mb-4'> PRODUCTS</h4>
              
              <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Womens</Link>
                  <Link className='text-white py-2 mb-1'>Mens</Link>
                                   
              </div>
            </div>
            <div className='col-3'> 
              <h4 className='text-white mb-4'>CONTACT US</h4>
              
              
              <div className='footer-links d-flex flex-column'>
                  <div className='social_icons d-flex flex-column'>
                    <a href='' className='text-white '>
                      
                      <BsMailbox className='text-white fs-5'/>
                    
                        info@alarabianoud.co.za
                    </a>

                    <a href='' className='text-white '>
                      <BsInstagram className='text-white fs-5'/>
                        AlArabianOud
                    </a>
                    
                    <a href='' className='text-white '>
                      <BsWhatsapp className='text-white fs-5'/>
                      075 237 1733
                    </a>

                  </div>
                  
                                   
              </div>
            </div>
            <div className='col-3'> 
              <h4 className='text-white mb-4'>ACCOUNT</h4>
            
              <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>View Orders</Link>
                  <Link className='text-white py-2 mb-1'>Login</Link>
                                   
              </div>
            </div>
            <div className='col-2'> 
              <h4 className='text-white mb-4'>PAYMENTS</h4>
              <div className='footer-links d-flex flex-column'>
                  <Link className='text-white py-2 mb-1'>Payfast</Link>
                  <Link className='text-white py-2 mb-1'>Yoco</Link>
                                   
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
                &copy; {new Date().getFullYear()}:
                Powered by Katlab-Dev
               </p>
          </div>
        </div>
      </div>
      </footer>
      
    </> 
  )
}

export default Footer