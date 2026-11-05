import React, { useState, useId } from 'react';
import { PHENOLOGY_STAGES, PhenologyStage } from '../data/pistachioData';
import { AlertCircle, CheckCircle, Download, FileText, HelpCircle, Layers, Sliders, Sparkles } from 'lucide-react';

interface FertilizerCalculatorProps {
  onGeneratePrescription: (data: {
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
  }) => void;
}

export const FertilizerCalculator: React.FC<FertilizerCalculatorProps> = ({
  onGeneratePrescription,
}) => {
  const [orchardName, setOrchardName] = useState('باغ پسته خوشه قرمز قزوین');
  const [selectedStageId, setSelectedStageId] = useState<string>('bud-swell-fruit-set');
  const [areaHa, setAreaHa] = useState<number>(3); // 3 hectares default
  const [treeAge, setTreeAge] = useState<string>('mature'); // young, mature, old
  const [irrigationType, setIrrigationType] = useState<string>('drip'); // drip, flood, bubbler
  const [soilType, setSoilType] = useState<string>('clay-loam'); // clay-loam, sandy, saline

  const stage = PHENOLOGY_STAGES.find((s) => s.id === selectedStageId) || PHENOLOGY_STAGES[1];

  // Adjust dosages according to orchard parameters
  const calculatedItems = stage.recommendedFertilizers.map((fert) => {
    // Basic scaling factor based on tree age
    let ageMultiplier = 1.0;
    if (treeAge === 'young') ageMultiplier = 0.5;
    if (treeAge === 'old') ageMultiplier = 1.15;

    // Soil salinity adjustment for clay-loam
    let totalText = '';
    if (fert.dosage.includes('کیلوگرم')) {
      const match = fert.dosage.match(/(\d+)/);
      const baseNum = match ? parseInt(match[0], 10) : 15;
      const totalKg = Math.round(baseNum * areaHa * ageMultiplier);
      totalText = `${totalKg} کیلوگرم برای کل باغ (${areaHa} هکتار)`;
    } else if (fert.dosage.includes('لیتر')) {
      const match = fert.dosage.match(/(\d+)/);
      const baseNum = match ? parseInt(match[0], 10) : 10;
      const totalLiters = Math.round(baseNum * areaHa * ageMultiplier);
      totalText = `${totalLiters} لیتر برای کل باغ (${areaHa} هکتار)`;
    } else if (fert.dosage.includes('در هزار')) {
      // foliar spray based on 1000L / ha approx
      const foliarLitersPerHa = 1000;
      totalText = `محلول‌پاشی با حجم تقریبی ${areaHa * foliarLitersPerHa} لیتر آب در کل باغ`;
    } else {
      totalText = `${areaHa} هکتار متناسب با دستور مصرف`;
    }

    return {
      name: fert.name,
      type: fert.type === 'foliar' ? 'محلول‌پاشی برگی' : fert.type === 'fertigation' ? 'کودآبیاری (آبکود)' : 'چالکود خاکی',
      dosagePerHa: fert.dosage,
      totalAmount: totalText,
      purpose: fert.purpose,
      caution: fert.caution,
    };
  });

  const handleCreatePrescription = () => {
    onGeneratePrescription({
      orchardName,
      areaHa,
      stage,
      irrigationType:
        irrigationType === 'drip'
          ? 'آبیاری قطره‌ای (نوار/لوله)'
          : irrigationType === 'flood'
          ? 'آبیاری سنتی غرقابی'
          : 'سیستم بابلر',
      soilType:
        soilType === 'clay-loam'
          ? 'رسی-لومی سنگین (بافت رایج دشت قزوین)'
          : soilType === 'sandy'
          ? 'سبک شنی'
          : 'شور و قلیایی (EC > 6)',
      treeAge:
        treeAge === 'young'
          ? 'درختان جوان (زیر ۶ سال)'
          : treeAge === 'mature'
          ? 'درختان بالغ بارده (۷ تا ۲۰ سال)'
          : 'درختان مسن کهنسال',
      items: calculatedItems,
    });
  };

  return (
    <section id="fertilizer" className="py-14 md:py-20 bg-white border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-[#2b5d43] tracking-wide mb-2">
            سامانه تخصصی افشار اگری
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
            محاسبه هوشمند برنامه کودی باغات پسته
          </h2>
          <p className="text-sm sm:text-base text-[#47584d] mt-2 leading-relaxed">
            با انتخاب مرحله فنولوژی، مساحت و وضعیت خاک باغ خود، دوز دقیق عناصر کودی و نحوه اختلاط ایمن را دریافت کنید.
          </p>
        </div>

        {/* Stage Selector Tabs */}
        <div className="mb-8">
          <label className="block text-xs font-semibold text-[#3b4b40] mb-2.5">
            ۱. مرحله رشد و نمو درخت پسته (فنولوژی):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PHENOLOGY_STAGES.map((s) => {
              const isActive = s.id === selectedStageId;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedStageId(s.id)}
                  className={`p-3 text-right rounded-xl border transition-all text-xs cursor-pointer flex flex-col justify-between h-24 ${
                    isActive
                      ? 'bg-[#163323] text-white border-[#163323] shadow-xs'
                      : 'bg-[#faf9f6] text-[#2c3d31] border-[#e2dfd7] hover:border-[#b8b3a5]'
                  }`}
                >
                  <span className="font-bold line-clamp-2 leading-tight">{s.name}</span>
                  <span className={`text-[11px] mt-1 ${isActive ? 'text-[#a7f3d0]' : 'text-[#64746a]'}`}>
                    {s.solarMonth}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-5 bg-[#faf9f6] p-5 sm:p-6 rounded-2xl border border-[#e4e1d7] space-y-5">
            <h3 className="text-sm font-bold text-[#163323] pb-2 border-b border-[#e7e4dc] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#2b5d43]" />
              <span>۲. مشخصات باغ و شرایط محیطی</span>
            </h3>

            <div>
              <label className="block text-xs font-medium text-[#3b4b40] mb-1.5">
                عنوان یا نام باغ:
              </label>
              <input
                type="text"
                value={orchardName}
                onChange={(e) => setOrchardName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                placeholder="مثال: باغ پسته خوشه قرمز افشار - بوئین‌زهرا"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#3b4b40] mb-1.5">
                  مساحت باغ (هکتار):
                </label>
                <input
                  type="number"
                  min="0.5"
                  max="500"
                  step="0.5"
                  value={areaHa}
                  onChange={(e) => setAreaHa(Math.max(0.5, parseFloat(e.target.value) || 1))}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3b4b40] mb-1.5">
                  سن درختان:
                </label>
                <select
                  value={treeAge}
                  onChange={(e) => setTreeAge(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                >
                  <option value="young">نهال و جوان (زیر ۶ سال)</option>
                  <option value="mature">بارده اقتصادی (۷ تا ۲۵ سال)</option>
                  <option value="old">کهنسال (بیش از ۲۵ سال)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#3b4b40] mb-1.5">
                  سیستم آبیاری:
                </label>
                <select
                  value={irrigationType}
                  onChange={(e) => setIrrigationType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                >
                  <option value="drip">قطره‌ای تحت فشار</option>
                  <option value="flood">غرقابی سنتی</option>
                  <option value="bubbler">بابلر موضعی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3b4b40] mb-1.5">
                  بافت و وضعیت خاک:
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#d6d2c7] rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#2b5d43]"
                >
                  <option value="clay-loam">رسی-لومی (دشت قزوین)</option>
                  <option value="sandy">شنی سبک (نفوذپذیری بالا)</option>
                  <option value="saline">خاک شور و سدیمی</option>
                </select>
              </div>
            </div>

            {/* Stage Summary Box */}
            <div className="p-3.5 bg-[#f0eee9] rounded-xl text-xs space-y-1.5 border border-[#e4e1d7]">
              <div className="font-bold text-[#163323]">{stage.name} ({stage.solarMonth})</div>
              <p className="text-[#435449] leading-relaxed">{stage.description}</p>
              <div className="text-[11px] text-[#2b5d43] font-medium pt-1">
                هدف فیزیولوژیک: {stage.primaryObjective}
              </div>
            </div>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#e8e6e0]">
              <h3 className="text-sm font-bold text-[#163323]">
                ۳. اقلام کودی پیشنهادی برای {areaHa} هکتار
              </h3>
              <span className="text-xs text-[#526357]">
                بر اساس استانداردهای مؤسسه تحقیقات پسته و خاک‌شناسی
              </span>
            </div>

            <div className="space-y-3">
              {calculatedItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-[#e4e1d7] shadow-xs hover:border-[#b8b3a5] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[#14261c]">{item.name}</h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#eef7f1] text-[#23633e]">
                      {item.type}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5 text-xs">
                    <div className="text-[#435449]">
                      <span className="text-[#6d7e73]">دوز مصرف: </span>
                      <strong className="text-[#163323]">{item.dosagePerHa}</strong>
                    </div>
                    <div className="text-[#435449]">
                      <span className="text-[#6d7e73]">مقدار کل باغ: </span>
                      <strong className="text-[#942733] font-mono">{item.totalAmount}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-[#526357] mt-2 leading-relaxed">
                    نقش در گیاه: {item.purpose}
                  </p>

                  {item.caution && (
                    <div className="mt-2 text-[11px] text-[#a13b00] flex items-center gap-1.5 bg-[#fef7ee] p-2 rounded-lg border border-[#fbd38d]/40">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>هشدار اختلاط: {item.caution}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Critical Risks for Stage */}
            <div className="p-4 bg-[#fbf5f5] rounded-xl border border-[#f0d4d4] text-xs">
              <div className="font-bold text-[#942733] mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>خطرات و تنش‌های بحرانی این مرحله در دشت قزوین:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[#6e2c34]">
                {stage.criticalRisks.map((risk, rIdx) => (
                  <li key={rIdx}>{risk}</li>
                ))}
              </ul>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCreatePrescription}
                className="flex-1 py-3 px-5 text-sm font-bold text-white bg-[#163323] hover:bg-[#1f4530] rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#86efac]" />
                <span>صدور و مشاهده نسخه چاپی افشار اگری</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
