import axios from 'axios';
import {useParams} from 'react-router'
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router';
const ProductDetails = () => {
    const parameters=useParams()
    var product_id=parameters.product_id
    const [details,changedetails]=useState(null)

    const FetchData=async()=>{
        const data=new FormData()

    data.append("product_id",product_id)
    const response =await axios.post("https://amazon.indianhackerslab.com/get-product-details.php",data,{header:{'content-type':'multipart/form-data'}})
    if(response){
        console.log (response.data)
        changedetails(response.data.product_data)
    }
}

useEffect(()=>{
    FetchData()
},[product_id])
return (
 <div className='Details'>
{details?
<>  

        <div className='d-flex'>
            <div className='col-5'>
        <img className='w-100' src={details.images}/>
        </div>
        <div className='col-7'>
            <h2> {details.name}</h2>
        </div>
        </div>
        <div>
        <Link to={'/CartPage'}>
        <button className="btn btn-success">Add to cart</button>
        </Link>
        </div>
</> :<>No details</>
}
</div>

)
}
export default ProductDetails;