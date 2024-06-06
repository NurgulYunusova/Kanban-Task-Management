import "./forgotPassword.scss";
import image from "../../../assets/images/forgotPassword.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgotPasswordTrueAlertOpen, setForgotPasswordTrueAlertOpen] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/forgotPassword`,
        {
          email: email,
        }
      );
      console.log(response);
      if (response.status === 200) {
        setForgotPasswordTrueAlertOpen(true);
        setEmail("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseTrueForgotPasswordAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setForgotPasswordTrueAlertOpen(false);
  };

  return (
    <>
      <div className="forgotPassword">
        <div className="forgotPasswordContainer">
          <div className="form">
            <h3>FORGOT YOUR PASSWORD?</h3>
            <p>
              Please enter your email. You will receive an email message for
              reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">GET NEW PASSWORD</button>
            </form>

            <Snackbar
              open={forgotPasswordTrueAlertOpen}
              autoHideDuration={3000}
              onClose={handleCloseTrueForgotPasswordAlert}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MuiAlert
                onClose={handleCloseTrueForgotPasswordAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                Email sent successfully. Check email to change your password.
              </MuiAlert>
            </Snackbar>

            <a onClick={() => navigate("/login")}>
              <i className="fa-solid fa-angle-left"></i> Back to Login
            </a>
          </div>

          <div className="image">
            <img src={image} alt="Forgot Password Image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
