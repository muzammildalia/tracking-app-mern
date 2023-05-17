import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast'
import Logo from "../reusable/Logo";


const Header = () => {
    const [auth, setAuth] = useAuth();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem('auth')
        toast.success('Logout successfully')
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <Link to='/' class="navbar-brand" ><Logo /></Link>


                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link to='/' class="nav-link" >Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link to='/category' class="nav-link" >Categories</Link>
                            </li>
                            {
                                !auth.user ?
                                    (
                                        <>
                                            <li class="nav-item">
                                                <Link to='/register' class="nav-link" >REGISTER</Link>
                                            </li>
                                            <li class="nav-item">
                                                <Link to='/login' class="nav-link" href="#">LOGIN</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li class="nav-item">
                                                <Link to='/login' onClick={handleLogout} class="nav-link" href="#">LOGOUT</Link>
                                            </li>
                                        </>
                                    )
                            }
                            <li class="nav-item">
                                <Link to='/cart' class="nav-link" href="#">Cart(0)</Link>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header