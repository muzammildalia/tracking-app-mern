import React from "react";
import bg from "../Assets/img_23.jpg";
import bgMobile from "../Assets/img_res.jpg";
import styled from "styled-components";

import WithBarTitle from "../components/reusable/WithBarTitle";
import Button from "../components/reusable/Button";
import Header from "./layouts/Header";
import { Link, useNavigate } from "react-router-dom";
const Banner = () => {
  

  return (
    <div>
      {/*  */}
      <Main>
        <Header isDark={true} />
        <Container>
          <RightBox>
            <WithBarTitle title="WITH Fitness Guru" />
            <h2 className="Build">
              Build Perfect body shape for good and healthy life.
            </h2>
            <Link to="/activity">
              <Button animation="fadeInLeft">Track Your Fitness</Button>
            </Link>
          </RightBox>
          <LeftBox></LeftBox>
        </Container>
      </Main>
    </div>
  );
};

//new
const Main = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  @media (min-width: 768px) {
    background-image: url(${bg});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }

  @media (max-width: 767px) {
    background-image: url(${bgMobile});
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
  }
`;


const Container = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const RightBox = styled.div`
  width: 50%;

  padding: 0px 100px;
`;
export default Banner;
