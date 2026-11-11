import React from 'react';
import { UserCheck, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const AuthorProfileView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div>
          <span className="text-xs font-bold text-amber-700 tracking-wider">IDENTITAS PENGEMBANG</span>
          <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Profil Pembuat Aplikasi</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Informasi pengembang media pembelajaran interaktif berbasis simulasi digital IPAS Sekolah Dasar Kelas V.
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Top Identifier Badge */}
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md font-display">
              FE
            </div>
            <div>
              <span className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider block">
                PENGEMBANG MEDIA DIGITAL
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Fredyka Elga Ariantama
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Pengembang Media Pembelajaran Digital IPAS SD
              </p>
            </div>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                NAMA LENGKAP
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">Fredyka Elga Ariantama</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                PERAN PENGEMBANG
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">Pengembang Media Pembelajaran Digital</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                NAMA PROYEK
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">
                Aplikasi Simulasi Digital Pembelajaran IPAS Kelas V SD
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                MATERI UTAMA
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">
                Magnet, Listrik, dan Teknologi untuk Kehidupan
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                JENJANG & KELAS
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">Sekolah Dasar (SD) / Kelas V (Lima)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                MATA PELAJARAN
              </span>
              <p className="text-sm font-bold text-slate-800 mt-1">
                IPAS (Ilmu Pengetahuan Alam dan Sosial)
              </p>
            </div>
          </div>

          {/* Development Purpose Note */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed">
            <span className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" /> Visi Pengembangan Aplikasi:
            </span>
            Aplikasi ini dikembangkan untuk memudahkan peserta didik kelas 5 SD dan guru dalam mengeksplorasi konsep sains abstrak tentang magnet dan arus listrik melalui laboratorium simulasi digital interaktif, animasi bersuara, kuis evaluasi 20 butir soal, dan penghargaan sertifikat digital kelulusan.
          </div>
        </div>
      </div>
    </div>
  );
};
