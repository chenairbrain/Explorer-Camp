import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Team } from '../types';
import ScoreInputModal from './ScoreInputModal';
import { TeamIcon } from '../App';

interface TeamPageProps {
  teams: Team[];
  onScoreAdded: () => void;
}

const TeamPage: React.FC<TeamPageProps> = ({ teams, onScoreAdded }) => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const team = teams.find(t => t.id === Number(id));

  if (!team) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center text-brand-primary hover:text-orange-700 font-black px-6 py-3 bg-white rounded-2xl border border-brand-accent shadow-sm transition-all active:scale-95">
        <i className="fas fa-chevron-left mr-2"></i>
        返回清單
      </Link>

      <div className={`relative overflow-hidden rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl ${team.color} min-h-[300px] flex flex-col justify-end`}>
        <div className="relative z-10 flex justify-between items-end">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-[2rem] flex items-center justify-center p-6 border border-white/20 shadow-inner">
              <TeamIcon icon={team.icon} className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">{team.name}</h2>
              <p className="opacity-90 font-black uppercase tracking-[0.2em] text-sm mt-2">Team Entry #{team.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-8xl font-black leading-none tracking-tighter text-white drop-shadow-md">{team.totalScore}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mt-4">Current Points</div>
          </div>
        </div>
        <div className="absolute -top-10 -right-10 w-80 h-80 opacity-10 rotate-12 pointer-events-none">
           <TeamIcon icon={team.icon} className="w-full h-full" />
        </div>
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-brand-primary hover:bg-orange-600 text-white py-8 rounded-[3rem] font-black text-3xl shadow-2xl shadow-brand-primary/20 hover:shadow-brand-primary/40 transition-all active:scale-95 flex items-center justify-center gap-5"
      >
        <i className="fas fa-plus-circle text-4xl"></i>
        登錄積分
      </button>

      <div className="bg-white rounded-[3.5rem] shadow-sm border border-brand-accent overflow-hidden">
        <div className="p-10 border-b border-brand-accent flex items-center justify-between bg-brand-soft/30">
          <h3 className="text-2xl font-black text-slate-900">得分歷史</h3>
          <span className="px-5 py-2 bg-brand-accent text-brand-primary rounded-full text-sm font-black tracking-wide">
            {team.history.length} 筆
          </span>
        </div>
        <div className="divide-y divide-brand-accent">
          {team.history.length > 0 ? (
            team.history.map((entry) => (
              <div key={entry.id} className="p-8 flex items-center justify-between hover:bg-brand-soft/50 transition-colors group">
                <div className="space-y-1">
                  <span className="font-black text-slate-800 text-xl block group-hover:text-brand-primary transition-colors">獲得 {entry.amount} 點積分</span>
                  <span className="text-xs text-brand-secondary font-black uppercase tracking-[0.15em]">
                    {new Date(entry.timestamp).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </span>
                </div>
                <div className="text-4xl font-black text-brand-primary italic">
                  +{entry.amount}
                </div>
              </div>
            ))
          ) : (
            <div className="py-24 text-center">
              <div className="text-brand-accent text-8xl mb-6">
                 <i className="fas fa-scroll"></i>
              </div>
              <p className="text-brand-secondary font-black text-xl">尚無得分紀錄</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ScoreInputModal 
          team={team} 
          onClose={() => setShowModal(false)} 
          onSuccess={() => {
            onScoreAdded();
            setShowModal(false);
          }} 
        />
      )}
    </div>
  );
};

export default TeamPage;