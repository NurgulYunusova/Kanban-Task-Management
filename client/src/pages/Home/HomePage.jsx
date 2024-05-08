import { useContext } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import Content from "../../components/content/Content";
import EmptyBoard from "../../components/emptyBoard/EmptyBoard";
import { UserContext } from "../../context/UserContext";

function HomePage() {
  const { boards } = useContext(UserContext);

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
