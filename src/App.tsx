/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * PETUALANGAN SAINS: MISTERI MAGNET, LISTRIK, DAN TEKNOLOGI
 * Web Aplikasi Pembelajaran Interaktif IPAS Kelas V SD
 * Pengembang: Fredyka Elga Ariantama
 */

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Award,
  BookOpen,
  Compass,
  Film,
  Sparkles,
  CheckCircle2,
  Heart,
  RotateCcw,
} from 'lucide-react';
import { Navbar, NavTab } from './components/Navbar';
import { HomeHeroView } from './components/HomeHeroView';
import { LearningObjectivesView } from './components/LearningObjectivesView';
import { LearningModulesView } from './components/LearningModulesView';
import { SimulationHub } from './components/simulations/SimulationHub';
import { AnimationExplorer } from './components/AnimationExplorer';
import { QuizInteractive } from './components/QuizInteractive';
import { SummaryView } from './components/SummaryView';
import { AuthorProfileView } from './components/AuthorProfileView';
import { BibliographyView } from './components/BibliographyView';
import { CertificateModal } from './components/CertificateModal';
import { GuideModal } from './components/GuideModal';
import { sound } from './utils/audioSynthesizer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [studentName, setStudentName] = useState<string>('Siswa Bintang Sains');
  const [completedModules, setCompletedModules] = useState<number[]>([1]);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizRank, setQuizRank] = useState<string>('Baik!');
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from LocalStorage on initial mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('ipas_student_name');
      if (savedName) setStudentName(savedName);

      const savedModules = localStorage.getItem('ipas_completed_modules');
      if (savedModules) {
        const parsed = JSON.parse(savedModules);
        if (Array.isArray(parsed)) setCompletedModules(parsed);
      }

      const savedScore = localStorage.getItem('ipas_quiz_score');
      if (savedScore !== null) {
        setQuizScore(Number(savedScore));
      }

      const savedRank = localStorage.getItem('ipas_quiz_rank');
      if (savedRank) setQuizRank(savedRank);
    } catch {
      // LocalStorage might be disabled in strict iframe modes
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleUpdateName = (name: string) => {
    setStudentName(name);
    try {
      localStorage.setItem('ipas_student_name', name);
    } catch {
      // Ignore
    }
  };

  const handleToggleCompleteModule = (id: number) => {
    setCompletedModules((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((m) => m !== id) : [...prev, id];
      try {
        localStorage.setItem('ipas_completed_modules', JSON.stringify(next));
      } catch {
        // Ignore
      }
      if (!exists) {
        showToast(`Hebat! Modul 0${id} berhasil ditandai selesai!`);
      }
      return next;
    });
  };

  const handleUpdateQuizScore = (score: number) => {
    setQuizScore(score);
    let rank = 'Baik!';
    if (score >= 90) rank = 'Hebat Sekali!';
    else if (score >= 80) rank = 'Sangat Baik!';
    else if (score >= 70) rank = 'Baik!';
    else if (score >= 60) rank = 'Tetap Semangat!';
    else rank = 'Ayo Belajar Lagi!';

    setQuizRank(rank);
    try {
      localStorage.setItem('ipas_quiz_score', score.toString());
      localStorage.setItem('ipas_quiz_rank', rank);
    } catch {
      // Ignore
    }
    showToast(`Nilai Kuis Kamu: ${score}/100 (${rank}). Sertifikat siap dicetak!`);
  };

  const handleOpenCertificate = (score: number, rank: string) => {
    setQuizScore(score);
    setQuizRank(rank);
    setIsCertificateOpen(true);
  };

  // Progress computation: modules (up to 50%) + quiz completed (50%)
  const modulesWeight = (completedModules.length / 5) * 50;
  const quizWeight = quizScore !== null ? 50 : 0;
  const totalProgress = Math.min(100, Math.round(modulesWeight + quizWeight));

  const handleResetAllProgress = () => {
    const confirmReset = window.confirm(
      'Apakah kamu ingin mengulang seluruh progres belajar dan riwayat kuis dari awal?'
    );
    if (!confirmReset) return;

    sound.playClick();
    setCompletedModules([]);
    setQuizScore(null);
    setQuizRank('Baik!');
    try {
      localStorage.removeItem('ipas_completed_modules');
      localStorage.removeItem('ipas_quiz_score');
      localStorage.removeItem('ipas_quiz_rank');
    } catch {
      // Ignore
    }
    showToast('Progres belajar telah diatur ulang ke awal.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        progressPercent={totalProgress}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Port Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {activeTab === 'beranda' && (
          <HomeHeroView
            studentName={studentName}
            onUpdateName={handleUpdateName}
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedModulesCount={completedModules.length}
            quizScore={quizScore}
          />
        )}

        {activeTab === 'tujuan' && (
          <LearningObjectivesView
            onStartLearning={() => {
              sound.playClick();
              setActiveTab('materi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'materi' && (
          <LearningModulesView
            completedModules={completedModules}
            onToggleCompleteModule={handleToggleCompleteModule}
            onNavigateToSimulation={() => {
              sound.playClick();
              setActiveTab('simulasi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'simulasi' && <SimulationHub />}

        {activeTab === 'animasi' && <AnimationExplorer />}

        {activeTab === 'kuis' && (
          <QuizInteractive
            studentName={studentName}
            onOpenCertificate={handleOpenCertificate}
            onUpdateQuizScore={handleUpdateQuizScore}
          />
        )}

        {activeTab === 'kesimpulan' && (
          <SummaryView
            onStartQuiz={() => {
              sound.playClick();
              setActiveTab('kuis');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onFinishLearning={() => {
              sound.playClick();
              setActiveTab('beranda');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'profil' && <AuthorProfileView />}

        {activeTab === 'pustaka' && <BibliographyView />}
      </main>

      {/* Floating Guide Help Trigger Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            sound.playClick();
            setIsGuideOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 backdrop-blur hover:bg-amber-50 text-slate-700 hover:text-amber-800 rounded-full border border-slate-300 hover:border-amber-400 shadow-md transition-all text-xs font-bold"
        >
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span className="hidden sm:inline">Petunjuk Belajar</span>
        </button>
      </div>

      {/* Modals */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        studentName={studentName}
        onUpdateName={handleUpdateName}
        score={quizScore || 100}
        rank={quizRank}
      />

      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-extrabold text-slate-800 text-sm font-display">
              PETUALANGAN SAINS: MISTERI MAGNET, LISTRIK, DAN TEKNOLOGI
            </p>
            <p className="text-slate-500">
              Media Pembelajaran Digital IPAS Kelas V SD &bull; Pengembang: <strong>Fredyka Elga Ariantama</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => {
                sound.playClick();
                setIsGuideOpen(true);
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Petunjuk Aplikasi
            </button>
            <span aria-hidden="true">&bull;</span>
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('pustaka');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-slate-900 transition-colors"
            >
              Sumber Rujukan
            </button>
            <span aria-hidden="true">&bull;</span>
            <button
              onClick={handleResetAllProgress}
              className="text-rose-600 hover:text-rose-800 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Progres</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
