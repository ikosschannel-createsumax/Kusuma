
import React from 'react';
import { MOCK_LEADERBOARD, formatIDR } from '../constants';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

const LeaderboardView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-10">
        {/* Rank 2 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-center relative h-64 flex flex-col justify-end order-2 md:order-1">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-slate-100 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
             <Medal className="text-slate-400" size={32} />
          </div>
          <h4 className="font-black text-slate-900">{MOCK_LEADERBOARD[1].name}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Peringkat 2</p>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
             <p className="text-xs font-bold text-slate-500">Volume</p>
             <p className="text-sm font-black text-slate-800">{formatIDR(MOCK_LEADERBOARD[1].volumeIdr)}</p>
          </div>
        </div>

        {/* Rank 1 */}
        <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 shadow-xl shadow-amber-200 text-center relative h-80 flex flex-col justify-end order-1 md:order-2 scale-105 z-10">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-white rounded-full border-8 border-amber-300 shadow-xl overflow-hidden flex items-center justify-center">
             <Trophy className="text-amber-500" size={48} />
          </div>
          <div className="text-white space-y-1 mb-6">
            <h4 className="text-xl font-black">{MOCK_LEADERBOARD[0].name}</h4>
            <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">Juara Mingguan</p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-4 border border-white/20 text-white">
             <p className="text-xs font-bold opacity-80">Volume Trading</p>
             <p className="text-lg font-black">{formatIDR(MOCK_LEADERBOARD[0].volumeIdr)}</p>
             <div className="mt-2 inline-block px-3 py-1 bg-white text-orange-600 rounded-full text-[10px] font-black">
                REWARD: {formatIDR(MOCK_LEADERBOARD[0].rewardIdr)}
             </div>
          </div>
        </div>

        {/* Rank 3 */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm text-center relative h-56 flex flex-col justify-end order-3">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-orange-50 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
             <Medal className="text-orange-700" size={32} />
          </div>
          <h4 className="font-black text-slate-900">{MOCK_LEADERBOARD[2].name}</h4>
          <p className="text-[10px] font-black text-slate-400 uppercase mb-4">Peringkat 3</p>
          <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
             <p className="text-xs font-bold text-slate-500">Volume</p>
             <p className="text-sm font-black text-slate-800">{formatIDR(MOCK_LEADERBOARD[2].volumeIdr)}</p>
          </div>
        </div>
      </div>

      {/* Full List */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
              <Star size={18} className="text-amber-500" /> Leaderboard Selengkapnya
           </h3>
           <div className="flex gap-2 text-[10px] font-black text-slate-400">
              <span className="flex items-center gap-1"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> LIVE UPDATES</span>
           </div>
        </div>
        <div className="overflow-x-auto">
           <table className="w-full text-left text-sm">
             <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
               <tr>
                 <th className="px-6 py-4 w-20">Rank</th>
                 <th className="px-6 py-4">Trader</th>
                 <th className="px-6 py-4 text-right">Volume (IDR)</th>
                 <th className="px-6 py-4 text-right">Profit/Loss (24j)</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
               {MOCK_LEADERBOARD.map((entry) => (
                 <tr key={entry.rank} className="hover:bg-slate-50/50 transition-colors">
                   <td className="px-6 py-4">
                     <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-black text-xs ${
                       entry.rank === 1 ? 'bg-amber-100 text-amber-700' :
                       entry.rank === 2 ? 'bg-slate-100 text-slate-700' :
                       entry.rank === 3 ? 'bg-orange-100 text-orange-700' : 'bg-white text-slate-400 border border-slate-100'
                     }`}>
                       #{entry.rank}
                     </span>
                   </td>
                   <td className="px-6 py-4 font-bold text-slate-800">{entry.name}</td>
                   <td className="px-6 py-4 text-right font-black text-slate-700">{formatIDR(entry.volumeIdr)}</td>
                   <td className="px-6 py-4 text-right">
                      <span className="flex items-center justify-end gap-1 font-bold text-emerald-500 text-xs">
                        <TrendingUp size={12} /> +{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 9)}%
                      </span>
                   </td>
                 </tr>
               ))}
               <tr className="bg-blue-50/50 border-t-2 border-blue-100">
                  <td className="px-6 py-5">
                     <span className="w-8 h-8 flex items-center justify-center rounded-lg font-black text-xs bg-blue-600 text-white">
                       154
                     </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-black text-blue-700">Budi Santoso (Anda)</p>
                    <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Peringkat Anda</p>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-blue-700">{formatIDR(7250000)}</td>
                  <td className="px-6 py-5 text-right">
                     <span className="font-bold text-emerald-600 text-xs">+1.2%</span>
                  </td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardView;
