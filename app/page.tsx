'use client';

import Link from 'next/link';
import { Moon, CheckCircle2, Share2, Users, Leaf, ChevronRight, QrCode, MessageCircle, Send } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#faf8f3] text-slate-800 font-sans overflow-x-hidden relative">
      
      {/* BACKGROUND DECORATIONS (Subtle Mosque/Floral silhouettes can be placed here) */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#f0ebd8] rounded-full blur-3xl opacity-40 -z-10 translate-x-1/3 -translate-y-1/4"></div>

      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#143e2a] rounded-md flex items-center justify-center text-white">
            <Moon size={24} />
          </div>
          <span className="text-2xl font-serif font-bold text-[#143e2a]">Walimatul</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="hover:text-[#143e2a] transition">Features</Link>
          <Link href="#templates" className="hover:text-[#143e2a] transition">Templates</Link>
          <Link href="#how-it-works" className="hover:text-[#143e2a] transition">How It Works</Link>
          <Link href="#pricing" className="hover:text-[#143e2a] transition">Pricing</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block px-5 py-2 text-sm font-medium text-[#143e2a] border border-slate-300 rounded-lg hover:border-[#143e2a] transition">
            Sign Up
          </Link>
          <Link href="/dashboard" className="px-5 py-2 text-sm font-medium bg-[#143e2a] text-white rounded-lg hover:bg-[#0f3020] transition shadow-md">
            Login
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* LEFT COLUMN: TEXT & CTA */}
        <div className="flex flex-col items-start">
          
          {/* Badge */}
          <div className="flex items-center gap-2 bg-[#f0ebd8] text-[#8b6d43] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Moon size={14} className="fill-current" />
            Dicipta Khas untuk Majlis Anda
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif font-bold text-[#143e2a] leading-[1.1] mb-6">
            Undangan Digital,<br />Kenangan Abadi
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Cipta kad jemputan perkahwinan digital yang indah bertemakan Melayu Islamik. Kongsi dengan mudah, pantau kehadiran tetamu dan raikan hari bahagia anda.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#e8efe9] text-[#143e2a] flex items-center justify-center">
                <Moon size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Rekaan Bertema<br/>Melayu Islamik</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#e8efe9] text-[#143e2a] flex items-center justify-center">
                <Share2 size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Mudah Dikongsi<br/>& Diakses</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#e8efe9] text-[#143e2a] flex items-center justify-center">
                <Users size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Pantau RSVP<br/>Secara Langsung</span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="w-10 h-10 rounded-lg bg-[#e8efe9] text-[#143e2a] flex items-center justify-center">
                <Leaf size={20} />
              </div>
              <span className="text-xs font-semibold text-slate-700 leading-tight">Mesra Alam<br/>& Jimat Kos</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/dashboard" className="flex items-center justify-center gap-2 bg-[#143e2a] text-white px-8 py-4 rounded-full font-medium hover:bg-[#0f3020] transition shadow-lg shadow-[#143e2a]/20">
              Mula Mereka Bentuk Secara Percuma <ChevronRight size={18} />
            </Link>
            <Link href="#templates" className="flex items-center justify-center px-8 py-4 rounded-full font-medium text-[#143e2a] border-2 border-[#143e2a]/20 hover:border-[#143e2a] transition bg-white/50 backdrop-blur-sm">
              Lihat Template
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="flex items-center gap-2 mt-8 text-sm font-medium text-slate-500">
            <CheckCircle2 size={16} className="text-[#143e2a]" />
            Selamat • Mudah • Dipercayai oleh ribuan pasangan
          </div>
        </div>

        {/* RIGHT COLUMN: VISUALS */}
        <div className="relative w-full h-[600px] flex justify-center items-center lg:justify-end mt-12 lg:mt-0">
          
          {/* Mockup iPhone */}
          <div className="relative z-10 w-[280px] h-[580px] bg-white rounded-[3rem] border-[10px] border-[#1e1e1e] shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
            {/* iPhone Notch */}
            <div className="absolute top-0 inset-x-0 h-6 bg-[#1e1e1e] w-[120px] mx-auto rounded-b-3xl z-20"></div>
            
            {/* Mini Invitation Template inside the phone */}
            <div className="w-full h-full bg-[#fdfbf7] p-6 flex flex-col items-center text-center relative">
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/floral-flourishes.png')]"></div>
              
              <div className="relative z-10 mt-16 flex flex-col items-center">
                <p className="font-serif text-[#143e2a] text-2xl mb-1">بِسْمِ اللَّهِ</p>
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

          {/* Floating Share / QR Card */}
          <div className="absolute top-1/2 -right-4 lg:-right-12 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white w-[220px]">
            <h4 className="text-sm font-bold text-[#143e2a] mb-3 text-center">Kongsi dengan<br/>orang tersayang</h4>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm"><MessageCircle size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center shadow-sm"><Send size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </div>
            </div>
            
            {/* QR Code Placeholder */}
            <div className="bg-white p-2 rounded-xl border border-slate-100 flex justify-center mb-3">
              <QrCode size={80} className="text-slate-800" strokeWidth={1} />
            </div>
            
            <p className="text-[10px] text-center text-slate-500 font-medium">Imbas untuk lihat<br/>contoh kad</p>
          </div>

        </div>
      </main>

      {/* TEMPLATE SECTION HEADER (To complete the look) */}
      <section id="templates" className="max-w-7xl mx-auto px-6 py-12 text-center">
        <h3 className="font-serif text-3xl font-bold text-[#143e2a] mb-2">Template Popular</h3>
        <div className="flex items-center justify-center gap-2 text-[#c19b6c]">
          <span className="w-12 h-px bg-[#c19b6c]/40"></span>
          <Moon size={16} />
          <span className="w-12 h-px bg-[#c19b6c]/40"></span>
        </div>
        
        {/* Placeholder for template cards */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 opacity-50">
          <div className="aspect-[3/4] bg-slate-200 rounded-2xl"></div>
          <div className="aspect-[3/4] bg-slate-200 rounded-2xl"></div>
          <div className="aspect-[3/4] bg-slate-200 rounded-2xl"></div>
          <div className="aspect-[3/4] bg-slate-200 rounded-2xl"></div>
        </div>
      </section>

    </div>
  );
}