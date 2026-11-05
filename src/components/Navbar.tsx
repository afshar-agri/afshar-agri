import React, { useState } from 'react';
import { Sprout, Menu, X, FileText, Bug, Calendar, TestTube2, GitBranch } from 'lucide-react';

interface NavbarProps {
  onOpenGitHubGuide: () => void;
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGitHubGuide, onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#fbfbfa]/95 backdrop-blur-md border-b border-[#e6e4df]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single Brand Wordmark */}
        <a href="#hero" className="flex items-center gap-2.5 text-[#163323] hover:opacity-90 transition-opacity shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#163323] text-white flex items-center justify-center shadow-xs">
            <Sprout className="w-5 h-5 text-[#86efac]" />
          </div>
          <div className="flex flex-col text-right">
            <span className="text-xl font-bold tracking-tight text-[#163323] leading-none">
              افشار اگری
            </span>
            <span className="text-[11px] font-medium text-[#5c6e62] tracking-normal mt-0.5">
              Afshar Agri
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links (Single-line, unboxed) */}
        <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#415347]">
          <a href="#fertilizer" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            توصیه کودی
          </a>
          <a href="#pest-guide" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            تجویز سموم و آفات
          </a>
          <a href="#qazvin-pistachio" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            پسته خوشه قرمز قزوین
          </a>
          <a href="#soil-water" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            آنالیز آب و خاک
          </a>
          <a href="#calendar" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            تقویم سالانه
          </a>
          <a href="#about-expert" className="hover:text-[#163323] transition-colors whitespace-nowrap shrink-0">
            درباره علی افشار
          </a>
        </nav>

        {/* Zone 3: Primary Action & GitHub Pages helper */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenGitHubGuide}
            title="راهنمای دیپلوی روی GitHub Pages"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#3b4b40] bg-[#f0eee9] hover:bg-[#e4e1d8] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#2b5d43]" />
            <span>گیت‌هاب پیجز</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#163323] hover:bg-[#1f4530] rounded-lg transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            درخواست نسخه تخصصی
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2b3c31] hover:bg-[#f0eee9] rounded-md cursor-pointer"
            aria-label="منو"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e6e4df] px-4 pt-3 pb-5 space-y-2">
          <a
            href="#fertilizer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-[#2b3c31] hover:bg-[#f7f6f3]"
          >
            <FileText className="w-4 h-4 text-[#2b5d43]" />
            <span>سامانه توصیه کودی هوشمند</span>
          </a>
          <a
            href="#pest-guide"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-[#2b3c31] hover:bg-[#f7f6f3]"
          >
            <Bug className="w-4 h-4 text-[#b33946]" />
            <span>تجویز سموم و آفات پسته</span>
          </a>
          <a
            href="#qazvin-pistachio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-[#2b3c31] hover:bg-[#f7f6f3]"
          >
            <Sprout className="w-4 h-4 text-[#2b5d43]" />
            <span>ویژگی‌های پسته خوشه قرمز قزوین</span>
          </a>
          <a
            href="#soil-water"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-[#2b3c31] hover:bg-[#f7f6f3]"
          >
            <TestTube2 className="w-4 h-4 text-[#396bb3]" />
            <span>آنالیزور سریع آب و خاک</span>
          </a>
          <a
            href="#calendar"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-2.5 rounded-lg text-sm font-medium text-[#2b3c31] hover:bg-[#f7f6f3]"
          >
            <Calendar className="w-4 h-4 text-[#c25e00]" />
            <span>تقویم فصلی باغداری پسته</span>
          </a>
          <div className="pt-2 border-t border-[#f0eee9]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenGitHubGuide();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium text-[#3b4b40] bg-[#f0eee9] rounded-lg"
            >
              <GitBranch className="w-4 h-4 text-[#2b5d43]" />
              <span>راهنمای دیپلوی GitHub Pages</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
