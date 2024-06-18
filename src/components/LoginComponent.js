const LoginComponent = () => {
  const handleTwitterLogin = (data) => {
    if (data.err) {
      console.error(data.err);
    } else {
      // will handle successful login here
      console.log(data);
    }
  };

  return (
    <TwitterLogin
      loginUrl="https://api.twitter.com/oath/authenticate"
      onFailure={handleTwitterLogin}
      onSuccess={handleTwitterLogin}
      requestTokenUrl="https://api.twitter.com/oauth/request_token"
      key="0mTyEPTvGW6XnPT6Tkwu5OFEJ"
      secret="CYBcBhEqtHxYsusssEZU8eOhMewgWGz110mBM3cB0bySIhoryT"
    />
  );
};

export default LoginComponent;
