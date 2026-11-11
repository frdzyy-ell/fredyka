import React, { useState } from 'react';
import {
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Compass,
  Film,
  Award,
  CheckCircle2,
  User,
  Library,
  Home,
  Target,
} from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';
import { speechService } from '../utils/speech';

export type NavTab =
  | 'beranda'
  | 'tujuan'
  | 'materi'
  | 'simulasi'
  | 'animasi'
  | 'kuis'
  | 'kesimpulan'
  | 'profil'
  | 'pustaka';

interface NavbarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  progressPercent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(speechService.getMuted());

  const navItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'beranda', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'tujuan', label: 'Tujuan', icon: <Target className="w-4 h-4" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'simulasi', label: 'Simulasi', icon: <Compass className="w-4 h-4" /> },
    { id: 'animasi', label: 'Animasi', icon: <Film className="w-4 h-4" /> },
    { id: 'kuis', label: 'Kuis 20 Soal', icon: <Award className="w-4 h-4" /> },
    { id: 'kesimpulan', label: 'Kesimpulan', icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-4 h-4" /> },
    { id: 'pustaka', label: 'Daftar Pustaka', icon: <Library className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: NavTab) => {
    sound.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    speechService.setMuted(nextMute);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-amber-200/80 shadow-2xs">
      {/* Top 3-Zone Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 md:gap-8">
        
        {/* ZONE 1: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('beranda')}
          className="flex items-center gap-2.5 text-left group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 tracking-tight text-sm md:text-base font-display whitespace-nowrap block">
              PETUALANGAN SAINS
            </span>
            <span className="text-[10px] text-amber-700 font-bold tracking-wider block">
              IPAS KELAS V SD
            </span>
          </div>
        </button>

        {/* ZONE 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-600 overflow-x-auto py-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-amber-500 text-white font-bold shadow-2xs'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* ZONE 3: Audio Control & Quick Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
            className={`p-2 rounded-xl border text-xs font-bold transition-colors flex items-center gap-1.5 ${
              isMuted
                ? 'bg-rose-50 border-rose-200 text-rose-600'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>

          <button
            onClick={() => handleNavClick('kuis')}
            className="hidden sm:flex px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-2xs transition-colors whitespace-nowrap shrink-0 items-center gap-1.5"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Mulai Kuis</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Progress Bar strip below header */}
      <div className="w-full bg-slate-100 h-1">
        <div
          className="bg-amber-500 h-1 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
