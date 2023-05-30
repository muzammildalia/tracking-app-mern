import React from "react";
import Layout from "../components/layouts/Layout";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column">
        <img className="w-50" src="./images/pageNotFound.png" alt="not found" />
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Link className="btn btn-secondary" to="/">
          <i className="fa fa-angle-left text-white"></i>Go to Home
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
