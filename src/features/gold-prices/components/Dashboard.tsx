import { useState, useEffect } from "react";
import { PriceCard } from "./PriceCard";
import { GoldPriceTable } from "../../../components/tables/GoldPriceTable";
import { GoldChart } from "../../../components/charts/GoldChart";
import { NewsCard } from "../../news/components/NewsCard";
import { useTranslation } from "react-i18next";
import { goldPriceService } from "../services/goldPriceService";
import { providerService } from "../../providers/services/providerService";

interface WorldPrice {
  price: number;
  change: number;
  changePercent: number;
}

interface ProviderPriceInfo {
  brand: string;
  buyPrice: number;
  sellPrice: number;
  change: number;
}

export function Dashboard() {
  const { t } = useTranslation();
  const [worldPrice, setWorldPrice] = useState<WorldPrice | null>(null);
  const [providerPrices, setProviderPrices] = useState<ProviderPriceInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wp, prices] = await Promise.all([
          goldPriceService.getWorldPrice(),
          providerService.getAllPrices(),
        ]);
        setWorldPrice(wp);
        setProviderPrices(prices.map(p => ({
          brand: p.brand,
          buyPrice: p.buyPrice,
          sellPrice: p.sellPrice,
          change: p.change,
        })));
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const newsArticles = [
    {
      title: "Gold Prices Surge to Record High Amid Economic Uncertainty",
      excerpt: "Global gold prices reached a new all-time high as investors seek safe-haven assets amid growing economic concerns.",
      date: "Mar 4, 2026",
      image: "https://images.unsplash.com/photo-1762463176319-8416bf1e6a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      source: "Financial Times",
    },
    {
      title: "Vietnam Gold Market Shows Strong Recovery in Q1 2026",
      excerpt: "The Vietnamese gold market has demonstrated robust performance in the first quarter, with SJC prices stabilizing.",
      date: "Mar 3, 2026",
      image: "https://images.unsplash.com/photo-1755010062224-c00c4623490d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      source: "VNExpress",
    },
    {
      title: "Central Banks Increase Gold Reserves for Fifth Consecutive Month",
      excerpt: "Major central banks around the world continue to accumulate gold reserves as part of their diversification strategy.",
      date: "Mar 2, 2026",
      image: "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      source: "Bloomberg",
    },
  ];

  const sjc = providerPrices.find(p => p.brand === "SJC");
  const pnj = providerPrices.find(p => p.brand === "PNJ");

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent">
            {t('dashboard.title')}
          </h1>
          <p className="text-[#94A3B8]">{t('dashboard.subtitle')}</p>
        </div>

        {/* Global Price Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PriceCard
            title={t('dashboard.global_gold')}
            price={worldPrice?.price ?? 0}
            change={worldPrice?.change ?? 0}
            changePercent={worldPrice?.changePercent ?? 0}
            currency="USD/oz"
            showSparkline={true}
          />
          <PriceCard
            title={t('dashboard.sjc_gold')}
            price={sjc?.sellPrice ?? 0}
            change={sjc?.change ?? 0}
            changePercent={sjc ? (sjc.change / sjc.sellPrice) * 100 : 0}
            currency="VND/tael"
            showSparkline={true}
          />
          <PriceCard
            title={t('dashboard.pnj_gold')}
            price={pnj?.sellPrice ?? 0}
            change={pnj?.change ?? 0}
            changePercent={pnj ? (pnj.change / pnj.sellPrice) * 100 : 0}
            currency="VND/tael"
            showSparkline={true}
          />
        </div>

        {/* Vietnam Gold Price Table */}
        <div className="mb-8">
          <GoldPriceTable />
        </div>

        {/* Interactive Chart */}
        <div className="mb-8">
          <GoldChart />
        </div>

        {/* Market News Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white">{t('dashboard.market_news')}</h2>
            <p className="mt-1 text-[#94A3B8]">{t('dashboard.latest_updates')}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsArticles.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
