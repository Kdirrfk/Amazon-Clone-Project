import axios from 'axios'
import { useParams } from 'react-router'
import React,{useContext, useEffect,useState} from 'react'
import UserContext from './Usercontext'
const Accountspage = () => {
      
    const userdata=useContext(UserContext)
    const accountOptions = [
      { title: "Your Orders", description: "Track, return, or buy things again", icon: "📦" },
      { title: "Login & Security", description: "Edit login, name, and mobile number", icon: "🔒" },
      { title: "Prime", description: "View benefits and payment settings", icon: "📦" },
      { title: "Your Addresses", description: "Edit addresses for orders and gifts", icon: "📍" },
      { title: "Your Business Account", description: "Sign up for GST invoice savings", icon: "🏢" },
      { title: "Payment Options", description: "Edit or add payment methods", icon: "💳" },
      { title: "Amazon Pay Balance", description: "Add money to your balance", icon: "💰" },
      { title: "Contact Us", description: "Customer service via phone or chat", icon: "📞" },
    ];
    const Logout=()=>{
      localStorage.setItem("user_id",null)
      window.location.replace("\Productss")
    }
  
  return (
    <div>
      <>
      {userdata?<><h2>Hello{userdata.first_name}</h2></>:<></>}
      
      </>
      
      <div className=" col-12 p-2">
      <div className="max-w-4xl  bg-white rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Your Account</h1>
        <div className="grid grid-cols-3 gap-2 d-flex flex-wrap p-4  ">
          {accountOptions.map((option, index) => (
            <div className='col-3 p-2 w-22  shadow border hover:bg-gray-200'>
            <div key={index} className="p-4  rounded-lg  bg-gray-50 hover:bg-gray-200 transition d-flex ">
              <div style={{ fontSize: "40px" }}>{option.icon}</div>
              <div>
              <h4 className="font-semibold">{option.title}</h4>
              <p className="text-sm text-black">{option.description}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      <div ><button className="btn bg-danger p-3 "onClick={()=>Logout()}>Logout</button></div>
    </div>
    </div>
    
  )
}

export default Accountspage;