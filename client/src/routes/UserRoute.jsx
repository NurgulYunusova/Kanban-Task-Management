/* eslint-disable react/prop-types */
import LoginPage from "../pages/Auth/login/LoginPage";

const UserRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return children;
  }

  return <LoginPage />;
};

export default UserRoute;
