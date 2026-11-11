import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  BookOpen,
  FileText,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/learningData';
import { sound } from '../utils/audioSynthesizer';

interface QuizInteractiveProps {
  studentName: string;
  onOpenCertificate: (score: number, rank: string) => void;
  onUpdateQuizScore: (score: number) => void;
}

export const QuizInteractive: React.FC<QuizInteractiveProps> = ({
  studentName,
  onOpenCertificate,
  onUpdateQuizScore,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [filterReview, setFilterReview] = useState<'all' | 'wrong' | 'correct'>('all');

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: key,
    }));
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    return { correctCount, finalScore };
  };

  const getRankCategory = (score: number): { title: string; color: string; desc: string } => {
    if (score >= 90) {
      return {
        title: 'Hebat Sekali!',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-300',
        desc: 'Luar biasa! Kamu menguasai seluruh konsep magnet, listrik, dan teknologi layaknya ilmuwan cilik sejati!',
      };
    }
    if (score >= 80) {
      return {
        title: 'Sangat Baik!',
        color: 'text-sky-700 bg-sky-50 border-sky-300',
        desc: 'Pemahaman materi kamu sangat bagus dan matang. Pertahankan prestasimu!',
      };
    }
    if (score >= 70) {
      return {
        title: 'Baik!',
        color: 'text-amber-700 bg-amber-50 border-amber-300',
        desc: 'Bagus! Kamu sudah memahami konsep-konsep dasar dengan baik. Coba pelajari lagi beberapa soal yang keliru.',
      };
    }
    if (score >= 60) {
      return {
        title: 'Tetap Semangat!',
        color: 'text-orange-700 bg-orange-50 border-orange-300',
        desc: 'Usaha yang cukup bagus! Buka kembali materi dan coba lagi simulasi interaktif agar nilaimu makin melesat.',
      };
    }
    return {
      title: 'Ayo Belajar Lagi!',
      color: 'text-rose-700 bg-rose-50 border-rose-300',
      desc: 'Jangan berkecil hati! Coba baca kembali 5 modul materi di atas dan ulangi kuis ini untuk mencapai nilai tertinggi.',
    };
  };

  const handleSubmitQuiz = () => {
    if (answeredCount < totalQuestions) {
      const confirmUnfinished = window.confirm(
        `Kamu baru menjawab ${answeredCount} dari ${totalQuestions} soal. Yakin ingin mengirimkan jawaban sekarang?`
      );
      if (!confirmUnfinished) return;
    }

    sound.playSuccess();
    setIsSubmitted(true);
    const { finalScore } = calculateScore();
    const rank = getRankCategory(finalScore);
    onUpdateQuizScore(finalScore);

    // Launch celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti blocked
    }
  };

  const handleResetQuiz = () => {
    sound.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setFilterReview('all');
  };

  const { correctCount, finalScore } = calculateScore();
  const rank = getRankCategory(finalScore);

  return (
    <div className="space-y-6">
      {/* Quiz Header Bar */}
      <div className="bg-gradient-to-r from-amber-500/10 via-sky-500/10 to-indigo-500/10 rounded-2xl p-6 border border-amber-200/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider">EVALUASI AKADEMIK IPAS</span>
            <h2 className="text-2xl font-extrabold text-slate-800 mt-1">Kuis Interaktif 20 Soal Pilihan Ganda</h2>
            <p className="text-sm text-slate-600 mt-1">
              Uji pemahamanmu tentang magnet, listrik, rangkaian sederhana, dan penerapannya dalam teknologi modern.
            </p>
          </div>

          {!isSubmitted && (
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2.5 rounded-xl border border-amber-200 shadow-2xs">
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 block">PROGRES PENGERJAAN</span>
                <span className="text-sm font-extrabold text-amber-700 font-mono">
                  {answeredCount} / {totalQuestions} Soal
                </span>
              </div>
              <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-500 flex items-center justify-center font-bold text-xs text-amber-900 font-mono">
                {Math.round((answeredCount / totalQuestions) * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>

      {!isSubmitted ? (
        /* QUIZ ACTIVE VIEW (One question at a time) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Card (Left 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm flex flex-col justify-between min-h-[460px]">
              <div>
                {/* Question Metadata */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-amber-500 text-white font-black text-xs rounded-lg font-mono">
                      SOAL {currentIndex + 1}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      Topik: <strong>{currentQ.moduleCategory}</strong>
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Bobot: 5 Poin</span>
                </div>

                {/* Question Text */}
                <h3 className="text-base md:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQ.question}
                </h3>

                {/* 4 Options Grid (A, B, C, D) */}
                <div className="mt-6 space-y-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt.key;
                    return (
                      <button
                        key={opt.key}
                        onClick={() => handleSelectOption(opt.key)}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50/70 shadow-sm ring-2 ring-amber-400/40 text-slate-900'
                            : 'border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="text-sm font-medium leading-relaxed pt-0.5">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Nav Buttons (Prev, Next, Finish) */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6 gap-3">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentIndex < totalQuestions - 1 ? (
                    <button
                      onClick={handleNext}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Berikutnya</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmitQuiz}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors animate-pulse"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>KIRIM JAWABAN KUIS</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Number Palette & Quick Jump (Right 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-800">NAVIGASI NOMOR SOAL:</h4>
                <span className="text-[11px] text-slate-500 font-mono">1 - 20</span>
              </div>

              {/* Number Buttons 1 to 20 */}
              <div className="grid grid-cols-5 gap-2">
                {QUIZ_QUESTIONS.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        sound.playClick();
                        setCurrentIndex(idx);
                      }}
                      className={`h-10 rounded-lg text-xs font-bold transition-all flex flex-col items-center justify-center ${
                        isCurrent
                          ? 'ring-2 ring-amber-500 font-black scale-105'
                          : ''
                      } ${
                        isAnswered
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isAnswered && (
                        <span className="text-[8px] font-mono leading-none opacity-80">
                          {selectedAnswers[q.id]}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-around text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-amber-500 inline-block"></span>
                  <span>Sudah Terjawab</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-slate-200 inline-block"></span>
                  <span>Belum Terjawab</span>
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Selesai & Lihat Nilai</span>
                </button>
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-sky-50 rounded-2xl border border-sky-200 p-4 text-xs text-sky-950">
              <span className="font-bold flex items-center gap-1 text-sky-800 mb-1">
                <HelpCircle className="w-3.5 h-3.5 text-sky-600" /> Tips Siswa:
              </span>
              Baca setiap pertanyaan dengan teliti. Jika ragu pada satu nomor, kamu bisa melompati nomor tersebut dan kembali menjawabnya nanti sebelum mengirim kuis.
            </div>
          </div>
        </div>
      ) : (
        /* QUIZ RESULT & DETAILED DISCUSSION VIEW */
        <div className="space-y-6">
          {/* Score Card Banner */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Score Gauge */}
              <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 pb-6 md:pb-0 md:pr-6">
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 p-2 shadow-lg flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center text-slate-900 shadow-inner">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NILAI AKHIR</span>
                    <span className="text-4xl font-black font-mono text-amber-600">{finalScore}</span>
                    <span className="text-xs text-slate-500 font-semibold">dari 100</span>
                  </div>
                </div>

                <span className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border ${rank.color}`}>
                  {rank.title}
                </span>
              </div>

              {/* Right Evaluation Summary */}
              <div className="md:col-span-8 space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase">HASIL UJIAN SISWA</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    Selamat, {studentName || 'Ilmuwan Cilik'}!
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {rank.desc}
                  </p>
                </div>

                {/* Metric Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">BENAR (+5)</span>
                    <span className="text-lg font-bold text-emerald-600 font-mono">{correctCount} Soal</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">SALAH (0)</span>
                    <span className="text-lg font-bold text-rose-600 font-mono">{totalQuestions - correctCount} Soal</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-bold block">AKURASI</span>
                    <span className="text-lg font-bold text-slate-800 font-mono">{finalScore}%</span>
                  </div>
                </div>

                {/* CTAs: Open Certificate & Retake */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onOpenCertificate(finalScore, rank.title)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>LIHAT SERTIFIKAT DIGITAL SAYA</span>
                  </button>

                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Question Review Deck */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">Pembahasan Lengkap & Kunci Jawaban</h4>
                <p className="text-xs text-slate-500">Periksa kunci jawaban resmi beserta rujukan buku untuk setiap soal.</p>
              </div>

              {/* Filter tabs */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setFilterReview('all')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${filterReview === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Semua ({totalQuestions})
                </button>
                <button
                  onClick={() => setFilterReview('wrong')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${filterReview === 'wrong' ? 'bg-white text-rose-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Salah ({totalQuestions - correctCount})
                </button>
                <button
                  onClick={() => setFilterReview('correct')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${filterReview === 'correct' ? 'bg-white text-emerald-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Benar ({correctCount})
                </button>
              </div>
            </div>

            {/* List of reviewed questions */}
            <div className="space-y-4">
              {QUIZ_QUESTIONS.filter((q) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                if (filterReview === 'correct') return isCorrect;
                if (filterReview === 'wrong') return !isCorrect;
                return true;
              }).map((q) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">Soal #{q.id}</span>
                        <span className="text-[11px] text-slate-500 font-mono">({q.moduleCategory})</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Benar (+5)
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <XCircle className="w-4 h-4 text-rose-600" /> Keliru (0)
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="font-semibold text-slate-900 text-sm">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold block">Jawaban Kamu:</span>
                        <span className={`font-bold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                          {userAns ? `${userAns}. ${q.options.find((o) => o.key === userAns)?.text}` : 'Tidak dijawab'}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-white border border-emerald-300">
                        <span className="text-[10px] text-emerald-600 font-bold block">Kunci Jawaban Benar:</span>
                        <span className="font-bold text-emerald-800">
                          {q.correctAnswer}. {q.options.find((o) => o.key === q.correctAnswer)?.text}
                        </span>
                      </div>
                    </div>

                    {/* Scientific Explanation */}
                    <div className="mt-3 p-3 bg-white/90 rounded-lg border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Penjelasan & Pembahasan:</span>
                      <p className="text-slate-700">{q.explanation}</p>
                      <span className="text-[10px] text-slate-500 mt-2 block italic">
                        Sumber Materi: {q.sourceReference}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
