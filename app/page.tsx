import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      
      {/* Navigation / Header */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
        <div className="font-serif font-bold text-2xl text-slate-900">Walimatul</div>
        <div className="space-x-4">
          <Link href="/register" className="text-slate-600 hover:text-slate-900 font-medium hidden sm:inline-block">Sign Up</Link>
          <Link href="/dashboard" className="bg-slate-200 text-slate-900 px-5 py-2 rounded-lg font-medium hover:bg-slate-300 transition-colors">Login</Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl space-y-8 mt-12">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 leading-tight">
          Beautiful Digital <br className="hidden md:block" /> Wedding Invitations
        </h1>
        
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Create, customize, and share elegant digital wedding invitations. Track RSVPs instantly and make your special day unforgettable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/register" 
            className="w-full sm:w-auto bg-slate-900 text-white px-8 py-4 rounded-xl font-medium hover:bg-slate-800 transition-colors text-lg shadow-lg"
          >
            Start Designing Free
          </Link>
          <Link 
            href="/templates" 
            className="w-full sm:w-auto bg-white text-slate-900 border-2 border-slate-200 px-8 py-4 rounded-xl font-medium hover:border-slate-900 hover:text-slate-900 transition-colors text-lg"
          >
            View Templates
          </Link>
        </div>
      </div>
      
    </div>
  );
}