import React, { useState } from 'react';
import { Calendar, ChevronRight, Droplet, Sprout, Thermometer, ShieldAlert } from 'lucide-react';

interface MonthGuide {
  month: string;
  season: 'بهار' | 'تابستان' | 'پاییز' | 'زمستان';
  title: string;
  irrigation: string;
  nutrition: string;
  protection: string;
  qazvinTip: string;
}

const ORCHARD_MONTHS: MonthGuide[] = [
  {
    month: 'فروردین',
    season: 'بهار',
    title: 'بیدارسازی، گرده‌افشانی و فروت‌ست بهاره',
    irrigation: 'اولین آبیاری سنگین همراه با اسید هیومیک مایع در باغات سنتی و قطره‌ای.',
    nutrition: 'محلول‌پاشی فروت‌ست (روی + بور + ازت + اسید آمینه) قبل از باز شدن گل‌ها.',
    protection: 'نصب تله فرمونی پروانه چوبخوار پسته و ردیابی خروج حشرات کامل در قزوین.',
    qazvinTip: 'پسته خوشه قرمز قزوین دیرگل‌تر از کله‌قوچی است؛ مراقب سرمای دیررس شب‌های ۲۲ تا ۲۸ فروردین باشید.',
  },
  {
    month: 'اردیبهشت',
    season: 'بهار',
    title: 'فندقی شدن دانه و استحکام پوست استخوانی',
    irrigation: 'تنظیم دور آبیاری منظم بر اساس بافت خاک (۱۰ تا ۱۵ روز در خاک رسی دشت قزوین).',
    nutrition: 'محلول‌پاشی نیترات کلسیم کلاته + جلبک دریایی برای جلوگیری از ترکیدگی و لکه پوست استخوانی.',
    protection: 'پایش دقیق برگ‌ها برای پوره‌های نسل اول پسیل پسته (شیره خشک)؛ صابون‌پاشی با پالیزین در صورت نیاز.',
    qazvinTip: 'هرگز کودهای فسفره یا سولفاته را با کلسیم مخلوط نکنید؛ حتماً جداگانه مصرف شود.',
  },
  {
    month: 'خرداد',
    season: 'بهار',
    title: 'نمو جنین و تشکیل بافت مغز',
    irrigation: 'افزایش حساسیت به تنش آبی؛ دور آبیاری بدون تاخیر انجام شود.',
    nutrition: 'کودآبیاری با کودهای کامل پتاس بالا (۱۲-۱۲-۳۶) به همراه سولفات منیزیم.',
    protection: 'مبارزه با طغیان پسیل در صورت رسیدن به آستانه اقتصادی با سموم اختصاصی (موونتو یا کنسالت).',
    qazvinTip: 'رقم خوشه قرمز به علت بافت نازک برگچه، در صورت خسارت پسیل به سرعت ریزش جوانه سال بعد می‌دهد.',
  },
  {
    month: 'تیر',
    season: 'تابستان',
    title: 'پر شدن سریع مغز و مقابله با تنش گرما',
    irrigation: 'حساس‌ترین مرحله به کمبود آب؛ آبیاری در شب انجام گیرد تا تبخیر به حداقل برسد.',
    nutrition: 'سولفات پتاسیم محلول (سولوپتاس) همراه با آبکود جهت وزن‌گیری و خندانی دانه.',
    protection: 'پاشش کائولین سپیدان (سفیدپوش کردن تاج) و سیلیکات پتاسیم جهت محافظت در برابر آفتاب‌سوختگی دشت قزوین.',
    qazvinTip: 'پوست نرم یاقوتی خوشه قرمز در گرمای بالای ۳۸ درجه سیاه می‌شود؛ کائولین ناجی کیفیت میوه است.',
  },
  {
    month: 'مرداد',
    season: 'تابستان',
    title: 'رسیدگی، خندانی و آماده‌سازی برای برداشت',
    irrigation: 'آبیاری منظم تا ۲ هفته قبل از چینش محصول جهت تسهیل جدا شدن پوست نرم.',
    nutrition: 'نوبت آخر سولوپتاس و عناصر میکرو؛ نمونه‌برداری از برگ برای آنالیز تغذیه‌ای آزمایشگاهی.',
    protection: 'پایش سن‌های پسته؛ پرهیز از سمپاشی با سموم با دوره کارنس طولانی در نزدیکی زمان برداشت.',
    qazvinTip: 'بهترین زمان نمونه‌برداری از برگ برای ارسال به آزمایشگاه افشار اگری دهه اول مرداد ماه است.',
  },
  {
    month: 'شهریور',
    season: 'تابستان',
    title: 'برداشت اصولی و فروت‌ست پاییزه فوری',
    irrigation: 'یک نوبت آبیاری سبک بلافاصله پس از پایان چیدن محصول برای ریکاوری ریشه‌ها.',
    nutrition: 'محلول‌پاشی فروت‌ست پاییزه (روی، بور، نیتروژن) در حالی که برگ‌ها هنوز سبز هستند.',
    protection: 'فرآوری سریع محصول در ترمینال ضبط پسته و پرهیز از انباشت روی هم برای جلوگیری از افلاتوکسین.',
    qazvinTip: 'خوشه قرمز قزوین به عنوان تازه خوری و خشکبار ممتاز روانه بازار می‌شود؛ برداشت در صبح زود انجام شود.',
  },
  {
    month: 'مهر',
    season: 'پاییز',
    title: 'تغذیه ریشه قبل از خزان و ذخیره‌سازی عناصر',
    irrigation: 'آبیاری تکمیلی پاییزه متناسب با بارندگی‌های منطقه قزوین.',
    nutrition: 'سولفات روی و پتاسیم خاکی برای تقویت مقاومت ریشه به سرمای زمستان.',
    protection: 'جمع‌آوری و معدوم کردن بقایای پسته‌های آلوده به آفات (زودخندان‌ها و پسته‌های پوک).',
    qazvinTip: 'برگ‌هایی که دیرتر خزان می‌کنند، ذخیره کربوهیدرات بالاتری برای باردهی سال آینده فراهم می‌سازند.',
  },
  {
    month: 'آبان',
    season: 'پاییز',
    title: 'آغاز خزان برگ‌ها و هرس بهداشتی',
    irrigation: 'قطع آبیاری برای کمک به خواب طبیعی و متوقف شدن جریان شیره نباتی.',
    nutrition: 'عدم مصرف کودهای ازته که مانع خواب درخت می‌شوند.',
    protection: 'هرس سرشاخه‌های خشکیده، آلوده به سوسک سرشاخه‌خوار یا زنبور مغزخوار و سوزاندن آن‌ها بیرون باغ.',
    qazvinTip: 'هرس فرم‌دهی و باردهی پسته خوشه قرمز باید به صورت تنک کردن شاخه‌های موازی متراکم باشد.',
  },
  {
    month: 'آذر',
    season: 'پاییز',
    title: 'تامین سرمای زمستانه و اصلاح فیزیکی خاک',
    irrigation: 'در صورت خشکی مفرط هوا، یک نوبت آب سنگین زمستانه.',
    nutrition: 'برنامه‌ریزی برای چالکود و تهیه کود دامی کاملاً پوسیده دامی یا مرغی عمل‌آوری شده.',
    protection: 'شخم سطحی یا یخ‌آب زمستانه برای نابودی شفیره‌ها و لاروهای زمستان‌گذران در عمق خاک.',
    qazvinTip: 'خاک رسی قزوین با یخ‌آب زمستانه پف کرده و نفوذپذیری آن در بهار چند برابر می‌شود.',
  },
  {
    month: 'دی',
    season: 'زمستان',
    title: 'حفر کانال کود و اجرای چالکود زمستانه',
    irrigation: 'آبشویی سنگین خاک‌های شور برای شستشوی نمک از ناحیه ریشه‌دوانی.',
    nutrition: 'چالکود خاکی: کود دامی + گوگرد گرانوله ۹۰٪ + باکتری تیوباسیلوس + سولفات پتاسیم و سولفات روی.',
    protection: 'بستن طوقه‌ها با دوغاب بردوفیکس برای پیشگیری از بیماری گموز در باغات سنتی.',
    qazvinTip: 'چالکود در یک‌سوم انتهای سایه‌انداز درخت و در عمق ۴۰ تا ۶۰ سانتی‌متری حفر شود.',
  },
  {
    month: 'بهمن',
    season: 'زمستان',
    title: 'تکمیل نیاز سرمایی و روغن ولک زمستانه',
    irrigation: 'کنترل نم و رطوبت خاک زیر لایه‌های چالکود.',
    nutrition: 'ادامه اجرای چالکود قبل از آغاز جریان مجدد شیره گیاهی.',
    protection: 'در زمستان‌های گرم (کمتر از ۷۰۰ ساعت سرما)، محلول‌پاشی روغن ولک زمستانه (۳۰ تا ۳۵ در هزار).',
    qazvinTip: 'پسته خوشه قرمز قزوین در صورت عدم تامین سرما، جوانه‌های زایشی نامنظم باز شده و محصول سال بعد شدیداً افت می‌کند.',
  },
  {
    month: 'اسفند',
    season: 'زمستان',
    title: 'آماده‌باش برای آغاز فصل رویش و استارت بهاره',
    irrigation: 'تست سامانه‌های آبیاری قطره‌ای و فیلتراسیون قبل از اولین نوبت آب بهاره.',
    nutrition: 'تهیه ترکیبات فروت‌ست استاندارد و کلات‌های ریزمغذی با کیفیت برای محلول‌پاشی فروردین.',
    protection: 'سمپاشی قارچ‌کش‌های مسی محافظتی در صورت سابقه لکه برگی و پوسیدگی طوقه.',
    qazvinTip: 'همواره دماسنج‌های حداقل در نقاط پست باغ قزوین نصب کنید تا از افت دما به زیر صفر در شب‌های سرد غافلگیر نشوید.',
  },
];

export const PhenologyCalendar: React.FC = () => {
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(0);
  const currentMonth = ORCHARD_MONTHS[activeMonthIndex];

  return (
    <section id="calendar" className="py-14 md:py-20 bg-white border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-[#2b5d43] tracking-wide mb-2">
            گاه‌شمار تخصصی باغبانی
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
            تقویم ۱۲ ماهه مدیریت باغ پسته قزوین
          </h2>
          <p className="text-sm sm:text-base text-[#47584d] mt-2 leading-relaxed">
            برنامه زمانی یکپارچه آبیاری، کوددهی و دفع آفات مطابق با تقویم خورشیدی و ریتم فیزیولوژیک پسته در اقلیم دشت قزوین.
          </p>
        </div>

        {/* Month Selector Carousel / Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12 gap-1.5 mb-8">
          {ORCHARD_MONTHS.map((m, idx) => {
            const isActive = idx === activeMonthIndex;
            return (
              <button
                key={m.month}
                onClick={() => setActiveMonthIndex(idx)}
                className={`py-2.5 px-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#163323] text-white shadow-xs'
                    : 'bg-[#faf9f6] text-[#425247] hover:bg-[#eae7df] border border-[#e5e2db]'
                }`}
              >
                <div>{m.month}</div>
                <div className={`text-[10px] font-normal mt-0.5 ${isActive ? 'text-[#86efac]' : 'text-[#77897d]'}`}>
                  {m.season}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Month Focus Card */}
        <div className="bg-[#faf9f6] p-6 sm:p-8 rounded-2xl border border-[#dedad0] shadow-xs">
          
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e5e2db]">
            <div>
              <div className="text-xs text-[#942733] font-bold">
                راهنمای عملیات باغداری ماه {currentMonth.month} ({currentMonth.season})
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#14261c] mt-0.5">
                {currentMonth.title}
              </h3>
            </div>
            <div className="text-xs font-semibold px-3 py-1 rounded-md bg-[#eaf3ed] text-[#1b4b32] border border-[#c4e0ce]">
              اقلیم قزوین و بوئین‌زهرا
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            
            {/* Column 1: Irrigation */}
            <div className="p-4 bg-white rounded-xl border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0284c7]">
                <Droplet className="w-4 h-4" />
                <span>برنامه آبیاری و مدیریت رطوبت:</span>
              </div>
              <p className="text-xs text-[#3b4b40] leading-relaxed">
                {currentMonth.irrigation}
              </p>
            </div>

            {/* Column 2: Nutrition */}
            <div className="p-4 bg-white rounded-xl border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#163323]">
                <Sprout className="w-4 h-4 text-[#2b5d43]" />
                <span>تغذیه کودی و محلول‌پاشی:</span>
              </div>
              <p className="text-xs text-[#3b4b40] leading-relaxed">
                {currentMonth.nutrition}
              </p>
            </div>

            {/* Column 3: Protection */}
            <div className="p-4 bg-white rounded-xl border border-[#e4e1d7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#942733]">
                <ShieldAlert className="w-4 h-4" />
                <span>گیاه‌پزشکی و دفع آفات:</span>
              </div>
              <p className="text-xs text-[#3b4b40] leading-relaxed">
                {currentMonth.protection}
              </p>
            </div>

          </div>

          {/* Expert Tip for Qazvin */}
          <div className="mt-5 p-4 bg-[#fcf5f5] rounded-xl border border-[#f5d7d9] text-xs">
            <div className="font-bold text-[#942733] mb-1">
              توصیه طلایی علی افشار برای باغات پسته قزوین در {currentMonth.month}:
            </div>
            <p className="text-[#592329] leading-relaxed">
              {currentMonth.qazvinTip}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
