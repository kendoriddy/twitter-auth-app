import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

const CallbackPage = () => {
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  React.useEffect(() => {
    if (isAuthenticated) {
      // Redirect to dashboard after successful authentication
      history.push("/dashboard");
    }
  }, [isAuthenticated, history]);

  return <div>Loading...</div>; // Placeholder for loading state
};

export default CallbackPage;
