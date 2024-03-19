/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import data from "../data.json";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [boards, setBoards] = useState(data.boards);

  const updateBoards = (newBoard) => {
    boards.push(newBoard);
  };

  console.log("board: ", boards);

  return (
    <TaskContext.Provider value={{ boards, updateBoards, setBoards }}>
      {children}
    </TaskContext.Provider>
  );
};
