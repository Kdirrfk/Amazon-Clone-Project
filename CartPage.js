import React, { useContext, useState, useEffect } from 'react';
import UserContext from './Usercontext';
import axios from 'axios';
import { Link } from 'react-router';
import CheckLogin from './CheckLogin';

const Cart = () => {
  const userdata = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loggedin, setLoggedin] = useState(CheckLogin());
  const [showToast, setShowToast] = useState(false);
  const [userlogged, setUserlogged] = useState(false);

  
 
  const fetchCartData = async () => {
    if (!userdata || !userdata.user_id) {
      console.error("User data is missing or null");
      return;
    }

    const data = new FormData();
    data.append("user_id", userdata.user_id);

    try {
      const response = await axios.post('https://amazon.indianhackerslab.com/get-carts.php', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.status === 'success') {
        setCartItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [userdata]);

  // Function to remove cart item
  const Removecart = async (product) => {
    if (loggedin) {
      const data = new FormData();
      data.append("user_id", userdata.user_id);
      data.append("cart_id", product.cart_id);

      try {
        const response = await axios.post("https://amazon.indianhackerslab.com/delete-cart.php", data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (response.data.status === 'success') {
          fetchCartData(); // Refresh the cart after deletion
          setShowToast(true);
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      setUserlogged(true);
    }
  };


  return (
    <><div className=' d-flex flex-wrap w-100'>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className='col-3 d-flex flex-wrap'>
          {cartItems.map((product) => (
            <div key={product.cart_id}>
              <img src={product.images} />
              <div>
                <h3>{product.name}</h3>
              </div>
                  <button 
                  className='btn btn-danger' 
                  onClick={() => Removecart(product)}
                >
                  Remove from Cart
                </button>


            </div>
          ))}
        </div>
      ) : (
        <h5>Your cart has no items</h5>
      )}
    </div><Link to={'/products/'}>
        <button className="btn btn-info">Go Back</button>
      </Link></>
  );
};


export default Cart;