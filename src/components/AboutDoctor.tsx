import React from 'react';
import { Award, BookOpen, CheckCircle, GraduationCap, MapPin, Microscope, PhoneCall, ShieldCheck } from 'lucide-react';

export const AboutDoctor: React.FC = () => {
  return (
    <section id="about-expert" className="py-14 md:py-20 bg-[#faf9f6] border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Visual Col */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#d6d2c7] shadow-sm bg-[#e8e5dc]">
              <img
                src="/src/assets/images/pistachio_pest_management_1793873626858.jpg"
                alt="پایش میدانی آفات با ذره‌بین در باغ پسته"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <div className="text-xs font-semibold text-[#86efac]">مهندس علی افشار</div>
                <div className="text-sm font-bold">بنیان‌گذار دپارتمان تخصصی افشار اگری</div>
                <div className="text-[11px] text-white/80 mt-0.5">
                  پژوهشگر دکتری علوم کشاورزی · تخصص باغبانی و تغذیه پسته
                </div>
              </div>
            </div>
          </div>

          {/* Bio and Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#2b5d43] tracking-wide">
                درباره مشاور علمی و موسس برند
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
                مهندس علی افشار؛ از پژوهش آزمایشگاهی تا خاک باغ
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#3d4d42] leading-relaxed">
              من <strong>علی افشار</strong>، دانشجوی دوره دکتری تخصصی کشاورزی هستم. سال‌هاست که زندگی علمی 
              و تجربی خود را وقف فیزیولوژی درختان میوه و به طور ویژه نجات و ارتقای عملکرد باغات پسته بومی ایران کرده‌ام. 
              برند <strong>«افشار اگری»</strong> پاسخی است به چالش‌های روزمره باغداران: افزایش سرسام‌آور قیمت سموم، 
              شور شدن منابع آب، مقاومت آفاتی مانند پسیل و کاهش کیفیت دانه در ارقام اصیلی همچون <strong>پسته خوشه قرمز قزوین</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 bg-white rounded-xl border border-[#e4e1d7] flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#163323] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#14261c]">دانشجوی دکتری کشاورزی</div>
                  <div className="text-[11px] text-[#5c6e62] mt-0.5">تحقیقات تخصصی اکوفیزیولوژی و تغذیه باغات</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e4e1d7] flex items-start gap-3">
                <Microscope className="w-5 h-5 text-[#942733] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#14261c]">تمرکز بر پسته خوشه قرمز قزوین</div>
                  <div className="text-[11px] text-[#5c6e62] mt-0.5">بهینه‌سازی فرمول کودی و کنترل پسیل و گرمازدگی</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e4e1d7] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2b5d43] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#14261c]">نسخه نویسی داده‌محور</div>
                  <div className="text-[11px] text-[#5c6e62] mt-0.5">عدم تجویز کودهای گران و بی‌فایده بدون آزمون خاک</div>
                </div>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-[#e4e1d7] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c25e00] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-[#14261c]">پوشش باغات سراسر کشور</div>
                  <div className="text-[11px] text-[#5c6e62] mt-0.5">قزوین، بوئین‌زهرا، رفسنجان، زرند، دامغان و خراسان</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#f0eee9] rounded-xl border border-[#e2dfd7] text-xs text-[#3b4b40] leading-relaxed">
              <strong>پیام علی افشار به باغداران عزیز:</strong>
              «در کشاورزی مدرن، هر کیلوگرم کودی که بی‌موقع به خاک اضافه شود یا هر نوبت سمپاشی اضافی، 
              نه تنها سودی ندارد بلکه ساختار خاک را فرسوده و آفت را مقاوم‌تر می‌کند. هدف افشار اگری ارائه نسخه دقیق، 
              علمی و اقتصادی است تا هم سود خالص شما افزایش یابد و هم درختان برای نسل‌های بعد سالم بمانند.»
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
