'use client';

import { useState, useEffect, useRef } from 'react';
import { WeddingInvitationData } from '@/types/invitation';
import { Map, Navigation, CalendarHeart, Clock, MapPin, Music, VolumeX, DoorOpen } from 'lucide-react';

export default function ElegantTemplate({ data }: { data: WeddingInvitationData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [particles, setParticles] = useState<{ id: number; type: string; size: number; left: number; top: number; duration: number; delay: number }[]>([]);
  const [butterflies, setButterflies] = useState<{ id: number; tx: number; ty: number; rot: string; dur: number }[]>([]);

  const details = data.details || {
    invitationText: 'Dengan penuh rasa kesyukuran, kami menjemput Dato/Datin/Tuan/Puan/Encik/Cik hadir ke majlis perkahwinan kami',
    date: 'Sabtu, 25 Disember 2026',
    time: '11:00 Pagi - 4:00 Petang',
    address: 'Grand Ballroom, Royale Chulan',
    googleMapsUrl: '#',
    wazeUrl: '#'
  };

  // Generate Magic Rain & Bokeh Particles
  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 45; i++) {
      newParticles.push({
        id: i,
        type: Math.random() > 0.7 ? 'diamond' : 'sparkle-inner',
        size: Math.random() > 0.7 ? Math.random() * 6 + 6 : Math.random() * 4 + 3,
        left: Math.random() * 100,
        top: 0,
        duration: Math.random() * 7 + 5,
        delay: Math.random() * 5,
      });
    }
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i + 100,
        type: 'bokeh-light',
        size: Math.random() * 40 + 20,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
      });
    }
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i + 200,
        type: 'gold-petal',
        size: Math.random() * 4 + 3,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 7 + 6,
        delay: Math.random() * 5,
      });
    }
    setParticles(newParticles);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      setIsPlaying(true);
    }

    // Release Butterflies
    const newButterflies = [];
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 50;
      newButterflies.push({
        id: i,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        rot: (angle * 180 / Math.PI) + 90 + 'deg',
        dur: Math.random() * 3 + 4
      });
    }
    setButterflies(newButterflies);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log(e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#f4f1eb] text-[#3e3128] overflow-x-hidden font-montserrat">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@200;300;400;500;600;700&display=swap');
        
        .font-alex { font-family: 'Alex Brush', cursive; }
        .font-amiri { font-family: 'Amiri', serif; }
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }

        .diamond { position: absolute; background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%); transform: rotate(45deg); box-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 25px rgba(255,255,255,0.6); animation: fallDiamond linear infinite; }
        .sparkle-inner { position: absolute; background-color: #fff; border-radius: 50%; box-shadow: 0 0 8px #fff, 0 0 15px ${data.colors.primary}, 0 0 20px ${data.colors.primary}; animation: fallGlitter linear infinite; }
        .bokeh-light { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%); opacity: 0; animation: floatBokeh linear infinite; }
        .gold-petal { position: absolute; background: linear-gradient(135deg, ${data.colors.primary}, #fff); box-shadow: 0 0 5px ${data.colors.primary}; opacity: 0; animation: floatPetal linear infinite; border-radius: 2px 10px 2px 10px; }
        
        @keyframes fallDiamond { 0% { transform: translateY(-5vh) rotate(45deg) scale(0.5); opacity: 0; } 10% { opacity: 1; transform: translateY(5vh) rotate(90deg) scale(1.2); } 80% { opacity: 0.9; transform: translateY(80vh) rotate(315deg) scale(1); } 100% { transform: translateY(110vh) rotate(360deg) scale(0.5); opacity: 0; } }
        @keyframes fallGlitter { 0% { transform: translateY(-5vh) scale(0.5); opacity: 0; } 15% { opacity: 1; transform: translateY(15vh) scale(1.5); } 85% { opacity: 0.8; transform: translateY(85vh) scale(1); } 100% { transform: translateY(110vh) scale(0.5); opacity: 0; } }
        @keyframes floatBokeh { 0% { transform: translateY(10vh) scale(0.5); opacity: 0; } 50% { opacity: 0.6; } 100% { transform: translateY(-80vh) scale(1.5); opacity: 0; } }
        @keyframes floatPetal { 0% { transform: translateY(5vh) rotate(0deg); opacity: 0; } 20% { opacity: 0.8; } 80% { opacity: 0.8; } 100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }
        @keyframes glowPulse { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.4; } 100% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; } }
        @keyframes gentlePulse { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }
        @keyframes chevronBounce { 0%, 100% { opacity: 0.1; transform: translateY(0) rotate(45deg); } 50% { opacity: 1; transform: translateY(10px) rotate(45deg); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        
        .butterfly-wrapper { position: fixed; top: 50%; left: 50%; z-index: 2000; pointer-events: none; animation: flyOut ease-out forwards; }
        @keyframes flyOut { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0; } 10% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; } 80% { opacity: 0.9; } 100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.3); opacity: 0; } }
        .butterfly-wing { animation: flap 1.2s infinite alternate ease-in-out; filter: drop-shadow(0 4px 6px rgba(201, 168, 106, 0.4)); transform-origin: center; }
        @keyframes flap { 0% { transform: scaleX(1); } 100% { transform: scaleX(0.35); } }
      `}} />

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/elegant/lagu.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Control Button */}
      <button 
        onClick={toggleMusic} 
        className={`fixed bottom-5 right-5 z-[1000] w-12 h-12 rounded-full flex justify-center items-center text-white shadow-lg transition-all duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}
        style={{ backgroundColor: data.colors.primary }}
      >
        {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
      </button>

      {/* Particles Layer */}
      <div className={`fixed inset-0 pointer-events-none z-[101] transition-opacity duration-1500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {particles.map((p) => (
          <div 
            key={p.id} 
            className={p.type} 
            style={{ 
              width: p.size, 
              height: p.type === 'gold-petal' ? p.size * 2 : p.size, 
              left: p.left + 'vw', 
              top: p.type.includes('bokeh') || p.type.includes('petal') ? p.top + 'vh' : '-20px',
              animationDuration: p.duration + 's', 
              animationDelay: p.delay + 's' 
            }} 
          />
        ))}
      </div>

      {/* Butterflies */}
      {butterflies.map((b) => (
        <div key={b.id} className="butterfly-wrapper" style={{ '--tx': b.tx + 'vw', '--ty': b.ty + 'vh', animationDuration: b.dur + 's' } as React.CSSProperties}>
          <div style={{ transform: `rotate(${b.rot})` }}>
            <svg viewBox="0 0 64 64" width="45" height="45" className="butterfly-wing" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="wing-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor={data.colors.primary} stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <path fill="url(#wing-grad)" d="M 32 32 C 10 10, 5 25, 28 32 C 5 40, 15 55, 32 40 Z" />
              <path fill="url(#wing-grad)" d="M 32 32 C 54 10, 59 25, 36 32 C 59 40, 49 55, 32 40 Z" />
              <path d="M 30 22 Q 28 15 24 15 M 34 22 Q 36 15 40 15" stroke={data.colors.primary} strokeWidth="1" fill="none" opacity="0.6"/>
              <ellipse cx="32" cy="32" rx="1.5" ry="7" fill={data.colors.primary} opacity="0.8" />
            </svg>
          </div>
        </div>
      ))}

      {/* 1. ENVELOPE COVER */}
      <div className={`fixed inset-0 w-full h-full z-[150] flex justify-center items-center overflow-hidden transition-all duration-1500 cubic-bezier(0.77, 0, 0.175, 1) ${isOpen ? '-translate-y-full scale-105 opacity-0 blur-md pointer-events-none' : ''}`} style={{ backgroundColor: data.colors.background }}>
        <div className="absolute inset-0 z-[1] opacity-85" style={{ background: 'radial-gradient(circle, rgba(255, 252, 248, 0.85) 0%, rgba(255, 252, 248, 0.2) 100%)' }}></div>
        <div className="absolute top-6 left-5 right-5 bottom-14 z-[2] border rounded-xl pointer-events-none opacity-80" style={{ borderColor: data.colors.primary, boxShadow: `inset 0 0 15px ${data.colors.primary}33` }}></div>
        
        <div className="relative z-[10] flex flex-col items-center justify-center text-center px-5 pb-16 w-full h-full">
          {/* Cincin Button */}
          <div className="relative w-[100px] h-[100px] flex justify-center items-center mt-4 mb-2">
            <div className="absolute top-1/2 left-1/2 w-[140px] h-[140px] rounded-full z-[1] animate-[glowPulse_4s_infinite_alternate]" style={{ background: `radial-gradient(circle, ${data.colors.primary}4D 0%, transparent 70%)` }}></div>
            <button onClick={handleOpenEnvelope} className="w-[90px] h-[90px] rounded-full bg-transparent border-none cursor-pointer flex justify-center items-center relative z-[10] animate-[gentlePulse_3s_infinite] active:scale-90 transition-transform">
              <img src="/elegant/cincin.png" alt="Cincin" className="absolute top-0 left-0 w-full h-full object-contain z-[11] drop-shadow-xl" />
            </button>
          </div>
          
          <div className="font-montserrat text-xs font-semibold tracking-[5px] uppercase mb-4" style={{ color: data.colors.primary }}>
            Majlis Bertaut Kasih
          </div>
          
          <div className="font-alex text-[3.2rem] leading-none mt-6 mb-1 flex items-center justify-center gap-3 text-[#3e3128]">
            {data.couple.groom} <span className="font-cormorant text-2xl italic font-normal mt-1" style={{ color: data.colors.primary }}>&</span> {data.couple.bride}
          </div>
          
          <div className="font-montserrat text-[0.8rem] tracking-[4px] font-semibold uppercase mt-5 mb-4 py-2 px-5 inline-block" style={{ color: '#3e3128', borderTop: `1px solid ${data.colors.primary}66`, borderBottom: `1px solid ${data.colors.primary}66` }}>
            {details.date}
          </div>
          
          <div className="font-cormorant text-2xl italic font-bold tracking-wider" style={{ color: data.colors.primary }}>
            #RaikanCinta{data.couple.groom}{data.couple.bride}
          </div>

          <div className="absolute bottom-20 flex flex-col items-center cursor-pointer p-5" onClick={handleOpenEnvelope}>
            <div className="w-6 h-6 border-r-2 border-b-2 rotate-45 animate-[chevronBounce_2s_infinite]" style={{ borderColor: data.colors.primary, animationDelay: '0s' }}></div>
            <div className="w-6 h-6 border-r-2 border-b-2 rotate-45 -mt-3 animate-[chevronBounce_2s_infinite]" style={{ borderColor: data.colors.primary, animationDelay: '0.2s' }}></div>
            <div className="w-6 h-6 border-r-2 border-b-2 rotate-45 -mt-3 animate-[chevronBounce_2s_infinite]" style={{ borderColor: data.colors.primary, animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>

      {/* 2. KANDUNGAN JEMPUTAN */}
      <div className={`flex justify-center min-h-screen relative z-10 transition-all duration-1500 delay-500 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
        <div className="w-full max-w-[480px] p-4 sm:p-10 flex flex-col items-center pb-24">
          
          {/* Arch Header */}
          <div className="bg-white/65 backdrop-blur-md rounded-t-[120px] rounded-b-xl px-5 pt-16 pb-10 w-full shadow-lg border border-white/60 text-center mb-6 relative" style={{ borderBottom: `5px solid ${data.colors.primary}` }}>
            <div className="font-montserrat text-xs uppercase tracking-[3px] font-bold mb-4" style={{ color: data.colors.primary }}>Undangan Majlis</div>
            <div className="font-amiri text-3xl mb-5 text-[#3e3128] leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div className="font-cormorant text-xl italic font-semibold mb-6 text-[#3e3128]">Assalamualaikum dan salam sejahtera</div>
            
            <div className="text-sm line-loose my-8 font-medium text-[#3e3128] px-4">
              "{details.invitationText}"
            </div>
            
            <div className="font-alex text-[4.5rem] leading-[1.1] my-6 drop-shadow-sm relative z-10" style={{ color: data.colors.primary }}>
              {data.couple.groom}
              <span className="text-[3rem] block -my-2 text-[#3e3128] drop-shadow-none font-normal font-alex">&</span>
              {data.couple.bride}
            </div>
            
            <hr className="border-none h-[1.5px] w-[120px] mx-auto my-8 opacity-80" style={{ background: `linear-gradient(to right, transparent, ${data.colors.primary}, transparent)` }} />
          </div>

          {/* Section: Informasi Majlis */}
          <div className="bg-white/65 backdrop-blur-md rounded-xl p-8 w-full shadow-md border border-white/60 text-center mb-6" style={{ borderTop: `3px solid ${data.colors.primary}` }}>
            <div className="font-cormorant text-3xl font-bold text-[#3e3128] mb-4">Informasi Majlis</div>
            
            <div className="bg-white/85 backdrop-blur-md p-6 rounded-2xl border mb-5 shadow-sm" style={{ borderColor: `${data.colors.primary}66` }}>
              <div className="grid grid-cols-2 gap-2 mb-5">
                <div className="flex flex-col items-center text-center border-r border-dashed" style={{ borderColor: `${data.colors.primary}66` }}>
                  <CalendarHeart size={24} className="mb-2" style={{ color: data.colors.primary }} />
                  <div className="font-montserrat text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: data.colors.primary }}>Tarikh</div>
                  <div className="font-cormorant text-lg font-bold text-[#3e3128] leading-tight whitespace-pre-line">{details.date.replace(', ', '\n')}</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Clock size={24} className="mb-2" style={{ color: data.colors.primary }} />
                  <div className="font-montserrat text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: data.colors.primary }}>Masa</div>
                  <div className="font-cormorant text-lg font-bold text-[#3e3128] leading-tight whitespace-pre-line">{details.time.replace(' - ', '\n')}</div>
                </div>
              </div>
              
              <div className="w-[70%] h-px border-b border-dashed mx-auto mb-5" style={{ borderColor: `${data.colors.primary}66` }}></div>
              
              <div className="flex flex-col items-center text-center">
                <MapPin size={24} className="mb-2" style={{ color: data.colors.primary }} />
                <div className="font-montserrat text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: data.colors.primary }}>Lokasi Majlis</div>
                <div className="font-montserrat text-sm font-medium whitespace-pre-line text-[#3e3128] leading-relaxed">{details.address}</div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full mt-4">
              <a href={details.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3.5 text-white text-xs uppercase tracking-widest font-bold rounded-full transition-transform hover:-translate-y-1 shadow-md" style={{ backgroundColor: data.colors.primary }}>
                <Map size={18} /> Buka Google Maps
              </a>
              <a href={details.wazeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3.5 bg-transparent border-2 text-xs uppercase tracking-widest font-bold rounded-full transition-transform hover:-translate-y-1 hover:text-white" style={{ borderColor: data.colors.primary, color: '#3e3128' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = data.colors.primary} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <Navigation size={18} /> Buka Waze
              </a>
            </div>
          </div>

          {/* Section: Aturcara Majlis */}
          <div className="bg-white/65 backdrop-blur-md rounded-xl p-8 w-full shadow-md border border-white/60 text-center mb-6" style={{ borderTop: `3px solid ${data.colors.primary}` }}>
            <div className="font-cormorant text-3xl font-bold text-[#3e3128] mb-8">Aturcara Majlis</div>
            
            <div className="relative flex flex-col items-center w-full py-2">
              {/* Snake Path Backgrounds */}
              <div className="absolute top-[55px] left-1/2 w-[35%] h-[calc(100%-80px)] border-t-2 border-r-2 border-b-2 border-dashed opacity-60 rounded-r-[60px]" style={{ borderColor: data.colors.primary }}></div>

              {/* Node 1 */}
              <div className="flex flex-col items-center mb-10 relative z-[2] w-full">
                <div className="w-[110px] h-[110px] rounded-full border-[4px] border-white overflow-hidden -mb-4 bg-white flex justify-center items-center relative z-[3] shadow-lg transition-transform hover:scale-105">
                  <img src="/elegant/atur-1.png" alt="Pintu Gerbang" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/85 backdrop-blur-md pt-6 pb-4 px-6 rounded-2xl border shadow-sm text-center max-w-[90%] relative z-[2]" style={{ borderColor: data.colors.primary }}>
                  <div className="font-montserrat text-sm font-bold tracking-wide mb-1" style={{ color: data.colors.primary }}>11:00 AM</div>
                  <div className="font-cormorant text-xl font-bold text-[#3e3128] leading-tight">Majlis Bermula</div>
                </div>
              </div>

              {/* Node 2 */}
              <div className="flex flex-col items-center mb-10 relative z-[2] w-full">
                <div className="w-[110px] h-[110px] rounded-full border-[4px] border-white overflow-hidden -mb-4 bg-white flex justify-center items-center relative z-[3] shadow-lg transition-transform hover:scale-105">
                  <img src="/elegant/atur-2.png" alt="Ketibaan" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/85 backdrop-blur-md pt-6 pb-4 px-6 rounded-2xl border shadow-sm text-center max-w-[90%] relative z-[2]" style={{ borderColor: data.colors.primary }}>
                  <div className="font-montserrat text-sm font-bold tracking-wide mb-1" style={{ color: data.colors.primary }}>12:30 PM</div>
                  <div className="font-cormorant text-xl font-bold text-[#3e3128] leading-tight">Ketibaan Pengantin</div>
                </div>
              </div>

              {/* Node 3 */}
              <div className="flex flex-col items-center mb-10 relative z-[2] w-full">
                <div className="w-[110px] h-[110px] rounded-full border-[4px] border-white overflow-hidden -mb-4 bg-white flex justify-center items-center relative z-[3] shadow-lg transition-transform hover:scale-105">
                  <img src="/elegant/atur-3.jpg" alt="Makan" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/85 backdrop-blur-md pt-6 pb-4 px-6 rounded-2xl border shadow-sm text-center max-w-[90%] relative z-[2]" style={{ borderColor: data.colors.primary }}>
                  <div className="font-montserrat text-sm font-bold tracking-wide mb-1" style={{ color: data.colors.primary }}>1:00 PM</div>
                  <div className="font-cormorant text-xl font-bold text-[#3e3128] leading-tight">Makan Beradab</div>
                </div>
              </div>

              {/* Node 4 */}
              <div className="flex flex-col items-center relative z-[2] w-full">
                <div className="w-[110px] h-[110px] rounded-full border-[4px] border-white overflow-hidden -mb-4 bg-[#fdfbf7] flex justify-center items-center relative z-[3] shadow-lg transition-transform hover:scale-105">
                  <img src="/elegant/atur-4.png" alt="Kamera" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white/85 backdrop-blur-md pt-6 pb-4 px-6 rounded-2xl border shadow-sm text-center max-w-[90%] relative z-[2]" style={{ borderColor: data.colors.primary }}>
                  <div className="font-montserrat text-sm font-bold tracking-wide mb-1" style={{ color: data.colors.primary }}>2:00 PM</div>
                  <div className="font-cormorant text-xl font-bold text-[#3e3128] leading-tight">Sesi Bergambar</div>
                </div>
              </div>

            </div>
          </div>

          {/* Doa Penutup */}
          <div className="mt-8 p-10 pt-12 pb-6 text-center relative w-full border-t" style={{ borderColor: `${data.colors.primary}66` }}>
            <div className="text-3xl my-4" style={{ color: data.colors.primary }}>❦</div>
            <p className="font-cormorant text-lg italic leading-[1.8] font-semibold text-[#3e3128]">
              "Semoga dengan kehadiran dan doa restu hadirin akan menyerikan lagi majlis kami. Mohon doakan agar baitul muslim yang bakal dibina sentiasa dalam keredhaan-Nya, dilimpahi dengan barakah, sakinah, mawaddah dan rahmah."
            </p>
            <p className="font-cormorant text-lg italic leading-[1.8] font-bold text-[#3e3128] mt-3">
              Amin Ya Rabbal Alamin.
            </p>
            <div className="text-3xl my-4" style={{ color: data.colors.primary }}>❦</div>
            <div className="font-montserrat text-sm uppercase tracking-widest mt-8 font-bold text-[#3e3128]">Terima Kasih</div>
            <div className="font-alex text-[3.5rem] text-[#3e3128] mt-2 leading-none">{data.couple.groom} & {data.couple.bride}</div>
          </div>

        </div>
      </div>
    </div>
  );
}