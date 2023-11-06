import React from 'react'
import Custominput from '../components/Custominput';

const Forgotpassword = () => {
  return (
    <div className='py-5' style={{backgroundImage: "../", minHeight: "100vh"  }}>
    <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4' >
      <h3 className='text-center' >Forgot Password</h3>
      <p className='text-center'>Please Enter Your Registered Email Address to get reset password mail.</p>
      <form action='' >
    <Custominput type='text' label="Email Address" id="email"/>
    
    <button className= "border-0 px-3 py-2 text-white fw-bold w-100" 
            style={{ background: "#FFC300" }}
            type="submit"
            >
            Send Link
    </button>
    </form>
    </div>
    </div>
  )
}

export default Forgotpassword;