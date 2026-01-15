import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Team } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { resetData } from '../services/storage';

interface AdminDashboardProps {
  teams: Team[];
  onRefresh: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ teams, onRefresh }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("密碼錯誤");
    }
  };

  const sortedTeams = [...teams].sort((a, b) => b.totalScore - a.totalScore);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-12 p-12 bg-white rounded-[4rem] shadow-2xl border border-brand-accent">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-brand-soft text-brand-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 rotate-6 shadow-xl shadow-brand-soft">
            <i className="fas fa-lock text-4xl"></i>
          </div>
          <h2 className="text-3xl font-black text-slate-900">管理員驗證</h2>
          <p className="text-brand-secondary text-sm mt-3 font-black tracking-widest uppercase">Admin Verification</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-8">
          <input
            type="password"
            placeholder="管理密碼"
            className="w-full px-8 py-6 bg-brand-soft border-2 border-brand-accent rounded-3xl focus:border-brand-primary focus:outline-none text-center font-black text-xl tracking-widest"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            autoFocus
          />
          {error && <p className="text-brand-primary text-sm text-center font-black">{error}</p>}
          <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-black active:scale-95 transition-all shadow-xl">
            驗證登入
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 md:p-10 rounded-[3.5rem] border border-brand-accent shadow-sm">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-900">山林大賽監控中心</h2>
          <p className="text-brand-secondary text-sm font-black uppercase tracking-[0.3em] mt-2">Live Progress Dashboard</p>
        </div>
        <button
          onClick={() => confirm("確定要清空所有隊伍數據嗎？此動作無法復原！") && resetData()}
          className="px-8 py-3 bg-brand-neutral text-slate-400 rounded-full text-xs font-black hover:bg-brand-primary hover:text-white transition-all border border-brand-accent"
        >
          重置數據
        </button>
      </div>

      <div className="bg-white p-8 md:p-14 rounded-[4rem] border border-brand-accent shadow-sm">
        <h3 className="text-2xl font-black text-slate-900 mb-12 flex items-center gap-3">
          <i className="fas fa-chart-bar text-brand-primary"></i> 積分分佈圖
        </h3>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teams} layout="vertical" margin={{ left: 0, right: 30 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 14, fontWeight: '900', fill: '#FD5108' }} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '24px', border: 'none', fontWeight: '900', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="totalScore" radius={[0, 16, 16, 0]} barSize={32}>
                {teams.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#FD5108" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[4rem] border border-brand-accent shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
            <i className="fas fa-trophy text-yellow-500"></i> 當前排行
          </h3>
          <div className="space-y-4">
            {sortedTeams.map((team, idx) => (
              <div key={team.id} className="flex items-center gap-5 p-6 rounded-3xl bg-brand-soft/50 border border-brand-accent group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl ${
                  idx === 0 ? 'bg-yellow-400 text-white shadow-lg rotate-3' : 'bg-brand-accent text-brand-primary'
                }`}>
                  {idx + 1}
                </div>
                <div className="flex-grow font-black text-xl text-slate-800">{team.name}</div>
                <div className="text-3xl font-black text-brand-primary italic">{team.totalScore}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[4rem] border border-brand-accent shadow-sm overflow-hidden flex flex-col">
           <div className="p-10 border-b border-brand-accent bg-brand-soft/30">
             <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
               <i className="fas fa-history text-brand-secondary"></i> 最新異動
             </h3>
           </div>
           <div className="flex-grow overflow-y-auto max-h-[600px] divide-y divide-brand-accent">
              {teams.flatMap(t => t.history.map(h => ({ ...h, teamName: t.name }))).sort((a, b) => b.timestamp - a.timestamp).slice(0, 30).map(entry => (
                <div key={entry.id} className="p-6 md:p-8 flex justify-between items-center group hover:bg-brand-soft/30 transition-colors">
                  <div>
                    <div className="font-black text-lg text-slate-900 group-hover:text-brand-primary transition-colors">{entry.teamName}</div>
                    <div className="text-[10px] text-brand-secondary font-black uppercase tracking-widest mt-1">{new Date(entry.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <div className="text-2xl font-black text-brand-primary">+{entry.amount}</div>
                </div>
              ))}
              {teams.length === 0 && (
                <div className="py-20 text-center text-slate-300 font-black">尚無數據</div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;