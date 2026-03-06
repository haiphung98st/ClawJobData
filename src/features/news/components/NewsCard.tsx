import { Calendar, ArrowUpRight } from "lucide-react";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  source: string;
}

export function NewsCard({ title, excerpt, date, image, source }: NewsCardProps) {
  return (
    <div className="group rounded-xl border border-[#1E293B] bg-[#121826] transition-all hover:border-[#F5B041]/50">
      <div className="aspect-video overflow-hidden rounded-t-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center space-x-2 text-xs text-[#94A3B8]">
          <span className="text-[#F5B041]">{source}</span>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="mb-2 line-clamp-2 font-semibold text-white transition-colors group-hover:text-[#F5B041]">
          {title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-[#94A3B8]">{excerpt}</p>
        <button className="flex items-center space-x-1 text-sm text-[#F5B041] transition-all group-hover:space-x-2">
          <span>Read more</span>
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
