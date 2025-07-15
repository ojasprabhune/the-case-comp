import React from "react";
import { useInView } from "react-intersection-observer";
import styled, { keyframes, css } from "styled-components";

const AboutStyle = styled.div`
  font-size: 20px;
  color: var(--beige);
  padding: 320px;
  background: var(--black);
`;

const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0px);
  }
`;

const fadeRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
    filter: blur(0px);
  }
`;

const RevealLeft = styled.div`
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s, transform 0.6s, filter 0.6s;
  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      animation: ${fadeLeft} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `}
`;

const RevealRight = styled.div`
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.6s, transform 0.6s, filter 0.6s;
  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      animation: ${fadeRight} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `}
`;


function About() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <AboutStyle>
      <RevealLeft ref={ref1} $visible={inView1}>
        We founded the Case Competition as passionate high schoolers at Evergreen
        Valley High School in San Jose, California. We noticed that many students
        like us don’t always have access to traditional business competitions such
        as DECA. Our mission is to break down those barriers and create a
        welcoming platform where anyone interested in business can participate,
        learn, and grow—regardless of their background or prior experience.
      </RevealLeft>
      <br />
      <br />
      <RevealRight ref={ref2} $visible={inView2}>
        Through this competition, we hope to inspire more young people to develop
        their business skills, gain real-world experience, and connect with a
        supportive community. Thank you for joining us on this journey—we’re
        excited to see what you achieve!
      </RevealRight>
      <br />
      <br />—Sanjay Manamala & Ojas Prabhune
    </AboutStyle>
  );
}

export default About;
