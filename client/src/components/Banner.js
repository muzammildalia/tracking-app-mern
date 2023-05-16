import React from 'react'
import bg from "../Assets/img_1.jpg";
import styled from 'styled-components'

import WithBarTitle from '../components/reusable/WithBarTitle';
import Button from '../components/reusable/Button'
import H1 from '../components/reusable/H1'
import { FaPlay } from "react-icons/fa";
import Layout from './layouts/Layout';
import Header from './layouts/Header';
const Banner = () => {
    return (
        <div>
            <Main>
                <Header />
                <Container>
                    <RightBox>
                        <WithBarTitle title="WITH Fitness Guru" />
                        <H1>Build Perfect body shape for good and healthy life.</H1>
                        <Button animation="fadeInLeft">Became a member</Button>
                    </RightBox>
                    <LeftBox>
                        {/* <Circle>
                            <CircleButton>
                                <FaPlay />
                            </CircleButton>
                        </Circle> */}
                    </LeftBox>
                </Container>
            </Main>
        </div>
    )
}

const Main = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${bg});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
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

const Circle = styled.div`
  border: 2px solid red;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 120px;
  padding: 2px;
  animation: zoomIn;
  animation-duration: 2s;
`;

const CircleButton = styled.button`
  outline: none;
  background-color: red;
  color: white;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: none;
  cursor: pointer;
`;
export default Banner