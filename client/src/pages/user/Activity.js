// import React, { useState } from "react";
// import Layout from "../../components/layouts/Layout";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/layouts/Header";
// import { useAuth } from "../../context/auth";

// const Activity = () => {
//   const [auth] = useAuth();
//   const { userId } = auth;

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [activityType, setactivityType] = useState("");
//   const [duration, setDuration] = useState();
//   const [date, setDate] = useState();

//   const navigate = useNavigate();
//   const [durationUnit, setDurationUnit] = useState("seconds");

//   const handleDurationChange = (e) => {
//     const durationValue = e.target.value;
//     // Update the duration state with the new value
//     setDuration(e.target.value);
//   };

//   const handleDurationUnitChange = (e) => {
//     const durationUnitValue = e.target.value;
//     // Update the durationUnit state with the new value
//     setDurationUnit(durationUnitValue);
//     // setDurationUnit(e.target.value);
//   };

//   const concatenateValues = () => {
//     // Concatenate the duration and durationUnit values
//     const concatenatedValue = duration + " " + durationUnit;
//     // Use the concatenated value as needed (e.g., display it, send it to an API, etc.)
//     console.log(concatenatedValue);
//   };

//   const handlesubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${process.env.REACT_APP_API}/api/v1/activity/create-activity`,
//         {
//           title,
//           description,
//           activityType,
//           duration,
//           date,
//           userId,
//         }
//       );
//       if (res && res.data.success) {
//         navigate("/");
//         toast.success(res.data.message);
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div>
//       <Layout>
//         <Header />
//         {/* <div className='register'> */}
//         <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient">
//           <div className="form_container 50-w p-5 rounded bg-white">
//             {/* <h1> Register Page </h1> */}
//             <form onSubmit={handlesubmit}>
//               <h3 className="text-center"> Activity Page </h3>
//               <label htmlFor="name">Title</label>
//               <div class="mb-2">
//                 <input
//                   type="text"
//                   maxLength={15}
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   placeholder="Activity Title"
//                   class="form-control"
//                   required
//                 />
//               </div>
//               <div class="mb-2">
//                 <label htmlFor="des">Description</label>

//                 <input
//                   type="text"
//                   maxLength={20}
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Description"
//                   class="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                   required
//                 />
//               </div>
//               <div class="mb-2">
//                 <label htmlFor="Activity-Type">Activity Type</label>
//                 <div className="input-group">
//                   <select
//                     value={activityType}
//                     onChange={(e) => setactivityType(e.target.value)}
//                     placeholder="Define Activity Type"
//                     className="form-select"
//                     required
//                   >
//                     <option value="">Select Activity</option>
//                     <option value="Running">Running</option>
//                     <option value="Bicycle">Bicycle</option>
//                     <option value="Ride">Ride</option>
//                     <option value="Swim">Swim</option>
//                     <option value="Walk">Walk</option>
//                     <option value="Hike">Hike</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="mb-2">
//                 <label htmlFor="time">Duration</label>
//                 <div className="input-group">
//                   <input
//                     type="number"
//                     value={duration}
//                     onChange={handleDurationChange}
//                     placeholder="Set Duration"
//                     className="form-control"
//                     id="exampleInputPassword1"
//                     required
//                   />
//                   <select
//                     type="text"
//                     className="form-select"
//                     value={durationUnit}
//                     onChange={handleDurationUnitChange}
//                     // onChange={(e) => setDuration(e.target.value)}
//                   >
//                     <option value="Seconds">Seconds</option>
//                     <option value="Minutes">Minutes</option>
//                     <option value="Hours">Hours</option>
//                   </select>
//                 </div>
//               </div>

//               <div class="mb-2">
//                 <label htmlFor="date">Date</label>
//                 <input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   placeholder="Select Date"
//                   class="form-control"
//                   id="exampleInputPassword1"
//                   required
//                 />
//               </div>

//               <div class="d-grid  mt-5">
//                 <button type="submit" class="btn btn-primary">
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Layout>
//     </div>
//   );
// };

// export default Activity;
import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import { useAuth } from "../../context/auth";
import { formatDuration } from "../../../src/components/utils";
const Activity = () => {
  const [auth] = useAuth();
  const { userId } = auth;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityType, setactivityType] = useState("");
  const [duration, setDuration] = useState();
  const [date, setDate] = useState();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  // const [durationUnit, setDurationUnit] = useState("seconds");

  const handleDurationChange = (e) => {
    const inputDuration = parseInt(e.target.value);
    if (
      Number.isNaN(inputDuration) ||
      inputDuration < 0 ||
      inputDuration > 24
    ) {
      setErrorMessage("Please enter a valid duration between 0 and 24 hours");
    } else {
      setDuration(e.target.value);
      setErrorMessage("");
    }
  };
  // const handleDurationChange = (e) => {
  //   const durationValue = e.target.value;
  //   // Update the duration state with the new value
  //   setDuration(e.target.value);
  // };

  // const handleDurationUnitChange = (e) => {
  //   const durationUnitValue = e.target.value.toLowerCase();
  //   // Update the durationUnit state with the new value
  //   setDurationUnit(durationUnitValue);
  // };

  // Concatenate the duration and durationUnit values
  // const duration1 = duration + " " + durationUnit;
  // Use the concatenated value as needed (e.g., display it, send it to an API, etc.)
  // console.log(duration1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  const duration = duration + " " + durationUnit;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/activity/create-activity`,
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
        <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient">
          <div className="form_container 50-w p-5 rounded bg-white">
            <form onSubmit={handleSubmit}>
              <h3 className="text-center">Activity Page</h3>
              <label htmlFor="name">Title</label>
              <div className="mb-2">
                <input
                  type="text"
                  maxLength={15}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Activity Title"
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="des">Description</label>
                <input
                  type="text"
                  maxLength={20}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <div className="mb-2">
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
                    <option value="Running">Running</option>
                    <option value="Bicycle">Bicycle</option>
                    <option value="Ride">Ride</option>
                    <option value="Swim">Swim</option>
                    <option value="Walk">Walk</option>
                    <option value="Hike">Hike</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="time">Duration</label>
                <div className="input-group">
                  <input
                    type="string"
                    value={duration}
                    onChange={handleDurationChange}
                    placeholder="Set Duration"
                    className="form-control"
                    id="exampleInputPassword1"
                    required
                  />
                  {/* <select
                    type="text"
                    className="form-select"
                    value={durationUnit}
                    onChange={(e) => {
                      console.log(
                        setDurationUnit(e.target.value.toLowerCase())
                      );
                    }}
                  >
                    <option value="seconds">Seconds</option>
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select> */}
                </div>
                {errorMessage && (
                  <div className="text-danger">{errorMessage}</div>
                )}
              </div>
              <div className="mb-2">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Select Date"
                  className="form-control"
                  id="exampleInputPassword1"
                  required
                />
              </div>
              <div className="d-grid  mt-5">
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Activity;
