import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import { useAuth } from "../../context/auth";

const Activity = () => {
    const [auth] = useAuth();
    const { userId } = auth;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [activityType, setactivityType] = useState("");
    const [duration, setDuration] = useState();
    const [date, setDate] = useState();

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/activity/create-activity`,
                {
                    title,
                    description,
                    activityType,
                    duration,
                    date,
                    userId, // Include the user ID in the request payload
                }
            );
            if (res && res.data.success) {
                navigate("/");
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <Layout>
                <Header />
                {/* <div className='register'> */}
                <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient">
                    <div className="form_container 50-w p-5 rounded bg-white">
                        {/* <h1> Register Page </h1> */}
                        <form onSubmit={handlesubmit}>
                            <h3 className="text-center"> Activity Page </h3>
                            <label htmlFor="name">Title</label>
                            <div class="mb-2">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Activity Title"
                                    class="form-control"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="des">Description</label>

                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="Activity-Type">Activity Type</label>

                                <input
                                    type="text"
                                    value={activityType}
                                    onChange={(e) => setactivityType(e.target.value)}
                                    placeholder="Define Activity Type"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="time">Duration</label>

                                <input
                                    type="text"

                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="Set Duration in format (DD/MM/YYYY)"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    required
                                />
                            </div>
                            <div class="mb-2">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
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