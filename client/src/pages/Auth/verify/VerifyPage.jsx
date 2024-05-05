/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useFormik } from "formik";
import image from "../../../assets/images/verify.png";
import { verifySchema } from "../validations";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./verify.scss";
import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function VerifyPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserContext);
  const [verifyTrueAlertOpen, setVerifyTrueAlertOpen] = useState(false);
  // const [verifyFalseAlertOpen, setVerifyFalseAlertOpen] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      confirmCode: "",
    },
    validationSchema: verifySchema,
    onSubmit: async ({ confirmCode }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/confirm`,
          {
            confirmCode,
            email: state,
          }
        );

        console.log(response);

        if (response.status === 201) {
          const token = response.data;
          localStorage.setItem("token", token);
          setIsLoggedIn(true);
          setVerifyTrueAlertOpen(true);
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  const handleCloseTrueVerifyAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setVerifyTrueAlertOpen(false);
  };

  // const handleCloseFalseVerifyAlert = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setVerifyFalseAlertOpen(false);
  // };

  return (
    <>
      <div className="verify">
        <div className="verifyContainer">
          <div className="image">
            <img src={image} alt="Books" />
          </div>

          <div className="form">
            <h3>OTP VERIFICATION</h3>
            <p className="info">
              We've sent a verification code to your email.{" "}
              <span style={{ fontWeight: 600 }}>
                If you don't see the verification code, check your spam folder.
                Verification code is valid for 90 seconds.
              </span>
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="confirmCode"
                placeholder="Enter verification code"
                onChange={handleChange}
                value={values.confirmCode}
              />
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors?.confirmCode}
              </p>

              <button type="submit">SUBMIT</button>
            </form>

            <Snackbar
              open={verifyTrueAlertOpen}
              autoHideDuration={3000}
              onClose={handleCloseTrueVerifyAlert}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MuiAlert
                onClose={handleCloseTrueVerifyAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                You have been successfully verified!
              </MuiAlert>
            </Snackbar>

            {/* <Snackbar
              open={verifyFalseAlertOpen}
              autoHideDuration={3000}
              onClose={handleCloseFalseVerifyAlert}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MuiAlert
                onClose={handleCloseFalseVerifyAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                helllllll
              </MuiAlert>
            </Snackbar> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyPage;
