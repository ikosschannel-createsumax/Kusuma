
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS, formatIDR } from '../constants';
import { TransactionStatus } from '../types';
import { Users, FileText, Settings, AlertCircle, Check, X, ShieldAlert, Zap, Percent, Gift, Power } from 'lucide-react';

const AdminView: React.FC = () => {
  const [maintenance, setMaintenance] = useState(false);
  const pendingTransactions = MOCK_TRANSACTIONS.filter(t => t.status === TransactionStatus.PENDING || t.status === TransactionStatus.PROCESSING);

  return (
    <div className="space-y-8">
      {/* Maintenance Toggle Banner */}
      <div className={`p-6 rounded-3xl border transition-all flex items-center justify-between ${maintenance ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl ${maintenance ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
            <Power size={24} />
          </div>
          <div>
            <h3 className="font-black text-slate-900 uppercase text-sm tracking-widest">Mode Maintenance</h3>
            <p className="text-xs font-medium text-slate-500">{maintenance ? 'Akses platform dibatasi untuk umum' : 'Platform beroperasi normal'}</p>
          </div>
        </div>
        <button 
          onClick={() => setMaintenance(!maintenance)}
          className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase transition-all shadow-lg ${maintenance ? 'bg-rose-600 text-white' : 'bg-slate-900 text-white'}`}
        >
          {maintenance ? 'NONAKTIFKAN' : 'AKTIFKAN'}
        </button>
      </div>

      {/* Admin KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Volume (24j)', value: 'Rp 12,5M', icon: FileText, color: 'blue' },
          { label: 'User Terdaftar', value: '4.820', icon: Users, color: 'indigo' },
          { label: 'Profit Platform', value: 'Rp 82jt', icon: Zap, color: 'emerald' },
          { label: 'Bonus Cashback', value: 'Rp 1.5jt', icon: Gift, color: 'purple' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-blue-200 transition-all">
            <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 text-${kpi.color}-600 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
              <kpi.icon size={24} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Persetujuan Transaksi */}
        <div className="xl:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Antrean Persetujuan</h3>
            <span className="px-3 py-1 bg-amber-500 text-white text-[9px] font-black rounded-full uppercase tracking-widest">
              {pendingTransactions.length} Pending
            </span>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-[9px] uppercase font-black tracking-[0.2em]">
                <tr>
                  <th className="px-8 py-5">Identitas</th>
                  <th className="px-8 py-5">Aset</th>
                  <th className="px-8 py-5 text-right">Jumlah (IDR)</th>
                  <th className="px-8 py-5 text-center">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pendingTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-slate-800 text-sm leading-tight">{tx.userName || 'Guest User'}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{new Date(tx.date).toLocaleDateString()}</p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${tx.type === 'WITHDRAW' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {tx.type}
                      </span>
                      <p className="text-[10px] font-black text-slate-500 mt-2 uppercase">{tx.assetSymbol} • {tx.network || 'VA'}</p>
                    </td>
                    <td className="px-8 py-6 text-right font-black text-slate-900">
                      {formatIDR(tx.fiatValue)}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-3">
                        <button className="w-10 h-10 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm">
                          <Check size={18} />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Control Panel */}
        <div className="bg-slate-900 rounded-[2rem] p-8 space-y-8 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <Settings className="text-blue-400" size={24} />
            </div>
            <h3 className="font-black uppercase tracking-widest text-xs">Global Controller</h3>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Trading Fee (%)</label>
                <span className="text-xs font-black text-blue-400">0.1%</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" defaultValue="0.1" className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500" />
            </div>
            
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Cashback Reward (%)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
                  <input type="number" defaultValue="0.05" className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm font-black focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                </div>
                <button className="px-5 py-3 bg-blue-600 text-white text-[10px] font-black uppercase rounded-xl hover:bg-blue-500 transition-all">SET</button>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-4">Pengumuman Global</h4>
              <textarea 
                placeholder="Tulis pesan darurat atau promo..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs font-medium focus:border-blue-500 outline-none h-28 mb-4 resize-none"
              />
              <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-widest shadow-xl">
                BROADCAST SEKARANG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
