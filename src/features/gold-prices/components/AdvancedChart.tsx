import { useState } from "react";
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity, BarChart3 } from "lucide-react";

const markets = [
  { id: "world", name: "World Gold", symbol: "XAU/USD" },
  { id: "sjc", name: "SJC Gold", symbol: "SJC" },
  { id: "pnj", name: "PNJ Gold", symbol: "PNJ" },
  { id: "doji", name: "DOJI Gold", symbol: "DOJI" },
];

const timeframes = ["1m", "5m", "15m", "1h", "4h", "1D", "1W"];

// Generate price data
const generatePriceData = () => {
  const data = [];
  let basePrice = 2040;
  
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 15;
    const price = basePrice + change;
    const volume = Math.random() * 10000 + 5000;
    
    data.push({
      time: `${String(9 + Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`,
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(volume),
    });
    
    basePrice = price;
  }
  
  return data;
};

export function AdvancedChart() {
  const [selectedMarket, setSelectedMarket] = useState("world");
  const [selectedTimeframe, setSelectedTimeframe] = useState("15m");
  const data = generatePriceData();

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  const change = latestData.price - previousData.price;
  const changePercent = (change / previousData.price) * 100;
  const isPositive = change >= 0;

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar - Market List */}
        <div className="w-64 border-r border-[#1E293B] bg-[#0B0F19] p-4">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">Markets</h3>
          <div className="space-y-2">
            {markets.map((market) => (
              <button
                key={market.id}
                onClick={() => setSelectedMarket(market.id)}
                className={`w-full rounded-lg p-3 text-left transition-colors ${
                  selectedMarket === market.id
                    ? "bg-[#1E293B] border border-[#F5B041]/50"
                    : "hover:bg-[#1E293B]/50"
                }`}
              >
                <div className="text-sm font-medium text-white">{market.name}</div>
                <div className="text-xs text-[#94A3B8]">{market.symbol}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Chart Header */}
            <div className="mb-6 flex flex-col justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-0">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-white">
                  {markets.find((m) => m.id === selectedMarket)?.name}
                </h1>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-white">
                    ${latestData.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <div className="flex items-center space-x-1">
                    {isPositive ? (
                      <TrendingUp className="h-5 w-5 text-[#22C55E]" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-[#EF4444]" />
                    )}
                    <span className={`font-medium ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                      {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center space-x-2 rounded-lg bg-[#121826] p-1">
                {timeframes.map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`rounded-md px-3 py-2 text-sm transition-colors ${
                      selectedTimeframe === tf
                        ? "bg-[#F5B041] text-[#0B0F19] font-medium"
                        : "text-[#94A3B8] hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Controls */}
            <div className="mb-6 flex flex-wrap gap-3">
              <button className="flex items-center space-x-2 rounded-lg border border-[#1E293B] bg-[#121826] px-4 py-2 text-sm text-white transition-colors hover:border-[#F5B041]/50">
                <BarChart3 className="h-4 w-4" />
                <span>Indicators</span>
              </button>
              <button className="flex items-center space-x-2 rounded-lg border border-[#1E293B] bg-[#121826] px-4 py-2 text-sm text-white transition-colors hover:border-[#F5B041]/50">
                <Activity className="h-4 w-4" />
                <span>Compare</span>
              </button>
            </div>

            {/* Price Chart */}
            <div className="mb-6 rounded-xl border border-[#1E293B] bg-[#121826] p-6">
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={data}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5B041" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#F5B041" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94A3B8" 
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "#94A3B8" }}
                  />
                  <YAxis 
                    yAxisId="price"
                    domain={['auto', 'auto']}
                    stroke="#94A3B8" 
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "#94A3B8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#121826",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                    }}
                  />
                  <Line
                    yAxisId="price"
                    type="monotone"
                    dataKey="price"
                    stroke="#F5B041"
                    strokeWidth={2}
                    dot={false}
                    fill="url(#priceGradient)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Volume Chart */}
            <div className="rounded-xl border border-[#1E293B] bg-[#121826] p-6">
              <h3 className="mb-4 text-sm font-semibold text-white">Volume</h3>
              <ResponsiveContainer width="100%" height={150}>
                <ComposedChart data={data}>
                  <defs>
                    <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F5B041" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#F5B041" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#94A3B8" 
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "#94A3B8" }}
                  />
                  <YAxis 
                    stroke="#94A3B8" 
                    style={{ fontSize: "12px" }}
                    tick={{ fill: "#94A3B8" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#121826",
                      border: "1px solid #1E293B",
                      borderRadius: "8px",
                      color: "#FFFFFF",
                    }}
                  />
                  <Bar
                    dataKey="volume"
                    fill="url(#volumeGradient)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Statistics */}
        <div className="w-80 border-l border-[#1E293B] bg-[#0B0F19] p-6">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#94A3B8]">
            Price Statistics
          </h3>
          
          <div className="space-y-4">
            <div className="rounded-lg border border-[#1E293B] bg-[#121826] p-4">
              <div className="mb-1 text-xs text-[#94A3B8]">24h Change</div>
              <div className={`text-lg font-bold ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
              </div>
            </div>

            <div className="rounded-lg border border-[#1E293B] bg-[#121826] p-4">
              <div className="mb-1 text-xs text-[#94A3B8]">24h High</div>
              <div className="text-lg font-bold text-white">
                ${Math.max(...data.map(d => d.price)).toFixed(2)}
              </div>
            </div>

            <div className="rounded-lg border border-[#1E293B] bg-[#121826] p-4">
              <div className="mb-1 text-xs text-[#94A3B8]">24h Low</div>
              <div className="text-lg font-bold text-white">
                ${Math.min(...data.map(d => d.price)).toFixed(2)}
              </div>
            </div>

            <div className="rounded-lg border border-[#1E293B] bg-[#121826] p-4">
              <div className="mb-1 text-xs text-[#94A3B8]">24h Volume</div>
              <div className="text-lg font-bold text-white">
                {(data.reduce((sum, d) => sum + d.volume, 0) / 1000).toFixed(1)}K
              </div>
            </div>

            <div className="rounded-lg border border-[#1E293B] bg-[#121826] p-4">
              <div className="mb-3 text-xs text-[#94A3B8]">Daily Range</div>
              <div className="mb-2 h-2 w-full rounded-full bg-[#1E293B]">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-[#EF4444] via-[#F5B041] to-[#22C55E]"
                  style={{ width: '60%' }}
                />
              </div>
              <div className="flex justify-between text-xs text-[#94A3B8]">
                <span>${Math.min(...data.map(d => d.price)).toFixed(2)}</span>
                <span>${Math.max(...data.map(d => d.price)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
