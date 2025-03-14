import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Signinpage from "./pages/Signinpage";
import Aboutpage from "./pages/Aboutpage";
import ProductDetails from "./pages/ProductDetails";
import Productss from "./pages/Productss";
import CartPage from "./pages/CartPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,BrowserRouter,Route} from "react-router";
import Accountspage from "./pages/Accountspage";
import Usercontext from "./pages/Usercontext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
      const[userdata,setUserdata]=useState(null)
      const user_id=localStorage.getItem("user_id")
      const FetchData=async()=>
        {
  
          const data=new FormData()
          data.append("user_id",user_id)
          const response=await axios.post('https://amazon.indianhackerslab.com/get-account.php',data,{header:{'Content-Type':'multipart/form-data'}})
          if(response)
          {
            console.log(response.data)
            if(response.data.status==='success')
            {
              setUserdata(response.data.data[0])
            }
          }
    
        }
  useEffect(()=>{FetchData()},[user_id])
  return (
    <div className="App">
      <Usercontext.Provider value={userdata}>
      <BrowserRouter>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/Aboutpage" element={<Aboutpage></Aboutpage>}></Route>
        <Route path="/sign-in" element={<Signinpage></Signinpage>}></Route>
        <Route path="/Loginpage" element={<Loginpage></Loginpage>}></Route>
        <Route path="/productss" element={<Productss></Productss>}></Route>
        <Route path="/product-details/:product_id" element={<ProductDetails></ProductDetails>}></Route>
        <Route path="/Accountspage" element={<Accountspage></Accountspage>}></Route>
        <Route path="/Accountspage" element={<Accountspage></Accountspage>}></Route>
        <Route path="/CartPage" element={<CartPage></CartPage>}></Route>
      </Routes>
      <Footer></Footer>
      </BrowserRouter>
      </Usercontext.Provider>
    </div>
  );
}

export default App;