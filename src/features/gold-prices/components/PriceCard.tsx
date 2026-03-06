import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceCardProps {
  title: string;
  price: number;
  change: number;
  changePercent: number;
  currency?: string;
  showSparkline?: boolean;
}

export function PriceCard({ title, price, change, changePercent, currency = "USD", showSparkline = false }: PriceCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#121826] p-6 transition-all hover:border-[#F5B041]/50">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm text-[#94A3B8]">{title}</h3>
        {isPositive ? (
          <TrendingUp className="h-4 w-4 text-[#22C55E]" />
        ) : (
          <TrendingDown className="h-4 w-4 text-[#EF4444]" />
        )}
      </div>

      <div className="mb-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold tracking-tight text-white">
            {price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-[#94A3B8]">{currency}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <span className={`text-sm font-medium ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)} ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
        </span>
      </div>

      {showSparkline && (
        <div className="mt-4 h-12">
          <svg className="h-full w-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0,20 Q25,15 50,18 T100,22 T150,16 T200,20"
              fill="none"
              stroke={isPositive ? '#22C55E' : '#EF4444'}
              strokeWidth="2"
              opacity="0.5"
            />
            <path
              d="M0,20 Q25,15 50,18 T100,22 T150,16 T200,20 L200,40 L0,40 Z"
              fill={isPositive ? '#22C55E' : '#EF4444'}
              opacity="0.1"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
