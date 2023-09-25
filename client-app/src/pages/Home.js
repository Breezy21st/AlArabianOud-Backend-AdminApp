import React from 'react'
import {Link} from 'react-router-dom';
import Hero from '../images/Hero-image.png';
import Eros from '../images/erose-blue.jpg';

const Home = () => {
  return (
    <>
    <section className='home-wrapper-1'>
      <div className='container-xxl'>
        <div className='row'>
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
        </div>
      </div>
    </section>

    <section className='home-wrapper-2'>
      <div className='container-xxl'>
        <div className='row'>
          <div className='col-6'>
            <div className='main-banner position-relative p-3'>

            </div>
          </div>
          <div className='d-flex flex-wrap justify-content-between align-items-center'>
            <div className='small-banner position-relative p-3'>
              <img
                src={Eros}
                className='img-fluid'
                alt='main banner'
                />
            <div className='small-banner-content position-relative'>
              <h4>SUPERCHARGED FOR PROS</h4>
              <h5>VASACE EROS</h5>
              <p>R2500</p>
              <Link>BUY NOW</Link>
            </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home