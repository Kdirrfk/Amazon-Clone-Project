import React from 'react'
import  { useState } from 'react'
import axios from 'axios'
import Rating from '@mui/material/Rating';
import { useEffect } from 'react';
import { Link } from 'react-router';
import Skeleton from '@mui/material/Skeleton';
import CheckLogin from './CheckLogin';
import { Toast } from 'react-bootstrap';
import Usercontext from "./Usercontext";
import { useContext } from 'react';
import { Modal } from 'react-bootstrap';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Productss = () => {

    const [products,changeProducts]=useState(null)
    const [loading,changeLoading]=useState(true)
    const [toast,setToast]=useState(false)
    const [modal,setModal]=useState(false)
    const userdata=useContext(Usercontext)

    const FetchData=async ()=>
    {
      const data=new FormData()
      const response=await axios.post("https://amazon.indianhackerslab.com/get-products.php",data,{header:{'content-type':'multipart/form-data'}})
      
      if(response)
        {
            console.log(response.data)
            changeProducts(response.data.products)
            changeLoading(false)
        }
    }

    products? products.map((prod)=>{
        console.log(prod)
    }):console.log("no products")
    
       
        useEffect(()=>{    
        FetchData()},[])   
                            
  



const Addcart = async (prod) => {
    if (CheckLogin()) {  
        const user_id = localStorage.getItem("user_id");  // Fetch user_id here

        if (!user_id || user_id === 'null' || user_id.trim() === '') { 
            console.log("User is not logged in.");
            setModal(true); 
            return;
        }

        const data = new FormData();
        data.append("user_id", user_id);
        data.append("product_id", prod.product_id);

        

        try {
            const response = await axios.post(
                "https://amazon.indianhackerslab.com/insert-cart.php",
                data,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );

            console.log("Response from server:", response.data); // Log the response for debugging

            if (response?.data?.success === "success") {
                console.log("Product added to cart successfully!");
                setToast(true);
            } else if (response?.data?.success === "error") {
                console.log("Server returned an error:", response.data.message);
            } else {
                console.log("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error adding product to cart:", error.message);
        }
    } else {
        console.log("User is not logged in. Showing login modal.");
        setModal(true);  
    }
};
    
      

  return (
    <><><div className="position-fixed my-toast">
          <Toast className='bg-warning text-dark position-fixed top-0 end-0 m-3' onClose={() => setToast(false)} show={toast} delay={3000} autohide>
              <Toast.Header className='bg-warning'>
                  <img
                      src="holder.js/20x20?text=%20"
                      className="rounded me-2"
                      alt="" />
                  <strong className="me-auto">added to cart</strong>
              </Toast.Header>
              <Toast.Body>Your item was successfully added to the cart!</Toast.Body>
          </Toast>

          <Modal show={modal} onHide={() => setModal(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
    </Modal.Header>
    <Modal.Body>You need to login to proceed!</Modal.Body>
</Modal>

      </div>
      </>
      
      <div>
              <button onClick={() => { FetchData(); } }>Get Data</button>
              <div className='d-flex flex-wrap container'>
                  {products ? products.map((prod) => (
                      <div className='col-3 p-3 border '>
                        <FavoriteIcon className=' text-danger'></FavoriteIcon>
                          <div className='innerbox p-3 shadow border'>
                              <img src={prod.images} className='w-100'></img>
                              <h6>{prod.name}</h6>
                              <p><b><large>{prod.price}</large></b></p>
                              <Rating name="half-rating" readOnly defaultValue={prod.rating} precision={0.5} />
                              <h6>Rs.{prod.price}</h6>
                              <p>MRP.<del>{prod.cutoff_price}</del></p>
                              <h6>({prod.discount}%off)</h6>
                              <div className="d-flex justify-content-between">
                                  <Link to={'/ProductDetails/' + prod.product_id}>
                                      <button className="btn btn-info">View Details</button>
                                  </Link>
                                  <button onClick={() => Addcart(prod)} className="btn btn-warning">Add to Cart</button>
                              </div>
                          </div>
                      </div>
                  )) : <div><p>no products</p></div>}

              </div>
              <div> 
              <Link to={'/CartPage/'}>
                <button className="btn btn-info">Go to cart</button>
              </Link>
              </div>

              {loading ? <><p>loading</p>
                  <div className='d-flex flex-wrap container'>

                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>
                      <div className='col-3 p-3 shadow border'>
                          <Skeleton variant="rectangular" width={300} height={300} />
                      </div>

                  </div>
              </> : <>  </>}


          </div></>


  )
}

export default Productss