'use client';

import Link from 'next/link';
import { CheckCircle2, Share2, Users, Leaf, ChevronRight, QrCode, MessageCircle, Send, Heart } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-800 font-sans overflow-x-hidden relative">
      
      {/* ================= BACKGROUND LAYERS ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/arabesque.png')" }}></div>
        <div className="absolute right-[-10%] top-[-5%] w-[800px] h-[120%] bg-gradient-to-b from-[#f0ebd8] to-transparent rounded-t-[400px] border-[12px] border-white/60 shadow-[inset_0_0_50px_rgba(255,255,255,0.5)] hidden lg:block">
          <div className="absolute inset-6 rounded-t-[380px] border border-[#e6deca]"></div>
          <div className="absolute inset-8 rounded-t-[380px] border-2 border-[#e6deca]/50"></div>
        </div>
        <div className="absolute top-[20%] left-[5%] w-[600px] h-[600px] bg-white rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute -left-12 bottom-10 opacity-10 blur-[2px] text-[#143e2a] -rotate-45"><Leaf size={150} strokeWidth={1} fill="currentColor" /></div>
        <div className="absolute -left-4 bottom-32 opacity-10 blur-[3px] text-[#143e2a] -rotate-12"><Leaf size={100} strokeWidth={1} fill="currentColor" /></div>
        <div className="absolute right-1/4 -top-10 opacity-10 blur-[2px] text-[#8b6d43] rotate-45 hidden lg:block"><Leaf size={120} strokeWidth={1} fill="currentColor" /></div>
      </div>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-20">
        
        {/* ================= LOGO IMAGE ================= */}
        <Link href="/" className="flex items-center -ml-4">
          <img 
            src="/logo.png" 
            alt="Walimatul Logo" 
            className="h-28 w-auto object-contain mix-blend-multiply hover:opacity-90 transition-opacity" 
          />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-[#143e2a] transition">Features</Link>
          <Link href="#templates" className="hover:text-[#143e2a] transition">Templates</Link>
          <Link href="#how-it-works" className="hover:text-[#143e2a] transition">How It Works</Link>
          <Link href="#pricing" className="hover:text-[#143e2a] transition">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block px-5 py-2 text-sm font-medium text-[#143e2a] border border-slate-300 rounded-lg hover:border-[#143e2a] transition bg-white/50 backdrop-blur-sm">
            Sign Up
          </Link>
          <Link href="/login" className="px-5 py-2 text-sm font-medium bg-[#143e2a] text-white rounded-lg hover:bg-[#0f3020] transition shadow-md">
            Login
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        <div className="flex flex-col items-start relative z-20">
          <div className="flex items-center gap-2 bg-[#f0ebd8] text-[#8b6d43] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-sm border border-white/50">
            <Heart size={14} className="fill-current" />
            Dicipta Khas untuk Majlis Anda
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold text-[#143e2a] leading-[1.1] mb-6 drop-shadow-sm">
            Undangan Digital,<br />Kenangan Abadi
          </h1>

          <p className="text-slate-600 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
            Cipta kad jemputan perkahwinan digital yang indah bertemakan Melayu Islamik. Kongsi dengan mudah, pantau kehadiran tetamu dan raikan hari bahagia anda.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 text-[#143e2a] flex items-center justify-center">
                <Heart size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Rekaan Tema<br/>Perkahwinan</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 text-[#143e2a] flex items-center justify-center">
                <Share2 size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Mudah Dikongsi<br/>& Diakses</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 text-[#143e2a] flex items-center justify-center">
                <Users size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Pantau RSVP<br/>Secara Langsung</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm border border-slate-100 text-[#143e2a] flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Mesra Alam<br/>& Jimat Kos</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#143e2a] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f3020] transition shadow-lg shadow-[#143e2a]/20">
              Mula Mereka Bentuk Secara Percuma <ChevronRight size={18} />
            </Link>
            <Link href="#templates" className="flex items-center justify-center px-8 py-4 rounded-full font-medium text-[#143e2a] border-2 border-[#143e2a]/20 hover:border-[#143e2a] transition bg-white/50 backdrop-blur-sm">
              Lihat Template
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-8 text-sm font-medium text-slate-500">
            <CheckCircle2 size={16} className="text-[#143e2a]" />
            Selamat • Mudah • Dipercayai oleh ribuan pasangan
          </div>
        </div>

        {/* RIGHT COLUMN: VISUALS */}
        <div className="relative w-full h-[600px] flex justify-center items-center lg:justify-end mt-12 lg:mt-0">
          
          <div className="relative z-10 w-[280px] h-[580px] bg-white rounded-[3rem] border-[10px] border-[#1e1e1e] shadow-2xl overflow-hidden ring-1 ring-slate-900/5 transform transition hover:-translate-y-2 duration-500">
            <div className="absolute top-0 inset-x-0 h-6 bg-[#1e1e1e] w-[120px] mx-auto rounded-b-3xl z-20"></div>
            
            <div className="w-full h-full bg-[#fdfbf7] p-6 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/floral-flourishes.png')]"></div>
              
              <div className="relative z-10 mt-16 flex flex-col items-center">
                <p className="font-serif text-[#143e2a] text-2xl mb-1 drop-shadow-sm">بِسْمِ اللَّهِ</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6">Walimatul Urus</p>
                
                <h2 className="font-serif text-4xl text-[#143e2a] leading-tight">
                  Aiman<br/>&<br/>Nadia
                </h2>
                
                <div className="mt-8 border-y border-[#143e2a]/20 py-4 w-full">
                  <p className="text-sm font-bold text-[#143e2a]">Sabtu, 25 Mei 2026</p>
                  <p className="text-[10px] text-slate-500 mt-1">20 Zulkaedah 1447H</p>
                </div>
                
                <p className="text-xs font-medium text-slate-700 mt-6">Dewan Seri Melati<br/>Shah Alam, Selangor</p>
                
                <button className="mt-8 bg-[#c19b6c] text-white text-xs font-bold px-6 py-2 rounded-full shadow-md">
                  Kami Menjemput Anda
                </button>
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-white w-[220px] transform hover:scale-105 transition duration-500">
            <h4 className="text-sm font-bold text-[#143e2a] mb-3 text-center">Kongsi dengan<br/>orang tersayang</h4>
            
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm"><MessageCircle size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-sm"><Send size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </div>
            
            <div className="bg-white p-2 rounded-xl border border-slate-100 flex justify-center mb-3 shadow-sm">
              <QrCode size={80} className="text-slate-800" strokeWidth={1.5} />
            </div>
            
            <p className="text-[10px] text-center text-slate-500 font-medium">Imbas untuk lihat<br/>contoh kad</p>
          </div>

        </div>
      </main>

    </div>
  );
}