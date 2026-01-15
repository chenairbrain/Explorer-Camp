import React, { useState } from 'react';
import { Team } from '../types';
import { addScoreToTeam } from '../services/storage';

interface ScoreInputModalProps {
  team: Team;
  onClose: () => void;
  onSuccess: () => void;
}

const ScoreInputModal: React.FC<ScoreInputModalProps> = ({ team, onClose, onSuccess }) => {
  const [score, setScore] = useState<number>(1);
  const [customScore, setCustomScore] = useState<string>("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (pin !== team.pin) {
      setError("驗證密碼錯誤");
      return;
    }

    const finalScore = customScore !== "" ? parseInt(customScore) : score;
    if (isNaN(finalScore) || finalScore <= 0) {
      setError("請輸入有效的分數");
      return;
    }

    setIsSubmitting(true);
    const autoDesc = `${finalScore} 分`;
    
    setTimeout(() => {
      addScoreToTeam(team.id, finalScore, autoDesc);
      setIsSubmitting(false);
      onSuccess();
    }, 400);
  };

  const scoreOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-t-[3.5rem] md:rounded-[4rem] w-full max-w-md shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-500 md:duration-300">
        <div className={`p-8 text-white bg-brand-primary flex justify-between items-center relative`}>
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-xl">
               <i className="fas fa-plus"></i>
             </div>
             <h3 className="text-xl font-black">登錄本次積分</h3>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center active:scale-90 transition-transform">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div>
            <label className="block text-center text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-6">選擇或輸入分數</label>
            
            {/* 1-10 網格 */}
            <div className="grid grid-cols-5 gap-3 mb-6">
              {scoreOptions.map(val => (
                <button
                  key={val}
                  type="button"
                  onClick={() => {
                    setScore(val);
                    setCustomScore("");
                  }}
                  className={`py-3 rounded-2xl font-black text-xl transition-all border-2 ${
                    score === val && customScore === ""
                    ? `border-brand-primary text-brand-primary bg-brand-soft shadow-md` 
                    : 'border-transparent bg-brand-neutral/50 text-slate-400 hover:bg-brand-soft'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* 自定義輸入 */}
            <div className="relative">
              <input
                type="number"
                placeholder="或手動輸入分數..."
                value={customScore}
                onChange={(e) => {
                  setCustomScore(e.target.value);
                  setScore(0);
                }}
                className="w-full px-6 py-4 bg-brand-neutral/30 border-2 border-brand-accent rounded-2xl focus:border-brand-primary focus:outline-none font-bold text-center text-lg"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-secondary text-xs font-black">
                PTS
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center h-6">
              {(score > 0 || customScore !== "") && (
                <span className="text-[10px] font-black text-brand-primary bg-brand-accent px-4 py-1 rounded-full animate-fade-in">
                  已選定 {customScore || score} 分
                </span>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-accent">
            <label className="block text-center text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-4">
              TEAM #{team.id} 隊輔輸入密碼
            </label>
            <div className="relative max-w-[180px] mx-auto">
              <input
                type="password"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-4 bg-brand-neutral/30 border-2 border-brand-accent rounded-2xl focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary focus:outline-none tracking-[0.4em] text-center font-black text-2xl"
              />
            </div>
            {error && <p className="text-brand-primary text-xs mt-4 text-center font-black animate-shake">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-[2rem] text-white font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
              isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-primary hover:bg-orange-600 active:scale-95 shadow-brand-primary/20'
            }`}
          >
            {isSubmitting ? (
              <i className="fas fa-circle-notch animate-spin"></i>
            ) : (
              <><i className="fas fa-check-circle"></i> 確認送出</>
            )}
          </button>
        </form>
        <div className="h-6 md:hidden"></div>
      </div>
    </div>
  );
};

export default ScoreInputModal;