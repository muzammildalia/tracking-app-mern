import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Header from "../../components/layouts/Header";
const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                { name, email, password, phone, address, answer }
            );
            if (res && res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong");
        }
    };
    return (
        <Layout>
            <Header />
            {/* <div className='register'> */}
            <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient">
                <div className="form_container 50-w p-5 rounded bg-white">
                    {/* <h1> Register Page </h1> */}
                    <form onSubmit={handlesubmit}>
                        <h3 className="text-center"> Register Page </h3>
                        <label htmlFor="name">Name</label>
                        <div class="mb-2">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Name"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                            />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="email">Email</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                class="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                required
                            />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="password">Password</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                placeholder="password"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                            />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="phone">Phone</label>

                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="phone No."
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                            />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Address"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                            />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="option">Select any Option Given Below</label>

                            <div class="form-floating">
                                <select
                                    class="form-select"
                                    id="floatingSelectGrid"
                                    aria-label="Floating label select example"
                                    required
                                >
                                    <option selected></option>
                                    <option value="1">Your Favourite Teacher Name</option>
                                    <option value="2">Your Favourite Sports</option>
                                </select>
                                <label for="floatingSelectGrid">
                                    Questions For Verification
                                </label>
                            </div>
                            <label htmlFor="answer">Type Your seleted Option</label>

                            <input
                                type="text"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Answer"
                                class="form-control"
                                id="exampleInputPassword1"
                                required
                            />
                        </div>
                        <div class="d-grid  mt-2">
                            <button type="submit" class="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p className="text-end mt-2">
                            Already Registered
                            <Link to="/login" className="ms-2">
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
