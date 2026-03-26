import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cards = [
  { icon: '📊', label: 'Analytics', desc: 'View your usage insights' },
  { icon: '⚙️', label: 'Settings', desc: 'Manage account preferences' },
  { icon: '🔔', label: 'Notifications', desc: 'Check recent alerts' },
  { icon: '📁', label: 'Projects', desc: 'Browse your workspace' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { setUser(null); }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Topbar */}
      <header className="bg-gray-900 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-indigo-400 text-xl">◈</span>
          <span className="font-extrabold tracking-widest text-lg">
Avyukt Core Technology</span>
        </div>
        <button
          onClick={handleLogout}
          className="border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 text-gray-400 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center py-14 px-4 text-center">
        <div className="p-0.5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-5">
          <div className="w-20 h-20 rounded-full bg-gray-900 flex items-center justify-center text-3xl font-extrabold text-indigo-400">
            {user?.firstName ? user.firstName[0].toUpperCase() : '?'}
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-2">
          Hello, <span className="text-indigo-400">{user?.firstName || 'User'}</span> 👋
        </h2>
        <span className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest px-4 py-1.5 rounded-full uppercase">
          {user?.role || 'CLIENT'}
        </span>
      </section>

      {/* Cards */}
      <main className="max-w-3xl mx-auto px-6 pb-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cards.map(({ icon, label, desc }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 cursor-pointer transition-colors group"
          >
            <div className="text-3xl mb-4">{icon}</div>
            <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition-colors mb-1">{label}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </div>
        ))}
      </main>
    </div>
  );
}