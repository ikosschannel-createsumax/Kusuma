
import React, { useState } from 'react';
import { Asset, AssetType, Network } from '../types';
import { INITIAL_ASSETS, PAYMENT_METHODS, formatIDR, formatCrypto } from '../constants';
import { ArrowUpRight, ArrowDownLeft, Copy, Check, ChevronRight, Landmark, QrCode, Smartphone } from 'lucide-react';

const WalletView: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<Asset>(INITIAL_ASSETS[0]);
  const [copied, setCopied] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>(Network.TRC20);
  const [activeAction, setActiveAction] = useState<'INFO' | 'DEPOSIT' | 'WITHDRAW'>('INFO');
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);

  const mockAddress = {
    [Network.ERC20]: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    [Network.TRC20]: 'TLyC8f9u3jK9uJ4q7vW2N5Z1X1r7tM6xLz',
    [Network.BEP20]: '0x9E119b788050e82E85390E7756f7C9a16D8e6789'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Asset List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-black text-slate-800 uppercase tracking-widest text-xs">Saldo Saya</h3>
          </div>
          <div className="max-h-[600px] overflow-y-auto no-scrollbar">
            {INITIAL_ASSETS.map((asset) => (
              <button
                key={asset.id}
                onClick={() => { setSelectedAsset(asset); setActiveAction('INFO'); }}
                className={`w-full flex items-center justify-between p-4 transition-colors border-b border-slate-50 last:border-0 ${
                  selectedAsset.id === asset.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black" style={{ backgroundColor: asset.color }}>
                    {asset.symbol.substring(0, 1)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{asset.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800">
                    {asset.type === AssetType.FIAT 
                      ? formatIDR(asset.balance) 
                      : `${formatCrypto(asset.balance)} ${asset.symbol}`}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium">
                    ≈ {formatIDR(asset.balance * asset.priceIdr)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-[10px] font-black rounded-full mb-3 inline-block uppercase tracking-wider">
                  Detail {selectedAsset.symbol}
                </span>
                <h2 className="text-4xl font-black text-slate-900 mb-1">
                  {selectedAsset.type === AssetType.FIAT 
                    ? formatIDR(selectedAsset.balance) 
                    : `${formatCrypto(selectedAsset.balance, 8)} ${selectedAsset.symbol}`}
                </h2>
                <p className="text-slate-500 font-medium italic">Estimasi nilai Rupiah: {formatIDR(selectedAsset.balance * selectedAsset.priceIdr)}</p>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setActiveAction('DEPOSIT')}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeAction === 'DEPOSIT' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <ArrowDownLeft size={20} />
                  Deposit
                </button>
                <button 
                  onClick={() => setActiveAction('WITHDRAW')}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${activeAction === 'WITHDRAW' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  <ArrowUpRight size={20} />
                  Tarik
                </button>
              </div>
            </div>

            {/* Content Based on Action */}
            {activeAction === 'DEPOSIT' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {selectedAsset.type === AssetType.FIAT ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Metode Pembayaran</h4>
                      <div className="space-y-2">
                        {PAYMENT_METHODS.map(m => (
                          <button 
                            key={m.id}
                            onClick={() => setSelectedMethod(m.id)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl border font-bold text-sm transition-all ${selectedMethod === m.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300'}`}
                          >
                            <span className="flex items-center gap-3"><span>{m.icon}</span> {m.name}</span>
                            {selectedMethod === m.id && <Check size={18} />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Instruksi Pembayaran</h4>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Nomor Virtual Account</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black tracking-widest text-slate-900">8801 0812 3456 7890</span>
                          <button onClick={() => copyToClipboard('8801081234567890')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                        </div>
                      </div>
                      <div className="space-y-3 text-[11px] text-slate-500 italic">
                        <p>1. Masuk ke m-Banking Anda</p>
                        <p>2. Pilih Transfer > Virtual Account</p>
                        <p>3. Masukkan nomor VA di atas</p>
                        <p>4. Dana akan masuk otomatis dalam <span className="font-bold text-slate-700">1-3 menit</span></p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <div className="max-w-md mx-auto space-y-6 text-center">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 inline-block">
                        <QrCode size={180} className="text-slate-800" />
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {[Network.TRC20, Network.BEP20, Network.ERC20].map((net) => (
                          <button
                            key={net}
                            onClick={() => setSelectedNetwork(net)}
                            className={`py-3 rounded-xl font-black text-xs transition-all ${
                              selectedNetwork === net 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                              : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {net}
                          </button>
                        ))}
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-4">
                        <code className="text-xs font-mono font-bold text-slate-600 break-all">{mockAddress[selectedNetwork]}</code>
                        <button onClick={() => copyToClipboard(mockAddress[selectedNetwork])} className="p-2 shrink-0 bg-blue-50 text-blue-600 rounded-lg">
                          {copied ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 font-medium">Kirim hanya <span className="font-bold">{selectedAsset.symbol}</span> via jaringan <span className="font-bold">{selectedNetwork}</span>. Kesalahan jaringan dapat menyebabkan kehilangan dana.</p>
                    </div>
                  </div>
                )}
              </div>
            ) : activeAction === 'WITHDRAW' ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="max-w-xl mx-auto space-y-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Jumlah Penarikan</label>
                    <div className="relative">
                      <input type="number" placeholder="0.00" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 font-black outline-none focus:ring-2 focus:ring-blue-500" />
                      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100">MAX</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tujuan Penarikan</label>
                    <input 
                      type="text" 
                      placeholder={selectedAsset.type === AssetType.FIAT ? "Nomor Rekening Bank" : `Alamat Wallet ${selectedAsset.symbol}`} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex gap-3">
                    <Smartphone className="text-amber-500 shrink-0" size={20} />
                    <p className="text-[11px] text-amber-800 font-medium">Anda akan diminta memasukkan kode 2FA (Google Authenticator) setelah menekan tombol tarik.</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-500">Fee Penarikan: <span className="text-slate-900 font-black">{selectedAsset.type === AssetType.FIAT ? 'Rp 4.500' : '0.0001 BTC'}</span></div>
                    <button className="px-10 py-4 bg-rose-500 text-white font-black rounded-xl shadow-lg hover:bg-rose-600 transition-all active:scale-95">Tarik Sekarang</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-center text-center">
                  <Landmark className="mx-auto text-blue-600 mb-4" size={40} />
                  <h4 className="font-black text-slate-800 mb-2">Siap untuk Trading?</h4>
                  <p className="text-sm text-slate-500 mb-6">Deposit saldo IDR Anda untuk mulai membeli aset digital di pasar spot.</p>
                  <button onClick={() => setActiveAction('DEPOSIT')} className="py-3 bg-white border border-slate-200 text-blue-600 font-black rounded-xl hover:bg-slate-50">Isi Saldo Rupiah</button>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-indigo-900 p-6 rounded-2xl text-white">
                  <h4 className="text-lg font-black mb-2">Informasi Penting</h4>
                  <ul className="space-y-3 text-sm text-indigo-100 opacity-90 italic">
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Batas penarikan harian Rp 50.000.000 untuk level Anda.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> Gunakan 2FA untuk keamanan transaksi keluar.</li>
                    <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div> CS tersedia 24/7 jika ada kendala deposit.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletView;
