import React, { useState } from 'react';
import { Magnet, Compass, Cpu, Flame, CheckCircle, Info } from 'lucide-react';
import { SimulationMagnetAttraction } from './SimulationMagnetAttraction';
import { SimulationMagnetPoles } from './SimulationMagnetPoles';
import { SimulationElectricCircuit } from './SimulationElectricCircuit';
import { SimulationEnergyConversion } from './SimulationEnergyConversion';

export const SimulationHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'attraction' | 'poles' | 'circuit' | 'energy'>('attraction');

  return (
    <div className="space-y-6">
      {/* Header and Introduction */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-emerald-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">LABORATORIUM SAINS DIGITAL INTERAKTIF</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Eksplorasi Simulasi Digital IPAS Kelas 5 SD</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Selamat datang di meja praktikum virtual! Di sini kamu bisa bereksperimen langsung seperti ilmuwan sejati. 
              Coba keempat simulasi untuk melihat langsung cara kerja gaya magnet dan aliran listrik.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-xl border border-amber-200 text-xs text-amber-900 shrink-0">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Pilih salah satu tab simulasi di bawah untuk mulai bereksperimen</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for 4 Simulations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setActiveTab('attraction')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
            activeTab === 'attraction'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/30'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <Magnet className={`w-5 h-5 ${activeTab === 'attraction' ? 'text-white' : 'text-amber-500'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${activeTab === 'attraction' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              LAB 1
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Magnet Menarik Benda</h4>
            <p className={`text-[11px] mt-0.5 ${activeTab === 'attraction' ? 'text-amber-100' : 'text-slate-500'}`}>
              Uji benda magnetis & nonmagnetis
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('poles')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
            activeTab === 'poles'
              ? 'bg-sky-600 text-white border-sky-700 shadow-md ring-2 ring-sky-400/30'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <Compass className={`w-5 h-5 ${activeTab === 'poles' ? 'text-white' : 'text-sky-600'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${activeTab === 'poles' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
              LAB 2
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Interaksi Kutub Magnet</h4>
            <p className={`text-[11px] mt-0.5 ${activeTab === 'poles' ? 'text-sky-100' : 'text-slate-500'}`}>
              Tarik-menarik & tolak-menolak
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('circuit')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
            activeTab === 'circuit'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/30'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <Cpu className={`w-5 h-5 ${activeTab === 'circuit' ? 'text-white' : 'text-emerald-600'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${activeTab === 'circuit' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
              LAB 3
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Rangkaian Listrik Sederhana</h4>
            <p className={`text-[11px] mt-0.5 ${activeTab === 'circuit' ? 'text-emerald-100' : 'text-slate-500'}`}>
              Baterai, sakelar, kabel, & lampu
            </p>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('energy')}
          className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
            activeTab === 'energy'
              ? 'bg-orange-500 text-white border-orange-600 shadow-md ring-2 ring-orange-400/30'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <Flame className={`w-5 h-5 ${activeTab === 'energy' ? 'text-white' : 'text-orange-500'}`} />
            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${activeTab === 'energy' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              LAB 4
            </span>
          </div>
          <div>
            <h4 className="text-xs font-bold leading-tight">Perubahan Bentuk Energi</h4>
            <p className={`text-[11px] mt-0.5 ${activeTab === 'energy' ? 'text-orange-100' : 'text-slate-500'}`}>
              Energi kimia &rarr; listrik &rarr; cahaya
            </p>
          </div>
        </button>
      </div>

      {/* Render Active Simulation Component */}
      <div className="transition-all duration-300">
        {activeTab === 'attraction' && <SimulationMagnetAttraction />}
        {activeTab === 'poles' && <SimulationMagnetPoles />}
        {activeTab === 'circuit' && <SimulationElectricCircuit />}
        {activeTab === 'energy' && <SimulationEnergyConversion />}
      </div>
    </div>
  );
};
