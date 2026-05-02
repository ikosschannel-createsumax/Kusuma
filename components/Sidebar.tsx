
import React from 'react';
import { LayoutDashboard, Wallet, TrendingUp, ShieldCheck, History, LogOut, Menu, X, Landmark, UserCog, Gift, Users, Trophy, Sun, Moon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark?: boolean;
  toggleTheme?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'wallet', label: 'Dompet Saya', icon: Wallet },
    { id: 'trading', label: 'Bursa Kripto', icon: TrendingUp },
    { id: 'rewards', label: 'Reward & Event', icon: Gift },
    { id: 'referral', label: 'Referral', icon: Users },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'security', label: 'Keamanan', icon: ShieldCheck },
    { id: 'admin', label: 'Admin Panel', icon: UserCog },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-8 px-5">
      <div className="flex items-center justify-between mb-10 px-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-200">N</div>
          <h1 className="text-xl font-black tracking-tighter text-slate-900 uppercase">NusaCrypto</h1>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all border border-slate-200"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon size={22} className={`${activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`} />
            <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-slate-100 space-y-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100/50">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Status Sistem</p>
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-sm"></div>
            <p className="text-xs font-black text-slate-700 tracking-tight">Mainnet Stable</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-rose-500 hover:bg-rose-50 transition-all font-black text-xs uppercase tracking-widest">
          <LogOut size={22} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-6 left-6 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 text-slate-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-md"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Mobile Sidebar */}
      <aside className={`lg:hidden fixed left-0 top-0 z-50 h-screen w-80 bg-white transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
