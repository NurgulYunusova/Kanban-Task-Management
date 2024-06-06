// import ChangePasswordPage from "../pages/Auth/changePassword/ChangePasswordPage";
// import ForgotPasswordPage from "../pages/Auth/forgotPassword/ForgotPasswordPage";
import ForgotPasswordPage from "../pages/Auth/forgotPassword/ForgotPasswordPage";
import LoginPage from "../pages/Auth/login/LoginPage";
import RegisterPage from "../pages/Auth/register/RegisterPage";
import VerifyPage from "../pages/Auth/verify/VerifyPage";
// import NotFoundPage from "../pages/notFound/NotFoundPage";

export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPasswordPage />,
  },
  // {
  //   path: "/changePassword",
  //   element: <ChangePasswordPage />,
  // },
  // {
  //   path: "*",
  //   element: <NotFoundPage />,
  // },
];
