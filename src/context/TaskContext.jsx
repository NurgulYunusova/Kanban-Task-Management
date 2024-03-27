/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import data from "../data.json";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);

  const createBoards = (newBoard) => {
    boards.push(newBoard);
  };

  console.log(boards);

  return (
    <TaskContext.Provider value={{ boards, createBoards, setBoards }}>
      {children}
    </TaskContext.Provider>
  );
};
