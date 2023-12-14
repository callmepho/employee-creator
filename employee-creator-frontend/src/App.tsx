import "./App.css";
import FrontPage from "./pages/front";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path=":id" element={<EmployeePage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </>
  );
}

export default App;
