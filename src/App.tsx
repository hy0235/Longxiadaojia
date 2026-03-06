import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radar, 
  Terminal, 
  User, 
  Package, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Cpu, 
  MessageSquare,
  Zap,
  LayoutDashboard,
  MapPin,
  Search
} from 'lucide-react';
import { SERVICE_PACKAGES, MOCK_TUNERS, Tuner, ServicePackage } from './constants';

type Page = 'home' | 'tuners' | 'orders' | 'profile' | 'merchant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedTuner, setSelectedTuner] = useState<Tuner | null>(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onSelectPackage={() => setCurrentPage('tuners')} />;
      case 'tuners':
        return <TunersPage onSelectTuner={(t) => setSelectedTuner(t)} />;
      case 'orders':
        return <OrdersPage />;
      case 'profile':
        return <ProfilePage />;
      case 'merchant':
        return <MerchantDashboard />;
      default:
        return <HomePage onSelectPackage={() => setCurrentPage('tuners')} />;
    }
  };

  return (
    <div className="min-h-screen pb-24 font-sans bg-bg-gray">
      <AnimatePresence mode="wait">
        <motion.main
          key={currentPage + (selectedTuner ? '-detail' : '')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-md mx-auto"
        >
          {selectedTuner ? (
            <TunerDetailPage tuner={selectedTuner} onBack={() => setSelectedTuner(null)} />
          ) : (
            <div className="px-4 pt-6">
              {renderPage()}
            </div>
          )}
        </motion.main>
      </AnimatePresence>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 px-2 py-3 flex justify-around items-center shadow-lg">
        <NavButton 
          active={currentPage === 'home'} 
          onClick={() => { setCurrentPage('home'); setSelectedTuner(null); }}
          icon={<Package size={22} />}
          label="方案"
        />
        <NavButton 
          active={currentPage === 'tuners'} 
          onClick={() => { setCurrentPage('tuners'); setSelectedTuner(null); }}
          icon={<Radar size={22} />}
          label="雷达"
        />
        <NavButton 
          active={currentPage === 'orders'} 
          onClick={() => { setCurrentPage('orders'); setSelectedTuner(null); }}
          icon={<Terminal size={22} />}
          label="控制台"
        />
        <NavButton 
          active={currentPage === 'profile'} 
          onClick={() => { setCurrentPage('profile'); setSelectedTuner(null); }}
          icon={<User size={22} />}
          label="我的"
        />
        <div className="w-px h-6 bg-gray-100 mx-1" />
        <NavButton 
          active={currentPage === 'merchant'} 
          onClick={() => { setCurrentPage('merchant'); setSelectedTuner(null); }}
          icon={<LayoutDashboard size={22} />}
          label="商户"
        />
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-all duration-200 ${active ? 'text-primary-green' : 'text-text-muted hover:text-text-main'}`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function HomePage({ onSelectPackage }: { onSelectPackage: () => void }) {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-primary-green font-bold text-xl">
          <Zap size={24} fill="currentColor" />
          <span>虾装宝</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted bg-white px-3 py-1.5 rounded-full shadow-sm">
          <MapPin size={12} />
          <span>上海市 · 浦东新区</span>
        </div>
      </header>

      {/* Banner */}
      <div className="relative h-40 rounded-2xl overflow-hidden shadow-md">
        <img 
          src="https://picsum.photos/seed/service/800/400" 
          alt="Banner" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6 text-white">
          <h2 className="text-2xl font-bold">专业上门安装</h2>
          <p className="text-xs opacity-80 mt-1">懂你的龙虾，更懂你的温度</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-text-main">热门方案</h2>
          <button className="text-[10px] text-text-muted uppercase tracking-widest">查看全部</button>
        </div>
        <div className="grid gap-4">
          {SERVICE_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={onSelectPackage}
              className="service-card p-4 flex gap-4 cursor-pointer active:bg-gray-50 transition-colors"
            >
              <div className="w-20 h-20 rounded-lg bg-primary-light flex items-center justify-center text-primary-green shrink-0">
                <Package size={32} />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-text-main">{pkg.name}</h3>
                  <p className="text-[10px] text-text-muted mt-0.5">{pkg.hardware}</p>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-primary-green">¥{pkg.price}</span>
                  <button className="bg-primary-green text-white text-[10px] px-4 py-1.5 rounded-full font-bold">立即预约</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center py-4 opacity-30 text-[10px] tracking-widest uppercase">
        专业 · 安全 · 快捷
      </footer>
    </div>
  );
}

function TunersPage({ onSelectTuner }: { onSelectTuner: (t: Tuner) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-3">
        <Search size={18} className="text-text-muted" />
        <input type="text" placeholder="搜索调优师姓名或技能..." className="bg-transparent text-sm w-full outline-none" />
      </div>

      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold text-text-main">推荐调优师</h2>
        <div className="flex items-center gap-1 text-[10px] text-primary-green">
          <Radar size={12} className="animate-spin" />
          <span>正在寻找最优匹配...</span>
        </div>
      </div>

      <div className="grid gap-4">
        {MOCK_TUNERS.map((tuner) => (
          <div
            key={tuner.id}
            onClick={() => onSelectTuner(tuner)}
            className="service-card overflow-hidden cursor-pointer active:bg-gray-50 transition-colors"
          >
            <div className="flex p-4 gap-4">
              <div className="w-24 h-32 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={tuner.avatar} 
                  alt={tuner.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-text-main">{tuner.name}</h3>
                  <div className="flex items-center gap-1 text-orange-400 text-xs font-bold">
                    <Star size={12} fill="currentColor" />
                    {tuner.rating}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tuner.tags.map(tag => (
                    <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-primary-light text-primary-green font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-text-muted italic line-clamp-2">
                  "{tuner.manifesto}"
                </p>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[10px] text-text-muted">{tuner.orders} 次调优经验</span>
                  <span className="text-[10px] font-bold text-primary-green">查看详情</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TunerDetailPage({ tuner, onBack }: { tuner: Tuner, onBack: () => void }) {
  return (
    <div className="bg-white min-h-screen">
      <div className="relative h-96">
        <img src={tuner.avatar} alt={tuner.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        <button 
          onClick={onBack} 
          className="absolute top-6 left-4 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"
        >
          <ChevronRight size={24} className="rotate-180" />
        </button>
      </div>

      <div className="relative -mt-8 bg-white rounded-t-[32px] p-6 space-y-6 shadow-2xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-text-main">{tuner.name}</h1>
            <div className="flex gap-2 mt-2">
              {tuner.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-1 rounded-md bg-primary-light text-primary-green font-bold">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-green">{tuner.rating}</div>
            <div className="text-[10px] text-text-muted uppercase font-bold">综合评分</div>
          </div>
        </div>

        <div className="bg-bg-gray rounded-2xl p-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-text-main font-bold text-lg">100%</div>
            <div className="text-[9px] text-text-muted uppercase font-bold">准时率</div>
          </div>
          <div className="border-x border-gray-200">
            <div className="text-text-main font-bold text-lg">{tuner.orders}</div>
            <div className="text-[9px] text-text-muted uppercase font-bold">服务单数</div>
          </div>
          <div>
            <div className="text-text-main font-bold text-lg">15min</div>
            <div className="text-[9px] text-text-muted uppercase font-bold">平均响应</div>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-text-main">专业技能</h3>
          <div className="flex flex-wrap gap-2">
            {tuner.skills.map(skill => (
              <div key={skill} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-bg-gray text-xs font-medium">
                <Zap size={14} className="text-primary-green" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-text-main">服务宣言</h3>
          <p className="text-sm text-text-muted leading-relaxed italic">
            "{tuner.manifesto}"
          </p>
        </div>

        <div className="pt-4 flex gap-3">
          <button className="flex-1 py-4 rounded-2xl bg-bg-gray text-primary-green text-sm font-bold flex items-center justify-center gap-2">
            <MessageSquare size={18} />
            私聊
          </button>
          <button className="flex-[2] py-4 rounded-2xl bg-primary-green text-white text-sm font-bold shadow-lg shadow-primary-green/20">
            立即预约
          </button>
        </div>

        <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
          <ShieldCheck className="text-emerald-500" size={24} />
          <div className="text-[11px] text-emerald-800 leading-tight">
            <span className="font-bold">安全保障：</span>
            本平台所有调优师均经过实名认证与技术考核，服务过程由平台担保，不满意可申请退款。
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold text-text-main px-1">我的订单</h2>
      <div className="flex flex-col items-center justify-center py-32 space-y-4 opacity-20">
        <Terminal size={64} />
        <p className="text-sm font-medium">暂无进行中的调优任务</p>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 px-2">
        <div className="w-20 h-20 rounded-full bg-white shadow-md border-4 border-white overflow-hidden">
          <img src="https://picsum.photos/seed/user/200" alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-text-main">极客用户_729</h2>
          <p className="text-xs text-text-muted mt-1">手机号：138****8888</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ProfileStat label="优惠券" value="0" />
        <ProfileStat label="余额" value="¥0.00" />
        <ProfileStat label="积分" value="120" />
      </div>

      <div className="service-card overflow-hidden">
        <ProfileItem icon={<ShieldCheck size={20} className="text-blue-500" />} label="实名认证" />
        <ProfileItem icon={<Cpu size={20} className="text-purple-500" />} label="我的硬件" />
        <ProfileItem icon={<MessageSquare size={20} className="text-orange-500" />} label="意见反馈" />
        <ProfileItem icon={<Zap size={20} className="text-yellow-500" />} label="关于虾装宝" last />
      </div>

      <button className="w-full py-4 bg-white text-red-500 font-bold rounded-xl shadow-sm">退出登录</button>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm text-center space-y-1">
      <div className="text-lg font-bold text-text-main">{value}</div>
      <div className="text-[10px] text-text-muted font-bold">{label}</div>
    </div>
  );
}

function ProfileItem({ icon, label, last }: { icon: React.ReactNode, label: string, last?: boolean }) {
  return (
    <div className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!last ? 'border-b border-gray-50' : ''}`}>
      <div className="flex items-center gap-3 text-text-main">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  );
}

function MerchantDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-sm font-bold text-text-main px-1">商户中心</h2>

      <div className="service-card p-8 text-center space-y-6">
        <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center mx-auto">
          <Cpu size={48} className="text-primary-green" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text-main">成为调优师</h3>
          <p className="text-xs text-text-muted leading-relaxed">
            如果您精通 Python、Docker 或 Mac 硬件调优，<br />
            欢迎加入“虾装宝”极客社区。
          </p>
        </div>
        
        <div className="space-y-4 pt-4">
          <div className="text-left space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-muted ml-1 uppercase">艺名 / 代号</label>
              <input type="text" placeholder="如：首席调试员-克里斯" className="w-full bg-bg-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-green transition-colors" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-text-muted ml-1 uppercase">服务宣言</label>
              <textarea placeholder="写一句能触动客户内心的话..." className="w-full bg-bg-gray border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-green transition-colors h-24" />
            </div>
          </div>
          
          <button className="w-full py-4 primary-button text-sm font-bold shadow-lg shadow-primary-green/20">
            提交入驻申请
          </button>
          <p className="text-[10px] text-text-muted">
            需缴纳 500 元技术合规保证金
          </p>
        </div>
      </div>
    </div>
  );
}
