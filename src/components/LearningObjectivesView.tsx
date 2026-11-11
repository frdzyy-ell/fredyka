import React from 'react';
import {
  Target,
  Magnet,
  Layers,
  Compass,
  Repeat,
  Zap,
  BatteryCharging,
  Cpu,
  Flame,
  Sparkles,
  Award,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/learningData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Magnet: <Magnet className="w-5 h-5 text-amber-600" />,
  Layers: <Layers className="w-5 h-5 text-sky-600" />,
  Compass: <Compass className="w-5 h-5 text-emerald-600" />,
  Repeat: <Repeat className="w-5 h-5 text-purple-600" />,
  Zap: <Zap className="w-5 h-5 text-yellow-600" />,
  BatteryCharging: <BatteryCharging className="w-5 h-5 text-blue-600" />,
  Cpu: <Cpu className="w-5 h-5 text-indigo-600" />,
  Flame: <Flame className="w-5 h-5 text-rose-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-amber-600" />,
  Award: <Award className="w-5 h-5 text-emerald-600" />,
};

interface LearningObjectivesViewProps {
  onStartLearning: () => void;
}

export const LearningObjectivesView: React.FC<LearningObjectivesViewProps> = ({
  onStartLearning,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">CAPAIAN & TARGET KURIKULUM</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">10 Tujuan Pembelajaran IPAS Kelas V SD</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Rumusan tujuan pembelajaran disesuaikan dengan Capaian Pembelajaran IPAS Fase C (Kelas 5 SD) 
              berdasarkan referensi resmi Kemendikdasmen untuk topik Magnet, Listrik, dan Teknologi.
            </p>
          </div>

          <button
            onClick={onStartLearning}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-sm transition-colors shrink-0 flex items-center gap-2"
          >
            <span>Mulai Belajar Materi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of 10 Illustrated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_OBJECTIVES.map((obj, idx) => (
          <div
            key={obj.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-amber-300 transition-all flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
              {ICON_MAP[obj.iconName] || <Target className="w-5 h-5 text-amber-600" />}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  TUJUAN 0{idx + 1}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Fase C
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-800 mt-0.5">{obj.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{obj.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Note */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <BookOpen className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Catatan Akademik:</strong> Rumusan tujuan pembelajaran ini dirancang oleh pengembang aplikasi (Fredyka Elga Ariantama) dengan mengacu pada Capaian Pembelajaran Ilmu Pengetahuan Alam dan Sosial Fase C serta Buku Panduan Guru IPAS Kelas V Edisi Revisi 2024.
        </p>
      </div>
    </div>
  );
};
