import React from 'react';
import {
  BookOpen,
  Compass,
  Award,
  Sparkles,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Zap,
  Magnet,
  Film,
} from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';
import { speechService } from '../utils/speech';
import { NavTab } from './Navbar';

interface HomeHeroViewProps {
  studentName: string;
  onUpdateName: (name: string) => void;
  onNavigate: (tab: NavTab) => void;
  completedModulesCount: number;
  quizScore: number | null;
}

export const HomeHeroView: React.FC<HomeHeroViewProps> = ({
  studentName,
  onUpdateName,
  onNavigate,
  completedModulesCount,
  quizScore,
}) => {
  const welcomeSpeech =
    'Halo, teman-teman! Selamat datang di Petualangan Sains. Hari ini kita akan menjelajahi dunia magnet, listrik, dan teknologi. Siap menjadi ilmuwan cilik? Ayo mulai petualangan seru ini bersama-sama!';

  const handlePlayWelcomeVoice = () => {
    sound.playClick();
    speechService.speak(welcomeSpeech);
  };

  return (
    <div className="space-y-10">
      {/* Hero Split Card */}
      <div className="bg-white rounded-3xl border border-amber-200/90 p-6 md:p-10 shadow-sm overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs font-bold tracking-wide uppercase">
                IPAS KELAS V (LIMA) SEKOLAH DASAR
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Karya: <strong>Fredyka Elga Ariantama</strong>
              </span>
            </div>

            <div>
              <p className="text-amber-600 font-bold text-sm tracking-wide uppercase">
                Selamat Datang di Dunia Petualangan Sains
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display mt-1 leading-tight">
                Misteri Magnet, Listrik, dan Teknologi
              </h1>
            </div>

            {/* Cartoon Scientist Mascot Dialogue Bubble */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-300 shrink-0 bg-white shadow-2xs">
                <img
                  src="/src/assets/images/cartoon_scientist_guide_1794388668376.jpg"
                  alt="Karakter Pemandu"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-900">
                    Karakter Pemandu (Ilmuwan Cilik):
                  </span>
                  <button
                    onClick={handlePlayWelcomeVoice}
                    className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Dengarkan Sambutan</span>
                  </button>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed italic">
                  &ldquo;Halo, teman-teman! Selamat datang di Petualangan Sains. Hari ini kita akan menjelajahi dunia magnet, listrik, dan teknologi. Siap menjadi ilmuwan cilik?&rdquo;
                </p>
              </div>
            </div>

            {/* Student Name Personalization Input */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <label className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Nama Kamu (Siswa):
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => onUpdateName(e.target.value)}
                placeholder="Masukkan nama lengkapmu..."
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
            </div>

            {/* Three Main Action Buttons (as requested) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('materi');
                }}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>MULAI BELAJAR</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('simulasi');
                }}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>LIHAT SIMULASI</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate('kuis');
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Award className="w-4 h-4" />
                <span>MULAI KUIS</span>
              </button>
            </div>
          </div>

          {/* Right Hero Visual Banner */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-200 shadow-md bg-slate-900 group">
              <img
                src="/src/assets/images/hero_lab_scientist_1794388668101.jpg"
                alt="Laboratorium Petualangan Sains"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-mono font-bold text-amber-300">LABORATORIUM VIRTUAL KELAS 5</span>
                <p className="text-xs text-slate-200 mt-0.5">
                  Eksplorasi seru magnet, baterai, kabel, sakelar, dan lampu bersama teman-teman!
                </p>
              </div>
            </div>

            {/* Quick Status Pill Bar */}
            <div className="w-full grid grid-cols-2 gap-3 mt-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <span className="text-[10px] text-amber-700 font-bold block">MODUL TUNTAS</span>
                <span className="text-base font-extrabold text-amber-900 font-mono">
                  {completedModulesCount} / 5
                </span>
              </div>
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-center">
                <span className="text-[10px] text-sky-700 font-bold block">SKOR KUIS</span>
                <span className="text-base font-extrabold text-sky-900 font-mono">
                  {quizScore !== null ? `${quizScore} / 100` : 'Belum Mulai'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div
          onClick={() => { sound.playClick(); onNavigate('materi'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">5 Modul Pembelajaran</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Penjelasan lengkap dari pengertian magnet, hukum dua kutub, hingga rangkaian tertutup.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 mt-4 flex items-center gap-1">
            <span>Pelajari Teori</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => { sound.playClick(); onNavigate('simulasi'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">4 Meja Praktikum Digital</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Tarik benda, balik kutub magnet, sambung kabel sirkuit, dan amati perubahan energi bohlam.
            </p>
          </div>
          <span className="text-xs font-bold text-sky-600 mt-4 flex items-center gap-1">
            <span>Coba Praktikum</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 3 */}
        <div
          onClick={() => { sound.playClick(); onNavigate('animasi'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3">
              <Film className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Teater Animasi & Audio</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Visualisasi gerak elektron dan medan gaya magnet yang dipandu oleh narasi suara ramah anak.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 mt-4 flex items-center gap-1">
            <span>Tonton Animasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Card 4 */}
        <div
          onClick={() => { sound.playClick(); onNavigate('kuis'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Kuis 20 Soal & Sertifikat</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Evaluasi interaktif berstandar kurikulum nasional dengan pencetakan sertifikat resmi.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-600 mt-4 flex items-center gap-1">
            <span>Mulai Uji Nilai</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
