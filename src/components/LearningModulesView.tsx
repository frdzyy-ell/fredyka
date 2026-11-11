import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Lightbulb,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { LEARNING_MODULES, LearningModule } from '../data/learningData';
import { sound } from '../utils/audioSynthesizer';
import { speechService } from '../utils/speech';

interface LearningModulesViewProps {
  completedModules: number[];
  onToggleCompleteModule: (id: number) => void;
  onNavigateToSimulation: () => void;
}

export const LearningModulesView: React.FC<LearningModulesViewProps> = ({
  completedModules,
  onToggleCompleteModule,
  onNavigateToSimulation,
}) => {
  const [activeModuleId, setActiveModuleId] = useState<number>(1);

  const activeModule: LearningModule =
    LEARNING_MODULES.find((m) => m.id === activeModuleId) || LEARNING_MODULES[0];

  const isCompleted = completedModules.includes(activeModule.id);

  const handleSelectModule = (id: number) => {
    sound.playClick();
    speechService.stop();
    setActiveModuleId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextModule = () => {
    if (activeModuleId < LEARNING_MODULES.length) {
      handleSelectModule(activeModuleId + 1);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleId > 1) {
      handleSelectModule(activeModuleId - 1);
    }
  };

  const handleReadFullModule = () => {
    sound.playClick();
    const narrationText = `${activeModule.title}. ${activeModule.overview}. ${activeModule.sections
      .map((s) => `${s.heading}. ${s.content}`)
      .join('. ')}. Fakta Menarik: ${activeModule.funFact}`;
    speechService.speak(narrationText);
  };

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">MATERI PEMBELAJARAN IPAS KELAS 5</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">
              Modul Belajar: Magnet, Listrik, & Teknologi
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Pelajari kelima modul secara berurutan. Setiap modul dilengkapi penjelasan ramah anak, fakta sains menarik, dan contoh di sekitar rumah kita.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur px-4 py-2.5 rounded-xl border border-amber-200 text-xs text-slate-700 shrink-0">
            <span className="text-slate-400 font-bold block text-[10px]">PROGRES MEMBACA</span>
            <span className="font-extrabold text-amber-700 font-mono text-sm">
              {completedModules.length} dari 5 Modul Tuntas
            </span>
          </div>
        </div>
      </div>

      {/* 5-Module Navigation Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {LEARNING_MODULES.map((mod) => {
          const active = mod.id === activeModuleId;
          const done = completedModules.includes(mod.id);
          return (
            <button
              key={mod.id}
              onClick={() => handleSelectModule(mod.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                active
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold ${active ? 'text-amber-200' : 'text-slate-400'}`}>
                  MODUL {mod.number}
                </span>
                {done && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${active ? 'text-white' : 'text-emerald-500'}`}
                  />
                )}
              </div>
              <span className="text-xs font-bold mt-1 line-clamp-1">{mod.title.split('&')[0]}</span>
              <span className={`text-[10px] mt-0.5 ${active ? 'text-amber-100' : 'text-slate-400'}`}>
                {mod.readTime}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Module Content Reader */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Module Header & Voice Action */}
        <div className="p-6 md:p-8 border-b border-slate-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-black rounded-lg font-mono">
                MODUL {activeModule.number}
              </span>
              <span className="text-xs text-slate-400">{activeModule.readTime}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReadFullModule}
                className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>Bacakan Materi (Audio)</span>
              </button>

              <button
                onClick={() => {
                  sound.playSuccess();
                  onToggleCompleteModule(activeModule.id);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border shadow-2xs ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span>{isCompleted ? 'Sudah Selesai' : 'Tandai Selesai'}</span>
              </button>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {activeModule.title}
          </h2>
          <p className="text-sm font-semibold text-amber-700 mt-1">{activeModule.subtitle}</p>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-100">
            {activeModule.overview}
          </p>
        </div>

        {/* Hero Illustration of the Module */}
        <div className="p-6 md:p-8 bg-slate-50/50 border-b border-slate-100">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs max-h-80 flex items-center justify-center bg-slate-900">
            <img
              src={activeModule.image}
              alt={activeModule.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover max-h-80"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
              <span className="text-xs font-mono text-amber-300 font-bold block">ILUSTRASI PENDUKUNG</span>
              <p className="text-xs text-slate-200">{activeModule.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="p-6 md:p-8 space-y-8">
          {activeModule.sections.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {sec.heading}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{sec.content}</p>

              {sec.keyPoints && (
                <ul className="space-y-2 mt-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700">
                  {sec.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.examples && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
                  {sec.examples.map((ex, eIdx) => (
                    <div
                      key={eIdx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-amber-300 transition-colors shadow-2xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{ex.name}</span>
                        {ex.type && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              ex.type === 'Magnetis'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ex.type}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{ex.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Fun Fact Card (Tahukah Kamu?) */}
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-200 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block">
                FAKTA MENARIK ILMUWAN CILIK!
              </span>
              <p className="text-xs text-amber-950 mt-1 leading-relaxed">{activeModule.funFact}</p>
            </div>
          </div>

          {/* Direct CTA to related digital simulation */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-sky-900">Ingin Menguji Teori Modul Ini?</h4>
              <p className="text-xs text-sky-700 mt-0.5">
                Buka Meja Praktikum Sains Digital untuk mencoba langsung simulasi interaktifnya!
              </p>
            </div>
            <button
              onClick={onNavigateToSimulation}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 shadow-2xs"
            >
              <span>Buka Simulasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Verified Reference Attribution */}
          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 italic">
            {activeModule.referenceText}
          </div>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="bg-slate-50 p-4 md:p-6 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handlePrevModule}
            disabled={activeModuleId === 1}
            className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Modul Sebelumnya</span>
          </button>

          <span className="text-xs font-mono font-bold text-slate-500">
            Modul {activeModuleId} dari {LEARNING_MODULES.length}
          </span>

          <button
            onClick={handleNextModule}
            disabled={activeModuleId === LEARNING_MODULES.length}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <span>Modul Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
