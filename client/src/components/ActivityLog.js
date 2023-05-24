import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
// import { Link, useNavigate } from "react-router-dom";

const ActivityLog = () => {
    const [auth] = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserActivities = async () => {
            try {
                const userId = auth.user?._id;
                if (!userId) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/activity/user-activities/${userId}`)
                setActivities(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user activities:', error);
                setLoading(false);
            }
        };

        fetchUserActivities();
    }, [auth]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Activity Logs</h1>
                        <hr />
                        <div className="row justify-content-center">
                            {console.log(activities)}
                            {activities.map((activity) => (
                                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                                    <div class="card-header" key={activity._id}>{activity.title}</div>

                                    <div class="card-body">
                                        <h5 class="card-title">{activity.activity_type}</h5>
                                        <p class="card-text">{activity.description}</p>
                                        <p class="card-text">{activity.duration}</p>
                                        <p class="card-text">{activity.date}</p>
                                        <button type="button" class="btn btn-light rounded-pill px-3 mx-5">Edit</button>
                                        <button type="button" class="btn btn-light rounded-pill ">Delete</button>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ActivityLog