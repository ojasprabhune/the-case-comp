import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  background-color: var(--black);
  color: var(--beige);
  text-align: center;
  padding: 60px;
  position: relative;
  p {
    margin: 0;
    font-size: 14px;
  }
`;

function Footer() {
  return (
    <FooterWrapper>
      <p>2025 The Case Competition</p>
    </FooterWrapper>
  );
}

export default Footer;
