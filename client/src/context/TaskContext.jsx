/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [boards, setBoards] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (user) {
      setBoards(user.boards);
    }
  }, [user]);

  // console.log(boards);

  const createBoards = (newBoard) => {
    setBoards([...boards, newBoard]);
  };

  return (
    <TaskContext.Provider
      value={{ boards, createBoards, setBoards, activeIndex, setActiveIndex }}
    >
      {children}
    </TaskContext.Provider>
  );
};
