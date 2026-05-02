
import React, { useState } from 'react';
import { User } from '../types';
import { Shield, Smartphone, Mail, Lock, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SecurityView: React.FC = () => {
  const [user] = useState<User>({
    name: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    isKycVerified: false,
    kycStatus: 'PENDING',
    has2FA: true
  });

  const securityItems = [
    { 
      id: '2fa', 
      title: 'Autentikasi 2-Langkah (2FA)', 
      desc: 'Tambahkan lapisan keamanan ekstra pada akun Anda.', 
      status: user.has2FA, 
      icon: Smartphone, 
      color: 'blue' 
    },
    { 
      id: 'email', 
      title: 'Verifikasi Email', 
      desc: 'Email terverifikasi untuk notifikasi penarikan.', 
      status: true, 
      icon: Mail, 
      color: 'emerald' 
    },
    { 
      id: 'pass', 
      title: 'Kata Sandi Transaksi', 
      desc: 'PIN keamanan tambahan untuk setiap transaksi keluar.', 
      status: false, 
      icon: Lock, 
      color: 'amber' 
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <span className="text-3xl font-bold">BS</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
            <div className="flex gap-2 mt-2">
              <span className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                user.isKycVerified ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {user.isKycVerified ? <CheckCircle size={12} /> : <Clock size={12} />}
                KYC {user.kycStatus === 'PENDING' ? 'Dalam Proses' : user.kycStatus === 'VERIFIED' ? 'Terverifikasi' : 'Belum Verifikasi'}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-blue-600" size={24} />
              <h3 className="font-bold text-slate-800">Status Verifikasi ID (KYC)</h3>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Verifikasi identitas diperlukan untuk meningkatkan limit penarikan harian Anda hingga Rp 2.000.000.000 per hari.
            </p>
            {user.kycStatus === 'PENDING' ? (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="text-amber-500 mt-0.5" size={18} />
                <div className="text-xs text-amber-800">
                  <p className="font-bold mb-1">Dokumen Sedang Ditinjau</p>
                  <p>Proses verifikasi biasanya memakan waktu 1-2 hari kerja.</p>
                </div>
              </div>
            ) : (
              <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                Mulai Verifikasi Sekarang
              </button>
            )}
          </div>

          <div className="space-y-4">
            {securityItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg bg-${item.color}-50 text-${item.color}-600`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${item.status ? 'bg-blue-600' : 'bg-slate-200'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.status ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
        <div className="flex gap-4">
          <div className="p-2 bg-rose-100 rounded-lg text-rose-600 h-fit">
            <Lock size={20} />
          </div>
          <div>
            <h3 className="font-bold text-rose-900 mb-1">Pengaturan Keamanan Lanjutan</h3>
            <p className="text-sm text-rose-700 mb-4">Amankan akun Anda dengan Whitelist Alamat Penarikan dan Batasi login berdasarkan IP.</p>
            <button className="text-sm font-bold text-rose-600 underline hover:text-rose-800">Konfigurasi Sekarang</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityView;
