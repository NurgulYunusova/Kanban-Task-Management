/* eslint-disable react/prop-types */
import { createContext } from "react";
import data from "../data.json";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const boards = data.boards;

  const updateBoards = (newBoard) => {
    boards.push(newBoard);
    console.log("board: ", boards);
  };

  console.log("board: ", boards);

  return (
    <TaskContext.Provider value={{ boards, updateBoards }}>
      {children}
    </TaskContext.Provider>
  );
};
