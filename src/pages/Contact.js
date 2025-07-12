import React from "react";
import styled from "styled-components";

const ContactUs = styled.div`
  font-size: 30px;
  color: var(--beige);
  padding: 380px;
  background: var(--black);
`;

const Info = styled.div`
  font-size: 25px;
`;

function Contact() {
  return (
    <ContactUs>
      Want to contact us?
      <br />
      <br />
      <Info>
        Email: thecasecompetition2025@gmail.com
      <br />
      Phone: 4085822957
      </Info>
    </ContactUs>
  );
}

export default Contact;
