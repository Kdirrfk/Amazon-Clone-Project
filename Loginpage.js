import axios from 'axios'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import React,{useEffect,useState} from 'react'
const Loginpage = () => {
  const[email,setEmail]=useState(null)
  const[password,setPassword]=useState(null)
  const[errormodal,setErrormodal]=useState(false)
  const[displaymodal,setDisplaymodal]=useState(false)
  const[loading,setLoading]=useState(false)
  const LoginUser=async()=>
  {
        setLoading(true)
        const data=new FormData()
        data.append("email",email)
        data.append("password",password)
        const response=await axios.post('https://amazon.indianhackerslab.com/login-user.php',data,{headers:{'Content-Type':'multipart/form-data'}})
        if(response){
          console.log(response.data)
        if(response.data.status==='success')
        {
            console.log(response.data.data.user_id)
            localStorage.setItem("user_id",response.data.data.user_id)
            window.location.replace("/Accountspage")
        }
      }
    }
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };
     return (
    <div >
      <Modal open={displaymodal} onClose={()=>{setDisplaymodal(false)}}>
        <Box sx={style}>
        <h2>Login Sucessful</h2>
        <button onClick={()=>{setDisplaymodal(false)}} className='btn btn-danger'>close</button>
        </Box>
      </Modal>
      <Modal open={errormodal} onClose={()=>{setErrormodal(false)}}>
        <Box sx={style}>
          <h2>Something Went Wrong</h2>
          <button className='bg-danger'onClick={()=>{setErrormodal(false)}}>close</button>
        </Box>
      </Modal>
       <main class="form-signin  m-auto col-2">
    <h1 class="h3 mb-3 fw-normal">Please Login</h1>

    <div class="form-floating">
      <input onChange={(event)=>{setEmail(event.target.value)}}type="email" class="form-control" id="floatingInput" placeholder="name@example.com"></input>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input onChange={(event)=>{setPassword(event.target.value)}}type="password" class="form-control" id="floatingPassword" placeholder="Password"></input>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"></input>
      <label class="form-check-label" for="flexCheckDefault">
        Remember me</label>
    </div>
    <button onClick={()=>{  LoginUser() }} class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
</main>
    </div>
  )
}

export default Loginpage;