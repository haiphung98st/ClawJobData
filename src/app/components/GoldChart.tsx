import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const timeframes = [
  { label: "1H", value: "1h" },
  { label: "24H", value: "24h" },
  { label: "7D", value: "7d" },
  { label: "1M", value: "1m" },
  { label: "1Y", value: "1y" },
];

// Mock data for different timeframes
const generateData = (timeframe: string) => {
  const now = new Date();
  const data = [];
  let points = 24;
  let interval = 60 * 60 * 1000; // 1 hour

  if (timeframe === "1h") {
    points = 12;
    interval = 5 * 60 * 1000; // 5 minutes
  } else if (timeframe === "24h") {
    points = 24;
    interval = 60 * 60 * 1000; // 1 hour
  } else if (timeframe === "7d") {
    points = 28;
    interval = 6 * 60 * 60 * 1000; // 6 hours
  } else if (timeframe === "1m") {
    points = 30;
    interval = 24 * 60 * 60 * 1000; // 1 day
  } else if (timeframe === "1y") {
    points = 52;
    interval = 7 * 24 * 60 * 60 * 1000; // 1 week
  }

  const basePrice = 2020;
  for (let i = 0; i < points; i++) {
    const time = new Date(now.getTime() - (points - i) * interval);
    const worldPrice = basePrice + Math.sin(i / 3) * 30 + Math.random() * 20;
    const sjcPrice = worldPrice * 38000 + Math.random() * 500000;
    const pnjPrice = worldPrice * 38000 - 300000 + Math.random() * 500000;

    data.push({
      time: time.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit",
        ...(timeframe === "1m" || timeframe === "1y" ? { month: "short", day: "numeric" } : {})
      }),
      world: parseFloat(worldPrice.toFixed(2)),
      sjc: parseFloat((sjcPrice / 1000000).toFixed(2)),
      pnj: parseFloat((pnjPrice / 1000000).toFixed(2)),
    });
  }

  return data;
};

export function GoldChart() {
  const [timeframe, setTimeframe] = useState("24h");
  const [visibleLines, setVisibleLines] = useState({
    world: true,
    sjc: true,
    pnj: true,
  });

  const data = generateData(timeframe);

  const toggleLine = (line: keyof typeof visibleLines) => {
    setVisibleLines((prev) => ({ ...prev, [line]: !prev[line] }));
  };

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
      <div className="border-b border-[#1E293B] p-6">
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Gold Price Chart</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">Compare global and Vietnam gold prices</p>
          </div>

          <div className="flex items-center space-x-2 rounded-lg bg-[#0B0F19] p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${
                  timeframe === tf.value
                    ? "bg-[#F5B041] text-[#0B0F19] font-medium"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <button
            onClick={() => toggleLine("world")}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              visibleLines.world ? "bg-[#1E293B]" : "bg-transparent"
            }`}
          >
            <div className="h-3 w-3 rounded-full bg-[#F5B041]" />
            <span className={visibleLines.world ? "text-white" : "text-[#94A3B8]"}>
              World Gold (USD/oz)
            </span>
          </button>
          <button
            onClick={() => toggleLine("sjc")}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              visibleLines.sjc ? "bg-[#1E293B]" : "bg-transparent"
            }`}
          >
            <div className="h-3 w-3 rounded-full bg-[#22C55E]" />
            <span className={visibleLines.sjc ? "text-white" : "text-[#94A3B8]"}>
              SJC (M VND/tael)
            </span>
          </button>
          <button
            onClick={() => toggleLine("pnj")}
            className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors ${
              visibleLines.pnj ? "bg-[#1E293B]" : "bg-transparent"
            }`}
          >
            <div className="h-3 w-3 rounded-full bg-[#3B82F6]" />
            <span className={visibleLines.pnj ? "text-white" : "text-[#94A3B8]"}>
              PNJ (M VND/tael)
            </span>
          </button>
        </div>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
            <XAxis 
              dataKey="time" 
              stroke="#94A3B8" 
              style={{ fontSize: "12px" }}
              tick={{ fill: "#94A3B8" }}
            />
            <YAxis 
              yAxisId="left"
              stroke="#94A3B8" 
              style={{ fontSize: "12px" }}
              tick={{ fill: "#94A3B8" }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
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
            {visibleLines.world && (
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="world"
                stroke="#F5B041"
                strokeWidth={2}
                dot={false}
                name="World Gold"
              />
            )}
            {visibleLines.sjc && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="sjc"
                stroke="#22C55E"
                strokeWidth={2}
                dot={false}
                name="SJC"
              />
            )}
            {visibleLines.pnj && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pnj"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                name="PNJ"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
