import React from 'react'
import Logo from "../images/Logo.jpg"
import Cart from "../images/Cart.png"
import Extra from "../images/Extra.jpg"
import india from "../images/india.jpg"
import { Link } from 'react-router';
import CheckLogin from "../pages/CheckLogin";
import { useState } from 'react'

const Header = () => {
  const [loggedin,setLoggedin]=useState(CheckLogin())

  return (

   
    <div className='Header'>
  
    <div className='primary-navbar'>
    <img src={Logo} height='60px' ></img>
      <div><p>Delivering to Hyderabad</p>
          <h4>Update Location</h4>
      </div>
      <div className='search-section' >
        <input type="text" placeholder="search"></input>
      </div>
      <div className='imgtext'>
      <img src={india} height='30px' ></img>
      <p>EN</p>
  
      </div>
      <div>
        <p>Hello Signin</p>
          <h3>Accounts&links</h3>
      </div>
      <div>
        <p>return</p>
          <h3>Orders</h3>
      </div>
      <div className='cart-section' >
        <img src={Cart} height='60px' ></img>
      </div>
    </div>


    <div className='secondary-navbar'>
      <div><p>All</p></div>
      <div><p>MX Player</p></div>
      <div><p>Sell</p></div>
      <div><p>Best Seller's</p></div>
      <div><p>Today's Deals</p></div>
      <div><p>Mobiles</p></div>
      <div><p>Prime </p></div>
      <div><p>Customer Services</p></div>
      <div><p>New Releases</p></div>
      <img src={Extra} height='30px' ></img>
      <div>
            {loggedin?
                <Link to={"/AccountsPage"} className='btn btn-secondary'>Accounts</Link>
            :
                   <>
                    <Link to={"/Loginpage"} className='btn btn-primary'>Login</Link>
                    <Link to={"/Sign-in"} className='btn btn-info'>Signup</Link>
            </>}
      </div>
  </div>
</div>
  )
}

export default Header;