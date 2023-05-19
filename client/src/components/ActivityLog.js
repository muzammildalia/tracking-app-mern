import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

const ActivityLog = () => {
    const [activities, setActivities] = useState([]);

    const getAllActivities = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/activity/get-activity`)
            if (data.success) {
                setActivities(data.activity);
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong in getting Activities')
        }

    }

    useEffect(() => {
        getAllActivities();
    }, [])

    return (
        <>
            <div className="container my-5 py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className='display-6 fw-bolder text-center'>Activity Logs</h1>
                        <hr />
                        <div className="row justify-content-center">
                            {activities.map(activity => (
                                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                                    <div class="card-header">{activity.title}</div>

                                    <div class="card-body">
                                        <h5 class="card-title" key={activity._id}>{activity.activity_type}</h5>
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
            {/* <div className="row justify-content-center">
                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Dark card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Dark card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                    <div class="card-header">Header</div>
                    <div class="card-body">
                        <h5 class="card-title">Dark card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ActivityLog