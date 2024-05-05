/* eslint-disable no-unused-vars */
import "./register.scss";
import image from "../../../assets/images/register.png";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../validations";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

function RegisterPage() {
  const navigate = useNavigate();
  const [registerTrueAlertOpen, setRegisterTrueAlertOpen] = useState(false);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async ({ name, email, password }) => {
      await axios
        .post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.status == 200) {
            setRegisterTrueAlertOpen(true);
            setTimeout(() => {
              navigate("/verify", {
                state: email,
              });
            }, 2000);
          }
        });
    },
  });

  const handleCloseTrueRegisterAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setRegisterTrueAlertOpen(false);
  };

  return (
    <>
      <div className="register">
        <div className="registerContainer">
          <div className="image">
            <img src={image} alt="Books" />
          </div>

          <div className="form">
            <h3>REGISTER FORM</h3>
            <p className="info">Required fields are marked *</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="name"
                placeholder="Name *"
                onChange={handleChange}
                value={values.name}
              />
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors?.name}
              </p>

              <br />

              <input
                type="email"
                id="email"
                placeholder="Email *"
                onChange={handleChange}
                value={values.email}
              />
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors?.email}
              </p>

              <br />

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password *"
                onChange={handleChange}
                value={values.password}
              />
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors?.password}
              </p>

              <br />

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password *"
                onChange={handleChange}
                value={values.confirmPassword}
              />
              <p style={{ color: "red", fontSize: "12px", marginTop: "10px" }}>
                {errors?.confirmPassword}
              </p>

              <button type="submit">REGISTER</button>
            </form>

            <Snackbar
              open={registerTrueAlertOpen}
              autoHideDuration={3000}
              onClose={handleCloseTrueRegisterAlert}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MuiAlert
                onClose={handleCloseTrueRegisterAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                You have successfully registered! Please check your email for
                the verification code.
              </MuiAlert>
            </Snackbar>

            <p className="loginLink">
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Login.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
