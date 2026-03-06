import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Loader2 } from "lucide-react";
import { goldPriceService } from "../../features/gold-prices/services/goldPriceService";

const timeframes = [
  { label: "1H", value: "1H" },
  { label: "24H", value: "1D" },
  { label: "7D", value: "7D" },
  { label: "1M", value: "1M" },
  { label: "1Y", value: "1Y" },
];

export function GoldChart() {
  const [timeframe, setTimeframe] = useState("1D");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await goldPriceService.getHistory(timeframe);
        const chartData = history.map((point) => ({
          time: new Date(point.time * 1000).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: point.close,
          high: point.high,
          low: point.low,
        }));
        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [timeframe]);

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
      <div className="border-b border-[#1E293B] p-6">
        <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div>
            <h2 className="text-xl font-semibold text-white">Gold Price Chart</h2>
            <p className="mt-1 text-sm text-[#94A3B8]">Live data from API</p>
          </div>

          <div className="flex items-center space-x-2 rounded-lg bg-[#0B0F19] p-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`rounded-md px-4 py-2 text-sm transition-colors ${timeframe === tf.value
                    ? "bg-[#F5B041] text-[#0B0F19] font-medium"
                    : "text-[#94A3B8] hover:text-white"
                  }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center" style={{ height: 400 }}>
            <Loader2 className="h-8 w-8 animate-spin text-[#F5B041]" />
          </div>
        ) : (
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
                type="monotone"
                dataKey="price"
                stroke="#F5B041"
                strokeWidth={2}
                dot={false}
                name="Gold Price"
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
