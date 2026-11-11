import React from 'react';
import { HelpCircle, X, Sparkles, Compass, Award, BookOpen, Volume2, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative my-8 border border-slate-200">
        <button
          onClick={() => { sound.playClick(); onClose(); }}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Petunjuk Penggunaan Aplikasi</h3>
            <p className="text-xs text-slate-500">Panduan lengkap bagi siswa dan bapak/ibu guru di sekolah.</p>
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700 leading-relaxed max-h-[70vh] overflow-y-auto pr-1">
          <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-600" /> 1. Mempelajari Modul Teori
            </h4>
            <p>
              Buka menu <strong>Materi Pembelajaran</strong>. Baca modul 01 sampai 05 secara bertahap. Kamu bisa menekan tombol <strong>"Bacakan Materi"</strong> untuk mendengarkan suara penjelasan otomatis. Jangan lupa menekan tombol <strong>"Tandai Selesai"</strong> setelah selesai membaca!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1">
            <h4 className="font-bold text-sky-900 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" /> 2. Melakukan Simulasi Digital
            </h4>
            <p>
              Pada menu <strong>Simulasi Digital</strong>, terdapat 4 meja laboratorium interaktif:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
              <li><strong>Lab 1 (Magnet Menarik Benda):</strong> Pilih benda logam atau kayu, lalu geser ke dekat magnet.</li>
              <li><strong>Lab 2 (Interaksi Kutub):</strong> Balik kutub magnet dan amati peristiwa tolak-menolak atau tarik-menarik.</li>
              <li><strong>Lab 3 (Rangkaian Listrik):</strong> Hubungkan kabel dan sakelar untuk menyalakan lampu.</li>
              <li><strong>Lab 4 (Perubahan Energi):</strong> Nyalakan tombol ON/OFF untuk mengamati perubahan energi cahaya dan panas.</li>
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" /> 3. Mengerjakan Kuis & Klaim Sertifikat
            </h4>
            <p>
              Kerjakan 20 butir soal pilihan ganda. Sistem akan langsung menghitung nilai akhir secara otomatis (maksimal 100). Setelah selesai, kamu berhak membuka, mencetak, atau mengunduh <strong>Sertifikat Digital</strong> beridentitas resmimu!
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-slate-600" /> 4. Pengaturan Suara & Audio
            </h4>
            <p>
              Tombol speaker di pojok kanan atas dapat ditekan kapan saja untuk membisukan (mute) atau mengaktifkan kembali suara narasi dan efek suara praktikum.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Saya Mengerti, Mulai Belajar!
          </button>
        </div>
      </div>
    </div>
  );
};
