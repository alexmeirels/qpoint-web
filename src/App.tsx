import { useEffect } from "react";
import "./App.css";
import { createSchedule, getSchedules } from "./api/schedulesService";
import AppRoutes from "./routes";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  useEffect(() => {
    getSchedules();
    createSchedule();
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppRoutes />;
    </LocalizationProvider>
  );
}

export default App;
