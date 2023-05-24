import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const ActivityLog = () => {
    const [auth] = useAuth();
    const { userId } = auth;
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [activityType, setactivityType] = useState("");
    const [duration, setDuration] = useState("");
    const [date, setDate] = useState("");
    const [editActivityId, setEditActivityId] = useState(null);
    const navigate = useNavigate();
    const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
    const editActivityModalRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEdit = (activityId) => {
        const activity = activities.find((activity) => activity._id === activityId);
        if (activity) {
            setTitle(activity.title);
            setDescription(activity.description);
            setactivityType(activity.activity_type);
            setDuration(activity.duration);
            setDate(activity.date);
            setEditActivityId(activityId);
            setIsModalOpen(true);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/activity/${editActivityId}`,
                {
                    title,
                    description,
                    activityType,
                    duration,
                    date,
                    userId,
                }
            );
            if (res && res.data.success) {
                setIsModalOpen(false);
                toast.success(res.data.message);
                navigate("/");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    const handleDelete = async (activityId) => {
        setDeleteConfirmationId(activityId);
    }
    const confirmDelete = async (activityId) => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API}/api/v1/activity/remove-activities/${activityId}`
            );
            if (res && res.data.success) {
                toast.success(res.data.message);

                navigate('/');
                // Remove the deleted activity from the activities array
                setActivities((prevActivities) =>
                    prevActivities.filter((activity) => activity._id !== deleteConfirmationId)
                );
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        setDeleteConfirmationId(null);
    };

    const closeModal = () => {
        setDeleteConfirmationId(null);
    };

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
                            {activities.map((activity) => (
                                <div class="card text-white bg-dark mx-3 my-3" style={{ width: '18rem' }}>
                                    <div class="card-header" key={activity._id}>{activity.title}</div>

                                    <div class="card-body">
                                        <h5 class="card-title">{activity.activity_type}</h5>
                                        <p class="card-text">{activity.description}</p>
                                        <p class="card-text">{activity.duration}</p>
                                        <p class="card-text">{activity.date}</p>
                                        <button type="button" class="btn btn-light rounded-pill px-3 mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal1" onClick={() => handleEdit(activity._id)}>Edit</button>
                                        <button type="button" class="btn btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleDelete(activity._id)}>Delete</button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5 text-danger" id="exampleModalLabel">confirm delete</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        ...
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-primary" onClick={() => confirmDelete(activity._id)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}

                            <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel1">Edit Activity</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">

                                            {/* <h1> Register Page </h1> */}
                                            <form>
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
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-primary" onClick={handleUpdate}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default ActivityLog

