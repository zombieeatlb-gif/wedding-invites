'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { Moon } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // SECURITY: Auto-logout when browser closes
      await setPersistence(auth, browserSessionPersistence);

      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      router.push('/dashboard');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("E-mel ini telah didaftarkan. Sila log masuk.");
      } else if (err.code === 'auth/weak-password') {
        setError("Kata laluan mestilah sekurang-kurangnya 6 aksara.");
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    
    try {
      // SECURITY: Auto-logout when browser closes
      await setPersistence(auth, browserSessionPersistence);
      
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Google Sign-In failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] flex flex-col justify-center py-12 px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative">
        <Link href="/" className="absolute -top-12 left-0 text-slate-500 hover:text-[#143e2a] font-medium flex items-center gap-2">
          <span>←</span> Kembali ke Laman Utama
        </Link>
        
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-10 h-10 bg-[#143e2a] rounded-md flex items-center justify-center text-white">
            <Moon size={24} />
          </div>
          <span className="text-3xl font-serif font-bold text-[#143e2a]">Walimatul</span>
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-slate-900">
          {isLogin ? 'Log Masuk Akaun Anda' : 'Daftar Akaun Baru'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl border border-slate-100 sm:px-10">
          
          <form className="space-y-6" onSubmit={handleEmailAuth}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-700">E-mel</label>
              <div className="mt-1">
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#143e2a] focus:outline-none focus:ring-[#143e2a] sm:text-sm"
                  placeholder="anda@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Kata Laluan</label>
              <div className="mt-1">
                <input 
                  type="password" 
                  required 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="block w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#143e2a] focus:outline-none focus:ring-[#143e2a] sm:text-sm"
                  placeholder="Minimum 6 aksara"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="flex w-full justify-center rounded-lg bg-[#143e2a] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0f3020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#143e2a] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Sedang memproses...' : (isLogin ? 'Log Masuk' : 'Daftar Akaun')}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-slate-500">Atau log masuk dengan</span></div>
            </div>

            <div className="mt-6">
              <button 
                onClick={handleGoogleAuth} 
                disabled={loading} 
                className="w-full flex justify-center items-center gap-3 bg-white border border-slate-300 text-slate-700 py-2.5 rounded-lg font-medium hover:bg-slate-50 transition-colors shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">{isLogin ? "Belum ada akaun? " : "Sudah ada akaun? "}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-[#143e2a] hover:text-[#0f3020] hover:underline">
              {isLogin ? 'Daftar sekarang' : 'Log Masuk'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}