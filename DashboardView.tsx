
import React, { useEffect, useState } from 'react';
import { formatIDR, INITIAL_ASSETS, MOCK_TRANSACTIONS, MOCK_EVENTS } from './constants';
import { TrendingUp, TrendingDown, Clock, Sparkles, BrainCircuit, Gift, ChevronRight, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getMarketAnalysis } from './geminiService';

const DashboardView: React.FC = () => {
  const [marketBrief, setMarketBrief] = useState<string>("Menganalisis pasar...");
  const [isLoadingAi, setIsLoadingAi] = useState(true);

  const totalBalance = INITIAL_ASSETS.reduce((acc, curr) => acc + (curr.balance * curr.priceIdr), 0);
  const chartData = [
    { date: 'Sen', value: 45000000 },
    { date: 'Sel', value: 46200000 },
    { date: 'Rab', value: 44800000 },
    { date: 'Kam', value: 47100000 },
    { date: 'Jum', value: 48900000 },
  ];

  useEffect(() => {
    const fetchAi = async () => {
      const analysis = await getMarketAnalysis("BTC, ETH, IDR");
      setMarketBrief(analysis);
      setIsLoadingAi(false);
    };
    fetchAi();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <p className="text-sm font-bold text-slate-400 uppercase mb-1">Total Saldo</p>
          <h2 className="text-4xl font-black mb-6">{formatIDR(totalBalance)}</h2>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <Area type="monotone" dataKey="value" stroke="#2563eb" fill="#dbeafe" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-blue-600 rounded-3xl p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BrainCircuit size={24} />
              <h3 className="font-bold">AI Analyst</h3>
            </div>
            <p className={`text-sm opacity-90 italic ${isLoadingAi ? 'animate-pulse' : ''}`}>{marketBrief}</p>
          </div>
          <button className="mt-6 w-full py-3 bg-white text-blue-600 font-bold rounded-xl">Tanya AI</button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold">Aset Terpopuler</h3>
          <Zap className="text-amber-500" size={20} />
        </div>
        <div className="divide-y">
          {INITIAL_ASSETS.slice(1, 5).map(asset => (
            <div key={asset.id} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{backgroundColor: asset.color}}>{asset.symbol[0]}</div>
                <div>
                  <p className="font-bold">{asset.name}</p>
                  <p className="text-[10px] text-slate-400">{asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatIDR(asset.priceIdr)}</p>
                <p className="text-xs text-emerald-500">+{asset.change24h}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
