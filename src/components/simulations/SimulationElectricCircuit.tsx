import React, { useState } from 'react';
import { Power, RotateCcw, HelpCircle, Lightbulb, Zap, Volume2, Sparkles, Check, AlertCircle } from 'lucide-react';
import { sound } from '../../utils/audioSynthesizer';
import { speechService } from '../../utils/speech';

export const SimulationElectricCircuit: React.FC = () => {
  const [isSwitchClosed, setIsSwitchClosed] = useState<boolean>(false);
  const [wireBatteryToSwitch, setWireBatteryToSwitch] = useState<boolean>(true);
  const [wireSwitchToBulb, setWireSwitchToBulb] = useState<boolean>(true);
  const [wireBulbToBattery, setWireBulbToBattery] = useState<boolean>(true);
  const [batteryVoltage, setBatteryVoltage] = useState<number>(1.5); // 1.5V (1 baterai) or 3.0V (2 baterai)
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [activeExplanation, setActiveExplanation] = useState<'on' | 'off' | null>(null);

  // Circuit is closed (complete) ONLY when all 3 wire segments are connected AND switch is closed
  const isCircuitClosed = isSwitchClosed && wireBatteryToSwitch && wireSwitchToBulb && wireBulbToBattery;

  const handleToggleSwitch = () => {
    sound.playClick();
    const nextState = !isSwitchClosed;
    setIsSwitchClosed(nextState);
    if (nextState && wireBatteryToSwitch && wireSwitchToBulb && wireBulbToBattery) {
      sound.playSpark();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setIsSwitchClosed(false);
    setWireBatteryToSwitch(true);
    setWireSwitchToBulb(true);
    setWireBulbToBattery(true);
    setBatteryVoltage(1.5);
    setActiveExplanation(null);
  };

  const handleReadExplanation = (type: 'on' | 'off') => {
    sound.playClick();
    setActiveExplanation(type);
    if (type === 'on') {
      speechService.speak(
        'Mengapa lampu menyala? Karena rangkaian berada dalam kondisi tertutup sempurna. Arus listrik dapat mengalir tanpa hambatan dari kutub positif baterai, melewati sakelar yang terhubung, melalui filamen kawat lampu, dan kembali ke kutub negatif baterai. Energi listrik diubah menjadi energi cahaya dan panas pada filamen lampu.'
      );
    } else {
      speechService.speak(
        'Mengapa lampu tidak menyala? Karena rangkaian berada dalam kondisi terbuka atau terputus. Lintasan arus listrik terputus karena sakelar dalam keadaan mati (terbuka) atau ada kabel yang belum terpasang. Tanpa lintasan tertutup yang lengkap, muatan listrik tidak dapat mengalir sehingga lampu tetap mati.'
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="bg-amber-500/10 px-6 py-4 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-700 tracking-wider">LABORATORIUM 03</span>
          <h3 className="text-xl font-bold text-slate-800">Simulasi: Rangkaian Listrik Sederhana</h3>
          <p className="text-sm text-slate-600">Pasang kabel, buka-tutup sakelar, dan amati aliran arus listrik yang menyalakan lampu.</p>
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
            <span>Reset Rangkaian</span>
          </button>
        </div>
      </div>

      {showGuide && (
        <div className="bg-amber-50 p-4 border-b border-amber-200 text-xs text-amber-950 space-y-1">
          <p className="font-bold flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-600" /> Cara Melakukan Uji Sirkuit:
          </p>
          <p>1. Tekan <strong>Sakelar Pisau</strong> (atau tombol Sakelar ON/OFF) untuk menghubungkan atau memutus aliran.</p>
          <p>2. Coba klik kabel untuk memutus dan menyambungkan kembali kabel penghantar.</p>
          <p>3. Kamu juga bisa menambah daya menjadi <strong>2 Baterai (3.0V)</strong> untuk melihat lampu menyala lebih terang!</p>
        </div>
      )}

      {/* Main Sandbox Stage */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Circuit Schematic Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative min-h-[380px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-inner text-white">
            
            {/* Top Bar inside stage */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Status Rangkaian:</span>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                    isCircuitClosed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
                  }`}
                >
                  {isCircuitClosed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      RANGKAIAN TERTUTUP (ARUS MENGALIR)
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      RANGKAIAN TERBUKA (ARUS TERPUTUS)
                    </>
                  )}
                </span>
              </div>

              {/* Voltage Selector */}
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => { sound.playClick(); setBatteryVoltage(1.5); }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${batteryVoltage === 1.5 ? 'bg-amber-400 text-slate-900 font-bold' : 'text-slate-300 hover:text-white'}`}
                >
                  1 Baterai (1.5V)
                </button>
                <button
                  onClick={() => { sound.playClick(); setBatteryVoltage(3.0); }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${batteryVoltage === 3.0 ? 'bg-amber-400 text-slate-900 font-bold' : 'text-slate-300 hover:text-white'}`}
                >
                  2 Baterai (3.0V)
                </button>
              </div>
            </div>

            {/* Circuit Diagram SVG with Interactive Components */}
            <div className="relative w-full h-64 flex items-center justify-center my-2">
              <svg className="w-full h-full max-w-lg" viewBox="0 0 500 240" fill="none">
                {/* Wire 1: Battery (+) to Switch */}
                <path
                  d="M 120 70 L 220 70"
                  stroke={wireBatteryToSwitch ? (isCircuitClosed ? '#facc15' : '#ef4444') : '#475569'}
                  strokeWidth="5"
                  strokeDasharray={isCircuitClosed ? '8 6' : 'none'}
                  className={isCircuitClosed ? 'animate-electron-flow' : ''}
                />

                {/* Wire 2: Switch to Bulb */}
                <path
                  d="M 280 70 L 380 70 L 380 120"
                  stroke={wireSwitchToBulb ? (isCircuitClosed ? '#facc15' : '#ef4444') : '#475569'}
                  strokeWidth="5"
                  strokeDasharray={isCircuitClosed ? '8 6' : 'none'}
                  className={isCircuitClosed ? 'animate-electron-flow' : ''}
                />

                {/* Wire 3: Bulb to Battery (-) Bottom Path */}
                <path
                  d="M 380 160 L 380 190 L 120 190 L 120 130"
                  stroke={wireBulbToBattery ? (isCircuitClosed ? '#facc15' : '#3b82f6') : '#475569'}
                  strokeWidth="5"
                  strokeDasharray={isCircuitClosed ? '8 6' : 'none'}
                  className={isCircuitClosed ? 'animate-electron-flow' : ''}
                />

                {/* Flow Direction Indicator Arrows when closed */}
                {isCircuitClosed && (
                  <g fill="#facc15">
                    <polygon points="170,66 180,70 170,74" />
                    <polygon points="330,66 340,70 330,74" />
                    <polygon points="250,186 240,190 250,194" />
                  </g>
                )}
              </svg>

              {/* BATTERY COMPONENT (Top-Left) */}
              <div className="absolute left-6 top-10 flex flex-col items-center">
                <div className="relative w-20 h-28 bg-gradient-to-b from-blue-600 via-blue-700 to-amber-500 rounded-lg border-2 border-white/30 shadow-lg flex flex-col items-center justify-between p-2">
                  <div className="w-5 h-2.5 bg-amber-300 rounded-t-sm -mt-3.5 border border-amber-600 shadow-xs"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-black text-amber-200">+</span>
                    <span className="text-[10px] font-bold tracking-wider text-white">BATERAI</span>
                    <span className="text-[9px] font-mono text-blue-200">{batteryVoltage} Volt</span>
                  </div>
                  <span className="text-xs font-black text-white/80">-</span>
                </div>
                <span className="text-[11px] font-semibold text-slate-300 mt-1">Sumber Listrik</span>
              </div>

              {/* SWITCH COMPONENT (Top-Center) */}
              <div className="absolute left-[44%] -translate-x-1/2 top-10 flex flex-col items-center">
                <button
                  onClick={handleToggleSwitch}
                  className={`w-24 h-16 rounded-xl border-2 p-2 flex flex-col items-center justify-center transition-all ${
                    isSwitchClosed
                      ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200 shadow-emerald-500/20 shadow-lg'
                      : 'bg-rose-600/20 border-rose-400 text-rose-200'
                  }`}
                >
                  <div className="relative w-14 h-4 flex items-center justify-between">
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    {/* Knife Blade graphic */}
                    <div
                      className={`h-1.5 bg-amber-300 rounded-full transition-transform origin-left duration-200 ${
                        isSwitchClosed ? 'w-10 rotate-0' : 'w-10 -rotate-30 -translate-y-2'
                      }`}
                    ></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  </div>
                  <span className="text-[10px] font-bold mt-1.5">
                    {isSwitchClosed ? 'SAKELAR TERTUTUP (ON)' : 'SAKELAR TERBUKA (OFF)'}
                  </span>
                </button>
                <span className="text-[11px] font-semibold text-slate-300 mt-1">Klik Sakelar</span>
              </div>

              {/* LIGHT BULB COMPONENT (Right) */}
              <div className="absolute right-8 top-16 flex flex-col items-center">
                <div className="relative flex flex-col items-center">
                  {/* Glowing Aura if circuit is closed */}
                  {isCircuitClosed && (
                    <div
                      className={`absolute -inset-6 rounded-full bg-amber-300/30 blur-xl animate-pulse pointer-events-none ${
                        batteryVoltage > 1.5 ? 'scale-125 bg-amber-400/40' : ''
                      }`}
                    ></div>
                  )}

                  <div
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCircuitClosed
                        ? batteryVoltage > 1.5
                          ? 'bg-gradient-to-b from-yellow-200 to-amber-400 border-amber-300 shadow-2xl shadow-amber-400 text-amber-900'
                          : 'bg-gradient-to-b from-yellow-100 to-amber-300 border-amber-200 shadow-xl shadow-amber-300 text-amber-900'
                        : 'bg-slate-800/80 border-slate-600 text-slate-500'
                    }`}
                  >
                    <Lightbulb className={`w-10 h-10 ${isCircuitClosed ? 'animate-bounce' : ''}`} />
                  </div>

                  {/* Bulb metal screw base */}
                  <div className="w-8 h-4 bg-slate-400 rounded-b-sm border-t border-slate-500 flex flex-col justify-evenly px-0.5">
                    <div className="h-0.5 bg-slate-600 rounded"></div>
                    <div className="h-0.5 bg-slate-600 rounded"></div>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-slate-300 mt-1">
                  {isCircuitClosed ? (
                    <span className="text-amber-300 font-bold">Lampu Menyala! ✨</span>
                  ) : (
                    <span>Lampu Padam</span>
                  )}
                </span>
              </div>
            </div>

            {/* Wire connection toggle strip */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white/10 backdrop-blur rounded-xl p-2.5 border border-white/10 z-10 text-xs">
              <span className="text-slate-300 font-medium">Sambungan Kabel:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { sound.playClick(); setWireBatteryToSwitch(!wireBatteryToSwitch); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${wireBatteryToSwitch ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-700 border-slate-600 text-slate-400'}`}
                >
                  Kabel 1 (Baterai-Sakelar): {wireBatteryToSwitch ? 'Tersambung' : 'Putus'}
                </button>
                <button
                  onClick={() => { sound.playClick(); setWireSwitchToBulb(!wireSwitchToBulb); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${wireSwitchToBulb ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-700 border-slate-600 text-slate-400'}`}
                >
                  Kabel 2 (Sakelar-Lampu): {wireSwitchToBulb ? 'Tersambung' : 'Putus'}
                </button>
                <button
                  onClick={() => { sound.playClick(); setWireBulbToBattery(!wireBulbToBattery); }}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium border ${wireBulbToBattery ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-700 border-slate-600 text-slate-400'}`}
                >
                  Kabel 3 (Lampu-Baterai): {wireBulbToBattery ? 'Tersambung' : 'Putus'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Toggle Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleToggleSwitch}
              className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 ${
                isSwitchClosed
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              <Power className="w-5 h-5" />
              <span>{isSwitchClosed ? 'BUKA SAKELAR (MATIKAN ALIRAN)' : 'TUTUP SAKELAR (NYALAKAN LAMPU)'}</span>
            </button>
          </div>
        </div>

        {/* Right: Explanation & Science Concept Deck */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">PERTANYAAN KONSEP IPAS:</span>
            <p className="text-xs text-amber-950 mt-1">
              Pilih salah satu tombol di bawah untuk mendengarkan ulasan konsep sains dari guru virtual:
            </p>

            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={() => handleReadExplanation('on')}
                className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeExplanation === 'on'
                    ? 'bg-white border-emerald-500 text-emerald-800 shadow-sm'
                    : 'bg-white/80 border-amber-200 text-slate-700 hover:bg-white'
                }`}
              >
                <span>💡 Mengapa lampu menyala?</span>
                <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
              </button>

              <button
                onClick={() => handleReadExplanation('off')}
                className={`p-3 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  activeExplanation === 'off'
                    ? 'bg-white border-rose-500 text-rose-800 shadow-sm'
                    : 'bg-white/80 border-amber-200 text-slate-700 hover:bg-white'
                }`}
              >
                <span>⚫ Mengapa lampu tidak menyala?</span>
                <Volume2 className="w-4 h-4 text-rose-600 shrink-0" />
              </button>
            </div>
          </div>

          {/* Detailed Concept Box */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex-1 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">RINGKASAN PEMBELAJARAN RANGKAIAN:</h4>
              <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Arus Listrik:</strong> Mengalir hanya pada rangkaian tertutup utuh dari kutub positif (+) ke kutub negatif (-).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Fungsi Sakelar:</strong> Memutus atau menyambung arus tanpa perlu membongkar kabel secara manual.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Tegangan Listrik:</strong> Bila tegangan bertambah (misal 2 baterai), arus yang lewat lebih kuat sehingga cahaya lampu semakin benderang.</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 p-2.5 bg-sky-50 border border-sky-200 rounded-lg text-xs text-sky-900">
              <strong>Tips Keamanan:</strong> Di rumah, jangan pernah menyentuh sakelar atau stopkontak PLN dengan tangan basah karena air adalah konduktor listrik yang berbahaya!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
