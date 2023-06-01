import React, { useState, useEffect } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/layouts/Header";
import { useAuth } from "../../context/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errorAdddress, setErrorAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const [auth] = useAuth();

  // useEffect(() => {
  //   // Redirect to another page if the user is already authenticated
  //   if (auth.user) {
  //     navigate("/");
  //   }
  // }, [auth.user, navigate]);

  // const history = useHistory();

  // Redirect to another page if the user is already authenticated
  if (auth.user) {
    navigate("/");
    return null;
  }

  // const location = useLocation();

  // const navigate = useNavigate();

  // const handleNameChange = (e) => {
  //   const inputValue = e.target.value;
  //   // Remove any spaces from the input value
  //   const trimmedValue = inputValue.replace(/\s/g, "");
  //   setName(trimmedValue);
  // };

  // const navigate = useNavigate();

  const handleNameChange = (e) => {
    const inputValue = e.target.value;

    // Check if the input value contains only spaces or special characters
    if (/^\s*$/.test(inputValue) || /[^a-zA-Z\s]/.test(inputValue)) {
      // Input value contains only spaces or special characters, handle the error here
      setErrorMessage("Please enter a valid name");
    } else {
      setErrorMessage("");
    }
    setName(inputValue);
  };

  const handleAddressChange = (e) => {
    const inputValue = e.target.value;
    // Check if the input value contains only spaces or special characters
    if (/^\s*$/.test(inputValue) || /[^a-zA-Z\s]/.test(inputValue)) {
      // Input value contains only spaces or special characters, handle the error here
      setErrorAddress("Please enter a valid Address");
    } else {
      setErrorAddress("");
    }
    setAddress(inputValue);
  };

  // setAddress(inputValue);
  // Remove any spaces from the input value
  // const trimmedValue = inputValue.replace(/\s/g, "");
  // setAddress(trimmedValue);
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    const numericValue = inputValue.replace(/\D/g, "");
    setPhone(numericValue);
  };

  const handleAnswerChange = (e) => {
    const inputValue = e.target.value;
    // Remove any spaces from the input value
    const trimmedValue = inputValue.replace(/\s/g, "");
    setAnswer(trimmedValue);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // let nameError = "";
    // let addressError = "";
    // Check if the name is empty or contains only spaces
    if (/^\s*$/.test(name)) {
      setErrorMessage("Please enter a valid name");
      return;
    }
    if (/^\s*$/.test(address)) {
      setErrorAddress("Please enter a valid Address");
      return;
    }
    // setErrorMessage();
    // setErrorAddress();
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

  // if (localStorage.getItem("auth")) {
  //   return navigate("/");
  // }

  return (
    <Layout>
      <Header />
      {/* <div className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 bg-dark bg-gradient"> */}
      <div
        className="signup template d-flex justify-content-center align-items-center pt-3 pb-5 vh-70 "
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(33, 47, 61, 1) 35%, rgba(0, 212, 255, 1) 100%)",
        }}
      >
        <div className="form_container 50-w p-5 rounded bg-white">
          <form onSubmit={handlesubmit}>
            {/* <h3 className="text-center"> Register Page </h3> */}
            <h3
              style={{
                color: "rgba(0, 123, 255, 1)",
              }}
              className="text-center"
            >
              Register Page
            </h3>
            <label htmlFor="name">Name</label>
            <div class="mb-2">
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                pattern="^[A-Za-z\s]+$"
                // pattern="[A-Za-z]+"
                placeholder="Enter Name (A-Z / a-z only)"
                class="form-control"
                id="exampleInputPassword1"
                required
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
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
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}"
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
                maxlength="22"
                minLength="6"
                placeholder="password"
                class="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div class="mb-2">
              <label htmlFor="phone">Phone</label>

              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                maxlength="11"
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
                onChange={handleAddressChange}
                maxLength="30"
                placeholder="Address"
                class="form-control"
                id="exampleInputPassword1"
                required
              />
              {errorAdddress && (
                <p className="error-message">{errorAdddress}</p>
              )}
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
                onChange={handleAnswerChange}
                maxlength="15"
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
      {/* </div> */}
    </Layout>
  );
};

export default Register;
