/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [board, setBoard] = useState({ name: "", columns: [] });

  const updateBoards = (newBoards) => {
    setBoard(newBoards);
  };

  console.log("board: ", board);

  return (
    <TaskContext.Provider value={{ board, updateBoards }}>
      {children}
    </TaskContext.Provider>
  );
};
