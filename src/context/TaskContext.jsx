/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import data from "../data.json";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(boards.findIndex((board) => board.isActive == true));
  }, [boards]);

  const createBoards = (newBoard) => {
    boards.push(newBoard);
  };

  return (
    <TaskContext.Provider
      value={{ boards, createBoards, setBoards, activeIndex, setActiveIndex }}
    >
      {children}
    </TaskContext.Provider>
  );
};
