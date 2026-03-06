import { NewsCard } from "../components/NewsCard";
import { Search, Filter } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useTranslation } from "react-i18next";

const newsArticles = [
  {
    title: "Gold Prices Surge to Record High Amid Economic Uncertainty",
    excerpt: "Global gold prices reached a new all-time high as investors seek safe-haven assets amid growing economic concerns and geopolitical tensions.",
    date: "Mar 5, 2026",
    image: "https://images.unsplash.com/photo-1762463176319-8416bf1e6a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "Financial Times",
  },
  {
    title: "Vietnam Gold Market Shows Strong Recovery in Q1 2026",
    excerpt: "The Vietnamese gold market has demonstrated robust performance in the first quarter, with SJC prices stabilizing and trading volumes increasing.",
    date: "Mar 4, 2026",
    image: "https://images.unsplash.com/photo-1755010062224-c00c4623490d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "VNExpress",
  },
  {
    title: "Central Banks Increase Gold Reserves for Fifth Consecutive Month",
    excerpt: "Major central banks around the world continue to accumulate gold reserves as part of their diversification strategy to hedge against currency risks.",
    date: "Mar 3, 2026",
    image: "https://images.unsplash.com/photo-1734856080638-71e78b3d8d5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "Bloomberg",
  },
  {
    title: "SJC Gold Price Hits New Milestone in Vietnam Market",
    excerpt: "State-owned SJC gold prices have reached a new milestone, reflecting the strong demand for gold investment in Vietnam's retail market.",
    date: "Mar 2, 2026",
    image: "https://images.unsplash.com/photo-1751552147774-c374ae8e9910?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "Tuổi Trẻ",
  },
  {
    title: "Expert Analysis: Gold vs. Other Investment Assets in 2026",
    excerpt: "Financial experts weigh in on gold's performance compared to stocks, bonds, and cryptocurrency investments in the current economic climate.",
    date: "Mar 1, 2026",
    image: "https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "Reuters",
  },
  {
    title: "PNJ and DOJI Expand Gold Retail Networks Nationwide",
    excerpt: "Major Vietnamese gold retailers are expanding their physical presence with new stores to meet growing consumer demand for gold products.",
    date: "Feb 28, 2026",
    image: "https://images.unsplash.com/photo-1762463176319-8416bf1e6a8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    source: "Thanh Niên",
  },
];

export function News() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0B0F19] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-4xl font-bold text-transparent">
            {t('news.title')}
          </h1>
          <p className="text-[#94A3B8]">{t('news.subtitle')}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
            <Input
              type="text"
              placeholder={t('common.search')}
              className="border-[#1E293B] bg-[#121826] pl-10 text-white placeholder:text-[#94A3B8]"
            />
          </div>
          <Button variant="outline" className="border-[#1E293B] bg-[#121826] hover:bg-[#1E293B]">
            <Filter className="mr-2 h-4 w-4" />
            {t('common.filter')}
          </Button>
        </div>

        {/* Featured Article */}
        <div className="mb-8 overflow-hidden rounded-xl border border-[#1E293B] bg-[#121826]">
          <div className="grid lg:grid-cols-2">
            <div className="aspect-video lg:aspect-auto">
              <img
                src={newsArticles[0].image}
                alt={newsArticles[0].title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-8">
              <div className="mb-4 inline-block rounded-full bg-[#F5B041]/10 px-3 py-1 text-xs font-medium text-[#F5B041]">
                Featured
              </div>
              <h2 className="mb-4 text-3xl font-bold text-white">{newsArticles[0].title}</h2>
              <p className="mb-6 text-[#94A3B8]">{newsArticles[0].excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#94A3B8]">
                  <span className="text-[#F5B041]">{newsArticles[0].source}</span> • {newsArticles[0].date}
                </div>
                <Button className="bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19]">
                  {t('news.read_more')}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.slice(1).map((article, index) => (
            <NewsCard key={index} {...article} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <Button variant="outline" className="border-[#1E293B] bg-[#121826] hover:bg-[#1E293B]">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
}
