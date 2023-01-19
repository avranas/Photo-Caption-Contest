import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CaptionPage from "./Routes/CaptionPage";
import HomePage from "./Routes/HomePage";
import RegisterPage from "./Routes/RegisterPage";
import LoginPage from "./Routes/LoginPage";
import Logout from "./Routes/Logout";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  const [username, setUsername] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage setUsername={setUsername} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/caption-page/:index"
            element={<CaptionPage username={username} />}
          />
        </Route>
      </Routes>
      <footer>
        <div id="footer-spacer"></div>
        <p>
          Made with ❤️ by <a href="https://github.com/avranas">Alex Vranas</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
