import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import Content from "./components/content/Content";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <div className="bottom">
        <Sidebar />
        <Content />
      </div>
    </>
  );
}

export default App;
