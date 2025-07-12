import "./App.css";

import "./styles/Fonts.css";

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import Home from "./pages/Home";
import Timeline from "./pages/Timeline";
import Registration from "./pages/Registration";
import Submission from "./pages/Submission";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import React, { useState, useEffect } from "react";
import httpClient from "./util/httpClient.js";
import styled from "styled-components";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import backendLink from "./util/backendLink.js";

const AppStyle = styled.div`
  text-align: center;
  font-family: "Regular";
`;

function App() {
  const [user, setUser] = useState(null);

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

  return (
    <AppStyle>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/timeline" exact element={<Timeline />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/submission" exact element={<Submission />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/login" exact element={<Login />} />
          {user != null ? (
            <Route path={`/profile/${user.id}`} exact element={<Profile />} />
          ) : (
            <></>
          )}
          {/* TODO: add 404 not found page, fix fade out animation for alerts */}
        </Routes>
        <Footer />
      </Router>
    </AppStyle>
  );
}

export default App;
