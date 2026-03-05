import { TrendingUp, TrendingDown } from "lucide-react";

interface GoldPrice {
  brand: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
  changePercent: number;
}

const goldPrices: GoldPrice[] = [
  {
    brand: "SJC",
    buyPrice: 76500000,
    sellPrice: 77200000,
    change: 300000,
    changePercent: 0.39,
  },
  {
    brand: "PNJ",
    buyPrice: 75800000,
    sellPrice: 76500000,
    change: -150000,
    changePercent: -0.2,
  },
  {
    brand: "DOJI",
    buyPrice: 76000000,
    sellPrice: 76700000,
    change: 250000,
    changePercent: 0.33,
  },
  {
    brand: "Bảo Tín Minh Châu",
    buyPrice: 75900000,
    sellPrice: 76600000,
    change: 100000,
    changePercent: 0.13,
  },
];

export function GoldPriceTable() {
  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
      <div className="border-b border-[#1E293B] p-6">
        <h2 className="text-xl font-semibold text-white">Vietnam Gold Prices</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">Live gold prices from major retailers (VND per tael)</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#0B0F19]/50">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Brand
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Buy Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Sell Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {goldPrices.map((item) => {
              const isPositive = item.change >= 0;
              return (
                <tr key={item.brand} className="transition-colors hover:bg-[#1E293B]/30">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5B041] to-[#D4941F]">
                        <span className="text-sm font-bold text-[#0B0F19]">
                          {item.brand.substring(0, 2)}
                        </span>
                      </div>
                      <span className="font-medium text-white">{item.brand}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="text-white">
                      {item.buyPrice.toLocaleString('vi-VN')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <span className="text-white">
                      {item.sellPrice.toLocaleString('vi-VN')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 text-[#22C55E]" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-[#EF4444]" />
                      )}
                      <span className={`font-medium ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {isPositive ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
