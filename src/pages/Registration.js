import React, { useState, useEffect } from "react";
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
  color: var(--beige);
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

const Space1 = styled.div`
  background-color: var(--black);
  min-height: 150px;
`;

const Space2 = styled.div`
  background-color: var(--black);
  min-height: 50px;
`;

const RegisterStyle = styled.div`
  background-color: var(--black);
  color: var(--beige);
`;

const Register = styled.div`
  background-color: var(--black);
  color: var(--beige);
  font-size: 50px;
`;

const Abit = styled.div`
  background-color: var(--black);
  color: var(--beige);
  font-size: 35px;
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

const RegisterButton = styled.button`
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

function Registration() {
  let [credIsOpen, setCredIsOpen] = useState(false);
  let [fieldIsOpen, setFieldIsOpen] = useState(false);
  let [emailIsOpen, setEmailIsOpen] = useState(false);

  function openCredAlert() {
    setCredIsOpen(true);
  }

  function closeCredAlert() {
    setCredIsOpen(false);
  }

  function openFieldAlert() {
    setFieldIsOpen(true);
  }

  function closeFieldAlert() {
    setFieldIsOpen(false);
  }

  function openEmailAlert() {
    setEmailIsOpen(true);
  }

  function closeEmailAlert() {
    setEmailIsOpen(false);
  }

  const CredentialsError = () => {
    return (
      <Dialog open={credIsOpen} onClose={closeCredAlert} as="div">
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>User already exists.</StyledDialogTitle>
              <StyledDialogText>
                You may want to log into your consultancy.
              </StyledDialogText>
              <StyledCloseButton onClick={closeCredAlert}>
                Close.
              </StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
    );
  };

  const EmptyFieldError = () => {
    return (
      <Dialog open={fieldIsOpen} onClose={closeFieldAlert} as="div">
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>Empty field(s).</StyledDialogTitle>
              <StyledDialogText>Please fill in all fields.</StyledDialogText>
              <StyledCloseButton onClick={closeFieldAlert}>
                Close.
              </StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
    );
  };

  const ValidEmailError = () => {
    return (
      <Dialog open={emailIsOpen} onClose={closeEmailAlert} as="div">
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>Invalid email.</StyledDialogTitle>
              <StyledDialogText>
                Please enter a valid email address.
              </StyledDialogText>
              <StyledCloseButton onClick={closeEmailAlert}>
                Close.
              </StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
    );
  };

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [school, setSchool] = useState("");

  const registerUser = async () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === "" ||
      phone === "" ||
      grade === "" ||
      school === ""
    ) {
      openFieldAlert(true);
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      openEmailAlert(true);
      return;
    }

    try {
      await httpClient.post(`${backendLink}/registration`, {
        email,
        password,
        firstName,
        lastName,
        phone,
        grade,
        school,
      });
      window.location.href = `/`;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        openCredAlert(true);
      } else {
        alert("An unexpected error occured. Please try again later.");
      }
    }

    // goes to profile page after registration
    // try {
    //   const resp = await httpClient.get("//localhost:5000/@me");
    //   window.location.href = `/profile/${resp.data.id}`;
    // } catch (error) {
    //   console.log("Unauthenticated");
    // }
  };

  return (
    <RegisterStyle>
      {credIsOpen ? <CredentialsError /> : <></>}
      {emailIsOpen ? <ValidEmailError /> : <></>}
      {fieldIsOpen ? <EmptyFieldError /> : <></>}
      <Space1 />
      <Register>Register for excellence.</Register>
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
        <Email>
          <text style={{ marginRight: 20 + "px" }}>First name:</text>
          <EmailInputBorder>
            <EmailInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              id=""
            />
          </EmailInputBorder>
        </Email>
        <Password>
          <text style={{ marginRight: 20 + "px" }}>Last name:</text>
          <PasswordInputBorder>
            <PasswordInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              id=""
            />
          </PasswordInputBorder>
        </Password>
        <Email>
          <text style={{ marginRight: 20 + "px" }}>Phone number:</text>
          <EmailInputBorder>
            <EmailInput
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id=""
            />
          </EmailInputBorder>
        </Email>
        <Password>
          <text style={{ marginRight: 20 + "px" }}>Grade:</text>
          <PasswordInputBorder>
            <PasswordInput
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              id=""
            />
          </PasswordInputBorder>
        </Password>
        <Email>
          <text style={{ marginRight: 20 + "px" }}>School:</text>
          <EmailInputBorder>
            <EmailInput
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              id=""
            />
          </EmailInputBorder>
        </Email>
        <Space2 />
        <ButtonWrap>
          <RegisterButton type="button" onClick={registerUser}>
            I'm ready.
          </RegisterButton>
        </ButtonWrap>
      </Info>
      <Space2 />
    </RegisterStyle>
  );
}

export default Registration;
