import React, { useState } from 'react';
import { RotateCcw, HelpCircle, CheckCircle2, XCircle, Sparkles, Magnet } from 'lucide-react';
import { sound } from '../../utils/audioSynthesizer';
import { speechService } from '../../utils/speech';

interface TestObject {
  id: string;
  name: string;
  category: 'magnetis' | 'nonmagnetis';
  material: string;
  icon: string;
  color: string;
  tested: boolean;
  attracted: boolean;
}

const INITIAL_OBJECTS: TestObject[] = [
  { id: 'nail', name: 'Paku Besi', category: 'magnetis', material: 'Besi murni', icon: '📍', color: 'bg-slate-200 border-slate-400', tested: false, attracted: false },
  { id: 'clip', name: 'Klip Kertas', category: 'magnetis', material: 'Kawat baja', icon: '📎', color: 'bg-zinc-200 border-zinc-400', tested: false, attracted: false },
  { id: 'pin', name: 'Peniti', category: 'magnetis', material: 'Baja tahan karat', icon: '🧷', color: 'bg-slate-300 border-slate-500', tested: false, attracted: false },
  { id: 'wood', name: 'Balok Kayu', category: 'nonmagnetis', material: 'Serat kayu', icon: '🪵', color: 'bg-amber-100 border-amber-300', tested: false, attracted: false },
  { id: 'plastic', name: 'Penggaris Plastik', category: 'nonmagnetis', material: 'Polimer plastik', icon: '📏', color: 'bg-cyan-100 border-cyan-300', tested: false, attracted: false },
  { id: 'paper', name: 'Kertas Buku', category: 'nonmagnetis', material: 'Serat selulosa', icon: '📄', color: 'bg-yellow-50 border-yellow-200', tested: false, attracted: false },
];

export const SimulationMagnetAttraction: React.FC = () => {
  const [objects, setObjects] = useState<TestObject[]>(INITIAL_OBJECTS);
  const [selectedId, setSelectedId] = useState<string>('nail');
  const [magnetType, setMagnetType] = useState<'bar' | 'horseshoe'>('bar');
  const [sliderDistance, setSliderDistance] = useState<number>(180); // Distance in pixels (50 to 250)
  const [isAttractedState, setIsAttractedState] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [experimentNote, setExperimentNote] = useState<string>('Pilih benda di bawah meja, lalu geser penggeser jarak untuk mendekatkannya ke kutub magnet!');

  const currentObj = objects.find(o => o.id === selectedId) || objects[0];

  const handleTestDistanceChange = (distance: number) => {
    setSliderDistance(distance);
    // If distance is <= 100px and object is magnetic, it gets attracted!
    if (distance <= 95 && currentObj.category === 'magnetis') {
      if (!isAttractedState) {
        sound.playSnap();
        setIsAttractedState(true);
        setExperimentNote(`KLIK! ${currentObj.name} terbuat dari ${currentObj.material} (benda magnetis) dan langsung tertarik menempel kuat pada kutub magnet!`);
        updateObjectTested(currentObj.id, true);
      }
    } else if (distance <= 95 && currentObj.category === 'nonmagnetis') {
      setIsAttractedState(false);
      setExperimentNote(`${currentObj.name} terbuat dari ${currentObj.material} (benda nonmagnetis). Meskipun sangat dekat, magnet sama sekali tidak dapat menariknya.`);
      updateObjectTested(currentObj.id, false);
    } else {
      setIsAttractedState(false);
    }
  };

  const handleSelectObject = (id: string) => {
    sound.playClick();
    setSelectedId(id);
    setSliderDistance(180);
    setIsAttractedState(false);
    const obj = objects.find(o => o.id === id);
    if (obj) {
      setExperimentNote(`Kamu memilih ${obj.name}. Dekatkan benda ini ke magnet untuk menguji apakah ia benda magnetis atau nonmagnetis.`);
    }
  };

  const updateObjectTested = (id: string, attracted: boolean) => {
    setObjects(prev =>
      prev.map(item =>
        item.id === id ? { ...item, tested: true, attracted } : item
      )
    );
  };

  const handleQuickAttract = () => {
    sound.playClick();
    handleTestDistanceChange(50);
  };

  const handleReset = () => {
    sound.playClick();
    setObjects(INITIAL_OBJECTS);
    setSelectedId('nail');
    setSliderDistance(180);
    setIsAttractedState(false);
    setExperimentNote('Meja laboratorium telah dibersihkan. Silakan mulai percobaan baru!');
  };

  const handleReadNote = () => {
    speechService.speak(experimentNote);
  };

  const testedCount = objects.filter(o => o.tested).length;

  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-sm overflow-hidden">
      {/* Top Banner Controls */}
      <div className="bg-amber-500/10 px-6 py-4 border-b border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-amber-700 tracking-wider">LABORATORIUM 01</span>
          <h3 className="text-xl font-bold text-slate-800">Simulasi: Magnet Menarik Benda</h3>
          <p className="text-sm text-slate-600">Uji sifat kemagnetan benda di sekitar dengan mendekatkannya ke magnet.</p>
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
            <span>Ulangi Meja</span>
          </button>
        </div>
      </div>

      {/* Guide popover if open */}
      {showGuide && (
        <div className="bg-amber-50 p-4 border-b border-amber-200 text-sm text-amber-950 flex flex-col gap-2">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600" /> Cara Melakukan Percobaan:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-xs text-amber-900 leading-relaxed">
            <li>Pilih salah satu benda dari baki benda di bagian bawah (misal: Paku Besi atau Penggaris Plastik).</li>
            <li>Geser penggeser jarak atau tekan tombol <strong>"Dekatkan ke Magnet"</strong>.</li>
            <li>Perhatikan apakah benda melompat dan menempel ke kutub magnet atau tetap diam.</li>
            <li>Catat hasilnya pada tabel uji laboratorium di sebelah kanan!</li>
          </ol>
        </div>
      )}

      {/* Main Sandbox Area */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Virtual Table */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative min-h-[360px] bg-gradient-to-b from-sky-50/60 to-emerald-50/40 rounded-xl border border-sky-100 p-6 flex flex-col justify-between overflow-hidden shadow-inner">
            
            {/* Magnet Type Switcher */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur p-1 rounded-lg border border-slate-200 shadow-2xs">
                <button
                  onClick={() => { sound.playClick(); setMagnetType('bar'); }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${magnetType === 'bar' ? 'bg-amber-500 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Magnet Batang (U-S)
                </button>
                <button
                  onClick={() => { sound.playClick(); setMagnetType('horseshoe'); }}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${magnetType === 'horseshoe' ? 'bg-amber-500 text-white font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Magnet Ladam / U
                </button>
              </div>

              <div className="text-xs font-medium text-slate-500 bg-white/80 px-2.5 py-1 rounded-md border border-slate-200">
                Jarak: <span className="font-bold text-slate-800">{Math.round((sliderDistance / 200) * 15)} cm</span>
              </div>
            </div>

            {/* Interactive Physics Stage */}
            <div className="relative h-48 w-full flex items-center justify-center my-4">
              
              {/* Magnetic field lines subtle visualization */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <svg className="w-full h-full" viewBox="0 0 600 200" fill="none">
                  <path d="M 220 100 C 220 30, 360 30, 360 100" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 220 100 C 220 170, 360 170, 360 100" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 180 100 C 180 10, 400 10, 400 100" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M 180 100 C 180 190, 400 190, 400 100" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
              </div>

              {/* The Magnet Unit */}
              <div className="absolute left-8 md:left-14 flex items-center z-10">
                {magnetType === 'bar' ? (
                  <div className="flex shadow-md rounded-lg overflow-hidden border border-slate-400">
                    <div className="w-20 h-16 bg-gradient-to-r from-red-600 to-red-500 flex flex-col items-center justify-center text-white font-black text-sm">
                      <span>U</span>
                      <span className="text-[10px] font-normal tracking-wider opacity-90">UTARA</span>
                    </div>
                    <div className="w-20 h-16 bg-gradient-to-r from-blue-600 to-blue-500 flex flex-col items-center justify-center text-white font-black text-sm">
                      <span>S</span>
                      <span className="text-[10px] font-normal tracking-wider opacity-90">SELATAN</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-28 h-24 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-t-full border-12 border-red-500 border-b-0"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 bg-red-600 rounded-b flex items-center justify-center text-white font-bold text-xs">U</div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-b flex items-center justify-center text-white font-bold text-xs">S</div>
                  </div>
                )}
              </div>

              {/* Connecting force field arrow if near */}
              {sliderDistance <= 120 && (
                <div 
                  className={`absolute transition-all duration-200 pointer-events-none text-xs font-bold ${currentObj.category === 'magnetis' ? 'text-sky-600' : 'text-slate-400'}`}
                  style={{ left: `${180 + (sliderDistance / 2)}px` }}
                >
                  {currentObj.category === 'magnetis' ? '🧲 Tarik >>>' : '--- (Tidak ada gaya)'}
                </div>
              )}

              {/* The Test Object */}
              <div
                className={`absolute z-20 transition-all duration-300 ease-out flex flex-col items-center ${isAttractedState ? 'scale-105' : ''}`}
                style={{
                  left: isAttractedState
                    ? '195px' // Snapped right next to magnet's pole
                    : `${150 + sliderDistance}px`,
                }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 flex flex-col items-center justify-center shadow-md bg-white ${currentObj.color}`}>
                  <span className="text-2xl">{currentObj.icon}</span>
                  <span className="text-[10px] font-bold text-slate-800 text-center leading-tight mt-0.5 px-1 truncate max-w-full">
                    {currentObj.name}
                  </span>
                </div>

                {isAttractedState && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-1.5 py-0.5 rounded-full mt-1 animate-bounce">
                    TERTARIK!
                  </span>
                )}
              </div>
            </div>

            {/* Slider Distance Control */}
            <div className="bg-white/90 backdrop-blur rounded-xl p-3 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 z-10">
              <div className="flex-1 w-full flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Jarak ke Magnet:</span>
                <input
                  type="range"
                  min="50"
                  max="250"
                  value={sliderDistance}
                  onChange={(e) => handleTestDistanceChange(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <span className="text-xs font-mono text-slate-600 w-12 text-right">
                  {sliderDistance <= 95 ? 'Dekat' : sliderDistance >= 200 ? 'Jauh' : 'Sedang'}
                </span>
              </div>

              <button
                onClick={handleQuickAttract}
                className="px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
              >
                <Magnet className="w-3.5 h-3.5" />
                Dekatkan ke Magnet
              </button>
            </div>
          </div>

          {/* Interactive Object Shelf (Picker) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">PILIH BENDA UJI ({testedCount}/{objects.length} Sudah Diuji):</span>
              <span className="text-xs text-slate-500">Klik salah satu benda untuk menaruhnya di meja</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {objects.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => handleSelectObject(obj.id)}
                  className={`relative p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all text-left ${
                    selectedId === obj.id
                      ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/40'
                      : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{obj.icon}</span>
                  <span className="text-xs font-semibold text-slate-800 text-center leading-tight">{obj.name}</span>
                  <span className="text-[10px] text-slate-500 text-center">{obj.material}</span>
                  {obj.tested && (
                    <div className="absolute top-1 right-1">
                      {obj.attracted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 fill-rose-100" />
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Results Table & Live Observation Deck */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Real-time observation callout */}
          <div className="bg-sky-50/80 rounded-xl p-4 border border-sky-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-sky-800">CATATAN PENELITIAN CILIK</span>
              <button
                onClick={handleReadNote}
                className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline"
              >
                Dengarkan Suara
              </button>
            </div>
            <p className="text-xs text-sky-950 leading-relaxed min-h-[50px]">
              {experimentNote}
            </p>
          </div>

          {/* Experiment Log Table */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-800">TABEL PENGAMATAN</h4>
              <span className="text-[11px] text-slate-500 font-medium">Nilai Sains</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 max-h-56">
              {objects.map((obj) => (
                <div
                  key={obj.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span>{obj.icon}</span>
                    <span className="font-semibold text-slate-800">{obj.name}</span>
                  </div>
                  <div>
                    {!obj.tested ? (
                      <span className="text-slate-400 italic text-[11px]">Belum diuji</span>
                    ) : obj.attracted ? (
                      <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                        Magnetis
                      </span>
                    ) : (
                      <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded text-[11px] border border-rose-200">
                        Nonmagnetis
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-600 bg-white p-2.5 rounded-lg">
              <span className="font-bold text-slate-800">Kesimpulan Ilmiah:</span> Magnet hanya menarik benda berbahan logam besi dan baja. Benda dari kayu, plastik, dan kertas tidak terpengaruh gaya magnet.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
