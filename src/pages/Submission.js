import React, { useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import httpClient from "../util/httpClient";
import backendLink from "../util/backendLink";
import { color } from "framer-motion";

const fadeLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
    filter: blur(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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
    transform: translateY(0);
    filter: blur(0px);
  }
`;

const GuidelinesWrap = styled.div`
  font-family: "Regular";
  background: var(--black);
`;

const MainTitle = styled.h1`
  font-size: 2.3rem; // Increased by 1px (was 2.2rem)
  font-weight: 800;
  margin-bottom: 18px;
  color: var(--beige) !important;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2rem; // Increased by 1px (was 1.5rem)
  font-weight: 700;
  margin-top: 32px;
  margin-bottom: 10px;
  color: var(--gray);
`;

const SubTitle = styled.h3`
  font-size: 1.5rem; // Increased by 1px (was 1.15rem)
  font-weight: 600;
  margin-top: 18px;
  margin-bottom: 8px;
  color: var(--green, #1b7c5c);
`;

const StyledUl = styled.ul`
  margin-left: 24px;
  margin-bottom: 18px;
  text-align: left;
  font-size: 19px; // Increased by 1px
  & > li {
    margin-bottom: 6px;
    line-height: 1.6;
  }
`;

const StyledOl = styled.ol`
  margin-left: 24px;
  margin-bottom: 18px;
  text-align: left;
  font-size: 19px; // Increased by 1px
  & > li {
    margin-bottom: 6px;
    line-height: 1.6;
  }
`;

const Em = styled.em`
  color: var(--blue, #2a4d8f);
  font-style: italic;
  font-size: 1.11em; // Increased by 1px relative
`;

const HR = styled.hr`
  border: none;
  border-top: 2px solid var(--green, #1b7c5c);
  margin: 40px 0 32px 0;
`;

const animationLeft = css(["", " 0.2s linear;"], fadeLeft);
const animationRight = css(["", " 0.2s linear;"], fadeRight);

const IslandLeft = styled.div`
  background: var(--green);
  color: var(--beige);
  border-radius: 24px;
  max-width: 900px;
  margin: 40px auto auto auto;
  padding: 48px;
  box-shadow: 0 4px 32px 0 var(--green);
  font-size: 19px; // Increased by 1px
  animation: ${animationLeft};
`;

const IslandRight = styled.div`
  background: var(--green);
  color: var(--beige);
  border-radius: 24px;
  max-width: 900px;
  margin: 40px auto auto auto;
  padding: 48px;
  box-shadow: 0 4px 32px 0 var(--green);
  font-size: 19px; // Increased by 1px
  animation: ${animationRight};
`;

function Submission() {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append("case", selectedFile, selectedFile.name);
    try {
      await httpClient.post(`${backendLink}/case-submission`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      alert("Error.");
    }
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div style={{ color: "var(--beige)", fontSize: "18px" }}>
          <p>
            <strong>File Name: </strong>
            {selectedFile.name}
          </p>
        </div>
      );
    } else {
      return (
        <div style={{ color: "var(--beige)", fontSize: "18px" }}>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  const iframeRef = useRef();

  const fetchPDF = async () => {
    const response = await httpClient.get(`${backendLink}/case-submission`, {
      responseType: "blob", // important!
    });
    // Create a blob URL and set it as the iframe src
    const file = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    iframeRef.current.src = fileURL;
  };

  return (
    <GuidelinesWrap>
      <IslandLeft style={{ marginTop: "100px" }}>
        <MainTitle
          style={{
            color: "var(--green)",
            textDecoration: "underline",
          }}
        >
          Launch Stage Submission Guidelines
        </MainTitle>
        <p>
          All participating teams are required to submit two key components for
          the Launch Stage: a <strong>written report</strong> and a{" "}
          <strong>video presentation</strong>. Both components will be evaluated
          as part of the initial judging process.
        </p>
      </IslandLeft>
      <IslandRight>
        <SectionTitle>1. Written Report</SectionTitle>
        <p>
          <strong>Objective:</strong> Present a structured, in-depth, and
          well-reasoned solution to the case prompt, supported by analysis,
          research, and implementation strategy.
        </p>
        <SubTitle>Format Requirements:</SubTitle>
        <StyledUl>
          <li>
            File format: <strong>PDF only</strong>
          </li>
          <li>Font: Arial or Times New Roman, size 11</li>
          <li>Line spacing: 1.15 or 1.5</li>
          <li>Margins: Standard (1 inch on all sides)</li>
        </StyledUl>
        <SubTitle>Required Components Structure:</SubTitle>
        <StyledOl>
          <li>
            <strong>Executive Summary</strong> – Concise overview of the
            solution (1 paragraph)
          </li>
          <li>
            <strong>Problem Analysis</strong> – Definition and contextual
            understanding of the core issue
          </li>
          <li>
            <strong>Proposed Solution</strong> – Clear articulation of the
            strategy or product being proposed
          </li>
          <li>
            <strong>Implementation Plan</strong> – Actionable steps, timeline,
            required resources, and scalability
          </li>
          <li>
            <strong>Market &amp; Impact Outlook</strong> – Target user base,
            competitive landscape, and projected outcomes
          </li>
          <li>
            <strong>Appendix (Optional)</strong> – Additional visuals, models,
            or supporting data/citations not found in previous sections
          </li>
        </StyledOl>
        <p>
          <Em>
            The written report must use hard data and statistics as well as
            quantitative reasoning. Teams must include visuals throughout and
            keep a formal tone.
          </Em>
        </p>
      </IslandRight>
      <IslandLeft>
        <SectionTitle>2. Video Presentation</SectionTitle>
        <p>
          <strong>Objective:</strong> Provide a compelling and engaging verbal
          summary of the team’s proposal, demonstrating clarity, creativity, and
          communication skills.
        </p>
        <SubTitle>Format Requirements:</SubTitle>
        <StyledUl>
          <li>Unlisted YouTube link</li>
          <li>Duration: 2 to 3 minutes</li>
          <li>
            Presentation style is flexible (e.g., pitch, explainer, interview
            format) but must remain professional and aligned with the content of
            the written report
          </li>
        </StyledUl>
      </IslandLeft>
      <IslandRight
        style={{
          marginBottom: "50px",
        }}
      >
        <p>
          <Em>Note: The content above is subject to change.</Em>
        </p>
      </IslandRight>

      <div style={{ color: "var(--beige)" }}>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData()}
      <div style={{ display: "block" }}>
        <div>
          <button
            style={{
              padding: "10px",
              fontSize: "20px",
              color: "var(--black)",
              background: "var(--beige)",
              borderRadius: "7px",
            }}
            onClick={fetchPDF}
          >
            View My Submission
          </button>
        </div>
        <div>
          <iframe
            ref={iframeRef}
            title="PDF Preview"
            width="80%"
            height="1000px"
            style={{ border: "none", marginTop: "20px" }}
          />
        </div>
      </div>
    </GuidelinesWrap>
  );
}

export default Submission;
