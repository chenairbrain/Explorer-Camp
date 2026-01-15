import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { getAppState } from './services/storage';
import { AppState, Team } from './types';
import AdminDashboard from './components/AdminDashboard';
import TeamPage from './components/TeamPage';
import Navbar from './components/Navbar';

// 更加細緻且具辨識度的 10 種特定動物簡易剪影圖案
export const TeamIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  const paths: Record<string, React.ReactElement> = {
    // 1. 穿山甲 (捲曲防禦姿態)
    "fa-paw": (
      <path d="M50 20c-18 0-32 12-32 30 0 5 2 10 5 14-8 8-10 18-5 24 5 5 15 5 22 2 10 5 25 5 35-5 5-10 2-20-5-25 5-5 10-10 10-20 0-15-12-20-30-20zm0 10c12 0 20 5 20 15 0 5-2 8-5 10-10-2-15-4-20-4s-10 2-20 4c-2-3-5-5-5-10 0-10 8-15 30-15z" />
    ),
    // 2. 台灣黑熊 (大圓耳與胸前 V 字)
    "special-bear": (
      <g>
        <path d="M50 20c-15 0-25 10-25 25s5 20 15 25c-5 10 5 20 10 20s15-10 10-20c10-5 15-10 15-25s-10-25-25-25z" />
        <path d="M25 25c-5-5-15 0-15 10s10 10 15 0zM75 25c5-5 15 0 15 10s-10 10-15 0z" />
        <path d="M38 72q12 8 24 0" fill="none" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </g>
    ),
    // 3. 藍腹鷴 (修長頸部與優雅長尾)
    "fa-feather-pointed": (
      <path d="M25 85c0-40 10-60 40-75 10-5 25 0 25 15s-15 20-10 35 20 20 20 25c-30 0-75-5-75-10z M40 35c-5 0-10 5-10 10s10 10 10 0-5-10-10-10z" />
    ),
    // 4. 石虎 (貓科側影與額頭兩道白線感)
    "fa-cat": (
      <g>
        <path d="M50 25c15 0 25 12 25 25s-10 25-25 25-25-12-25-25 10-25 25-25z" />
        <path d="M35 25l-15-15 5-5 15 15zM65 25l15-15-5-5-15 15z" />
        <rect x="44" y="40" width="3" height="15" rx="1.5" fill="white" />
        <rect x="53" y="40" width="3" height="15" rx="1.5" fill="white" />
      </g>
    ),
    // 5. 台灣獼猴 (經典面部輪廓)
    "special-macaque": (
      <g>
        <path d="M50 20c-20 0-35 15-35 32s15 32 35 32 35-15 35-32-15-32-35-32z" />
        <circle cx="38" cy="48" r="4" fill="white" />
        <circle cx="62" cy="48" r="4" fill="white" />
        <path d="M40 68q10 8 20 0" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
        <path d="M15 45c-8 0-10 15 0 15M85 45c8 0 10 15 0 15" stroke="currentColor" strokeWidth="4" />
      </g>
    ),
    // 6. 櫻花鉤吻鮭 (鉤狀下顎與流線魚身)
    "fa-fish-fins": (
      <path d="M10 50c0-20 35-35 65-35s25 15 25 35-5 35-25 35-65-15-65-35zm65-20c8 5 8 35 0 40M15 50c10-10 10-25 0-35" />
    ),
    // 7. 諸羅樹蛙 (大眼與帶吸盤的趾)
    "fa-frog": (
      <g>
        <path d="M50 40c-25 0-35 20-35 35h70c0-15-10-35-35-35z" />
        <circle cx="35" cy="40" r="12" fill="currentColor" />
        <circle cx="65" cy="40" r="12" fill="currentColor" />
        <circle cx="35" cy="40" r="4" fill="white" />
        <circle cx="65" cy="40" r="4" fill="white" />
        <circle cx="20" cy="75" r="5" fill="currentColor" />
        <circle cx="80" cy="75" r="5" fill="currentColor" />
      </g>
    ),
    // 8. 寬尾鳳蝶 (特有的寬尾突起)
    "fa-bug": (
      <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
        <path d="M50 25v50" />
        <path d="M50 40C30 20 10 40 25 70M50 40C70 20 90 40 75 70" />
        <path d="M25 70l-5 15M75 70l5 15" strokeWidth="10" />
      </g>
    ),
    // 9. 台灣水鹿 (壯碩的體態與多叉大角)
    "special-sambar": (
      <g>
        <path d="M50 35c-15 0-25 15-25 30 0 10 5 20 15 25h20c10-5 15-15 15-25 0-15-10-30-25-30z" />
        <path d="M35 35q-5-15-15-20M35 30q-10-5-15-15M65 35q5-15 15-20M65 30q10-5 15-15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        <circle cx="40" cy="55" r="3" fill="white" />
        <circle cx="60" cy="55" r="3" fill="white" />
      </g>
    ),
    // 10. 帝雉 (長尾羽與橫斑感)
    "fa-crown": (
      <path d="M20 85h60l-5-60-15 25-10-35-10 35-15-25z M45 35l10-10M35 45l10-10" stroke="currentColor" strokeWidth="4" />
    ),
  };

  return (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      {paths[icon] || <circle cx="50" cy="50" r="30" />}
    </svg>
  );
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(getAppState());

  const refreshState = () => {
    setAppState(getAppState());
  };

  useEffect(() => {
    const handleStorageChange = () => refreshState();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-brand-soft text-slate-800 font-sans">
        <Navbar />
        
        <main className="container mx-auto px-4 py-6 pb-28">
          <Routes>
            <Route path="/" element={<HomeView teams={appState.teams} />} />
            <Route path="/admin" element={<AdminDashboard teams={appState.teams} onRefresh={refreshState} />} />
            <Route path="/team/:id" element={<TeamPage teams={appState.teams} onScoreAdded={refreshState} />} />
          </Routes>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-accent p-3 shadow-xl flex justify-around items-center md:hidden z-40">
           <Link to="/" className="flex flex-col items-center px-6 py-1 text-brand-primary active:scale-90 transition-transform">
            <i className="fas fa-th-large text-xl mb-1"></i>
            <span className="text-[10px] font-black">小隊名單</span>
           </Link>
           <Link to="/admin" className="flex flex-col items-center px-6 py-1 text-slate-400 hover:text-brand-primary transition-colors">
            <i className="fas fa-chart-line text-xl mb-1"></i>
            <span className="text-[10px] font-black">監控中心</span>
           </Link>
        </footer>
      </div>
    </HashRouter>
  );
};

const HomeView: React.FC<{ teams: Team[] }> = ({ teams }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <header className="text-center pt-8 pb-2">
        <div className="inline-block p-6 bg-brand-primary rounded-[2.5rem] text-white mb-6 shadow-2xl shadow-brand-primary/20">
          <i className="fas fa-flag-checkered text-4xl"></i>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">探索山林計分榜</h1>
        <p className="text-brand-secondary font-black mt-4 text-xl tracking-[0.2em] uppercase">Explorer Camp</p>
        <p className="text-brand-primary font-black text-sm md:text-base italic tracking-wide mt-2 opacity-80 leading-relaxed">
          "Grow here. Go Further.<br/>So you can unlock your journey."
        </p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8">
        {teams.map((team) => (
          <Link
            key={team.id}
            to={`/team/${team.id}`}
            className="bg-white rounded-[2.5rem] p-6 md:p-8 border border-brand-accent shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all active:scale-95 flex flex-col items-center text-center group relative overflow-hidden"
          >
            {/* 圖示尺寸優化：加大基礎尺寸 (w-20)，優化響應式斷點 (sm:w-24)，減少內邊距 (p-4/sm:p-5) 以放大圖示本身 */}
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] ${team.color} flex items-center justify-center text-white mb-4 shadow-xl shadow-brand-soft group-hover:rotate-6 transition-transform p-4 sm:p-5`}>
              <TeamIcon icon={team.icon} className="w-full h-full object-contain drop-shadow-sm" />
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="font-black text-xl text-slate-800 mb-1">{team.name}</h3>
              {/* 小隊編號顯示 - 放大且顏色加深 */}
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">TEAM #{team.id}</span>
            </div>

            <div className="mt-auto">
              <span className="text-4xl font-black text-brand-primary">{team.totalScore}</span>
              <span className="text-xs text-brand-secondary ml-1 font-black">PTS</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-brand-soft border-4 border-brand-accent p-10 md:p-14 rounded-[4rem] relative overflow-hidden mt-8 shadow-inner">
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-black mb-10 flex items-center gap-4 text-brand-primary">
            <i className="fas fa-map-signs"></i> 使用指南
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-md">1</div>
              <p className="font-black text-slate-700 text-base">點擊對應的小隊進入該隊主頁面。</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-md">2</div>
              <p className="font-black text-slate-700 text-base">由隊輔點選積分並輸入該隊密碼驗證。</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-black text-lg shadow-md">3</div>
              <p className="font-black text-slate-700 text-base">監控中心由工作人員執行，即時查看隊伍排名。</p>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-accent rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default App;