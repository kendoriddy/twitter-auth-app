import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Updated import
import SignIn from "./pages/SignIn";
import OtpDisplay from "./pages/OtpDisplay";
import TwitterOtpDisplay from "./pages/TwitterOtpDisplay";
import Dashboard from "./pages/Dashboard";
import styles from "./styles/App.module.css";

const App = () => {
  const [user, setUser] = useState({
    email: "",
    displayName: "",
    photoURL: "",
  });
  const [twitterUser, setTwitterUser] = useState(null);

  const handleSignIn = (email, displayName) => {
    setUser({ email, displayName, photoURL: "" });
    setTwitterUser(null);
  };

  const handleTwitterSignIn = (photoURL, displayName) => {
    setTwitterUser({ photoURL, displayName });
    setUser({ email: "", displayName, photoURL });
  };

  return (
    <Router>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome! You will like it here.</h1>
        <Routes>
          {" "}
          <Route
            path="/"
            element={
              !user.displayName ? (
                <SignIn
                  onSignIn={handleSignIn}
                  onTwitterSignIn={handleTwitterSignIn}
                />
              ) : twitterUser ? (
                <TwitterOtpDisplay twitterUser={twitterUser} />
              ) : (
                <OtpDisplay email={user.email} displayName={user.displayName} />
              )
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />{" "}
          {/* Updated Route component */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
