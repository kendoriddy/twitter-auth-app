import React, { useEffect, useState } from "react";
import axios from "axios";
import { generateOTP } from "../utils/generateOTP";
import { getOAuthHeaders } from "../utils/twitterAuth";
import { useNavigate } from "react-router-dom";

const TwitterOtpDisplay = ({ twitterUser }) => {
  const [otp, setOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const sendOtp = async () => {
      const otp = generateOTP();
      setOtp(otp);

      const twitterUserAccessToken = localStorage.getItem(
        "twitterUserAccessToken"
      );
      const twitterUser = JSON.parse(localStorage.getItem("twitterUser"));

      const recipientId = twitterUser.uid;
      const url = "https://api.twitter.com/1.1/direct_messages/events/new.json";

      const headers = getOAuthHeaders(
        "1016460375083094016-OXQNGB05xJ3aWNresFJriKGDLytSCy",
        "t62MsUMX62CPxZvHpBLD3VyYFmVcsPlntmZTcYs8dzsCO"
      );

      const data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: recipientId },
            message_data: { text: `Your OTP is: ${otp}` },
          },
        },
      };

      try {
        await axios.post(url, data, { headers });
        console.log("OTP sent successfully");
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    };

    sendOtp();
  }, [twitterUser]);

  const handleOtpChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  const handleOtpSubmit = () => {
    if (enteredOtp === otp) {
      history("/dashboard");
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div style={styles.otpContainer}>
      <img
        src={twitterUser.photoURL}
        alt={twitterUser.displayName}
        style={styles.img}
      />
      <p>Name: {twitterUser.displayName}</p>
      <p>Your OTP has been sent to your Twitter DM!</p>
      <input
        type="text"
        value={enteredOtp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        style={styles.textInput}
      />
      <button onClick={handleOtpSubmit} style={styles.submitButton}>
        Submit OTP
      </button>
    </div>
  );
};

const styles = {
  otpContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "400px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
  },
  img: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  textInput: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "calc(100% - 22px)",
    boxSizing: "border-box",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

export default TwitterOtpDisplay;
