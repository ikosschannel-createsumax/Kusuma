
import React, { useEffect, useState } from 'react';
import { formatIDR, INITIAL_ASSETS, MOCK_TRANSACTIONS, MOCK_EVENTS } from '../constants';
import { TrendingUp, TrendingDown, Clock, ArrowRight, Sparkles, BrainCircuit, Gift, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketAnalysis } from '../services/geminiService';

const DashboardView: React.FC = () => {
  const [marketBrief, setMarketBrief] = useState<string>("Menganalisis pasar...");
  const [isLoadingAi, setIsLoadingAi] = useState(true);
  const [activeBanner, setActiveBanner] = useState(0);

  const totalBalance = INITIAL_ASSETS.reduce((acc, curr) => acc + (curr.balance * curr.priceIdr), 0);
  
  const chartData = [
    { date: '12 Mei', value: 45000000000 },
    { date: '13 Mei', value: 46200000000 },
    { date: '14 Mei', value: 44800000000 },
    { date: '15 Mei', value: 47100000000 },
    { date: '16 Mei', value: 48900000000 },
    { date: '17 Mei', value: 50200000000 },
  ];

  useEffect(() => {
    const fetchAiSummary = async () => {
      setIsLoadingAi(true);
      const assetString = INITIAL_ASSETS.map(a => `${a.symbol}: Rp${a.priceIdr.toLocaleString()}`).join(', ');
      const analysis = await getMarketAnalysis(assetString);
      setMarketBrief(analysis);
      setIsLoadingAi(false);
    };
    fetchAiSummary();

    const bannerTimer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % MOCK_EVENTS.length);
    }, 5000);
    return () => clearInterval(bannerTimer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Promotional Banner */}
      <div className="relative h-44 rounded-[2rem] overflow-hidden bg-slate-900 group shadow-xl">
        {MOCK_EVENTS.map((event, idx) => (
          <div 
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-1000 flex items-center justify-between px-10 ${idx === activeBanner ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="z-10 max-w-md space-y-3">
              <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded uppercase tracking-widest">Hot Promo</span>
              <h3 className="text-2xl font-black text-white leading-tight">{event.title}</h3>
              <p className="text-slate-300 text-sm font-medium">{event.description}</p>
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-xs transition-all">
                IKUTI SEKARANG <Zap size={14} fill="currentColor" />
              </button>
            </div>
            <div className="hidden md:block w-1/3 h-full relative">
              <img src={event.image} alt="Promo" className="w-full h-full object-cover opacity-50 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-4 left-10 flex gap-2 z-20">
          {MOCK_EVENTS.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeBanner ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* Balance & Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Estimasi Saldo</p>
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                <Gift size={14} />
                <span className="text-[10px] font-black uppercase">Cashback: Rp 12.500</span>
              </div>
            </div>
            <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">{formatIDR(totalBalance)}</h2>
            
            <div className="flex gap-3 mb-8">
              <span className="flex items-center gap-1.5 text-[10px] font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                <TrendingUp size={14} /> Profit +Rp1.250.000 (24j)
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-black bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                BTC DOMINANCE: 45%
              </span>
            </div>

            <div className="h-48 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={['dataMin - 1000000', 'dataMax + 1000000']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                    formatter={(val: number) => [formatIDR(val), 'Estimasi Saldo']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 opacity-[0.03]">
            <TrendingUp size={300} strokeWidth={3} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-[2rem] shadow-xl shadow-blue-200 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white/20 backdrop-blur rounded-2xl border border-white/10">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight uppercase text-xs opacity-60">AI Market Insights</h3>
                <p className="font-black text-sm">Analisis Sentimen Pasar</p>
              </div>
            </div>
            
            <div className={`text-sm leading-relaxed mb-8 font-medium italic opacity-90 ${isLoadingAi ? 'animate-pulse' : ''}`}>
              "{marketBrief}"
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-3 py-4 bg-white text-blue-800 font-black rounded-2xl hover:bg-blue-50 transition-all shadow-xl active:scale-95 group">
            KONSULTASI ANALIS AI <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Highlights */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest text-xs">
              <Sparkles className="text-amber-500" size={20} /> Pantauan Pasar Teratas
            </h3>
            <button className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest">Semua Market</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                  <th className="px-8 py-4">Aset</th>
                  <th className="px-8 py-4 text-right">Harga</th>
                  <th className="px-8 py-4 text-right">Perubahan (24j)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {INITIAL_ASSETS.filter(a => a.id !== '1').map((asset) => (
                  <tr key={asset.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                    <td className="px-8 py-5 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-current group-hover:scale-110 transition-transform" style={{ backgroundColor: asset.color }}>
                        {asset.symbol.substring(0, 1)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-sm">{asset.name}</p>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{asset.symbol}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right font-black text-slate-700 text-sm">
                      {formatIDR(asset.priceIdr)}
                    </td>
                    <td className={`px-8 py-5 text-right`}>
                      <span className={`inline-flex items-center gap-1 font-black text-sm ${asset.change24h >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {asset.change24h > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(asset.change24h)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 flex items-center gap-3 uppercase tracking-widest text-xs">
              <Clock className="text-blue-500" size={20} /> Aktivitas Terkini
            </h3>
          </div>
          <div className="flex-1 p-4 space-y-2 overflow-y-auto no-scrollbar">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl shadow-sm group-hover:scale-105 transition-transform ${
                    tx.type === 'DEPOSIT' ? 'bg-emerald-50 text-emerald-600' : 
                    tx.type === 'WITHDRAW' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {tx.type === 'DEPOSIT' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-800 uppercase tracking-wider">{tx.type} {tx.assetSymbol}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">{tx.type === 'WITHDRAW' ? '-' : '+'}{tx.amount}</p>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    tx.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' :
                    tx.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="p-6 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-blue-600 transition-colors border-t border-slate-50">
             Lihat Semua Riwayat
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
