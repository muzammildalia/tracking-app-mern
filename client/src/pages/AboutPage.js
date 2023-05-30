import React from "react";
import Layout from "../components/layouts/Layout";
import Header from "../components/layouts/Header";

const AboutPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <div className="row contactus">
          <hr />
          <div className="col-md-5">
            <img
              className="aboutimg"
              src="/images/about2.jpeg"
              alt="contactus"
              style={{ width: "100%", marginLeft: "10%" }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-end ">
            <p className="text-justify mt-5" style={{ marginLeft: "10%" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              officiis obcaecati esse tempore unde ratione, eveniet mollitia,
              perferendis eius temporibus dicta blanditiis doloremque explicabo
              quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
              accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
              commodi illum quidem neque tempora nam.
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AboutPage;
