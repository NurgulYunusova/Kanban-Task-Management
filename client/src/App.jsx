import "./index.css";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import UserRoute from "./routes/UserRoute";
import HomePage from "./pages/Home/HomePage";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div>
      <Routes>
        {routes &&
          routes.map((route, key) => {
            return (
              <Route key={key} path={route.path} element={route.element} />
            );
          })}

        <Route
          path="/"
          element={
            <UserRoute isLoggedIn={isLoggedIn}>
              <HomePage />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
