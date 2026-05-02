
import React, { useState } from 'react';
import { Users, Copy, Check, Share2, Award, Zap } from 'lucide-react';
import { formatIDR } from '../constants';

const ReferralView: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const referralCode = "NUSA-BUDI-2024";

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="bg-blue-600 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-black leading-tight">Ajak Teman, <br/>Cuan Bersama!</h2>
            <p className="text-blue-100 font-medium">Dapatkan komisi hingga 20% dari setiap biaya transaksi teman yang Anda ajak bergabung di NusaCrypto.</p>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-2xl border border-white/20">
                <p className="text-[10px] font-black uppercase opacity-60">Total Reward</p>
                <p className="text-xl font-black">{formatIDR(1250000)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur px-4 py-3 rounded-2xl border border-white/20">
                <p className="text-[10px] font-black uppercase opacity-60">Teman Bergabung</p>
                <p className="text-xl font-black">12 Orang</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 text-slate-900 shadow-xl">
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Kode Referral Anda</p>
             <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 mb-6 group">
                <span className="flex-1 text-2xl font-black tracking-widest text-blue-600">{referralCode}</span>
                <button onClick={copyCode} className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
             </div>
             <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all">
                <Share2 size={20} /> BAGIKAN SEKARANG
             </button>
          </div>
        </div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      {/* Steps & Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Share2, title: 'Bagikan Kode', desc: 'Sebarkan link atau kode referral ke teman.' },
          { icon: Zap, title: 'Teman Trading', desc: 'Teman Anda melakukan jual-beli di market.' },
          { icon: Award, title: 'Terima Komisi', desc: 'Bonus masuk otomatis ke dompet IDR Anda.' },
        ].map((step, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
              <step.icon size={24} />
            </div>
            <h4 className="font-black text-slate-800">{step.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Referral History */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm flex items-center gap-2">
               <Users size={18} className="text-blue-600" /> Riwayat Referral
            </h3>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">Nama Teman</th>
                  <th className="px-6 py-4">Tanggal Bergabung</th>
                  <th className="px-6 py-4 text-right">Volume (IDR)</th>
                  <th className="px-6 py-4 text-right">Komisi Anda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[
                  { name: 'Andi Pratama', date: '12 Mei 2024', volume: 50000000, reward: 50000 },
                  { name: 'Sari Rahma', date: '08 Mei 2024', volume: 120000000, reward: 120000 },
                  { name: 'Doni Salman', date: '05 Mei 2024', volume: 2000000, reward: 2000 },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800">{row.name}</td>
                    <td className="px-6 py-4 text-slate-500 font-medium">{row.date}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700">{formatIDR(row.volume)}</td>
                    <td className="px-6 py-4 text-right font-black text-emerald-600">{formatIDR(row.reward)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ReferralView;
