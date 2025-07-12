import React from "react";
import styled from "styled-components";

const ComingSoon = styled.div`
  font-size: 20px;
  color: var(--beige);
  padding: 320px;
  background: var(--black);
`;

function About() {
  return (
    <ComingSoon>
      We founded the Case Competition as passionate high schoolers at Evergreen
      Valley High School in San Jose, California. We noticed that many students
      like us don’t always have access to traditional business competitions such
      as DECA. Our mission is to break down those barriers and create a
      welcoming platform where anyone interested in business can participate,
      learn, and grow—regardless of their background or prior experience.
      <br />
      <br />
      Through this competition, we hope to inspire more young people to develop
      their business skills, gain real-world experience, and connect with a
      supportive community. Thank you for joining us on this journey—we’re
      excited to see what you achieve!
      <br />
      <br />—Sanjay Manamala & Ojas Prabhune
    </ComingSoon>
  );
}

export default About;
