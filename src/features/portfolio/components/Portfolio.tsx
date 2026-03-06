import { Link } from "react-router";
import { TrendingUp, TrendingDown, Plus, Wallet } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Button } from "../../../components/ui/button";
import { useTranslation } from "react-i18next";

interface PortfolioItem {
  id: string;
  goldType: string;
  brand: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  purchaseDate: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    goldType: "SJC Gold Bar",
    brand: "SJC",
    quantity: 5,
    buyPrice: 75000000,
    currentPrice: 77200000,
    purchaseDate: "2026-01-15",
  },
  {
    id: "2",
    goldType: "PNJ Gold Ring",
    brand: "PNJ",
    quantity: 2,
    buyPrice: 76000000,
    currentPrice: 76500000,
    purchaseDate: "2026-02-10",
  },
  {
    id: "3",
    goldType: "DOJI Gold Coin",
    brand: "DOJI",
    quantity: 10,
    buyPrice: 75500000,
    currentPrice: 76700000,
    purchaseDate: "2025-12-20",
  },
];

const portfolioHistoryData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2026, 1, i + 1).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: 380000000 + Math.random() * 15000000 + i * 500000,
}));

export function Portfolio() {
  const { t } = useTranslation();
  const totalValue = portfolioData.reduce((sum, item) => sum + item.quantity * item.currentPrice, 0);
  const totalInvested = portfolioData.reduce((sum, item) => sum + item.quantity * item.buyPrice, 0);
  const totalProfit = totalValue - totalInvested;
  const totalProfitPercent = (totalProfit / totalInvested) * 100;
  const isPositive = totalProfit >= 0;

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h1 className="mb-2 bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent">
              {t('portfolio.title')}
            </h1>
            <p className="text-[#94A3B8]">{t('portfolio.subtitle')}</p>
          </div>
          <Link to="/add-transaction">
            <Button className="bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]">
              <Plus className="mr-2 h-4 w-4" />
              {t('portfolio.add_transaction')}
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#1E293B] bg-[#121826] p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">{t('portfolio.total_value')}</span>
              <Wallet className="h-5 w-5 text-[#F5B041]" />
            </div>
            <div className="mb-1 text-3xl font-bold text-white">
              ₫{(totalValue / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-[#94A3B8]">Vietnamese Dong</div>
          </div>

          <div className="rounded-xl border border-[#1E293B] bg-[#121826] p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">{t('portfolio.total_profit')}</span>
              {isPositive ? (
                <TrendingUp className="h-5 w-5 text-[#22C55E]" />
              ) : (
                <TrendingDown className="h-5 w-5 text-[#EF4444]" />
              )}
            </div>
            <div className={`mb-1 text-3xl font-bold ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {isPositive ? '+' : ''}₫{(totalProfit / 1000000).toFixed(2)}M
            </div>
            <div className={`text-xs ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {isPositive ? '+' : ''}{totalProfitPercent.toFixed(2)}% overall
            </div>
          </div>

          <div className="rounded-xl border border-[#1E293B] bg-[#121826] p-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-[#94A3B8]">{t('portfolio.total_invested')}</span>
            </div>
            <div className="mb-1 text-3xl font-bold text-white">
              ₫{(totalInvested / 1000000).toFixed(1)}M
            </div>
            <div className="text-xs text-[#94A3B8]">{portfolioData.length} items</div>
          </div>
        </div>

        {/* Portfolio Value Chart */}
        <div className="mb-8 rounded-xl border border-[#1E293B] bg-[#121826]">
          <div className="border-b border-[#1E293B] p-6">
            <h2 className="text-xl font-semibold text-white">{t('portfolio.portfolio_value')}</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">{t('portfolio.last_30_days')}</p>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioHistoryData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F5B041" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F5B041" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                <XAxis
                  dataKey="date"
                  stroke="#94A3B8"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#94A3B8" }}
                />
                <YAxis
                  stroke="#94A3B8"
                  style={{ fontSize: "12px" }}
                  tick={{ fill: "#94A3B8" }}
                  tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#121826",
                    border: "1px solid #1E293B",
                    borderRadius: "8px",
                    color: "#FFFFFF",
                  }}
                  formatter={(value: number) => [`₫${(value / 1000000).toFixed(2)}M`, 'Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#F5B041"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
          <div className="border-b border-[#1E293B] p-6">
            <h2 className="text-xl font-semibold text-white">{t('portfolio.your_holdings')}</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">{t('portfolio.subtitle')}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E293B] bg-[#0B0F19]/50">
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.gold_type')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.quantity')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.buy_price')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.current_price')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.profit_loss')}
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                    {t('portfolio.total_value')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]">
                {portfolioData.map((item) => {
                  const profit = (item.currentPrice - item.buyPrice) * item.quantity;
                  const profitPercent = ((item.currentPrice - item.buyPrice) / item.buyPrice) * 100;
                  const isItemPositive = profit >= 0;
                  const totalValue = item.currentPrice * item.quantity;

                  return (
                    <tr key={item.id} className="transition-colors hover:bg-[#1E293B]/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div>
                          <div className="font-medium text-white">{item.goldType}</div>
                          <div className="text-sm text-[#94A3B8]">{item.brand}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-white">
                        {item.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-white">
                        ₫{(item.buyPrice / 1000000).toFixed(2)}M
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-white">
                        ₫{(item.currentPrice / 1000000).toFixed(2)}M
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <div className={`font-medium ${isItemPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {isItemPositive ? '+' : ''}₫{(profit / 1000000).toFixed(2)}M
                        </div>
                        <div className={`text-xs ${isItemPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {isItemPositive ? '+' : ''}{profitPercent.toFixed(2)}%
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-white">
                        ₫{(totalValue / 1000000).toFixed(2)}M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
