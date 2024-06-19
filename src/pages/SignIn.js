import React from "react";
import { auth, provider, signInWithPopup } from "../utils/firebase";
import { TwitterAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import styles from "../styles/App.module.css";

const SignIn = ({ onSignIn, onTwitterSignIn }) => {
  const handleSignInWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        const user = result.user;
        localStorage.setItem("twitterUser", JSON.stringify(user));
        localStorage.setItem(
          "twitterUserAccessToken",
          JSON.stringify(user.accessToken)
        );
        onTwitterSignIn(user.photoURL, user.displayName);
      })
      .catch((error) => {
        toast.error("Failed to sign in with Twitter. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className={styles.card}>
      <button className={styles.button} onClick={handleSignInWithTwitter}>
        Sign In with Twitter
      </button>
    </div>
  );
};

export default SignIn;
