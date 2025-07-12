import React, { useState } from "react";
import httpClient from "../util/httpClient";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { keyframes } from "styled-components";
import styled from "styled-components";
import backendLink from "../util/backendLink";
import axios from "axios";

const FadeScaleIn = keyframes`
  0% {
    transform: scale(0.97);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const OverlayFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
  width: 100vw;
  overflow-y: auto;
  animation: ${OverlayFadeIn} 0.5s ease-out;
  backdrop-filter: blur(8px);
`;

const DialogWrapper = styled.div`
  font-family: "Regular";
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const StyledDialogPanel = styled.div`
  width: 100%;
  max-width: 28rem;
  border-radius: 1rem;
  padding: 1.5rem;
  backdrop-filter: blur(32px);
  animation: ${FadeScaleIn} 0.5s ease-out forwards;
`;

const StyledDialogTitle = styled.h3`
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;
  color: white;
`;

const StyledDialogText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: rgba(255, 255, 255, 0.5);
`;

const StyledCloseButton = styled.button`
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background-color: var(--beige);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--green);
  box-shadow: inset 0 1px 2px var(--black);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--gray);
    color: var(--black);
  }
`;

const Space = styled.div`
  background-color: var(--black);
  min-height: 260px;
`;

const LoginStyle = styled.div`
  background-color: var(--black);
  color: var(--beige);
`;

const LogIn = styled.div`
  background-color: var(--black);
  color: var(--beige);
  font-size: 50px;
`;

const Info = styled.div`
  font-size: 20px;
`;

const Email = styled.div`
  margin: 40px;
`;

const Password = styled.div`
  margin: 40px;
`;

const EmailInputBorder = styled.div`
  position: relative;
  display: inline-block;

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background-image: conic-gradient(
      from var(--angle),
      var(--beige),
      var(--gray),
      var(--blue),
      var(--green),
      var(--beige)
    );
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 6px;
    z-index: 1;
    animation: 3s spin linear infinite;
  }

  &::before {
    filter: blur(1.5rem);
    opacity: 0.5;
  }

  @keyframes spin {
    from {
      --angle: 0deg;
    }
    to {
      --angle: 720deg;
    }
  }
`;

const PasswordInputBorder = styled.div`
  position: relative;
  display: inline-block;

  @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: calc(100% + 10px);
    width: calc(100% + 10px);
    background-image: conic-gradient(
      from var(--angle),
      var(--beige),
      var(--gray),
      var(--blue),
      var(--green),
      var(--beige)
    );
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    border-radius: 6px;
    z-index: 1;
    animation: 3s spin linear infinite;
  }

  &::before {
    filter: blur(1.5rem);
    opacity: 0.5;
  }

  @keyframes spin {
    from {
      --angle: 0deg;
    }
    to {
      --angle: 720deg;
    }
  }
`;

const EmailInput = styled.input`
  border-radius: 4px;
  padding: 10px;
  position: relative;
  z-index: 3; // Make sure input is above the border
  background: var(--beige);
  border: none;
  outline: none;
  color: var(--black);
  font-size: 16px;
`;

const PasswordInput = styled.input`
  border-radius: 4px;
  padding: 10px;
  position: relative;
  z-index: 3; // Make sure input is above the border
  background: var(--beige);
  border: none;
  outline: none;
  color: var(--black);
  font-size: 16px;
`;

const LoginButton = styled.button`
  font-size: 28px;
  color: var(--green);
  background: var(--beige);
  border-radius: 4px;
  border: 1px solid transparent;
  padding: 17px;
  width: 280px;
  display: inline-block;
  transition: all 150ms ease-in-out;
  text-align: center;
  text-decoration: none;
  margin: 20px;

  &:hover {
    color: var(--beige);
    background: transparent;
    border: 1px solid var(--beige);
  }

  &:active {
    color: var(--green);
    background: var(--beige);
    border: 1px solid var(--beige);
  }
`;

const ButtonWrap = styled.div`
  background-color: var(--green);
`;

function Login() {
  let [isOpen, setIsOpen] = useState(false);

  function openAlert() {
    setIsOpen(true);
  }

  function closeAlert() {
    setIsOpen(false);
  }

  const CredentialsError = () => {
    return (
      <Dialog open={isOpen} onClose={closeAlert} as="div">
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>Invalid credentials.</StyledDialogTitle>
              <StyledDialogText>
                You have entered an invalid username or password.
              </StyledDialogText>
              <StyledCloseButton onClick={closeAlert}>Close.</StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
    );
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logUser = async () => {
    try {
      await httpClient.post(`${backendLink}/login`, {
        email,
        password,
      });
      window.location.href = "/";
    } catch (error) {
      if (error.response && error.response.status === 401) {
        openAlert();
      }
    }
  };

  return (
    <LoginStyle>
      {isOpen ? <CredentialsError /> : <></>}
      <Space />
      <LogIn>Log into your consultancy.</LogIn>
      <Info>
        <Email>
          <text style={{ marginRight: 20 + "px" }}>Email:</text>
          <EmailInputBorder>
            <EmailInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id=""
            />
          </EmailInputBorder>
        </Email>
        <Password>
          <text style={{ marginRight: 20 + "px" }}>Password:</text>
          <PasswordInputBorder>
            <PasswordInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id=""
            />
          </PasswordInputBorder>
        </Password>
        <ButtonWrap>
          <LoginButton type="button" onClick={logUser}>
            Let's go.
          </LoginButton>
        </ButtonWrap>
      </Info>
      <Space />
    </LoginStyle>
  );
}

export default Login;
