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
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><Logo /></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <Link to='/' className="navbar-brand" ><Logo /></Link>


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/category' className="nav-link" >Categories</Link>
                            </li>
                            {
                                !auth.user ?
                                    (
                                        <>
                                            <li className="nav-item">
                                                <Link to='/register' className="nav-link" >REGISTER</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to='/login' className="nav-link" href="#">LOGIN</Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item dropdown">
                                                <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {auth.user?.name}
                                                </Link>
                                                <ul className="dropdown-menu">
                                                    <li><Link to='/profile' className="dropdown-item" >Profile</Link></li>
                                                    <li><Link to='/activity' className="dropdown-item" >Add Activity</Link></li>
                                                </ul>
                                            </li>
                                            <li className="nav-item">
                                                <Link to='/login' onClick={handleLogout} className="nav-link" href="#">LOGOUT</Link>
                                            </li>
                                        </>
                                    )
                            }
                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Header