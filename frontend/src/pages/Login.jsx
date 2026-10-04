import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLogin(location.pathname !== '/signup');
    }, [location.pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
        const payload = isLogin ? { email, password } : { name, email, password };
        
        try {
            const res = await axios.post(url, payload);
            localStorage.setItem('user', JSON.stringify(res.data));
            window.location.href = '/';
        } catch (err) {
            alert(err.response?.data?.message || 'Error occurred connecting to server');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-white">
            {/* Left Side - Image */}
            <div className="hidden md:block md:w-1/2 relative bg-gray-900">
                <img 
                    src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop" 
                    alt="Pizza making" 
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-16 left-12 right-12 text-white">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-6 inline-block">JOIN US</span>
                    <h2 className="text-5xl font-black mb-6 leading-tight">Handcrafted <br/> with passion.</h2>
                    <p className="text-lg text-gray-300 max-w-md font-medium">Join thousands of pizza lovers who get fresh, hot pizzas delivered daily. Sign up for exclusive rewards and faster checkout.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-gray-50">
                <div className="w-full max-w-md bg-white p-10 lg:p-12 rounded-[2rem] shadow-xl border border-gray-100">
                    <div className="text-center mb-10">
                        <span className="text-5xl mb-6 block drop-shadow-sm">🍕</span>
                        <h1 className="text-3xl font-black text-gray-900 mb-3">{isLogin ? 'Welcome Back!' : 'Create Account'}</h1>
                        <p className="text-gray-500 font-medium">{isLogin ? 'Enter your details to access your account.' : 'Sign up to start ordering delicious pizzas.'}</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-4 outline-none transition font-medium" />
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-4 outline-none transition font-medium" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block p-4 outline-none transition font-medium" />
                        </div>
                        
                        <button type="submit" disabled={isLoading} className="w-full bg-red-600 hover:bg-red-700 text-white p-4 rounded-xl font-black text-lg transition mt-6 shadow-lg shadow-red-500/30 flex justify-center items-center">
                            {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (isLogin ? 'Sign In' : 'Sign Up')}
                        </button>
                    </form>

                    <div className="mt-10 text-center text-sm font-medium text-gray-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <Link to={isLogin ? '/signup' : '/login'} className="text-red-600 font-bold hover:text-red-700 hover:underline transition">
                            {isLogin ? 'Create one now' : 'Log in here'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
