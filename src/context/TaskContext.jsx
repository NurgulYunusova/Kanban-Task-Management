/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [boards, setBoards] = useState({ boardName: "", boardColumns: {} });

  const updateBoards = (newBoards) => {
    setBoards(newBoards);
  };

  console.log("board: ", boards);

  return (
    <TaskContext.Provider value={{ boards, updateBoards }}>
      {children}
    </TaskContext.Provider>
  );
};
