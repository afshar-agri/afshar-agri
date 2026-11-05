import React, { useState } from 'react';
import { SOIL_WATER_STANDARDS } from '../data/pistachioData';
import { TestTube2, AlertCircle, CheckCircle2, ChevronDown, RefreshCw } from 'lucide-react';

export const SoilWaterAnalyzer: React.FC = () => {
  const [soilEc, setSoilEc] = useState<number>(3.5);
  const [soilPh, setSoilPh] = useState<number>(7.8);
  const [waterEc, setWaterEc] = useState<number>(2.2);
  const [sar, setSar] = useState<number>(4.5);

  // Interpretation logic
  const getSoilEcStatus = () => {
    if (soilEc <= 4) return { label: 'مطلوب و غیر شور', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'شرایط رشد ریشه و جذب عناصر ایده‌آل است.' };
    if (soilEc <= 7) return { label: 'شوری متوسط (مرزی)', color: 'text-amber-800 bg-amber-50 border-amber-200', note: 'افت عملکرد جزئی؛ مصرف اسید هیومیک و آبشویی زمستانه توصیه می‌شود.' };
    return { label: 'شوری شدید و بحرانی', color: 'text-rose-800 bg-rose-50 border-rose-200', note: 'خطر سوختگی حاشیه برگ و سقط جنین؛ آبشویی سنگین با گچ الزامی است.' };
  };

  const getPhStatus = () => {
    if (soilPh < 7.4) return { label: 'خنثی تا کمی قلیایی', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'جذب تمام عناصر میکرو بدون مانع انجام می‌شود.' };
    if (soilPh <= 8.2) return { label: 'آهکی قلیایی (رایج قزوین)', color: 'text-amber-800 bg-amber-50 border-amber-200', note: 'تثبیت فسفر و روی؛ لزوم کاربرد کودهای اسیدی و سولفاته.' };
    return { label: 'قلیاییت شدید (> ۸.۲)', color: 'text-rose-800 bg-rose-50 border-rose-200', note: 'قفل شدن آهن، منگنز و مس؛ مصرف گوگرد با باکتری تیوباسیلوس در چالکود ضروری است.' };
  };

  const getWaterEcStatus = () => {
    if (waterEc <= 2.5) return { label: 'آب باکیفیت و شیرین', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'بسیار مناسب برای تمام مراحل به‌ویژه مرحله مغزبندی.' };
    if (waterEc <= 4.5) return { label: 'آب لب‌شور قابل تحمل', color: 'text-amber-800 bg-amber-50 border-amber-200', note: 'دور آبیاری باید اندکی کوتاه‌تر و حجم آبکشی افزایش یابد.' };
    return { label: 'آب بسیار شور (> ۴.۵)', color: 'text-rose-800 bg-rose-50 border-rose-200', note: 'خطر انباشت نمک در حوزه قطره‌چکان‌ها؛ آبکودهای کلرصفر الزامی است.' };
  };

  const getSarStatus = () => {
    if (sar <= 6) return { label: 'ساختار خاک پایدار', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', note: 'نفوذپذیری آب به اعماق ریشه مطلوب است.' };
    if (sar <= 10) return { label: 'خطر متوسط سدیمی شدن', color: 'text-amber-800 bg-amber-50 border-amber-200', note: 'خاک مستعد سخت شدن سله؛ نیاز به مصرف گوگرد و ماده آلی.' };
    return { label: 'سدیمی بحرانی (> ۱۰)', color: 'text-rose-800 bg-rose-50 border-rose-200', note: 'تخریب ساختمان خاک و خفگی ریشه؛ مصرف ۳ تا ۵ تن در هکتار گچ کشاورزی.' };
  };

  const soilEcResult = getSoilEcStatus();
  const phResult = getPhStatus();
  const waterEcResult = getWaterEcStatus();
  const sarResult = getSarStatus();

  return (
    <section id="soil-water" className="py-14 md:py-20 bg-[#faf9f6] border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-[#2b5d43] tracking-wide mb-2">
            تفسیر علمی برگه آزمایشگاه
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
            تحلیلگر هوشمند آزمایش آب و خاک باغات پسته
          </h2>
          <p className="text-sm sm:text-base text-[#47584d] mt-2 leading-relaxed">
            شاخص‌های موجود در برگه آزمایش خاک یا آب چاه خود را وارد کنید تا تفسیر بالینی، 
            میزان خطر برای پسته خوشه قرمز و نسخه اصلاحی فوری را مشاهده کنید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Panel with Lab Image */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#dedad0] shadow-xs space-y-6">
            
            <div className="rounded-xl overflow-hidden border border-[#e5e2db] h-44 relative bg-[#f0eee9]">
              <img
                src="/src/assets/images/soil_leaf_agri_lab_1793873626955.jpg"
                alt="میز آزمایشگاه خاک و گیاه کشاورزی"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-3 right-3 text-white text-xs font-medium">
                آزمایشگاه تخصصی تغذیه گیاهی افشار اگری
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3b4b40] mb-1.5">
                  <span>شوری خاک (ECe عصاره اشباع):</span>
                  <span className="font-mono text-[#163323] font-bold">{soilEc} dS/m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="14"
                  step="0.1"
                  value={soilEc}
                  onChange={(e) => setSoilEc(parseFloat(e.target.value))}
                  className="w-full accent-[#163323]"
                />
                <div className="flex justify-between text-[10px] text-[#6e7e72] mt-0.5 font-mono">
                  <span>0.5 شیرین</span>
                  <span>4.0 آستانه</span>
                  <span>8.0 شور</span>
                  <span>14.0 خیلی شور</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3b4b40] mb-1.5">
                  <span>اسیدیته خاک (pH):</span>
                  <span className="font-mono text-[#163323] font-bold">{soilPh}</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="9.0"
                  step="0.1"
                  value={soilPh}
                  onChange={(e) => setSoilPh(parseFloat(e.target.value))}
                  className="w-full accent-[#163323]"
                />
                <div className="flex justify-between text-[10px] text-[#6e7e72] mt-0.5 font-mono">
                  <span>6.5 اسیدی</span>
                  <span>7.5 مطلوب</span>
                  <span>8.2 قلیایی دشت قزوین</span>
                  <span>9.0 شدید</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3b4b40] mb-1.5">
                  <span>شوری آب آبیاری (ECw):</span>
                  <span className="font-mono text-[#163323] font-bold">{waterEc} dS/m</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={waterEc}
                  onChange={(e) => setWaterEc(parseFloat(e.target.value))}
                  className="w-full accent-[#163323]"
                />
                <div className="flex justify-between text-[10px] text-[#6e7e72] mt-0.5 font-mono">
                  <span>0.5 آب چشمه</span>
                  <span>2.5 مجاز</span>
                  <span>5.0 لب‌شور</span>
                  <span>10.0 شور</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-[#3b4b40] mb-1.5">
                  <span>نسبت جذب سدیم (SAR):</span>
                  <span className="font-mono text-[#163323] font-bold">{sar}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={sar}
                  onChange={(e) => setSar(parseFloat(e.target.value))}
                  className="w-full accent-[#163323]"
                />
                <div className="flex justify-between text-[10px] text-[#6e7e72] mt-0.5 font-mono">
                  <span>1 ایمن</span>
                  <span>6 مرزی</span>
                  <span>12 خطر سله‌بندی</span>
                  <span>20 بحرانی</span>
                </div>
              </div>

            </div>

          </div>

          {/* Diagnostic Interpretation Cards */}
          <div className="lg:col-span-7 space-y-4">
            
            <h3 className="text-sm font-bold text-[#163323] pb-2 border-b border-[#e5e2db]">
              ارزیابی زراعی داده‌های آزمایشگاهی:
            </h3>

            {/* Metric 1 */}
            <div className={`p-4 rounded-xl border ${soilEcResult.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14261c]">وضعیت شوری خاک (ECe: {soilEc} dS/m)</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-white/70">
                  {soilEcResult.label}
                </span>
              </div>
              <p className="text-xs mt-1.5 text-[#304135] leading-relaxed">
                {soilEcResult.note}
              </p>
            </div>

            {/* Metric 2 */}
            <div className={`p-4 rounded-xl border ${phResult.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14261c]">اسیدیته و آهک خاک (pH: {soilPh})</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-white/70">
                  {phResult.label}
                </span>
              </div>
              <p className="text-xs mt-1.5 text-[#304135] leading-relaxed">
                {phResult.note}
              </p>
            </div>

            {/* Metric 3 */}
            <div className={`p-4 rounded-xl border ${waterEcResult.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14261c]">کیفیت آب آبیاری (ECw: {waterEc} dS/m)</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-white/70">
                  {waterEcResult.label}
                </span>
              </div>
              <p className="text-xs mt-1.5 text-[#304135] leading-relaxed">
                {waterEcResult.note}
              </p>
            </div>

            {/* Metric 4 */}
            <div className={`p-4 rounded-xl border ${sarResult.color}`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#14261c]">خطر سدیمی شدن و تخریب ساختمان (SAR: {sar})</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-sm bg-white/70">
                  {sarResult.label}
                </span>
              </div>
              <p className="text-xs mt-1.5 text-[#304135] leading-relaxed">
                {sarResult.note}
              </p>
            </div>

            {/* Actionable Agronomy Prescription for these parameters */}
            <div className="p-5 bg-white rounded-xl border border-[#d8d4c7] shadow-xs space-y-2 mt-4">
              <div className="text-xs font-bold text-[#163323] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>نسخه اصلاحی مهندس علی افشار برای این شرایط:</span>
              </div>
              <ul className="text-xs text-[#3b4b40] space-y-1 list-disc list-inside leading-relaxed">
                {soilPh > 7.7 && (
                  <li>
                    تغذیه کلسیمی به صورت محلول‌پاشی برگی صورت گیرد (جذب ریشه‌ای کلسیم در pH بالای ۷.۷ به علت رقابت با کربنات‌ها کاهش می‌یابد).
                  </li>
                )}
                {soilEc > 5 && (
                  <li>
                    آبشویی سبک پس از برداشت و مصرف ۱۰ لیتر در هکتار اسید هیومیک با اولین آب استارت برای آزادسازی فسفر محبوس.
                  </li>
                )}
                {sar > 7 && (
                  <li>
                    کاربرد حداقل ۳ تن گچ کشاورزی آبدار (سولفات کلسیم) در شیارهای خاکی کف باغ جهت کاهش سدیم تبادلی.
                  </li>
                )}
                <li>
                  استفاده از کودهای حاوی اسید آمینه آزاد در اوایل بهار برای کاهش تنش اسمزی شوری در ریشه پسته خوشه قرمز.
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
