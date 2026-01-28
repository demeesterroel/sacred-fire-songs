import Link from 'next/link';

export default function SignupSuccess() {
    return (
        <div className="flex-1 flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
            <div className="w-full max-w-md bg-gray-900 border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <h1 className="text-2xl font-bold text-white mb-4">Check your email</h1>
                <p className="text-gray-400 mb-8">
                    We've sent you a confirmation link. Please check your inbox (and spam folder) to complete your registration.
                </p>
                <Link
                    href="/auth/login"
                    className="text-white bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-2 rounded-lg transition-colors"
                >
                    Return to Login
                </Link>
            </div>
        </div>
    );
}
