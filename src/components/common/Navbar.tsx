import { Link, useLocation } from "react-router";
import { TrendingUp, Menu, User } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const location = useLocation();
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.dashboard'), path: "/" },
    { name: t('nav.charts'), path: "/charts" },
    { name: t('nav.portfolio'), path: "/portfolio" },
    { name: t('nav.alerts'), path: "/alerts" },
    { name: t('nav.news'), path: "/news" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#1E293B] bg-[#0B0F19]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#F5B041] to-[#D4941F]">
              <TrendingUp className="h-6 w-6 text-[#0B0F19]" />
            </div>
            <span className="bg-gradient-to-r from-[#F5B041] to-[#FFD700] bg-clip-text text-xl font-bold text-transparent">
              GoldTrack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-lg px-4 py-2 text-sm transition-colors ${isActive(item.path)
                    ? "bg-[#1E293B] text-[#F5B041]"
                    : "text-[#94A3B8] hover:bg-[#1E293B]/50 hover:text-white"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="outline" size="sm" className="hidden border-[#1E293B] hover:bg-[#1E293B] sm:flex">
                <User className="mr-2 h-4 w-4" />
                {t('nav.login')}
              </Button>
            </Link>
            <Button size="sm" className="bg-gradient-to-r from-[#F5B041] to-[#D4941F] text-[#0B0F19] hover:from-[#FFD700] hover:to-[#F5B041]">
              {t('nav.register')}
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
