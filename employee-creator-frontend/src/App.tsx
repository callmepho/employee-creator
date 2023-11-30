import "./App.css";
import FrontPage from "./pages/front";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path=":id" element={<EmployeePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
