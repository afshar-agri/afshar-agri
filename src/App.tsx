import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FertilizerCalculator } from './components/FertilizerCalculator';
import { PestManagementEngine } from './components/PestManagementEngine';
import { RedClusterSpotlight } from './components/RedClusterSpotlight';
import { SoilWaterAnalyzer } from './components/SoilWaterAnalyzer';
import { PhenologyCalendar } from './components/PhenologyCalendar';
import { AboutDoctor } from './components/AboutDoctor';
import { PrescriptionModal, PrescriptionData } from './components/PrescriptionModal';
import { ConsultationRequest } from './components/ConsultationRequest';
import { GitHubPagesGuideModal } from './components/GitHubPagesGuideModal';
import { Footer } from './components/Footer';
import { PestOrDisease } from './data/pistachioData';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isGitHubGuideOpen, setIsGitHubGuideOpen] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState<PrescriptionData | null>(null);
  const [queuedPestTreatments, setQueuedPestTreatments] = useState<PestOrDisease[]>([]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGeneratePrescription = (calcData: {
    orchardName: string;
    areaHa: number;
    stage: any;
    irrigationType: string;
    soilType: string;
    treeAge: string;
    items: any[];
  }) => {
    setPrescriptionData({
      ...calcData,
      pestTreatments: queuedPestTreatments,
    });
  };

  const handleAddTreatmentToPrescription = (pest: PestOrDisease) => {
    setQueuedPestTreatments((prev) => {
      if (prev.some((p) => p.id === pest.id)) return prev;
      return [...prev, pest];
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] text-[#1e2922] font-['Vazirmatn',sans-serif] selection:bg-[#2b5d43] selection:text-white flex flex-col justify-between">
      {/* Navigation */}
      <Navbar
        onOpenGitHubGuide={() => setIsGitHubGuideOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onScrollToFertilizer={() => scrollToSection('fertilizer')}
          onScrollToPest={() => scrollToSection('pest-guide')}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <FertilizerCalculator onGeneratePrescription={handleGeneratePrescription} />

        <PestManagementEngine onAddTreatmentToPrescription={handleAddTreatmentToPrescription} />

        <RedClusterSpotlight />

        <SoilWaterAnalyzer />

        <PhenologyCalendar />

        <AboutDoctor />
      </main>

      {/* Footer */}
      <Footer onOpenGitHubGuide={() => setIsGitHubGuideOpen(true)} />

      {/* Modals & Drawers */}
      <PrescriptionModal
        data={prescriptionData}
        onClose={() => setPrescriptionData(null)}
      />

      <ConsultationRequest
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      <GitHubPagesGuideModal
        isOpen={isGitHubGuideOpen}
        onClose={() => setIsGitHubGuideOpen(false)}
      />
    </div>
  );
}
