import React from 'react';
import { BookOpen, ExternalLink, Globe, Terminal, Server, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ACADEMIC_REFERENCES } from '../data/learningData';

export const BibliographyView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div>
          <span className="text-xs font-bold text-amber-700 tracking-wider">INTEGRITAS AKADEMIK & RUJUKAN RESMI</span>
          <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Daftar Pustaka & Panduan Publikasi</h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Seluruh materi, simulasi, dan soal evaluasi merujuk pada buku teks dan kurikulum resmi yang diterbitkan oleh Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi serta Kemendikdasmen Republik Indonesia.
          </p>
        </div>
      </div>

      {/* Verified Academic Bibliography Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <h3 className="text-lg font-bold text-slate-800">Daftar Sumber Rujukan Terverifikasi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACADEMIC_REFERENCES.map((ref) => (
            <div
              key={ref.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-amber-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    SUMBER {ref.id} &bull; {ref.year}
                  </span>
                  <span className="text-[11px] text-slate-500">{ref.type}</span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">{ref.title}</h4>

                <div className="text-xs text-slate-600 space-y-1 pt-1">
                  <p>
                    <strong>Penulis:</strong> {ref.authors}
                  </p>
                  <p>
                    <strong>Penerbit:</strong> {ref.publisher}
                  </p>
                  {ref.isbn && (
                    <p>
                      <strong>ISBN:</strong> <span className="font-mono">{ref.isbn}</span>
                    </p>
                  )}
                </div>

                <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                  {ref.note}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 hover:text-sky-800 transition-colors"
                >
                  <span>Buka Katalog Resmi Kemendikdasmen</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment & Execution Guide for Teachers / Students */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-5 h-5 text-sky-600" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Panduan Menjalankan & Mempublikasikan Aplikasi (Hosting Gratis)
            </h3>
            <p className="text-xs text-slate-500">
              Langkah praktis untuk menjalankan aplikasi di komputer lokal maupun membagikan tautan kepada siswa secara gratis.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guide 1: Run Locally */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-600" />
              1. Cara Menjalankan di Komputer / Laptop Lokal
            </h4>
            <div className="bg-slate-900 text-slate-100 rounded-xl p-4 font-mono text-xs space-y-2">
              <p className="text-slate-400"># 1. Buka terminal pada folder proyek</p>
              <p className="text-emerald-400">npm install</p>
              <p className="text-slate-400"># 2. Jalankan server pengembangan lokal</p>
              <p className="text-emerald-400">npm run dev</p>
              <p className="text-slate-400"># 3. Buka browser pada alamat:</p>
              <p className="text-amber-300">http://localhost:3000</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aplikasi dapat langsung digunakan secara penuh tanpa koneksi internet (offline-ready) setelah instalasi paket awal.
            </p>
          </div>

          {/* Guide 2: Free Hosting & Publishing */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              2. Cara Publikasi Gratis (GitHub Pages, Vercel, Netlify)
            </h4>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Opsi A: Vercel (Paling Cepat & Gratis)</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Buat akun gratis di <em>vercel.com</em>.</li>
                  <li>Hubungkan dengan repositori GitHub proyek ini.</li>
                  <li>Klik <strong>Deploy</strong> (Vercel otomatis mendeteksi Vite).</li>
                  <li>Dapatkan tautan live website (contoh: <code>petualangan-sains.vercel.app</code>).</li>
                </ol>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <strong className="text-slate-900 block mb-1">Opsi B: Netlify (Drag & Drop / GitHub)</strong>
                <ol className="list-decimal list-inside space-y-1 text-slate-600">
                  <li>Jalankan <code>npm run build</code> di komputer untuk menghasilkan folder <code>dist</code>.</li>
                  <li>Tarik (drag and drop) folder <code>dist</code> ke dashboard <em>app.netlify.com/drop</em>.</li>
                  <li>Aplikasi langsung online dalam 10 detik!</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="leading-relaxed">
            <strong>Bebas Biaya & Tanpa Registrasi:</strong> Seluruh fitur (simulasi fisika, animasi, audio narasi, kuis, dan pencetakan sertifikat) berjalan 100% di sisi peramban (client-side) tanpa memerlukan database server berbayar atau akun login siswa.
          </p>
        </div>
      </div>
    </div>
  );
};
