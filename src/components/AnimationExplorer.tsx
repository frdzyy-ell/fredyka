import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, CheckCircle2, Film } from 'lucide-react';
import { sound } from '../utils/audioSynthesizer';
import { speechService } from '../utils/speech';

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  narration: string;
  durationSeconds: number;
  renderVisual: (progress: number, isPlaying: boolean) => React.ReactNode;
}

export const AnimationExplorer: React.FC = () => {
  const [activeSceneId, setActiveSceneId] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0); // 0 to 100
  const [isMuted, setIsMuted] = useState<boolean>(speechService.getMuted());

  const scenes: Scene[] = [
    {
      id: 1,
      title: 'Misteri Magnet Menarik Benda Logam',
      subtitle: 'Bagaimana medan gaya tak terlihat menarik paku besi dan klip kertas',
      durationSeconds: 10,
      narration:
        'Halo penjelajah cilik! Perhatikan magnet ini. Di sekeliling magnet terdapat medan magnet tak kasat mata. Saat paku besi dan klip kertas berada di dekatnya, gaya magnet menariknya kuat hingga menempel erat!',
      renderVisual: (prog) => {
        const itemShift = Math.min(100, prog * 1.3);
        return (
          <div className="relative w-full h-64 bg-gradient-to-b from-sky-950 to-indigo-950 rounded-xl overflow-hidden flex items-center justify-center p-6 text-white">
            {/* Animated magnetic flux arcs */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 220" fill="none">
              <path
                d="M 170 110 C 220 30, 300 30, 350 110"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <path
                d="M 170 110 C 220 190, 300 190, 350 110"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
            </svg>

            {/* Left Magnet */}
            <div className="absolute left-16 flex rounded-xl overflow-hidden border-2 border-white/20 shadow-xl">
              <div className="w-20 h-16 bg-red-600 flex flex-col items-center justify-center font-bold text-sm">
                <span>U</span>
                <span className="text-[9px] font-mono text-red-200">UTARA</span>
              </div>
              <div className="w-20 h-16 bg-blue-600 flex flex-col items-center justify-center font-bold text-sm">
                <span>S</span>
                <span className="text-[9px] font-mono text-blue-200">SELATAN</span>
              </div>
            </div>

            {/* Attracted items approaching magnet */}
            <div
              className="absolute flex items-center gap-4 transition-all duration-150"
              style={{
                left: `${380 - (itemShift * 1.8)}px`,
              }}
            >
              <div className="p-3 bg-white/10 backdrop-blur rounded-xl border border-white/30 text-2xl flex flex-col items-center">
                <span>📍</span>
                <span className="text-[10px] font-bold text-amber-300">Paku Besi</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur rounded-xl border border-white/30 text-2xl flex flex-col items-center">
                <span>📎</span>
                <span className="text-[10px] font-bold text-amber-300">Klip Baja</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: 2,
      title: 'Hukum Dua Kutub: Kapan Menarik, Kapan Menolak?',
      subtitle: 'Kutub utara dan selatan magnet bereaksi sesuai aturan alam',
      durationSeconds: 12,
      narration:
        'Setiap magnet memiliki dua kutub. Jika dua kutub senama seperti Utara dan Utara saling didekatkan, keduanya akan tolak-menolak dan saling mendorong. Namun bila Utara bertemu Selatan, mereka akan langsung tarik-menarik dengan kuat!',
      renderVisual: (prog) => {
        // First half: repulsive; Second half: attractive
        const phase2 = prog > 50;
        return (
          <div className="relative w-full h-64 bg-gradient-to-b from-indigo-950 to-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-white">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full mb-3 bg-white/10 border border-white/20">
              {phase2 ? 'Tahap 2: Kutub Berbeda (U & S) Saling TARIK-MENARIK' : 'Tahap 1: Kutub Sejenis (U & U) Saling TOLAK-MENOLAK'}
            </span>

            <div className="flex items-center justify-center gap-8 w-full">
              {/* Magnet 1 */}
              <div className="flex rounded-lg overflow-hidden border border-white/20 shadow-lg">
                <div className="w-16 h-14 bg-red-600 flex items-center justify-center font-bold">U</div>
                <div className="w-16 h-14 bg-blue-600 flex items-center justify-center font-bold">S</div>
              </div>

              {/* Force indicator icon */}
              <div className="text-lg font-bold">
                {phase2 ? (
                  <span className="text-emerald-400 animate-pulse">▶ Tarik ◀</span>
                ) : (
                  <span className="text-rose-400 animate-bounce">◀ Tolak ▶</span>
                )}
              </div>

              {/* Magnet 2 */}
              <div className="flex rounded-lg overflow-hidden border border-white/20 shadow-lg">
                {phase2 ? (
                  <>
                    <div className="w-16 h-14 bg-red-600 flex items-center justify-center font-bold">U</div>
                    <div className="w-16 h-14 bg-blue-600 flex items-center justify-center font-bold">S</div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-14 bg-blue-600 flex items-center justify-center font-bold">S</div>
                    <div className="w-16 h-14 bg-red-600 flex items-center justify-center font-bold">U</div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: 3,
      title: 'Aliran Elektron dalam Rangkaian Tertutup',
      subtitle: 'Bagaimana muatan listrik bergerak menyalakan filamen lampu',
      durationSeconds: 11,
      narration:
        'Saat sakelar ditutup rapat, lintasan kabel menjadi utuh tanpa jeda putus. Muatan listrik langsung mengalir lancar dari kutub baterai melewati kawat tembaga, memanaskan filamen lampu hingga memancarkan cahaya terang benderang!',
      renderVisual: (prog) => {
        return (
          <div className="relative w-full h-64 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center p-6 text-white">
            <svg className="w-full h-full max-w-md" viewBox="0 0 450 180" fill="none">
              {/* Circuit wire loop */}
              <rect
                x="60"
                y="30"
                width="330"
                height="120"
                rx="15"
                stroke="#facc15"
                strokeWidth="4"
                strokeDasharray="10 6"
                className="animate-electron-flow"
              />

              {/* Battery Graphic on Left */}
              <rect x="35" y="65" width="50" height="50" rx="4" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
              <text x="50" y="95" fill="#ffffff" fontSize="12" fontWeight="bold">BAT</text>

              {/* Switch on Top */}
              <circle cx="225" cy="30" r="5" fill="#10b981" />
              <line x1="220" y1="30" x2="235" y2="30" stroke="#10b981" strokeWidth="4" />

              {/* Glowing Bulb on Right */}
              <circle cx="390" cy="90" r="22" fill="#fef08a" stroke="#eab308" strokeWidth="2" />
              <circle cx="390" cy="90" r="35" fill="#fde047" opacity="0.25" className="animate-pulse" />
            </svg>
            <div className="absolute bottom-3 left-6 text-xs text-amber-300 font-mono">
              Elektron mengalir tanpa henti dalam rangkaian tertutup sempurna
            </div>
          </div>
        );
      },
    },
    {
      id: 4,
      title: 'Perubahan Bentuk Energi: Listrik Menjadi Cahaya & Gerak',
      subtitle: 'Transformasi energi pada lampu belajar dan kipas angin teknologi',
      durationSeconds: 12,
      narration:
        'Energi tidak dapat dimusnahkan, tetapi dapat diubah bentuknya. Pada lampu belajar, energi listrik diubah menjadi energi cahaya dan panas. Sedangkan pada kipas angin, motor elektromagnetik mengubah energi listrik menjadi energi gerak yang menyejukkan!',
      renderVisual: (prog) => {
        return (
          <div className="relative w-full h-64 bg-gradient-to-r from-amber-950 via-slate-900 to-sky-950 rounded-xl overflow-hidden flex items-center justify-around p-6 text-white">
            {/* Lamp Conversion Box */}
            <div className="flex flex-col items-center bg-white/10 backdrop-blur p-4 rounded-xl border border-amber-400/30">
              <span className="text-3xl animate-bounce">💡</span>
              <span className="text-xs font-bold text-amber-300 mt-1">Lampu Belajar</span>
              <span className="text-[10px] text-slate-300 mt-0.5">Listrik &rarr; Cahaya + Panas</span>
            </div>

            <div className="text-xl font-bold text-amber-400">&</div>

            {/* Fan Conversion Box */}
            <div className="flex flex-col items-center bg-white/10 backdrop-blur p-4 rounded-xl border border-sky-400/30">
              <span className="text-3xl animate-spin">🌀</span>
              <span className="text-xs font-bold text-sky-300 mt-1">Kipas Angin</span>
              <span className="text-[10px] text-slate-300 mt-0.5">Listrik &rarr; Energi Gerak</span>
            </div>
          </div>
        );
      },
    },
  ];

  const currentScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];

  // Timer loop for simulation playback
  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      const stepMs = 100;
      const totalSteps = (currentScene.durationSeconds * 1000) / stepMs;
      timer = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          return prev + (100 / totalSteps);
        });
      }, stepMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentScene]);

  const handlePlay = () => {
    sound.playClick();
    if (progress >= 100) {
      setProgress(0);
    }
    setIsPlaying(true);
    speechService.speak(currentScene.narration, () => {
      // Finished speaking
    });
  };

  const handlePause = () => {
    sound.playClick();
    setIsPlaying(false);
    speechService.pause();
  };

  const handleRestart = () => {
    sound.playClick();
    setProgress(0);
    setIsPlaying(true);
    speechService.speak(currentScene.narration);
  };

  const handleSelectScene = (id: number) => {
    sound.playClick();
    speechService.stop();
    setActiveSceneId(id);
    setProgress(0);
    setIsPlaying(false);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    speechService.setMuted(nextMute);
  };

  return (
    <div className="space-y-6">
      {/* Title Card */}
      <div className="bg-gradient-to-r from-sky-500/10 via-amber-500/10 to-indigo-500/10 rounded-2xl p-6 border border-sky-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-sky-700 tracking-wider">TEATER ANIMASI & AUDIO SAINS</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Video & Animasi Konsep IPAS Kelas 5</h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Tonton animasi bergerak interaktif berdurasi singkat yang dirancang khusus untuk memvisualisasikan fenomena magnet dan listrik secara nyata.
            </p>
          </div>

          <button
            onClick={handleToggleMute}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors shrink-0 ${
              isMuted ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-sky-600" />}
            <span>{isMuted ? 'Suara Dimatikan' : 'Suara Aktif'}</span>
          </button>
        </div>
      </div>

      {/* Main Animation Theater Player */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Active Scene Visual Stage */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-semibold text-slate-500">ADEGAN {currentScene.id} DARI 4</span>
              <h3 className="text-lg font-bold text-slate-800">{currentScene.title}</h3>
              <p className="text-xs text-slate-600">{currentScene.subtitle}</p>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              Durasi: {currentScene.durationSeconds} detik
            </span>
          </div>

          {currentScene.renderVisual(progress, isPlaying)}

          {/* Progress Timeline Scrubber */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500">
              {Math.round((progress / 100) * currentScene.durationSeconds)}s
            </span>
            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-100 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono text-slate-500">{currentScene.durationSeconds}s</span>
          </div>

          {/* Player Media Controls */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Putar Animasi & Narasi</span>
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Jeda Animasi</span>
                </button>
              )}

              <button
                onClick={handleRestart}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>
            </div>

            {/* Narration Quote */}
            <p className="text-xs text-slate-600 max-w-md italic leading-relaxed">
              &ldquo;{currentScene.narration}&rdquo;
            </p>
          </div>
        </div>

        {/* Scene Selection Playlist Grid */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectScene(s.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeSceneId === s.id
                  ? 'bg-white border-amber-500 shadow-sm ring-1 ring-amber-400'
                  : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400">EPISODE {s.id}</span>
                <Film className={`w-3.5 h-3.5 ${activeSceneId === s.id ? 'text-amber-500' : 'text-slate-400'}`} />
              </div>
              <span className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">{s.title}</span>
              <span className="text-[11px] text-slate-500 mt-0.5">{s.durationSeconds} detik visual</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
