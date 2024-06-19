import React, { useEffect, useState } from "react";
import axios from "axios";
import { generateOTP } from "../utils/generateOTP";
import { getOAuthHeaders } from "../utils/twitterAuth";
import { useNavigate } from "react-router-dom";
import styles from "../styles/App.module.css";

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
    <div className={styles.otpContainer}>
      <img
        src={twitterUser.photoURL}
        alt={twitterUser.displayName}
        className={styles.img}
      />
      <p>Name: {twitterUser.displayName}</p>
      <p>Your OTP has been sent to your Twitter DM!</p>
      <input
        type="text"
        value={enteredOtp}
        onChange={handleOtpChange}
        placeholder="Enter OTP"
        className={styles.textInput}
      />
      <button onClick={handleOtpSubmit} className={styles.submitButton}>
        Submit OTP
      </button>
    </div>
  );
};

export default TwitterOtpDisplay;
