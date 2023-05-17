import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "./style.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
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
      {/* <div className="register"> */}
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-dark bg-gradient">
        <div className="form_container 50-w p-5 rounded bg-white">
          {/* <h1> Login Page </h1> <br /> */}

          <form onSubmit={handlesubmit}>
            <h3 className="text-center"> Login Page </h3>
            <div class="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
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
                placeholder="Enter Password"
                class="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div class="mb-2">
              <input
                type="checkbox"
                name="custom-control custom-checkbox"
                id="check"
              />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me
              </label>
            </div>
            {/* <div class="mb-3"> */}
            <div class="d-grid">
              <button type="submit" className="btn btn-primary ">
                Login
              </button>
              {/* <br /> */}
              {/* <br /> */}
              {/* 
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button> */}
            </div>
            <p className="text-end mt-2">
              {" "}
              Forgot
              <Link to="/forgot-password" className="ms-2">
                Password?
              </Link>
              <Link to="/Register" className="ms-2">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
