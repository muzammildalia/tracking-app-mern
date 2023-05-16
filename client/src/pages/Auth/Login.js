import React, { useState } from 'react'
import Layout from '../../components/layouts/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    const location = useLocation();



    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                { email, password }
            );
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || "/");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    };
    return (
        <Layout>
            <div className='register'>
                <h1> Login Page </h1> <br />
                <form onSubmit={handlesubmit}>
                    <div class="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div class="mb-1">
                        <input type="password" value={password} onChange={(e) => setpassword(e.target.value)} placeholder='password' class="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-primary" onClick={() => { navigate('/forgot-password'); }}>Forgot Password</button>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </Layout>
    )
}


export default Login