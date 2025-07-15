import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled, { keyframes, css } from "styled-components";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

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

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
`;
const RevealIn = styled.div`
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.6s, transform 0.6s, filter 0.6s;
  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translateY(0);
      animation: ${fadeIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    `}
`;

const Underlined = styled.span`
  &:hover {
    text-decoration: underline;
  }
`;

const HomeHeader = styled.div`
  font-size: 55px;
  padding-top: 250px;
  font-weight: 800;
  letter-spacing: 1px;
`;

const Page = styled.div`
  background-color: var(--black);
`;

const Motto = styled.p`
  font-size: 28px;
  padding-bottom: 50px;
  text-align: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-bottom: 650px;
`;

const RegistrationLink = styled(Link)`
  font-size: 22px;
  color: var(--green);
  background: var(--beige);
  border-radius: 8px;
  border: 2px solid var(--green);
  display: inline-block;
  padding: 14px 32px;
  min-width: 180px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 2px 12px 0 #0002;

  &:hover {
    color: var(--beige);
    background: var(--green);
    border: 2px solid var(--beige);
  }

  &:active {
    color: var(--green);
    background: var(--beige);
    border: 2px solid var(--green);
  }
`;

const TimelineLink = styled(Link)`
  font-size: 22px;
  color: var(--beige);
  background: var(--green);
  border-radius: 8px;
  border: 2px solid var(--beige);
  display: inline-block;
  padding: 14px 32px;
  min-width: 180px;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 2px 12px 0 #0002;

  &:hover {
    color: var(--green);
    background: var(--beige);
    border: 2px solid var(--green);
  }

  &:active {
    color: var(--beige);
    background: var(--green);
    border: 2px solid var(--beige);
  }
`;

const GetStartedStyle = styled.div`
  background-color: var(--beige);
  color: var(--black);
  padding: 60px 0 40px 0;
  border-radius: 32px;
  margin: 40px auto 0 auto;
  max-width: 1100px;
  box-shadow: 0 4px 32px 0 #0001;
`;

const GetStartedText = styled.p`
  font-size: 22px;
  width: 80%;
  margin: 0 auto 32px auto;
  text-align: center;
  line-height: 1.6;
`;

const Space = styled.div`
  background: var(--blue);
  min-height: 40px;
`;

const FadeScaleIn = keyframes`
  0% { transform: scale(0.97); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
`;

const OverlayFadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
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
  font-family: "Regular";
  width: 100%;
  max-width: 26rem;
  border-radius: 1rem;
  padding: 1.5rem;
  background: var(--black);
  color: var(--beige);
  box-shadow: 0 4px 32px 0 var(--green);
  animation: ${FadeScaleIn} 0.5s ease-out forwards;
`;

const StyledDialogTitle = styled.h3`
  font-size: 1.25rem;
  font-family: "Regular";
  font-weight: 700;
  color: var(--green);
`;

const StyledDialogText = styled.p`
  font-family: "Regular";
  margin-top: 0.5rem;
  font-size: 1.05rem;
  color: var(--beige);
`;

const StyledCloseButton = styled.button`
  margin-top: 1.5rem;
  border-radius: 0.375rem;
  background-color: var(--beige);
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--green);
  border: none;
  box-shadow: 0 1px 2px var(--black);
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--gray);
    color: var(--black);
  }
`;

function Home() {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.2 });

  // --- Scroll margin logic ---
  const [sideMargin, setSideMargin] = useState(0);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      let margin = 0;
      let radius = 0;
      const start = 100; // scrollY where margin starts increasing
      const stop = 400; // scrollY where margin stops increasing
      const maxMargin = 40;
      const maxRadius = 40;

      if (y > start && y < stop) {
        margin = ((y - start) / (stop - start)) * maxMargin;
        radius = ((y - start) / (stop - start)) * maxRadius;
      } else if (y >= stop) {
        margin = maxMargin;
        radius = maxRadius;
      }
      setSideMargin(margin);
      setRadius(radius);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // --- End scroll margin logic ---

  // Fix: useState should be called as useState(window.innerWidth)
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const [showMobilePopup, setShowMobilePopup] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setShowMobilePopup(true);
    } else {
      setShowMobilePopup(false);
    }
  }, [width]);

  return (
    <div style={{ backgroundColor: "var(--blue)", minHeight: "100vh" }}>
      <Dialog
        open={showMobilePopup}
        onClose={() => setShowMobilePopup(false)}
        as="div"
      >
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>Mobile Experience</StyledDialogTitle>
              <StyledDialogText>
                For the best experience, please rotate your phone horizontally
                or use a desktop/laptop device.
              </StyledDialogText>
              <StyledCloseButton onClick={() => setShowMobilePopup(false)}>
                Close
              </StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
      <motion.div
        style={{
          backgroundColor: "var(--black)",
          color: "var(--beige)",
          marginLeft: sideMargin,
          marginRight: sideMargin,
          borderRadius: radius,
          transition:
            "margin 0.2s cubic-bezier(0.4,0,0.2,1), border-radius 0.2s cubic-bezier(0.4,0,0.2,1)",
          overflow: "hidden",
          boxShadow: "0 8px 32px 0 #0003",
        }}
      >
        <RevealRight ref={ref1} $visible={inView1}>
          <HomeHeader>
            The <Underlined>Case</Underlined> Competition
          </HomeHeader>
        </RevealRight>
        <Page>
          <RevealLeft ref={ref2} $visible={inView2}>
            <Motto>Think. Compete. Win.</Motto>
          </RevealLeft>
          <RevealIn ref={ref3} $visible={inView3}>
            <ButtonWrap>
              <RegistrationLink to="/registration">
                Registration
              </RegistrationLink>
              <TimelineLink to="/timeline">Timeline</TimelineLink>
            </ButtonWrap>
          </RevealIn>
        </Page>
      </motion.div>

      <GetStartedStyle>
        <h1
          style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: 800 }}
        >
          We've assembled an <b style={{ fontSize: "40px" }}>elite</b> panel of
          experts.
        </h1>
        <GetStartedText>
          Be judged by{" "}
          <span
            style={{
              color: "var(--green)",
              textDecoration: "underline",
              fontWeight: "bolder",
              fontSize: "26px",
            }}
          >
            UCB Haas students & graduates
          </span>
          , the{" "}
          <span
            style={{
              color: "var(--green)",
              textDecoration: "underline",
              fontWeight: "bolder",
              fontSize: "26px",
            }}
          >
            former Dean of Admissions at Wharton
          </span>
          , and many more top professionals and professors from leading
          institutions.
        </GetStartedText>

        <h1
          style={{ textAlign: "center", fontSize: "2.2rem", fontWeight: 800 }}
        >
          Welcome to the Case Competition!
        </h1>
        <GetStartedText>
          As a hired consultant, you will{" "}
          <span style={{ textDecoration: "underline" }}>
            analyze and present solutions
          </span>{" "}
          to an issue within your company. Showcase your skills to world-class
          judges and connect with like-minded individuals.
          <br />
          <br />
          <span style={{ textDecoration: "underline" }}>
            Register now
          </span>{" "}
          and check the timeline page
          for the schedule of events and deadlines.
        </GetStartedText>
      </GetStartedStyle>
      <Space />
    </div>
  );
}

export default Home;
