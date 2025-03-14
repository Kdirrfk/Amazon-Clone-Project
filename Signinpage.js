import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
function Signinpage() {
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [phonenumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    
    const SignupUser = async () => {
            setLoading(true)
            setDisplaymodal(false)
            const data = new FormData();
            data.append("email", email);
            data.append("password", password);
            data.append("first_name", first_name);
            data.append("last_name", last_name);
            data.append("phone_number", phonenumber);
            
            const response = await axios.post('https://amazon.indianhackerslab.com/signup.php',data,{ headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.data.status==='success') {
               setDisplaymodal(true)
               setLoading(false)
            }
            else
            {
                setErrormodal(true)
            }
       
    };
    const[displaymodal,setDisplaymodal]=useState(false)
    const[errormodal,setErrormodal]=useState(false)
    const[loading,setLoading]=useState(false)
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
        <div>
            <Modal open={displaymodal} onClose={()=>{setDisplaymodal(false)}}>
                <Box sx={style}>
                    <h2>succcess</h2>
                    <p>Your account has been created</p>
                    <button onClick={()=>{setDisplaymodal(false)}} className='btn btn-danger'>close</button>
                </Box>
            </Modal>
            <Modal open={errormodal} onClose={()=>{setErrormodal(false)}}>
                <Box sx={style}>
                    <h2>Error</h2>
                    <p>Your account has not been created</p>
                    <button onClick={()=>{setErrormodal(false)}} className='btn btn-danger'>close</button>
                </Box>
            </Modal>
        <div className="container col-3">
            <h2 className="text-center my-4">Sign Up</h2>
            <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input type="text"
                    className="form-control"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                    type="number"
                    className="form-control"
                    value={phonenumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="d-flex justify-content-center">
            <button onClick={()=>{SignupUser()}} type="button" className="btn btn-primary" >
                    Register</button>
            </div>
        </div>
        </div>
    );
}

export default Signinpage;