import { BrowserRouter, Routes, Route } from "react-router";
import { Navbar } from "../../components/common/Navbar";
import { Dashboard } from "../../features/gold-prices/components/Dashboard";
import { AdvancedChart } from "../../features/gold-prices/components/AdvancedChart";
import { Portfolio } from "../../features/portfolio/components/Portfolio";
import { AddTransaction } from "../../features/portfolio/components/AddTransaction";
import { PriceAlerts } from "../../features/alerts/components/PriceAlerts";
import { News } from "../../features/news/components/News";
import { Login } from "../../features/auth/components/Login";
import "../../i18n/config";

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
