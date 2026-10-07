// BEFORE SPLIT: everything is statically imported -> one big bundle
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shell from "./Shell";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}
