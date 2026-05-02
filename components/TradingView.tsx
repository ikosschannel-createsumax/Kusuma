
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { INITIAL_ASSETS, ORDER_BOOK_BUY, ORDER_BOOK_SELL, formatIDR, formatCrypto } from '../constants';
import { ArrowUpDown, Info, TrendingUp, TrendingDown } from 'lucide-react';

const TradingView: React.FC = () => {
  const [activePair, setActivePair] = useState('BTC/IDR');
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [price, setPrice] = useState('1450000000');
  const [amount, setAmount] = useState('0.005');

  const btcAsset = INITIAL_ASSETS.find(a => a.symbol === 'BTC')!;
  const idrAsset = INITIAL_ASSETS.find(a => a.symbol === 'IDR')!;

  const chartData = [
    { time: '09:00', price: 1445000000 },
    { time: '10:00', price: 1450000000 },
    { time: '11:00', price: 1448000000 },
    { time: '12:00', price: 1455000000 },
    { time: '13:00', price: 1462000000 },
    { time: '14:00', price: 1450000000 },
  ];

  const totalCost = parseFloat(price) * parseFloat(amount) || 0;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 h-full">
      {/* Chart and Market Info */}
      <div className="xl:col-span-3 space-y-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">B</div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{activePair}</h3>
                <p className="text-xs text-slate-500 font-medium">Bitcoin / Indonesian Rupiah</p>
              </div>
              <div className="ml-6 border-l pl-6 border-slate-100">
                <p className="text-xl font-black text-slate-900">{formatIDR(1450000000)}</p>
                <p className="text-xs font-bold text-emerald-500">+2.5% (24j)</p>
              </div>
            </div>
            <div className="hidden md:flex gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
              <div>
                <p>High</p>
                <p className="text-slate-700">1.465.000.000</p>
              </div>
              <div>
                <p>Low</p>
                <p className="text-slate-700">1.432.000.000</p>
              </div>
              <div>
                <p>Volume (24j)</p>
                <p className="text-slate-700">124.52 BTC</p>
              </div>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis hide domain={['dataMin - 5000000', 'dataMax + 5000000']} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(val: number) => [formatIDR(val), 'Harga BTC']}
                />
                <Area type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorPrice)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade History / Open Orders */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button className="px-6 py-4 text-sm font-bold border-b-2 border-blue-600 text-blue-600">Order Terbuka</button>
            <button className="px-6 py-4 text-sm font-bold text-slate-400 hover:text-slate-600">Riwayat Trading</button>
          </div>
          <div className="p-8 text-center text-slate-400">
            <p className="text-sm">Tidak ada order terbuka saat ini.</p>
          </div>
        </div>
      </div>

      {/* Side Panel: Order Book & Forms */}
      <div className="space-y-4">
        {/* Buy/Sell Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <div className="flex gap-1 p-1 bg-slate-100 rounded-xl mb-6">
            <button 
              onClick={() => setOrderType('BUY')}
              className={`flex-1 py-2 rounded-lg text-sm font-black transition-all ${orderType === 'BUY' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-500'}`}
            >
              BELI
            </button>
            <button 
              onClick={() => setOrderType('SELL')}
              className={`flex-1 py-2 rounded-lg text-sm font-black transition-all ${orderType === 'SELL' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-500'}`}
            >
              JUAL
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                <span>Harga</span>
                <span>IDR</span>
              </div>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
                <span>Jumlah</span>
                <span>BTC</span>
              </div>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                <span>Total Estimasi</span>
                <span className="text-slate-900">{formatIDR(totalCost)}</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 italic">
                <span>Fee (0.1%)</span>
                <span>{formatIDR(totalCost * 0.001)}</span>
              </div>
            </div>

            <button className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all active:scale-95 ${orderType === 'BUY' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-rose-500 hover:bg-rose-600'}`}>
              {orderType === 'BUY' ? 'BELI BITCOIN' : 'JUAL BITCOIN'}
            </button>
            
            <p className="text-[10px] text-center text-slate-400 font-medium">
              Saldo: {orderType === 'BUY' ? formatIDR(idrAsset.balance) : `${formatCrypto(btcAsset.balance)} BTC`}
            </p>
          </div>
        </div>

        {/* Order Book */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[450px] flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">Order Book</h4>
            <div className="flex gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden text-[10px]">
            {/* Sells (Asks) */}
            <div className="flex-1 flex flex-col-reverse p-2">
              {ORDER_BOOK_SELL.map((order) => (
                <div key={order.id} className="grid grid-cols-3 py-1 px-2 hover:bg-rose-50 rounded transition-colors relative">
                  <span className="text-rose-500 font-bold">{order.price.toLocaleString()}</span>
                  <span className="text-right text-slate-500 font-medium">{order.amount}</span>
                  <span className="text-right text-slate-400">{formatCrypto(order.total / 1000000, 1)}M</span>
                  <div className="absolute right-0 top-0 bottom-0 bg-rose-500/5" style={{ width: `${(order.amount / 0.2) * 100}%` }}></div>
                </div>
              ))}
            </div>

            <div className="py-3 px-4 bg-slate-900 text-white flex justify-between items-center font-black">
              <span className="text-lg">1.450.000.000</span>
              <TrendingUp size={16} className="text-emerald-400" />
            </div>

            {/* Buys (Bids) */}
            <div className="flex-1 p-2">
              {ORDER_BOOK_BUY.map((order) => (
                <div key={order.id} className="grid grid-cols-3 py-1 px-2 hover:bg-emerald-50 rounded transition-colors relative">
                  <span className="text-emerald-500 font-bold">{order.price.toLocaleString()}</span>
                  <span className="text-right text-slate-500 font-medium">{order.amount}</span>
                  <span className="text-right text-slate-400">{formatCrypto(order.total / 1000000, 1)}M</span>
                  <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/5" style={{ width: `${(order.amount / 0.2) * 100}%` }}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingView;
