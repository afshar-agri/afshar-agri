import React from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Sprout } from 'lucide-react';

interface HeroProps {
  onScrollToFertilizer: () => void;
  onScrollToPest: () => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToFertilizer,
  onScrollToPest,
  onOpenConsultation,
}) => {
  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Line: Zero-Pill Typography */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4b5e51] mb-5">
          <span className="text-[#163323] font-semibold">مهندس علی افشار</span>
          <span aria-hidden="true">·</span>
          <span>دانشجوی دکتری کشاورزی</span>
          <span aria-hidden="true">·</span>
          <span>مشاوره تخصصی باغات پسته خوشه قرمز قزوین</span>
          <span aria-hidden="true">·</span>
          <span>مدیریت تلفیقی آفات و تغذیه مدرن</span>
        </div>

        {/* 2-Column Split: Editorial Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left / Text Col */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#14261c] leading-[1.25] tracking-tight text-balance">
              سامانه هوشمند نسخه کودی و مدیریت آفات <span className="text-[#942733]">پسته خوشه قرمز قزوین</span>
            </h1>

            <p className="text-base sm:text-lg text-[#3f5044] leading-relaxed max-w-2xl">
              تغذیه اصولی و تجویز سموم کشاورزی را از رویکرد سنتی و تجربی به یک پروتکل علمی و مهندسی ارتقا دهید. 
              برند <strong>«افشار اگری»</strong> راهکارهای تخصصی کودی و دفع هدفمند آفات (پسیل، چوبخوار، سن و گموز) را 
              متناسب با بستر خاکی و اقلیم دشت قزوین و باغات سراسر کشور ارائه می‌کند.
            </p>

            {/* Micro value highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2db] shadow-xs">
                <div className="text-xs text-[#526357] font-medium">هدف اول</div>
                <div className="text-sm font-bold text-[#163323] mt-0.5">کاهش ۴۰٪ سمپاشی بی‌رویه</div>
                <div className="text-[11px] text-[#6b7b70] mt-1">با تعیین دقیق آستانه خسارت اقتصادی</div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2db] shadow-xs">
                <div className="text-xs text-[#526357] font-medium">هدف دوم</div>
                <div className="text-sm font-bold text-[#163323] mt-0.5">حداکثر خندانی و وزن مغز</div>
                <div className="text-[11px] text-[#6b7b70] mt-1">تغذیه پتاسیمی و کلسیمی در زمان بحرانی</div>
              </div>
              <div className="p-3.5 bg-white rounded-xl border border-[#e5e2db] shadow-xs">
                <div className="text-xs text-[#526357] font-medium">هدف سوم</div>
                <div className="text-sm font-bold text-[#942733] mt-0.5">حفظ اصالت خوشه قرمز</div>
                <div className="text-[11px] text-[#6b7b70] mt-1">محافظت از رنگ یاقوتی و لطافت پوست</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onScrollToFertilizer}
                className="px-5 py-3 text-sm font-semibold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <span>محاسبه آنلاین نسخه کودی باغ</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={onScrollToPest}
                className="px-4 py-3 text-sm font-medium text-[#233529] bg-white hover:bg-[#f3f0e8] border border-[#dcd8ce] rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4 text-[#942733]" />
                <span>شناسایی آفت و سموم مجاز</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-4 py-3 text-sm font-medium text-[#3b4b40] hover:text-[#163323] transition-colors underline underline-offset-4 cursor-pointer"
              >
                ویزیت باغ یا بررسی آزمایش خاک
              </button>
            </div>
          </div>

          {/* Right / Visual Col: Authentic Qazvin Red Cluster Pistachio Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#d6d2c7] shadow-sm bg-[#e9e6dd] group">
              <img
                src="/src/assets/images/hero_qazvin_pistachio_1793873625371.jpg"
                alt="پسته خوشه قرمز اصیل قزوین بر روی درخت"
                referrerPolicy="no-referrer"
                className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <div className="flex items-center gap-2 text-[11px] text-[#f2b8be] font-medium mb-1">
                  <span>Pistacia vera cv. 'Qazvin Red Cluster'</span>
                  <span aria-hidden="true">·</span>
                  <span>دشت قزوین</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  خوشه قرمز قزوین؛ نگین سرخ باغات سنتی
                </h3>
                <p className="text-xs text-white/80 line-clamp-2 mt-1">
                  رقم با ارزش با پوست میوه ارغوانی، درصد روغن بالا و مقاومت ارزشمند به شرایط خاک منطقه که نیازمند دقت بالا در کنترل پسیل و تغذیه پتاس است.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
