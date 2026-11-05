import React from 'react';
import { Sprout, Mail, Phone, MapPin, GitBranch } from 'lucide-react';

interface FooterProps {
  onOpenGitHubGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGitHubGuide }) => {
  return (
    <footer className="bg-[#14261c] text-[#cbd5ce] pt-14 pb-10 border-t border-[#1e3829]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#213f2e]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2b5d43] text-white flex items-center justify-center">
                <Sprout className="w-4 h-4 text-[#86efac]" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                افشار اگری (Afshar Agri)
              </span>
            </div>

            <p className="text-xs text-[#9eb2a4] leading-relaxed max-w-sm">
              سامانه تخصصی توصیه کودی و گیاه‌پزشکی باغات پسته خوشه قرمز قزوین و ارقام تجاری ایران، 
              تحت نظارت علمی <strong>مهندس علی افشار</strong> (دانشجوی دکتری علوم کشاورزی).
            </p>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={onOpenGitHubGuide}
                className="text-xs font-medium text-[#86efac] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>راهنمای دیپلوی ریپازیتوری روی GitHub Pages</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">بخش‌های سامانه</h4>
            <ul className="space-y-2 text-xs text-[#9eb2a4]">
              <li>
                <a href="#fertilizer" className="hover:text-white transition-colors">
                  سامانه محاسبه توصیه کودی
                </a>
              </li>
              <li>
                <a href="#pest-guide" className="hover:text-white transition-colors">
                  تجویز سموم و دفع آفات (پسیل، چوبخوار)
                </a>
              </li>
              <li>
                <a href="#qazvin-pistachio" className="hover:text-white transition-colors">
                  شناخت پسته خوشه قرمز قزوین
                </a>
              </li>
              <li>
                <a href="#soil-water" className="hover:text-white transition-colors">
                  تحلیلگر آزمایش آب و خاک
                </a>
              </li>
              <li>
                <a href="#calendar" className="hover:text-white transition-colors">
                  تقویم ۱۲ ماهه باغبانی پسته
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">ارتباط با مهندس علی افشار</h4>
            <div className="space-y-2 text-xs text-[#9eb2a4]">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#86efac] shrink-0" />
                <span className="font-mono">aafshar268@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>استان قزوین، دشت باغات سنتی و بوئین‌زهرا</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#86efac] shrink-0" />
                <span>پاسخگویی مشاوره: ۰۹۱۲۳۸۱۴۲۰۰</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#718577]">
          <div>
            © {new Date().getFullYear()} افشار اگری (Afshar Agri). تمامی حقوق علمی و معنوی برای مهندس علی افشار محفوظ است.
          </div>
          <div>
            توسعه‌یافته جهت استقرار مستقیم روی GitHub Pages
          </div>
        </div>

      </div>
    </footer>
  );
};
