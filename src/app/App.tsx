import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { AdvancedChart } from "./pages/AdvancedChart";
import { Portfolio } from "./pages/Portfolio";
import { AddTransaction } from "./pages/AddTransaction";
import { PriceAlerts } from "./pages/PriceAlerts";
import { News } from "./pages/News";
import { Login } from "./pages/Login";
import "../i18n/config";

export default function App() {
  return (
    <BrowserRouter>
      <div className="dark min-h-screen bg-[#0B0F19]">
        <Routes>
          {/* Login page without navbar */}
          <Route path="/login" element={<Login />} />
          
          {/* All other pages with navbar */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/charts" element={<AdvancedChart />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/add-transaction" element={<AddTransaction />} />
                  <Route path="/alerts" element={<PriceAlerts />} />
                  <Route path="/news" element={<News />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
