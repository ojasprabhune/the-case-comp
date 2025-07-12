import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import httpClient from "../util/httpClient.js";
import backendLink from "../util/backendLink.js";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavbarWrapper = styled.section`
  background: var(--green);
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000; /* or higher if needed */
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Case = styled.img`
  height: 40px;
  width: auto;
  display: block;
  cursor: pointer;
  user-select: none;
  transition: transform 0.13s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.13s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.04);
    opacity: 85%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  flex: 100%;
  height: 100%;
  align-items: center;
  justify-content: right;
  margin-right: 15px;
  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--beige);
  font-size: 20px;
  text-decoration: none;
  margin: 15px;
  transition: transform 0.13s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.13s cubic-bezier(0.4, 0, 0.2, 1);
  &:hover {
    transform: scale(1.04);
    opacity: 85%;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  margin-right: 20px;
  margin-left: auto; // add this
  @media (max-width: 900px) {
    display: flex;
    align-items: center;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 260px;
  background: var(--green);
  color: var(--beige);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  box-shadow: -2px 0 24px #0004;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SidebarClose = styled.div`
  align-self: flex-end;
  margin-bottom: 32px;
  cursor: pointer;
`;

function Navbar() {
  const [mode, setMode] = useState("dark");
  const [user, setUser] = useState(null);

  const logoutUser = async () => {
    await httpClient.post(`${backendLink}/logout`);
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${backendLink}/@me`);
        setUser(resp.data);
      } catch (error) {
        console.log("Unauthenticated");
      }
    })();
  }, []);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
  } else {
    setDarkMode();
  }

  const toggleTheme = (checked) => {
    if (checked) setDarkMode();
    else setLightMode();
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <NavbarWrapper className="navbar">
        <LogoContainer>
          <Link to="/">
            <Case src={logo} />
          </Link>
        </LogoContainer>
        <NavLinks className="navbarlinks">
          <NavLink to="/timeline"> Timeline </NavLink>
          <NavLink to="/submission"> Submission </NavLink>
          <NavLink to="/about"> About </NavLink>
          <NavLink to="/contact"> Contact </NavLink>
          {/* Show registration button if user not logged in */}
          {user == null ? (
            <NavLink to="/registration"> Registration </NavLink>
          ) : (
            <></>
          )}
          {/* Show log out button if user currently logged in and vice versa */}
          {user == null ? <NavLink to="/login"> Login </NavLink> : <></>}
          {user != null ? (
            <div>
              <NavLink to={`/profile/${user.id}`}> Profile </NavLink>
              <NavLink onClick={logoutUser}>Log out</NavLink>
            </div>
          ) : (
            <></>
          )}
        </NavLinks>
        <Hamburger onClick={() => setMobileOpen(true)}>
          <MenuIcon style={{ color: "var(--beige)", fontSize: 36 }} />
        </Hamburger>
      </NavbarWrapper>
      <Sidebar open={mobileOpen}>
        <SidebarClose onClick={() => setMobileOpen(false)}>
          <CloseIcon style={{ color: "var(--beige)", fontSize: 36 }} />
        </SidebarClose>
        {/* Sidebar links, same as NavLinks */}
        <NavLink to="/timeline" onClick={() => setMobileOpen(false)}>
          Timeline
        </NavLink>
        {user == null ? (
          <NavLink to="/registration" onClick={() => setMobileOpen(false)}>
            Registration
          </NavLink>
        ) : null}
        <NavLink to="/submission" onClick={() => setMobileOpen(false)}>
          Submission
        </NavLink>
        <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
          Contact
        </NavLink>
        <NavLink to="/about" onClick={() => setMobileOpen(false)}>
          About
        </NavLink>
        {user != null ? (
          <NavLink
            onClick={() => {
              setMobileOpen(false);
              logoutUser();
            }}
          >
            Log out
          </NavLink>
        ) : (
          <NavLink to="/login" onClick={() => setMobileOpen(false)}>
            Login
          </NavLink>
        )}
        {user != null ? (
          <NavLink
            to={`/profile/${user.id}`}
            onClick={() => setMobileOpen(false)}
          >
            Profile
          </NavLink>
        ) : null}
      </Sidebar>
    </div>
  );
}

export default Navbar;
