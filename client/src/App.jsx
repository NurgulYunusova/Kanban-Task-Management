import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Content from "./components/content/Content";
import EmptyBoard from "./components/emptyBoard/EmptyBoard";
import "./index.css";
import { TaskContext } from "./context/TaskContext";
import { useContext } from "react";

function App() {
  const { boards } = useContext(TaskContext);

  return (
    <>
      {boards.length !== 0 ? (
        <>
          <Header />
          <div className="bottom">
            <Sidebar />
            <Content />
          </div>
        </>
      ) : (
        <EmptyBoard />
      )}
    </>
  );
}

export default App;
