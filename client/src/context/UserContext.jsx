/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [boards, setBoards] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

          setBoards(response.data.boards);
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

  const createBoards = (newBoard) => {
    setBoards([...boards, newBoard]);
  };

  useEffect(() => {
    updateUser();
  }, [token]);

  // console.log(user);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
