import React from "react";
import styled, { keyframes } from "styled-components";

import "../styles/Fonts.css";

import TimelineUI from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineDot from "@mui/lab/TimelineDot";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BackupIcon from "@mui/icons-material/Backup";
import GavelIcon from "@mui/icons-material/Gavel";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import LandscapeTwoToneIcon from "@mui/icons-material/LandscapeTwoTone";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`;

const TimelineStyle = styled(TimelineUI)`
  background: var(--black)
  color: var(--beige);
  margin: 100px;

  svg {
    font-size: 54px;
    color: var(--blue);
    filter: drop-shadow(0 2px 8px #00e6d0aa);
    background: #fff;
    border-radius: 50%;
    padding: 6px;
    transition: transform 0.2s;
  }
  svg:hover {
    transform: scale(1.15) rotate(-8deg);
    filter: drop-shadow(0 4px 16px #00e6d0ff);
  }

  .MuiTimelineConnector-root {
    height: 90px;
    background: var(--beige);
    width: 1px;
    margin: 0 auto;
    box-shadow: 0 0 12px 2px #00e6d088;
  }
`;

const EndConnectors = styled(TimelineConnector)`
  opacity: 0;
`;

const Content = styled.div`
  background: linear-gradient(135deg, var(--green) 80%, var(--blue) 100%);
  color: var(--beige);
  display: inline-block;
  padding: 0px 32px;
  border-radius: 16px;
  font-family: "Regular";
  box-shadow: 0 4px 32px 0 var(--green);
  animation: ${fadeIn} 0.7s;
`;

const DateContent = styled.div`
  background: linear-gradient(135deg, var(--beige) 80%, #fff 100%);
  color: var(--green);
  display: inline-block;
  padding: 18px 28px;
  border-radius: 12px;
  font-family: "Regular";
  font-weight: bold;
  font-size: 22px;
  box-shadow: 0 2px 16px 0 #00e6d033;
  animation: ${fadeIn} 0.7s;
  margin-bottom: 10px;
`;

const ContentHeader = styled.p`
  font-size: 32px;
  font-weight: 700;
`;

const ContentP = styled.p`
  font-size: 20px;
  opacity: 0.9;
`;

function Timeline() {
  return (
    <div>
      <TimelineStyle>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }} align="right">
            <Content>
              <ContentHeader>Registration opens</ContentHeader>
              <ContentP>Register to be a consultant.</ContentP>
            </Content>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <EndConnectors />
            <TimelineDot>
              <AppRegistrationIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <DateContent>Early July</DateContent>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <DateContent>July 7</DateContent>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <RocketLaunchIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <Content>
              <ContentHeader>Case launch</ContentHeader>
              <ContentP>The Case Competition officially begins.</ContentP>
            </Content>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <Content>
              <ContentHeader>Submission deadline</ContentHeader>
              <ContentP>Submit your final cases by today.</ContentP>
            </Content>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <BackupIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <DateContent>July 25</DateContent>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <DateContent>July 26 - August 10</DateContent>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <GavelIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <Content>
              <ContentHeader>Judging period</ContentHeader>
              <ContentP>Judges will evaluate your work.</ContentP>
            </Content>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <Content>
              <ContentHeader>Elim results</ContentHeader>
              <ContentP>The results will be announced.</ContentP>
            </Content>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot>
              <TurnedInIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <DateContent>August 11 - August 12</DateContent>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: "auto 0" }}>
            <DateContent>August 20</DateContent>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="secondary">
              <LandscapeTwoToneIcon />
            </TimelineDot>
            <EndConnectors />
          </TimelineSeparator>
          <TimelineContent sx={{ m: "auto 0" }}>
            <Content>
              <ContentHeader>The Summit 🗻</ContentHeader>
              <ContentP>Finalist showcase and awards.</ContentP>
            </Content>
          </TimelineContent>
        </TimelineItem>
      </TimelineStyle>
    </div>
  );
}

export default Timeline;
