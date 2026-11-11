import React, { useState } from 'react';
import { RotateCw, HelpCircle, RotateCcw, Volume2, ArrowLeftRight, Sparkles } from 'lucide-react';
import { sound } from '../../utils/audioSynthesizer';
import { speechService } from '../../utils/speech';

export const SimulationMagnetPoles: React.FC = () => {
  // Magnet A orientation: 'US' means North left, South right; 'SU' means South left, North right
  const [orientA, setOrientA] = useState<'US' | 'SU'>('US');
  // Magnet B orientation: 'US' means North left, South right; 'SU' means South left, North right
  const [orientB, setOrientB] = useState<'US' | 'SU'>('SU');
  // Distance between facing poles (5 to 150 px)
  const [distance, setDistance] = useState<number>(80);
  const [showGuide, setShowGuide] = useState<boolean>(false);

  // Facing pole of Magnet A is right pole: if 'US' -> 'S'; if 'SU' -> 'U'
  const poleA = orientA === 'US' ? 'S' : 'U';
  // Facing pole of Magnet B is left pole: if 'US' -> 'U'; if 'SU' -> 'S'
  const poleB = orientB === 'US' ? 'U' : 'S';

  const isOpposite = poleA !== poleB; // Different poles attract!
  const isClose = distance <= 45;

  const handleFlipA = () => {
    sound.playClick();
    setOrientA(prev => (prev === 'US' ? 'SU' : 'US'));
  };

  const handleFlipB = () => {
    sound.playClick();
    setOrientB(prev => (prev === 'US' ? 'SU' : 'US'));
  };

  const handleReset = () => {
    sound.playClick();
    setOrientA('US');
    setOrientB('SU');
    setDistance(80);
  };

  const explanationText = isOpposite
    ? `Kutub yang saling berhadapan adalah Kutub ${poleA === 'U' ? 'Utara (U)' : 'Selatan (S)'} bertemu Kutub ${poleB === 'U' ? 'Utara (U)' : 'Selatan (S)'}. Karena kutubnya TIDAK SEJENIS (berbeda), kedua magnet akan SALING TARIK-MENARIK dengan kuat!`
    : `Kutub yang saling berhadapan adalah Kutub ${poleA === 'U' ? 'Utara (U)' : 'Selatan (S)'} bertemu Kutub ${poleB === 'U' ? 'Utara (U)' : 'Selatan (S)'}. Karena kedua kutubnya SEJENIS (sama-sama ${poleA}), magnet akan SALING TOLAK-MENOLAK dan saling mendorong menjauh!`;

  const handleSpeak = () => {
    speechService.speak(explanationText);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="bg-amber-500/10 px-6 py-4 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-700 tracking-wider">LABORATORIUM 02</span>
          <h3 className="text-xl font-bold text-slate-800">Simulasi: Interaksi Kutub Magnet</h3>
          <p className="text-sm text-slate-600">Pelajari hukum alam kutub senama (tolak-menolak) dan kutub tidak senama (tarik-menarik).</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-amber-300 text-amber-800 hover:bg-amber-50 transition-colors shadow-2xs"
          >
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Petunjuk</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="bg-amber-50 p-4 border-b border-amber-200 text-xs text-amber-950 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-600" /> Petunjuk Pengamatan:
          </p>
          <p>1. Tekan tombol <strong>"Balik Magnet A"</strong> atau <strong>"Balik Magnet B"</strong> untuk mengubah orientasi kutub Utara (Merah) dan Selatan (Biru).</p>
          <p>2. Geser penggeser jarak mendekat. Amati garis gaya magnet dan arah panah interaksi gaya!</p>
        </div>
      )}

      {/* Main Sandbox Stage */}
      <div className="p-6 flex flex-col gap-6">
        <div className="relative min-h-[340px] bg-gradient-to-b from-slate-900 to-indigo-950 rounded-2xl p-6 flex flex-col justify-between overflow-hidden text-white shadow-inner">
          
          {/* Top Status Indicators inside stage */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Interaksi Terdeteksi:</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isOpposite
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {isOpposite ? '🧲 TARIK - MENARIK' : '⚡ TOLAK - MENOLAK'}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Jarak Kutub: <span className="text-white font-bold">{Math.round(distance / 10)} cm</span>
            </div>
          </div>

          {/* Interactive Arena with 2 Magnets */}
          <div className="relative h-44 w-full flex items-center justify-center">
            
            {/* Magnetic Field SVG Arcs in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 600 180" fill="none">
                {isOpposite ? (
                  // Flowing attractive field arcs
                  <g className="transition-all duration-300" opacity={isClose ? 0.9 : 0.4}>
                    <path d="M 240 90 C 270 40, 330 40, 360 90" stroke="#38bdf8" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" className="animate-pulse" />
                    <path d="M 240 90 C 270 140, 330 140, 360 90" stroke="#38bdf8" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" className="animate-pulse" />
                    <path d="M 230 90 C 260 10, 340 10, 370 90" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5 5" />
                    <path d="M 230 90 C 260 170, 340 170, 370 90" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="5 5" />
                  </g>
                ) : (
                  // Repulsive diverging field lines bending away
                  <g className="transition-all duration-300" opacity={isClose ? 0.9 : 0.4}>
                    <path d="M 250 90 C 275 85, 290 30, 290 10" stroke="#f43f5e" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" />
                    <path d="M 250 90 C 275 95, 290 150, 290 170" stroke="#f43f5e" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" />
                    <path d="M 350 90 C 325 85, 310 30, 310 10" stroke="#f43f5e" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" />
                    <path d="M 350 90 C 325 95, 310 150, 310 170" stroke="#f43f5e" strokeWidth={isClose ? '2.5' : '1.5'} strokeDasharray="4 4" />
                  </g>
                )}
              </svg>
            </div>

            {/* Magnet A (Left) */}
            <div
              className="flex items-center transition-all duration-300"
              style={{
                transform: `translateX(-${(distance / 2) + (isOpposite && isClose ? -8 : !isOpposite && isClose ? 14 : 0)}px)`,
              }}
            >
              <div className="flex shadow-2xl rounded-xl overflow-hidden border-2 border-white/20">
                {orientA === 'US' ? (
                  <>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">U</span>
                      <span className="text-[10px] tracking-widest text-red-100 font-semibold">UTARA</span>
                    </div>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">S</span>
                      <span className="text-[10px] tracking-widest text-blue-100 font-semibold">SELATAN</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">S</span>
                      <span className="text-[10px] tracking-widest text-blue-100 font-semibold">SELATAN</span>
                    </div>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">U</span>
                      <span className="text-[10px] tracking-widest text-red-100 font-semibold">UTARA</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Central Force Arrows Display */}
            <div className="w-16 flex flex-col items-center justify-center z-10 pointer-events-none">
              {isOpposite ? (
                <div className="flex items-center text-emerald-400 font-bold text-xs animate-pulse">
                  <span>▶</span>
                  <span className="text-[10px] px-1 font-mono">TARIK</span>
                  <span>◀</span>
                </div>
              ) : (
                <div className="flex items-center text-rose-400 font-bold text-xs animate-bounce">
                  <span>◀</span>
                  <span className="text-[10px] px-1 font-mono">TOLAK</span>
                  <span>▶</span>
                </div>
              )}
            </div>

            {/* Magnet B (Right) */}
            <div
              className="flex items-center transition-all duration-300"
              style={{
                transform: `translateX(${(distance / 2) + (isOpposite && isClose ? -8 : !isOpposite && isClose ? 14 : 0)}px)`,
              }}
            >
              <div className="flex shadow-2xl rounded-xl overflow-hidden border-2 border-white/20">
                {orientB === 'US' ? (
                  <>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">U</span>
                      <span className="text-[10px] tracking-widest text-red-100 font-semibold">UTARA</span>
                    </div>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">S</span>
                      <span className="text-[10px] tracking-widest text-blue-100 font-semibold">SELATAN</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">S</span>
                      <span className="text-[10px] tracking-widest text-blue-100 font-semibold">SELATAN</span>
                    </div>
                    <div className="w-20 md:w-28 h-18 bg-gradient-to-b from-red-500 to-red-600 flex flex-col items-center justify-center font-black">
                      <span className="text-xl">U</span>
                      <span className="text-[10px] tracking-widest text-red-100 font-semibold">UTARA</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Flip Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/10 backdrop-blur rounded-xl p-3 border border-white/15 z-10">
            <button
              onClick={handleFlipA}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik Kutub Magnet A</span>
            </button>

            <div className="flex-1 max-w-xs flex items-center gap-2 px-2">
              <span className="text-[11px] text-slate-300 font-medium whitespace-nowrap">Jarak:</span>
              <input
                type="range"
                min="15"
                max="130"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
              />
            </div>

            <button
              onClick={handleFlipB}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Balik Kutub Magnet B</span>
            </button>
          </div>
        </div>

        {/* Live Scientific Explanation Deck */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Penjelasan Ilmiah Interaksi Kutub:</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {explanationText}
              </p>
            </div>
          </div>

          <button
            onClick={handleSpeak}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-2xs transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Dengarkan Penjelasan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
