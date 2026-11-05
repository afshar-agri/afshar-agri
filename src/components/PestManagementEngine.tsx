import React, { useState } from 'react';
import { PESTS_AND_DISEASES, PestOrDisease } from '../data/pistachioData';
import { Bug, AlertTriangle, ShieldCheck, Clock, Plus, Check } from 'lucide-react';

interface PestManagementEngineProps {
  onAddTreatmentToPrescription?: (pest: PestOrDisease) => void;
}

export const PestManagementEngine: React.FC<PestManagementEngineProps> = ({
  onAddTreatmentToPrescription,
}) => {
  const [selectedOrgan, setSelectedOrgan] = useState<string>('all');
  const [selectedPestId, setSelectedPestId] = useState<string>(PESTS_AND_DISEASES[0].id);
  const [addedPestId, setAddedPestId] = useState<string | null>(null);

  const filteredPests = PESTS_AND_DISEASES.filter((pest) => {
    if (selectedOrgan === 'all') return true;
    return pest.targetOrgans.includes(selectedOrgan as any);
  });

  const currentPest =
    PESTS_AND_DISEASES.find((p) => p.id === selectedPestId) || PESTS_AND_DISEASES[0];

  const handleAdd = (pest: PestOrDisease) => {
    if (onAddTreatmentToPrescription) {
      onAddTreatmentToPrescription(pest);
      setAddedPestId(pest.id);
      setTimeout(() => setAddedPestId(null), 2500);
    }
  };

  return (
    <section id="pest-guide" className="py-14 md:py-20 bg-[#faf9f6] border-t border-[#e8e6e0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <div className="text-xs font-semibold text-[#942733] tracking-wide mb-2">
            مدیریت تلفیقی آفات (IPM) و گیاه‌پزشکی
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14261c] tracking-tight">
            سامانه تشخیص و تجویز سموم آفات پسته
          </h2>
          <p className="text-sm sm:text-base text-[#47584d] mt-2 leading-relaxed">
            راهنمای بالینی شناسایی خسارت، تعیین آستانه اقتصادی مبارزه و تجویز سموم مجاز با حداقل اثر سوء بر دشمنان طبیعی، 
            با تمرکز ویژه بر فیزیولوژی و آسیب‌پذیری پسته خوشه قرمز قزوین.
          </p>
        </div>

        {/* Organ Filter Buttons */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#3b4b40] ml-2">فیلتر بر اساس اندام آسیب‌دیده:</span>
          {[
            { id: 'all', label: 'تمام اندام‌ها' },
            { id: 'برگ', label: 'برگ و جوانه‌ها' },
            { id: 'میوه و خوشه', label: 'خوشه و دانه قرمز' },
            { id: 'شاخه و جوانه', label: 'شاخه و چوب' },
            { id: 'طوقه و ریشه', label: 'طوقه و ریشه' },
          ].map((organ) => {
            const isActive = selectedOrgan === organ.id;
            return (
              <button
                key={organ.id}
                onClick={() => setSelectedOrgan(organ.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#163323] text-white shadow-xs'
                    : 'bg-white text-[#435449] border border-[#d6d2c7] hover:bg-[#edebe4]'
                }`}
              >
                {organ.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Diagnostic Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pests List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredPests.map((pest) => {
              const isSelected = pest.id === selectedPestId;
              return (
                <div
                  key={pest.id}
                  onClick={() => setSelectedPestId(pest.id)}
                  className={`p-4 rounded-xl border text-right cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-white border-[#163323] shadow-md ring-1 ring-[#163323]'
                      : 'bg-white border-[#e4e1d7] hover:border-[#b8b3a5]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#14261c]">{pest.nameFa}</h3>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                        pest.severity === 'critical'
                          ? 'bg-[#fbe8e8] text-[#942733]'
                          : pest.severity === 'high'
                          ? 'bg-[#fef3c7] text-[#92400e]'
                          : 'bg-[#e0f2fe] text-[#0369a1]'
                      }`}
                    >
                      {pest.severity === 'critical'
                        ? 'خسارت بحرانی'
                        : pest.severity === 'high'
                        ? 'خسارت شدید'
                        : 'خسارت متوسط'}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#6c7d71] mt-0.5">
                    {pest.scientificName}
                  </div>

                  <p className="text-xs text-[#526357] mt-2 line-clamp-2">
                    {pest.symptoms[0]}
                  </p>

                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-[#f0eee9] text-[11px] text-[#4b5c51]">
                    <span>اوج در قزوین: {pest.qazvinPeakSeason.split(' ')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>اندام: {pest.targetOrgans.join('، ')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Prescription Panel */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#dedad0] shadow-xs space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-extrabold text-[#14261c]">
                  {currentPest.nameFa}
                </h3>
                <span className="text-xs font-mono text-[#526357] bg-[#f0eee9] px-2.5 py-1 rounded-md">
                  {currentPest.scientificName}
                </span>
              </div>
              <p className="text-xs text-[#942733] font-semibold mt-1">
                اوج طغیان در باغات قزوین: {currentPest.qazvinPeakSeason}
              </p>
            </div>

            {/* Symptoms Checklist */}
            <div className="p-4 bg-[#faf9f6] rounded-xl border border-[#e4e1d7]">
              <h4 className="text-xs font-bold text-[#163323] mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-[#942733]" />
                <span>علائم بالینی و تشخیص میدانی در باغ:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#394a3e]">
                {currentPest.symptoms.map((symptom, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <span className="text-[#942733] mt-0.5">•</span>
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Special note for Qazvin Red Cluster */}
            <div className="p-4 bg-[#fcf4f5] rounded-xl border border-[#f5d0d4]">
              <h4 className="text-xs font-bold text-[#942733] mb-1">
                نکته کلیدی اختصاصی پسته خوشه قرمز قزوین:
              </h4>
              <p className="text-xs text-[#5f2127] leading-relaxed">
                {currentPest.treatment.specialNotesForRedCluster}
              </p>
            </div>

            {/* Chemical Treatments */}
            <div>
              <h4 className="text-xs font-bold text-[#163323] mb-2">
                سموم شیمیایی مجاز و استاندارد (با رعایت تناوب ماده موثره):
              </h4>
              <div className="space-y-2">
                {currentPest.treatment.conventional.map((chem, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-3 bg-[#faf9f6] rounded-lg border border-[#e4e1d7] text-xs font-medium text-[#25362b] flex items-center justify-between"
                  >
                    <span>{chem}</span>
                    <span className="text-[11px] text-[#607165]">دوز توصیه شده</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organic and Biological IPM */}
            <div>
              <h4 className="text-xs font-bold text-[#2b5d43] mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>روش‌های ارگانیک، بیولوژیک و زراعی (اولویت اول افشار اگری):</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#3b4b40] list-disc list-inside">
                {currentPest.treatment.organicBiological.map((org, oIdx) => (
                  <li key={oIdx}>{org}</li>
                ))}
              </ul>
            </div>

            {/* Timing & PHI Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#f0eee9]">
              <div className="p-3 bg-[#f7f6f2] rounded-xl text-xs space-y-1">
                <div className="text-[#68796d] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>دوره کارنس سموم (PHI):</span>
                </div>
                <div className="font-bold text-[#163323]">
                  {currentPest.treatment.safetyIntervalDays} روز فاصله تا برداشت میوه
                </div>
              </div>

              <div className="p-3 bg-[#f7f6f2] rounded-xl text-xs space-y-1">
                <div className="text-[#68796d]">دستور زمان‌بندی:</div>
                <div className="font-medium text-[#163323] line-clamp-2">
                  {currentPest.treatment.timingInstruction}
                </div>
              </div>
            </div>

            {/* Action to include in prescription */}
            <div className="pt-2">
              <button
                onClick={() => handleAdd(currentPest)}
                className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-xl border border-[#163323] text-[#163323] hover:bg-[#163323] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedPestId === currentPest.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>به نسخه گیاه‌پزشکی اضافه شد</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>افزودن پروتکل این آفت به نسخه کودی / درمانی</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
