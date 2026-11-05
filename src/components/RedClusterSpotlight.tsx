import React from 'react';
import { Award, Compass, Droplet, Flame, Sun, ThermometerSnowflake, ShieldCheck } from 'lucide-react';

export const RedClusterSpotlight: React.FC = () => {
  return (
    <section id="qazvin-pistachio" className="py-14 md:py-20 bg-white border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-[#942733] tracking-wide mb-2">
            ژنتیک بومی و گنجینه باغبانی ایران
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
            ویژگی‌های زراعی و فیزیولوژیک «پسته خوشه قرمز قزوین»
          </h2>
          <p className="text-sm sm:text-base text-[#47584d] mt-2 leading-relaxed">
            رقم خوشه قرمز قزوین یکی از ممتازترین ارقام پسته خاورمیانه است که به دلیل پوست میوه سرخ آتشین، 
            طعم کره‌ای پرچرب و سازگاری شگفت‌انگیز با اقلیم دشت قزوین شناخته می‌شود. 
            اما برای باردهی حداکثری و حفظ سال‌آوری پایین، نیازمند پروتکل تغذیه‌ای متمایز است.
          </p>
        </div>

        {/* Feature Grid with Panoramic Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-[#942733] font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>۱. ظاهر میوه و بازارپسندی صادراتی</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3b4b40] leading-relaxed">
                میوه خوشه قرمز قزوین دارای شکل بادامی کشیده با کلاله برجسته و پوست رویی ارغوانی براق است. 
                درصد خندانی طبیعی این رقم در صورت تامین کافی عنصر پتاسیم به بالای ۸۵٪ می‌رسد و طعم روغنی آن در صنایع شیرینی‌سازی سنتی قزوین (باقلوا) بی‌رقیب است.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-[#163323] font-bold text-sm">
                <ThermometerSnowflake className="w-4 h-4 text-[#2b5d43]" />
                <span>۲. نیاز سرمایی و رفتار گلدهی</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3b4b40] leading-relaxed">
                نیاز سرمایی این رقم بین ۷۰۰ تا ۸۰۰ ساعت زیر ۷.۲ درجه سلسیوس است. تاریخ گلدهی آن معمولاً نیمه دوم فروردین ماه بوده که باعث می‌شود در مقایسه با ارقام خیلی زودگل نظیر کله‌قوچی، کمتر دچار سرمازدگی تشعشعی بهاره شود.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf9f6] border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-[#c25e00] font-bold text-sm">
                <Flame className="w-4 h-4" />
                <span>۳. نقاط حساس فیزیولوژیک رقم خوشه قرمز</span>
              </div>
              <p className="text-xs sm:text-sm text-[#3b4b40] leading-relaxed">
                پوست نرم این رقم به دلیل غلظت بالای آنتوسیانین‌ها، در برابر حرارت بالای ۳۸ درجه تابستان و اشعه فرابنفش آسیب‌پذیرتر است. نسخه حفاظتی مهندس علی افشار شامل دو نوبت محلول‌پاشی کائولین فرآوری شده و سیلیکات پتاسیم در تیر ماه برای خنک نگه داشتن خوشه‌هاست.
              </p>
            </div>

          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-[#d6d2c7] h-full min-h-[300px] bg-[#e9e6dd]">
              <img
                src="/src/assets/images/pistachio_orchard_qazvin_1793873626473.jpg"
                alt="دشت باغات مدرن پسته در قزوین"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 right-4 left-4 text-white">
                <div className="text-xs text-[#86efac] font-medium mb-1">
                  باغات دشت قزوین و بوئین‌زهرا
                </div>
                <h4 className="text-base font-bold">
                  تلفیق دانش روز با اصالت باغبانی دیرین
                </h4>
                <p className="text-[11px] text-white/80 mt-1">
                  حفظ خاک‌های ارزشمند حوضه قزوین از طریق چالکود گوگردی و مدیریت هدایت الکتریکی آب
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Cultivar Comparison Table */}
        <div className="bg-[#faf9f6] rounded-2xl border border-[#dedad0] overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#e5e2db] flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-[#163323]">
              جدول مقایسه شاخص‌های زراعی ارقام عمده پسته ایران
            </h3>
            <span className="text-xs text-[#5f7064]">
              منبع: نتایج پروژه‌های تحقیقاتی و ارزیابی‌های میدانی علی افشار
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-[#f0eee9] text-[#2c3d31] font-bold border-b border-[#e0ddd4]">
                  <th className="py-3 px-4">رقم پسته</th>
                  <th className="py-3 px-4">زمان گلدهی</th>
                  <th className="py-3 px-4">نیاز سرمایی (ساعت)</th>
                  <th className="py-3 px-4">تحمل به شوری خاک</th>
                  <th className="py-3 px-4">حساسیت به پسیل</th>
                  <th className="py-3 px-4">مزیت ویژه تجاری</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceae3]">
                <tr className="bg-white font-medium">
                  <td className="py-3 px-4 text-[#942733] font-bold">خوشه قرمز قزوین</td>
                  <td className="py-3 px-4">متوسط‌گل (۲۰ تا ۲۸ فروردین)</td>
                  <td className="py-3 px-4 font-mono tabular-nums">۷۰۰ - ۸۰۰</td>
                  <td className="py-3 px-4">متوسط تا خوب (تا ۶.۵ dS/m)</td>
                  <td className="py-3 px-4 text-[#942733]">بالا (برگچه‌های نازک)</td>
                  <td className="py-3 px-4">پوست ارغوانی براق، عطر و چربی ویژه شیرینی‌پزی</td>
                </tr>
                <tr className="bg-[#faf9f6]">
                  <td className="py-3 px-4 text-[#163323] font-semibold">اکبری (بادامی کشیده)</td>
                  <td className="py-3 px-4">دیرگل (۲۵ فروردین به بعد)</td>
                  <td className="py-3 px-4 font-mono tabular-nums">۱۱۰۰ - ۱۲۰۰</td>
                  <td className="py-3 px-4">متوسط</td>
                  <td className="py-3 px-4">متوسط</td>
                  <td className="py-3 px-4">انس درشت و طول بلند میوه برای بازار آجیل لوکس</td>
                </tr>
                <tr className="bg-white">
                  <td className="py-3 px-4 text-[#163323] font-semibold">کله‌قوچی (فندقی درشت)</td>
                  <td className="py-3 px-4 text-[#c25e00]">خیلی زودگل (۷ تا ۱۵ فروردین)</td>
                  <td className="py-3 px-4 font-mono tabular-nums">۶۰۰</td>
                  <td className="py-3 px-4">پایین‌تر از بقیه ارقام</td>
                  <td className="py-3 px-4">متوسط به بالا</td>
                  <td className="py-3 px-4">درشتی دانه فندقی و باردهی سنگین</td>
                </tr>
                <tr className="bg-[#faf9f6]">
                  <td className="py-3 px-4 text-[#163323] font-semibold">اوحدی (فندقی معمولی)</td>
                  <td className="py-3 px-4">متوسط گل</td>
                  <td className="py-3 px-4 font-mono tabular-nums">۹۰۰ - ۱۰۰۰</td>
                  <td className="py-3 px-4">بسیار بالا</td>
                  <td className="py-3 px-4">متوسط</td>
                  <td className="py-3 px-4">سازگاری اقلیمی گسترده و سطح زیر کشت اصلی ایران</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
