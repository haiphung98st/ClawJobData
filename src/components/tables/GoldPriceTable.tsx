import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { providerService } from "../../features/providers/services/providerService";

interface GoldPrice {
  brand: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
}

export function GoldPriceTable() {
  const [prices, setPrices] = useState<GoldPrice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        const data = await providerService.getAllPrices();
        setPrices(data.map(p => ({
          brand: p.brand,
          buyPrice: p.buyPrice,
          sellPrice: p.sellPrice,
          change: p.change,
        })));
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-[#1E293B] bg-[#121826]">
      <div className="border-b border-[#1E293B] p-6">
        <h2 className="text-xl font-semibold text-white">Vietnam Gold Prices</h2>
        <p className="mt-1 text-sm text-[#94A3B8]">Live gold prices from major retailers (VND per tael)</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-[#F5B041]" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0B0F19]/50">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Brand</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Buy Price</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Sell Price</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-[#94A3B8]">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]">
              {prices.map((item) => {
                const isPositive = item.change >= 0;
                return (
                  <tr key={item.brand} className="transition-colors hover:bg-[#1E293B]/30">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5B041] to-[#D4941F]">
                          <span className="text-sm font-bold text-[#0B0F19]">{item.brand.substring(0, 2)}</span>
                        </div>
                        <span className="font-medium text-white">{item.brand}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <span className="text-white">{item.buyPrice.toLocaleString('vi-VN')}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <span className="text-white">{item.sellPrice.toLocaleString('vi-VN')}</span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4 text-[#22C55E]" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-[#EF4444]" />
                        )}
                        <span className={`font-medium ${isPositive ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                          {isPositive ? '+' : ''}{item.change.toLocaleString('vi-VN')}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
