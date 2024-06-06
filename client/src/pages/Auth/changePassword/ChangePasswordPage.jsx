import axios from "axios";
import image from "../../../assets/images/changePassword.png";
import "./changePassword.scss";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

function ChangePasswordPage() {
  const { search } = useLocation();
  const URLSearch = new URLSearchParams(search);
  const userId = URLSearch.get("userId");
  const navigate = useNavigate();
  const [changePasswordTrueAlertOpen, setChangePasswordTrueAlertOpen] =
    useState(false);

  const changePasswordSchema = Yup.object({
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\d).+/,
        "Password must start with an uppercase letter and contain at least one number"
      )
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async ({ password }) => {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/changePassword`,
        {
          userId: userId,
          password: password,
        }
      );

      if (response.status === 200) {
        setChangePasswordTrueAlertOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
  });

  const handleCloseTrueChangePasswordAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setChangePasswordTrueAlertOpen(false);
  };

  return (
    <>
      <div className="changePassword">
        <div className="changePasswordContainer">
          <div className="form">
            <h3>CHANGE YOUR PASSWORD</h3>
            <p>Please enter a new password</p>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={values.password}
                required
              />
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {errors?.password}
              </p>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={values.confirmPassword}
                required
              />
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              >
                {errors?.confirmPassword}
              </p>
              <button type="submit">CHANGE YOUR PASSWORD</button>
            </form>

            <Snackbar
              open={changePasswordTrueAlertOpen}
              autoHideDuration={3000}
              onClose={handleCloseTrueChangePasswordAlert}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MuiAlert
                onClose={handleCloseTrueChangePasswordAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                Password changed successfully!
              </MuiAlert>
            </Snackbar>
          </div>

          <div className="image">
            <img src={image} alt="Change Password Image" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePasswordPage;
