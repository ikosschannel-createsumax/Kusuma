
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import DashboardView from './DashboardView';
import WalletView from './WalletView';
import SecurityView from './SecurityView';
import TradingView from './TradingView';
import AdminView from './AdminView';
import RewardsView from './RewardsView';
import ReferralView from './ReferralView';
import LeaderboardView from './LeaderboardView';
import { Bell, Search, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'wallet': return <WalletView />;
      case 'trading': return <TradingView />;
      case 'rewards': return <RewardsView />;
      case 'referral': return <ReferralView />;
      case 'leaderboard': return <LeaderboardView />;
      case 'security': return <SecurityView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Utama';
      case 'wallet': return 'Dompet & Aset';
      case 'trading': return 'Spot Market Trading';
      case 'rewards': return 'Event & Hadiah';
      case 'referral': return 'Program Referral';
      case 'leaderboard': return 'Leaderboard';
      case 'security': return 'Keamanan';
      case 'admin': return 'Admin Panel';
      default: return 'NusaCrypto';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} toggleTheme={toggleTheme} />
      
      <main className="flex-1 lg:ml-72 min-w-0">
        <header className={`h-24 px-8 flex items-center justify-between sticky top-0 z-30 border-b ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-100'} backdrop-blur-md`}>
          <div>
            <h1 className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-1">NusaCrypto</h1>
            <h2 className="text-xl font-black">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600"><Bell size={20} /></button>
            <div className="flex items-center gap-3 p-1 pl-4 bg-slate-100/50 rounded-xl border border-slate-200">
               <div className="text-right hidden sm:block">
                  <p className="text-xs font-black">Budi Santoso</p>
                  <p className="text-[9px] text-emerald-500 font-bold">VERIFIED</p>
               </div>
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white"><UserIcon size={20} /></div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
