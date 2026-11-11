import React, { useState } from 'react';
import { Flame, Sun, Volume2, Sparkles, BatteryCharging, ArrowRight, RotateCcw } from 'lucide-react';
import { sound } from '../../utils/audioSynthesizer';
import { speechService } from '../../utils/speech';

export const SimulationEnergyConversion: React.FC = () => {
  const [isOn, setIsOn] = useState<boolean>(false);
  const [dimmerLevel, setDimmerLevel] = useState<number>(100); // 20% to 100%

  const handleToggle = () => {
    sound.playClick();
    const nextState = !isOn;
    setIsOn(nextState);
    if (nextState) {
      sound.playSpark();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setIsOn(false);
    setDimmerLevel(100);
  };

  const currentLux = isOn ? Math.round(dimmerLevel * 6.5) : 0;
  const currentTemp = isOn ? Math.round(27 + (dimmerLevel * 0.28)) : 27;

  const narration = isOn
    ? `Lampu menyala! Terjadi transformasi bentuk energi: Energi kimia di dalam baterai berubah menjadi energi listrik yang mengalir lewat kabel, kemudian diubah oleh filamen lampu menjadi energi cahaya sebesar ${currentLux} Lux dan energi panas hingga ${currentTemp} derajat Celcius.`
    : 'Lampu dalam kondisi padam (OFF). Tidak ada aliran arus listrik, sehingga tidak ada konversi energi kimia menjadi cahaya atau panas.';

  const handleSpeak = () => {
    speechService.speak(narration);
  };

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="bg-amber-500/10 px-6 py-4 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-700 tracking-wider">LABORATORIUM 04</span>
          <h3 className="text-xl font-bold text-slate-800">Simulasi: Lampu Menyala & Perubahan Energi</h3>
          <p className="text-sm text-slate-600">Amati bagaimana energi kimia diubah menjadi energi listrik, cahaya, dan panas.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <RotateCcw className="w-4 h-4 text-slate-600" />
            <span>Reset Uji</span>
          </button>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Room & Lamp Demonstration */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div
            className={`relative min-h-[360px] rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-colors duration-500 ${
              isOn ? 'bg-amber-950/90' : 'bg-slate-900'
            }`}
          >
            {/* Ambient Lighting Overlay */}
            {isOn && (
              <div
                className="absolute inset-0 bg-gradient-radial from-amber-300/40 via-amber-500/20 to-transparent pointer-events-none transition-opacity duration-300"
                style={{ opacity: dimmerLevel / 100 }}
              ></div>
            )}

            {/* Top State Bar */}
            <div className="flex items-center justify-between z-10 text-white">
              <span className="text-xs font-mono">Status Daya:</span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  isOn ? 'bg-amber-400 text-slate-950 shadow-md' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isOn ? '💡 KONDISI ON (MENYALA)' : '⚫ KONDISI OFF (MATI)'}
              </span>
            </div>

            {/* Central Realistic Lamp Illustration */}
            <div className="relative h-48 w-full flex items-center justify-center z-10">
              <div className="relative flex flex-col items-center">
                {/* Glow Halo */}
                {isOn && (
                  <div
                    className="absolute -inset-10 rounded-full bg-yellow-300/30 blur-2xl animate-pulse-slow pointer-events-none"
                    style={{ transform: `scale(${0.8 + (dimmerLevel / 200)})` }}
                  ></div>
                )}

                {/* Glass Bulb Dome */}
                <div
                  className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isOn
                      ? 'bg-gradient-to-t from-amber-100 to-yellow-300 border-yellow-200 shadow-2xl shadow-amber-400'
                      : 'bg-slate-800/80 border-slate-700'
                  }`}
                >
                  {/* Glowing Filament inside bulb */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-6 h-5 border-t-2 border-l-2 border-r-2 rounded-t-full transition-colors duration-300 ${
                        isOn ? 'border-amber-950/80 drop-shadow' : 'border-slate-600'
                      }`}
                    ></div>
                    {isOn && <Sparkles className="w-5 h-5 text-amber-700 animate-spin" />}
                  </div>
                </div>

                {/* Metal Screw Base */}
                <div className="w-12 h-6 bg-slate-400 rounded-b-md border-t-2 border-slate-500 flex flex-col justify-evenly px-1">
                  <div className="h-0.5 bg-slate-600 rounded"></div>
                  <div className="h-0.5 bg-slate-600 rounded"></div>
                  <div className="h-0.5 bg-slate-600 rounded"></div>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="bg-black/40 backdrop-blur rounded-xl p-3 border border-white/10 flex flex-wrap items-center justify-between gap-3 z-10 text-white">
              <button
                onClick={handleToggle}
                className={`px-5 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm ${
                  isOn ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                }`}
              >
                {isOn ? 'TEKAN UNTUK MATIKAN (OFF)' : 'TEKAN UNTUK NYALAKAN (ON)'}
              </button>

              {isOn && (
                <div className="flex items-center gap-2 flex-1 max-w-xs">
                  <span className="text-[11px] text-slate-300">Tingkat Cahaya:</span>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={dimmerLevel}
                    onChange={(e) => setDimmerLevel(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
                  />
                  <span className="text-xs font-mono">{dimmerLevel}%</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Energy Transformation Diagram & Meters */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Dual Meters: Lux and Temperature */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500 text-white shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Kekuatan Cahaya</span>
                <p className="text-base font-extrabold text-amber-900 font-mono">
                  {currentLux} <span className="text-xs font-medium">Lux</span>
                </p>
                <span className="text-[10px] text-slate-500">{isOn ? 'Menerangi Ruangan' : 'Gelap'}</span>
              </div>
            </div>

            <div className="bg-rose-50/80 rounded-xl p-3.5 border border-rose-200 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-rose-500 text-white shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Suhu Filamen</span>
                <p className="text-base font-extrabold text-rose-900 font-mono">
                  {currentTemp} <span className="text-xs font-medium">°C</span>
                </p>
                <span className="text-[10px] text-slate-500">{isOn ? 'Terasa Hangat' : 'Suhu Ruangan'}</span>
              </div>
            </div>
          </div>

          {/* Step-by-Step Energy Transformation Visual Chain */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-3">
              RANTAI PERUBAHAN BENTUK ENERGI:
            </span>

            <div className="flex flex-col gap-2">
              <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${isOn ? 'bg-blue-50 border-blue-200 text-blue-900' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <BatteryCharging className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">1. Energi Kimia</span>
                </div>
                <span className="text-[11px] text-slate-500">Tersimpan dalam zat baterai</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowRight className="w-3.5 h-3.5 rotate-90" />
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${isOn ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <span className="text-base">⚡</span>
                  <span className="font-semibold">2. Energi Listrik</span>
                </div>
                <span className="text-[11px] text-slate-500">Mengalir melalui kabel tembaga</span>
              </div>

              <div className="flex justify-center text-slate-400">
                <ArrowRight className="w-3.5 h-3.5 rotate-90" />
              </div>

              <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs transition-colors ${isOn ? 'bg-yellow-50 border-yellow-300 text-yellow-950 font-semibold' : 'bg-white border-slate-200 text-slate-600'}`}>
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>3. Energi Cahaya + Panas</span>
                </div>
                <span className="text-[11px] text-slate-500">Memancarkan terang & kehangatan</span>
              </div>
            </div>
          </div>

          {/* Voice Narration Box */}
          <div className="bg-sky-50 rounded-xl p-3.5 border border-sky-200 flex items-center justify-between gap-3">
            <p className="text-xs text-sky-950 leading-relaxed">
              Dengarkan penjelasan suara mengenai hukum kekekalan dan perubahan energi pada lampu.
            </p>
            <button
              onClick={handleSpeak}
              className="px-3 py-1.5 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors shrink-0 flex items-center gap-1 shadow-2xs"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
