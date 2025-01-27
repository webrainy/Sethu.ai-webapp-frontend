import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserHomePage from "./pages/user/UserHomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
