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
  background-color: rgba(198, 0, 0, 0.7); // <-- Add this line for a dark tint
`;

const StyledDialogTitle = styled.h3`
  font-size: 30px;
  font-weight: 500;
  color: white;
`;

const StyledDialogText = styled.p`
  font-size: 20px;
  color: var(--beige);
`;

const StyledCloseButton = styled.button`
  margin-top: 1rem;
  margin-right: 1rem;
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
    color: var(--blackk);
  }
`;

const ProfileHeader = styled.div`
  font-size: 48px;
  padding-top: 120px;
  background: var(--black);
  color: var(--beige);
  font-weight: 800;
  letter-spacing: 1px;
  text-align: center;
  border-radius: 0 0 32px 32px;
  box-shadow: 0 4px 32px 0 #0002;
  margin-bottom: 32px;
`;

const InfoWrap = styled.div`
  padding: 40px 0 32px 0;
  background: var(--beige);
  color: var(--black);
  text-align: center;
  border-radius: 32px;
  margin: 0 auto 32px auto;
  max-width: 900px;
  box-shadow: 0 4px 32px 0 #0001;
`;

const Info = styled.div`
  font-size: 24px;
  display: block;
  text-align: center;
  margin: 18px auto;
  padding: 18px 0;
  background: linear-gradient(90deg, var(--blue) 10%, var(--green) 90%);
  color: var(--beige);
  border-radius: 16px;
  width: 70%;
  box-shadow: 0 2px 16px 0 #00e6d033;
`;

const DeleteButtonWrap = styled.div`
  background: transparent;
  padding-top: 40px;
  padding-bottom: 80px;
  text-align: center;
`;

const DeleteButton = styled.button`
  background: red;
  border-radius: 8px;
  padding: 14px 32px;
  color: var(--beige);
  font-size: 18px;
  font-weight: 700;
  border: 2px solid var(--beige);
  box-shadow: 0 2px 16px 0 #b4000033;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  margin-top: 12px;

  &:hover {
    background: rgb(92, 0, 0);
    color: var(--beige);
  }
`;

function Profile() {
  const [user, setUser] = useState(null);
  let [deleteConfirm, setDeleteConfirmIsOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  function openDeleteConfirmAlert() {
    setDeleteConfirmIsOpen(true);
  }

  function closeDeleteConfirmAlert() {
    setDeleteConfirmIsOpen(false);
  }

  async function doDeleteAccount() {
    closeDeleteConfirmAlert();
    try {
      await httpClient.post(`${backendLink}/remove-user`, {
        user_id: user.id,
      });
      alert("Account deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again later.");
    }
  }

  function dontDelete() {
    closeDeleteConfirmAlert();
  }

  const DeleteConfirm = () => {
    return (
      <Dialog open={deleteConfirm} onClose={closeDeleteConfirmAlert} as="div">
        <Overlay>
          <DialogWrapper>
            <StyledDialogPanel>
              <StyledDialogTitle>⚠️ DANGER ZONE ⚠️</StyledDialogTitle>
              <StyledDialogText>
                WARNING: Are you SURE you want to delete your account?
              </StyledDialogText>
              <StyledCloseButton onClick={doDeleteAccount}>
                Yes.
              </StyledCloseButton>
              <StyledCloseButton onClick={dontDelete}>No.</StyledCloseButton>
            </StyledDialogPanel>
          </DialogWrapper>
        </Overlay>
      </Dialog>
    );
  };

  const deleteUser = () => {
    openDeleteConfirmAlert();
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(`${backendLink}/@me`);
        setUser(resp.data);
        setTeamMembers(resp.data.team_members || "");
        setEditing(
          !(resp.data.team_members && resp.data.team_members.trim() !== "")
        );
      } catch (error) {
        console.log("Unauthenticated");
      }
    })();
  }, []);

  return (
    <div style={{ background: "var(--black)", minHeight: "100vh" }}>
      {deleteConfirm ? <DeleteConfirm /> : <></>}
      <ProfileHeader>Profile</ProfileHeader>
      {user ? (
        <InfoWrap>
          <Info>
            <strong>Name:</strong> {user.first_name} {user.last_name}
          </Info>
          <Info>
            <strong>Grade:</strong> {user.grade}th
            <br />
            <strong>School:</strong> {user.school}
          </Info>
          <Info>
            <strong>Phone:</strong> {user.phone_number}
          </Info>
          <Info>
            <strong>Email:</strong> {user.email}
          </Info>
        </InfoWrap>
      ) : (
        <p
          style={{
            textAlign: "center",
            fontSize: 22,
            marginTop: 80,
          }}
        >
          Fetching your data...
        </p>
      )}
      <div style={{ margin: "32px auto", maxWidth: 600, textAlign: "center" }}>
        <h2 style={{ fontSize: 24, margin: 8, color: "var(--beige)" }}>
          Team Members
        </h2>
        {editing ? (
          <>
            <textarea
              value={teamMembers}
              onChange={(e) => setTeamMembers(e.target.value)}
              rows={3}
              style={{
                width: "100%",
                borderRadius: 7,
                padding: 12,
                fontSize: 18,
                marginBottom: 12,
                color: "var(--black)",
                background: "var(--beige)",
              }}
              placeholder="Enter team member names, separated by commas."
            />
            <button
              onClick={async () => {
                setSaving(true);
                try {
                  await httpClient.post(`${backendLink}/team`, {
                    team_members: teamMembers,
                  });
                  setEditing(false);
                } catch (e) {
                  alert("Failed to save team members. Please try again later.");
                }
                setSaving(false);
              }}
              disabled={saving}
              style={{
                background: "var(--green)",
                color: "var(--beige)",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontSize: 18,
              }}
            >
              {saving ? "Saving..." : "Save"}
            </button>
            {user && user.team_members && user.team_members.trim() !== "" && (
              <button
                style={{
                  marginLeft: 16,
                  background: "var(--beige)",
                  color: "var(--green)",
                  border: "1px solid var(--green)",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: 18,
                }}
                onClick={() => {
                  setEditing(false);
                  setTeamMembers(user.team_members);
                }}
              >
                Cancel
              </button>
            )}
          </>
        ) : (
          <>
            <div
              style={{
                background: "var(--beige)",
                color: "var(--black)",
                borderRadius: 7,
                padding: 12,
                fontSize: 18,
                marginBottom: 12,
                whiteSpace: "pre-line",
              }}
            >
              {teamMembers}
            </div>
            <button
              style={{
                background: "var(--green)",
                color: "var(--beige)",
                border: "none",
                borderRadius: 8,
                padding: "10px 24px",
                fontSize: 18,
              }}
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
      <DeleteButtonWrap>
        <DeleteButton onClick={deleteUser}>Delete Account</DeleteButton>
      </DeleteButtonWrap>
    </div>
  );
}

export default Profile;
