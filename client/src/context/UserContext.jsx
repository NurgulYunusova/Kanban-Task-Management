/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [boardAddAlertOpen, setBoardAddAlertOpen] = useState(false);
  const [boardDeleteAlertOpen, setBoardDeleteAlertOpen] = useState(false);

  const token = localStorage.getItem("token");

  const updateUser = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/user/profile`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          setUser(response.data);
        }

        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
      }
      console.error("An error occurred:", error);
    }
  };

  const createBoards = async (newBoard) => {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/api/board`,
      {
        name: newBoard.name,
        userId: user._id,
        columnNames: newBoard.columns,
      }
    );

    if (response.status === 201) {
      setBoards([...boards, response.data]);
      setBoardAddAlertOpen(true);
    }
  };

  const handleCloseBoardAddAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBoardAddAlertOpen(false);
  };

  const getBoards = async () => {
    try {
      if (user) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/board/user/${user._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        console.log("response", response.data);

        if (response.status === 200) {
          setBoards(response.data);
        }
      }
    } catch (error) {
      console.error("An error occurred while fetching boards:", error);
    }
  };

  const deleteBoard = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/board/${id}`
      );

      if (response.status === 200) {
        setBoards(boards.filter((item) => item._id !== id));
        setBoardDeleteAlertOpen(true);
        getBoards();
      }
    } catch (error) {
      console.error("Error delete board:", error);
    }
  };

  const handleCloseBoardDeleteAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setBoardDeleteAlertOpen(false);
  };

  useEffect(() => {
    getBoards();
  }, [user]);

  useEffect(() => {
    updateUser();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
        updateUser,
        boards,
        createBoards,
        setBoards,
        activeIndex,
        setActiveIndex,
        deleteBoard,
      }}
    >
      {children}

      <Snackbar
        open={boardAddAlertOpen}
        autoHideDuration={3000}
        onClose={handleCloseBoardAddAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleCloseBoardAddAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          The new board has been successfully created!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={boardDeleteAlertOpen}
        autoHideDuration={3000}
        onClose={handleCloseBoardDeleteAlert}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleCloseBoardDeleteAlert}
          severity="success"
          sx={{ width: "100%" }}
        >
          Board deleted successfully!
        </MuiAlert>
      </Snackbar>
    </UserContext.Provider>
  );
};
