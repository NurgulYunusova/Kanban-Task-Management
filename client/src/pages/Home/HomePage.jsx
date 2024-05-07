import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import EmptyBoard from "../../components/emptyBoard/EmptyBoard";

function HomePage() {
  const { boards } = useContext(TaskContext);

  return (
    <>
      {boards?.length !== 0 ? (
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

export default HomePage;
