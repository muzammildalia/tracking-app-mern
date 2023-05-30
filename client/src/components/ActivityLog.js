import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "./utils";
import { FaClock, FaCalendarAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ActivityLog = () => {
  const [auth] = useAuth();
  const { userId } = auth;
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityType, setactivityType] = useState("");
  const [duration, setDuration] = useState("");
  const [durationUnit, setDurationUnit] = useState("");
  const [date, setDate] = useState("");
  const [editActivityId, setEditActivityId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorActiviy, setErrorActivity] = useState("");

  const navigate = useNavigate();
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const userId = auth.user?._id;
        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/activity/user-activities/${userId}`
        );
        setActivities(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user activities:", error);
        setLoading(false);
      }
    };

    fetchUserActivities();
  }, [auth]);

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input value contains only spaces or special characters
    if (/^\s*$/.test(inputValue) || /[^a-zA-Z\s]/.test(inputValue)) {
      // Input value contains only spaces or special characters, handle the error here
      setErrorActivity("Please enter a Valid Activity");
    } else {
      setErrorActivity("");
    }
    setTitle(inputValue);
  };

  const handleDescChange = (e) => {
    const inputValue = e.target.value;
    // Remove any spaces from the input value
    const trimmedValue = inputValue.replace(/\s/g, "");
    setDescription(trimmedValue);
  };

  const handleDurationChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue === "") {
      setDuration("");
      setErrorMessage("");
    } else if (/^\d+$/.test(inputValue) && inputValue > 0 && inputValue <= 24) {
      setDuration(inputValue);
      setErrorMessage("");
    } else {
      setErrorMessage("Enter a valid duration between 1 and 24 hours");
    }
  };

  const handleEdit = (activityId) => {
    const activity = activities.find((activity) => activity._id === activityId);
    if (activity) {
      setTitle(activity.title);
      setDescription(activity.description);
      setactivityType(activity.activity_type);
      setDuration(activity.duration);
      setDurationUnit(activities.durationUnit);
      setDate(activity.date);
      setEditActivityId(activityId);
    }
  };

  const handleUpdate = async (editActivityId) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/activity/update-activities/${editActivityId}`,
        {
          title,
          description,
          activity_type: activityType,
          duration,
          durationUnit,
          date,
          userId,
        }
      );
      if (res && res.data.success) {
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity._id === editActivityId
              ? {
                  ...activity,
                  title,
                  description,
                  activity_type: activityType,
                  duration,
                  durationUnit,
                  date,
                }
              : activity
          )
        );
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
  };

  // const handleDelete = async (activityId) => {
  //   Swal.fire({
  //     title: "Confirm Delete",
  //     text: "Are you sure you want to delete this activity?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Yes, delete it!",
  //     cancelButtonText: "No, cancel",
  //     reverseButtons: true,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       // User clicked "Delete"
  //       await confirmDelete(activityId);
  //     }
  //   });
  // };

  //new
  const confirmDelete = async (activityId) => {
    try {
      const result = await Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this activity?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const res = await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/activity/remove-activities/${activityId}`
        );

        if (res && res.data.success) {
          toast.success(res.data.message);

          navigate("/");
          setActivities((prevActivities) =>
            prevActivities.filter((activity) => activity._id !== activityId)
          );
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  //end

  // const confirmDelete = async (activityId) => {
  //   try {
  //     const res = await axios.delete(
  //       `${process.env.REACT_APP_API}/api/v1/activity/remove-activities/${activityId}`
  //     );
  //     if (res && res.data.success) {
  //       toast.success(res.data.message);

  //       navigate("/");
  //       setActivities((prevActivities) =>
  //         prevActivities.filter((activity) => activity._id !== activityId)
  //       );
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Activity Logs</h1>
            <hr />
            <div className="row justify-content-center">
              {activities.map((activity) => (
                <div
                  class="card text-white bg-dark mx-3 my-3 activity-card"
                  style={{ width: "18rem" }}
                >
                  <div class="card-header text-center" key={activity._id}>
                    {activity.title}
                  </div>

                  {/* new */}
                  <div class="card-body d-flex flex-column align-items-center">
                    <h5 class="card-title">{activity.activity_type}</h5>
                    {/* <p class="card-text">{activity.description}</p> */}
                    <div className="d-flex justify-content-end mb-2">
                      <p className="card-text">
                        <FaClock className="me-2 mb-1" />
                        {formatDuration(activity.duration)}
                      </p>
                    </div>
                    <div className="d-flex justify-content-end mb-2">
                      <p class="card-text">
                        <FaCalendarAlt className="me-2 mb-1" />
                        {activity.date}
                      </p>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-light rounded-pill px-3 mx-1 my-1 edit-button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                        onClick={() => handleEdit(activity._id)}
                      >
                        <i class="fas fa-edit"></i> Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-light rounded-pill mx-1 my-1 delete-button"
                        // data-bs-toggle="modal"
                        // data-bs-target="#exampleModal"
                        onClick={() => confirmDelete(activity._id)}
                        // onClick={() => handleDelete(activity._id)}
                      >
                        <i class="fas fa-trash-alt"></i> Delete
                      </button>
                    </div>
                    {/* <div
                      class="modal fade"
                      id="exampleModal"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1
                              class="modal-title fs-5 text-danger"
                              id="exampleModalLabel"
                            >
                              confirm delete
                            </h1>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">...</div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => confirmDelete(activity._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                  {/* end */}
                </div>
              ))}

              <div
                class="modal fade"
                id="exampleModal1"
                tabindex="-1"
                aria-labelledby="exampleModalLabel1"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel1">
                        Edit Activity
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      {/* <h1> Register Page </h1> */}
                      <form>
                        <label htmlFor="name">Title</label>
                        <div class="mb-2">
                          <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            maxLength={15}
                            placeholder="Activity Title"
                            class="form-control"
                            required
                          />
                          {errorActiviy && (
                            <div className="text-danger">{errorActiviy}</div>
                          )}
                        </div>
                        <div class="mb-2">
                          <label htmlFor="des">Description</label>

                          <input
                            type="text"
                            value={description}
                            onChange={handleDescChange}
                            maxLength={15}
                            placeholder="Description"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            required
                          />
                        </div>
                        <div class="mb-2">
                          <label htmlFor="Activity-Type">Activity Type</label>

                          <div className="input-group">
                            <select
                              value={activityType}
                              onChange={(e) => setactivityType(e.target.value)}
                              placeholder="Define Activity Type"
                              className="form-select"
                              required
                            >
                              <option value="">Select Activity</option>
                              <option value="Running">Running 🏃</option>
                              <option value="Bicycle">Bicycle 🚲</option>
                              <option value="Ride">Ride 🚴</option>
                              <option value="Swim">Swim 🏊‍♀️</option>
                              <option value="Walk">Walk 🚶</option>
                              <option value="Hike">Hike 🥾</option>
                            </select>
                          </div>

                          {/* <input
                            type="text"
                            value={activityType}
                            onChange={(e) => setactivityType(e.target.value)}
                            placeholder="Define Activity Type"
                            class="form-control"
                            id="exampleInputPassword1"
                            required
                          /> */}
                        </div>
                        <div class="mb-2">
                          <label htmlFor="time">Duration</label>

                          <input
                            type="text"
                            value={duration}
                            onChange={handleDurationChange}
                            placeholder="Set Duration"
                            class="form-control"
                            id="exampleInputPassword1"
                            required
                          />
                        </div>
                        {errorMessage && (
                          <div className="error-message">{errorMessage}</div>
                        )}
                        <div class="mb-2">
                          <label htmlFor="date">Date</label>
                          <input
                            type="date"
                            value={date}
                            min={new Date().toISOString().split("T")[0]} // Set the min attribute to the current date
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
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        // class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          handleUpdate(editActivityId);
                        }}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityLog;
