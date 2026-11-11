import React from 'react';
import { CheckCircle2, Award, ArrowRight, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { SUMMARY_POINTS } from '../data/learningData';
import { sound } from '../utils/audioSynthesizer';
import { speechService } from '../utils/speech';

interface SummaryViewProps {
  onStartQuiz: () => void;
  onFinishLearning: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  onStartQuiz,
  onFinishLearning,
}) => {
  const handleReadSummary = () => {
    sound.playClick();
    const fullSummary = `Kesimpulan Pembelajaran IPAS Kelas 5. ${SUMMARY_POINTS.join(' ')}`;
    speechService.speak(fullSummary);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">RANGKUMAN INTI SAINS</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Kesimpulan Pembelajaran IPAS Kelas 5 SD</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Selamat! Kamu telah menjelajahi misteri gaya magnet, aliran listrik, dan teknologi yang memudahkan kehidupan manusia. 
              Berikut rangkuman konsep penting yang telah kamu kuasai.
            </p>
          </div>

          <button
            onClick={handleReadSummary}
            className="px-4 py-2 bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-xs font-bold rounded-xl shadow-2xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Dengarkan Rangkuman</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid: Points + Illustration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: 8 Points Cards */}
        <div className="lg:col-span-8 space-y-3">
          {SUMMARY_POINTS.map((pt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:border-amber-300 transition-colors flex items-start gap-3.5"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs md:text-sm text-slate-800 font-medium leading-relaxed">
                {pt.replace(/^\d+\.\s*/, '')}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Illustration & Completion Card */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-200 shadow-md mb-4 bg-amber-50">
              <img
                src="/src/assets/images/cartoon_scientist_guide_1794388668376.jpg"
                alt="Ilmuwan Cilik"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-base font-bold text-slate-900">Kamu Siap Menguji Ilmumu!</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Setelah membaca kesimpulan ini, saatnya membuktikan kemampuanmu di kuis interaktif untuk meraih sertifikat digital.
            </p>

            <div className="w-full space-y-2.5 mt-6">
              <button
                onClick={onStartQuiz}
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>MULAI KUIS 20 SOAL</span>
              </button>

              <button
                onClick={onFinishLearning}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Selesai Belajar & Kembali ke Beranda</span>
              </button>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-900">
            <span className="font-bold block mb-1">Pesan Moral & Karakter Sains:</span>
            Jadilah ilmuwan yang selalu ingin tahu, jujur dalam pengamatan, dan bijak dalam menggunakan energi untuk kebaikan sesama serta kelestarian bumi tercinta.
          </div>
        </div>
      </div>
    </div>
  );
};
