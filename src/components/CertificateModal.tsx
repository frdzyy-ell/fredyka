import React, { useRef, useState } from 'react';
import { Award, Printer, Download, X, CheckCircle, Sparkles } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  onUpdateName: (name: string) => void;
  score: number;
  rank: string;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  studentName,
  onUpdateName,
  score,
  rank,
}) => {
  const [localName, setLocalName] = useState<string>(studentName || 'Bintang Sains');
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleDownload = () => {
    sound.playClick();
    // Render a high resolution canvas snapshot
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw ornate certificate background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 850);

    // Border Frame
    ctx.strokeStyle = '#d97706'; // Amber 600
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 790);

    ctx.strokeStyle = '#0284c7'; // Sky 600
    ctx.lineWidth = 4;
    ctx.strokeRect(45, 45, 1110, 760);

    // Decorative corner badges
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(25, 25, 40, 40);
    ctx.fillRect(1135, 25, 40, 40);
    ctx.fillRect(25, 785, 40, 40);
    ctx.fillRect(1135, 785, 40, 40);

    // Header Title
    ctx.textAlign = 'center';
    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('LEMBAGA PENGEMBANG MEDIA PEMBELAJARAN IPAS SD', 600, 120);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 44px "Bricolage Grotesque", sans-serif';
    ctx.fillText('SERTIFIKAT PETUALANGAN SAINS', 600, 180);

    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Sertifikat kelulusan uji kompetensi sains digital ini diberikan dengan bangga kepada:', 600, 240);

    // Student Name
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 48px "Bricolage Grotesque", sans-serif';
    ctx.fillText(localName.toUpperCase(), 600, 320);

    // Underline
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 345);
    ctx.lineTo(850, 345);
    ctx.stroke();

    // Body Text
    ctx.fillStyle = '#334155';
    ctx.font = '22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Telah sukses menyelesaikan seluruh materi dan evaluasi 20 butir soal interaktif:', 600, 410);

    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Materi: Magnet, Listrik, dan Teknologi untuk Kehidupan', 600, 460);

    ctx.fillStyle = '#475569';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Jenjang: Sekolah Dasar (SD)  |  Kelas: V (Lima)  |  Predikat: ${rank}`, 600, 510);

    // Score Badge Box
    ctx.fillStyle = '#fef3c7';
    ctx.fillRect(480, 550, 240, 70);
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 2;
    ctx.strokeRect(480, 550, 240, 70);

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`NILAI: ${score} / 100`, 600, 598);

    // Signatures and Dates
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Diterbitkan pada: ${today}`, 120, 710);
    ctx.fillText('Status: Terverifikasi Digital', 120, 740);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#0f172a';
    ctx.font = 'italic bold 26px "Playfair Display", Georgia, serif';
    ctx.fillText('Fredyka Elga Ariantama', 1080, 705);

    ctx.fillStyle = '#475569';
    ctx.font = '16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Fredyka Elga Ariantama', 1080, 735);
    ctx.fillText('Pengembang Media Pembelajaran IPAS', 1080, 760);

    // Convert to download
    const link = document.createElement('a');
    link.download = `Sertifikat-IPAS-Kelas5-${localName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleSaveName = (newName: string) => {
    setLocalName(newName);
    onUpdateName(newName);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl relative my-8 border border-slate-200">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Name Editor */}
        <div className="mb-4 pr-10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">Sertifikat Digital Petualangan Sains</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Pastikan namamu tertulis dengan benar sebelum mencetak atau mengunduh sertifikat.
          </p>

          <div className="mt-3 flex items-center gap-3">
            <label className="text-xs font-bold text-slate-700 whitespace-nowrap">Nama Siswa di Sertifikat:</label>
            <input
              type="text"
              value={localName}
              onChange={(e) => handleSaveName(e.target.value)}
              placeholder="Ketikkan nama lengkap siswa..."
              className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 w-72"
            />
          </div>
        </div>

        {/* Printable Certificate Area */}
        <div id="certificate-print-area">
          <div
            ref={certificateRef}
            className="relative bg-white border-8 border-amber-500/80 p-8 md:p-12 rounded-xl text-center shadow-md overflow-hidden"
          >
            {/* Inner Decorative Double Border */}
            <div className="absolute inset-2 border-2 border-sky-500/60 pointer-events-none rounded-lg"></div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-amber-600"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-amber-600"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-amber-600"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-amber-600"></div>

            {/* Top Subtitle */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-amber-800 tracking-widest uppercase">
                MEDIA PEMBELAJARAN DIGITAL IPAS SD
              </span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>

            {/* Certificate Title */}
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-1">
              SERTIFIKAT PETUALANGAN SAINS
            </h1>
            <p className="text-xs italic text-slate-500 mb-6">
              Diberikan sebagai penghargaan atas ketuntasan pembelajaran dan eksplorasi sains digital kepada:
            </p>

            {/* Student Name */}
            <div className="my-4">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-wide font-display border-b-2 border-amber-400 inline-block px-8 pb-1">
                {localName || 'Bintang Sains'}
              </h2>
            </div>

            {/* Class and Subject */}
            <div className="space-y-1 text-xs md:text-sm text-slate-700 max-w-xl mx-auto my-4">
              <p>
                Telah menyelesaikan seluruh materi dan evaluasi sains interaktif dengan sangat baik pada mata pelajaran:
              </p>
              <p className="font-bold text-sky-800 text-sm md:text-base">
                Materi: Magnet, Listrik, dan Teknologi untuk Kehidupan
              </p>
              <p className="font-semibold text-slate-600">
                Jenjang: Sekolah Dasar (SD) &nbsp;|&nbsp; Kelas: V (Lima)
              </p>
            </div>

            {/* Score & Rank Ribbon */}
            <div className="inline-flex items-center gap-4 bg-amber-50 border border-amber-300 px-6 py-2 rounded-xl my-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 block">NILAI AKHIR</span>
                <span className="text-xl font-black text-amber-800 font-mono">{score} / 100</span>
              </div>
              <div className="h-8 w-px bg-amber-300"></div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 block">PREDIKAT</span>
                <span className="text-sm font-bold text-emerald-700">{rank}</span>
              </div>
            </div>

            {/* Bottom Signature and Date Grid */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-left text-xs gap-4">
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">Tanggal Kelulusan:</span>
                <span className="font-bold text-slate-800">{today}</span>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Sertifikat Resmi Terverifikasi</span>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-slate-400 font-mono block text-[11px]">Pengembang Media Pembelajaran:</span>
                <div className="my-1 font-serif italic text-base font-bold text-slate-800">
                  Fredyka Elga Ariantama
                </div>
                <span className="font-bold text-slate-800 text-xs block">Fredyka Elga Ariantama</span>
                <span className="text-[11px] text-slate-500">Pusat Simulasi Sains SD</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={handleDownload}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Sertifikat (PNG)</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak Sertifikat (PDF / Print)</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
