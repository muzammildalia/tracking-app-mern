import React from 'react'

import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import "./style.css";
import Header from "../../components/layouts/Header";
const Activity = () => {
    return (
        <div>
            <Layout>
                <Header />
                {/* <div className='register'> */}
                <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient">
                    <div className="form_container 50-w p-5 rounded bg-white">
                        {/* <h1> Register Page </h1> */}
                        <form >
                            <h3 className="text-center"> Activity Page </h3>
                            <label htmlFor="name">Title</label>
                            <div class="mb-2">
                                <input
                                    type="text"
                                    // value={name}
                                    // onChange={(e) => setName(e.target.value)}
                                    placeholder="Activity Title"
                                    class="form-control"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="email">Description</label>

                                <input
                                    type="email"
                                    // value={email}
                                    // onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Description"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="password">Activity Type</label>

                                <input
                                    type="password"
                                    // value={password}
                                    // onChange={(e) => setpassword(e.target.value)}
                                    placeholder="Define Activity Type"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="phone">Duration</label>

                                <input
                                    type="time"
                                    step="2"
                                    // value={phone}
                                    // onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Set Duration"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="address">Date</label>
                                <input
                                    type="date"
                                    // value={address}
                                    // onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Select Date"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    required
                                />
                            </div>

                            <div class="d-grid  mt-5">
                                <button type="submit" class="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Activity