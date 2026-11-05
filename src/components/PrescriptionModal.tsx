import React from 'react';
import { PhenologyStage, PestOrDisease } from '../data/pistachioData';
import { Printer, X, CheckCircle, ShieldCheck, Sprout, AlertCircle, Share2 } from 'lucide-react';

export interface PrescriptionData {
  orchardName: string;
  areaHa: number;
  stage: PhenologyStage;
  irrigationType: string;
  soilType: string;
  treeAge: string;
  items: {
    name: string;
    type: string;
    dosagePerHa: string;
    totalAmount: string;
    purpose: string;
    caution?: string;
  }[];
  pestTreatments?: PestOrDisease[];
}

interface PrescriptionModalProps {
  data: PrescriptionData | null;
  onClose: () => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ data, onClose }) => {
  if (!data) return null;

  const todaySolar = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print-overlay">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#d6d2c7] overflow-hidden my-8">
        
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-[#163323] text-white px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-[#86efac]" />
            <span className="text-sm font-bold">نسخه تغذیه و گیاه‌پزشکی افشار اگری</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 text-xs font-semibold bg-[#245239] hover:bg-[#2e6848] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>چاپ یا ذخیره PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/80 hover:text-white cursor-pointer"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Prescription Sheet */}
        <div className="prescription-print-card p-6 sm:p-10 space-y-6 text-[#14261c] bg-white">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b-2 border-[#163323]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#163323] text-white flex items-center justify-center font-bold text-xl">
                AA
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#163323]">
                  برند افشار اگری (Afshar Agri)
                </h1>
                <p className="text-xs text-[#4c5e52] font-medium mt-0.5">
                  مرکز مشاوره تخصصی تغذیه و مدیریت باغات پسته خوشه قرمز قزوین
                </p>
              </div>
            </div>

            <div className="text-left text-xs space-y-1">
              <div>
                <span className="text-[#647568]">شماره نسخه: </span>
                <span className="font-mono font-bold">AA-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div>
                <span className="text-[#647568]">تاریخ صدور: </span>
                <span className="font-semibold">{todaySolar}</span>
              </div>
              <div>
                <span className="text-[#647568]">کارشناس مسئول: </span>
                <span className="font-bold text-[#163323]">مهندس علی افشار (دانشجوی دکتری کشاورزی)</span>
              </div>
            </div>
          </div>

          {/* Orchard Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#faf9f6] rounded-xl border border-[#e5e2db] text-xs">
            <div>
              <span className="text-[#607165] block">نام باغ / متقاضی:</span>
              <strong className="text-[#163323]">{data.orchardName}</strong>
            </div>
            <div>
              <span className="text-[#607165] block">مساحت باغ:</span>
              <strong className="text-[#163323]">{data.areaHa} هکتار</strong>
            </div>
            <div>
              <span className="text-[#607165] block">سن درختان:</span>
              <strong className="text-[#163323]">{data.treeAge}</strong>
            </div>
            <div>
              <span className="text-[#607165] block">سیستم آبیاری:</span>
              <strong className="text-[#163323]">{data.irrigationType}</strong>
            </div>
          </div>

          {/* Stage Headline */}
          <div className="p-3.5 bg-[#eaf3ed] rounded-lg border border-[#c5e0ce] flex items-center justify-between text-xs">
            <div>
              <span className="text-[#204a33] font-bold">مرحله فنولوژیکی درختان: </span>
              <span className="font-extrabold text-[#163323]">{data.stage.name} ({data.stage.solarMonth})</span>
            </div>
            <div className="text-[11px] text-[#2b5d43]">
              بافت خاک: {data.soilType}
            </div>
          </div>

          {/* Prescribed Items Table */}
          <div className="border border-[#dedad0] rounded-xl overflow-hidden">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="bg-[#f0eee9] text-[#1c2d22] font-bold border-b border-[#dedad0]">
                  <th className="py-2.5 px-3">ردیف</th>
                  <th className="py-2.5 px-3">نام کود / ترکیب پیشنهادی</th>
                  <th className="py-2.5 px-3">روش مصرف</th>
                  <th className="py-2.5 px-3">دوز مصرفی</th>
                  <th className="py-2.5 px-3">حجم کل برای {data.areaHa} هکتار</th>
                  <th className="py-2.5 px-3">هدف و زمان کاربرد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eceae3]">
                {data.items.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#faf9f6]'}>
                    <td className="py-3 px-3 font-mono text-[#526357]">{idx + 1}</td>
                    <td className="py-3 px-3 font-bold text-[#14261c]">{item.name}</td>
                    <td className="py-3 px-3 text-[#2b5d43] font-semibold">{item.type}</td>
                    <td className="py-3 px-3">{item.dosagePerHa}</td>
                    <td className="py-3 px-3 font-bold font-mono text-[#942733]">{item.totalAmount}</td>
                    <td className="py-3 px-3 text-[#45564b]">
                      <div>{item.purpose}</div>
                      {item.caution && (
                        <div className="text-[11px] text-[#a13b00] mt-0.5 font-medium">
                          ⚠ احتیاط: {item.caution}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Optional Pest treatments */}
          {data.pestTreatments && data.pestTreatments.length > 0 && (
            <div className="border border-[#f0d4d4] bg-[#fdf8f8] p-4 rounded-xl space-y-2 text-xs">
              <h4 className="font-bold text-[#942733] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>دستورالعمل ویژه دفع آفات و بیماری‌ها:</span>
              </h4>
              {data.pestTreatments.map((pest, pIdx) => (
                <div key={pIdx} className="border-t border-[#f7dede] pt-2">
                  <div className="font-bold text-[#14261c]">
                    آفت: {pest.nameFa} ({pest.scientificName})
                  </div>
                  <div className="text-[#592329] mt-0.5">
                    سموم مجاز: {pest.treatment.conventional.join(' | ')}
                  </div>
                  <div className="text-[#3b4b40] mt-0.5">
                    کنترل ارگانیک: {pest.treatment.organicBiological.join(' | ')} (دوره کارنس: {pest.treatment.safetyIntervalDays} روز)
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* General instructions */}
          <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#e4e1d7] text-xs space-y-1.5 text-[#3b4b40]">
            <div className="font-bold text-[#163323]">نکات طلایی مصرف کودها و سموم:</div>
            <ul className="list-disc list-inside space-y-0.5 leading-relaxed">
              <li>محلول‌پاشی برگی فقط در ساعات خنک صبح زود یا بعدازظهر پس از افت آفتاب انجام گیرد.</li>
              <li>اسیدیته آب سمپاشی قبل از افزودن کود یا سم تنظیم شود (pH مطلوب بین ۵.۵ تا ۶.۵).</li>
              <li>قبل از هرگونه اختلاط کودها و سموم در مخزن اصلی، آزمون سازگاری (Jar Test) در یک ظرف کوچک انجام شود.</li>
            </ul>
          </div>

          {/* Signature and Seal */}
          <div className="pt-6 border-t border-[#e2dfd7] flex flex-wrap items-end justify-between gap-6">
            <div className="text-xs text-[#526357] max-w-sm">
              <div>سامانه مشاوره باغبانی افشار اگری</div>
              <div>تلفن مستقیم مشاوره: ۰۹۱۲۳۸۱۴۲۰۰ (پاسخگویی به باغداران)</div>
              <div>سایت تحت توسعه: github.com/aafshar268/afshar-agri</div>
            </div>

            <div className="text-center p-3 border-2 border-dashed border-[#163323]/30 rounded-xl bg-[#fbfaf8]">
              <div className="text-xs font-bold text-[#163323]">مهر و امضای دیجیتال کارشناس</div>
              <div className="text-sm font-extrabold text-[#942733] mt-1">علی افشار</div>
              <div className="text-[11px] text-[#55675b]">دانشجوی دکتری کشاورزی</div>
              <div className="text-[10px] text-[#86978c] mt-0.5 font-mono">Verified AfsharAgri Agronomist</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
