import React from 'react'
import Custominput from '../components/Custominput';

const Resetpassword = () => {
  return (
    <div className='py-5' style={{backgroundImage: "../", minHeight: "100vh"  }}>
    <div className='my-5 w-25 bg-white rounded-3 mx-auto p-4' >
      <h3 className='text-center' >Reset Password</h3>
      <p className='text-center'>Please Enter Your New password</p>
      <form action='' >
    <Custominput type='password' label="New Password" id="pass"/>
    <Custominput type='password' label="Confirm Password" id="confirmpass"/>
    <button className= "border-0 px-3 py-2 text-white fw-bold w-100" 
            style={{ background: "#FFC300" }}
            type="submit"
            >
            Reset password
    </button>
    </form>
    </div>
    </div>
  )
}

export default Resetpassword;