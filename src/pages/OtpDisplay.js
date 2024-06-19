import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/App.module.css";
import { generateOTP } from "../utils/generateOTP";

const OtpDisplay = ({ email, displayName, twitterUser }) => {
  const [otp, setOtp] = useState("");
  const [expiryTime, setExpiryTime] = useState(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (email) {
      try {
        const otp = generateOTP();
        setOtp(otp);
        const expiry = Date.now() + 30000;
        setExpiryTime(expiry);
        setCountdown(30);

        const timer = setTimeout(() => {
          setOtp("");
          setExpiryTime(null);
          setCountdown(0);
        }, 30000);

        const countdownInterval = setInterval(() => {
          const now = Date.now();
          const newCountdown = Math.max(Math.floor((expiry - now) / 1000), 0);
          setCountdown(newCountdown);
          if (newCountdown <= 0) {
            clearInterval(countdownInterval); // Stop the interval when countdown reaches 0
          }
        }, 1000);

        return () => {
          clearTimeout(timer);
          clearInterval(countdownInterval);
        };
      } catch (error) {
        toast.error("Failed to generate OTP. Please try again.");
      }
    }
  }, [email]);

  return (
    <div className={styles.card}>
      {twitterUser && (
        <img src={twitterUser.photoURL} alt={twitterUser.displayName} />
      )}
      {email && <p>Email: {email}</p>}
      {displayName && <p>Name: {displayName || twitterUser.displayName}</p>}
      {otp && (
        <p>
          OTP: {otp} (expires in {countdown} seconds)
        </p>
      )}
      {!otp && email && <p className={styles.expired}>OTP has expired</p>}
    </div>
  );
};

export default OtpDisplay;
