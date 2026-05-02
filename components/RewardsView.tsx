
import React, { useState } from 'react';
import { MOCK_EVENTS, formatIDR } from '../constants';
import { Gift, Play, Timer, Sparkles, Trophy } from 'lucide-react';

const RewardsView: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleSpin = () => {
    if (spinning) return;
    setSpinning(true);
    setLastResult(null);
    setTimeout(() => {
      const prizes = ['Rp 10.000', 'Cashback 5%', 'T-Shirt Nusa', 'Rp 50.000', 'Zonk', '0.0001 BTC'];
      const win = prizes[Math.floor(Math.random() * prizes.length)];
      setSpinning(false);
      setLastResult(win);
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Lucky Spin Section */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col items-center text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-black text-slate-900 mb-2">Lucky Spin Nusantara</h3>
            <p className="text-slate-500 text-sm">Gunakan tiket Anda untuk memenangkan hadiah instan.</p>
          </div>

          <div className="relative w-64 h-64 mb-8">
            <div className={`w-full h-full rounded-full border-8 border-blue-600 bg-slate-50 flex items-center justify-center relative overflow-hidden ${spinning ? 'animate-spin' : ''}`} style={{ animationDuration: '0.5s' }}>
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                <div className="border-r border-b border-blue-100 flex items-center justify-center text-[10px] font-black p-2">10K</div>
                <div className="border-b border-blue-100 flex items-center justify-center text-[10px] font-black p-2">5%</div>
                <div className="border-r border-blue-100 flex items-center justify-center text-[10px] font-black p-2">T-SHIRT</div>
                <div className="flex items-center justify-center text-[10px] font-black p-2">0.1 BTC</div>
              </div>
              <div className="z-10 bg-white w-12 h-12 rounded-full border-4 border-blue-600 shadow-lg flex items-center justify-center">
                <Gift className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-rose-500 rounded-b-full shadow-lg z-20"></div>
          </div>

          {lastResult && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-bounce">
               <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Anda Menang!</p>
               <p className="text-lg font-black text-emerald-900">{lastResult}</p>
            </div>
          )}

          <div className="space-y-4 w-full max-w-xs">
            <button 
              onClick={handleSpin}
              disabled={spinning}
              className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all ${spinning ? 'bg-slate-300' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 active:scale-95'}`}
            >
              {spinning ? 'SEDANG MEMUTAR...' : 'PUTAR SEKARANG (1 Tiket)'}
            </button>
            <p className="text-xs font-bold text-slate-400">Tiket Tersedia: <span className="text-blue-600">3 Tiket</span></p>
          </div>
        </div>

        {/* Active Events */}
        <div className="space-y-6">
          <div className="flex justify-between items-center px-2">
             <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Sparkles className="text-amber-500" /> Event & Promo
             </h3>
             <button className="text-sm font-bold text-blue-600">Lihat Semua</button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {MOCK_EVENTS.map(event => (
              <div key={event.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex shadow-sm group hover:shadow-md transition-all">
                <div className="w-1/3 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="w-2/3 p-5 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[9px] font-black rounded uppercase tracking-wider">Berlangsung</span>
                    <div className="flex items-center gap-1 text-slate-400 text-[9px] font-bold">
                      <Timer size={10} /> {event.endDate}
                    </div>
                  </div>
                  <h4 className="font-black text-slate-900 leading-tight">{event.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{event.description}</p>
                  <div className="pt-2 flex justify-between items-center">
                    <p className="text-xs font-black text-blue-600">Reward: {event.reward}</p>
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white relative overflow-hidden">
             <div className="relative z-10">
               <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-amber-400" size={20} />
                  <h4 className="font-black uppercase tracking-widest text-xs">Mining Simulation</h4>
               </div>
               <p className="text-sm font-medium text-slate-300 mb-4">Dapatkan BTC gratis dengan simulasi mining harian.</p>
               <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-3/4"></div>
                  </div>
                  <span className="text-xs font-black">75%</span>
               </div>
               <button className="mt-4 w-full py-2 bg-white text-slate-900 font-black rounded-xl text-xs hover:bg-slate-100">KLAIM HASIL MINING</button>
             </div>
             <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsView;
