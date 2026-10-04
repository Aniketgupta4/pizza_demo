import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, User as UserIcon, Menu, X, LogOut, ShieldCheck } from 'lucide-react';

export default function Navbar() {
    const { cart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem('user'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="text-4xl group-hover:scale-110 transition-transform">🍕</span>
                        <span className="text-2xl font-black text-red-600 tracking-tighter">PizzaExpress</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="font-bold text-gray-600 hover:text-red-600 transition">Menu</Link>

                        {user ? (
                            <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                                {user.isAdmin && (
                                    <Link to="/admin" className="font-bold text-gray-600 hover:text-red-600 transition flex items-center gap-1">
                                        <ShieldCheck size={18} /> Admin
                                    </Link>
                                )}
                                <Link to="/profile" className="flex items-center gap-2 text-gray-700 font-bold hover:text-red-600 transition">
                                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <span>{user.name?.split(' ')[0] || 'User'}</span>
                                </Link>
                                <button onClick={handleLogout} className="text-gray-400 hover:text-red-600 transition flex items-center gap-1 font-semibold text-sm">
                                    <LogOut size={18}/> Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 border-l pl-8 border-gray-200">
                                <Link to="/login" className="font-bold text-gray-600 hover:text-red-600 transition flex items-center gap-1">
                                    <UserIcon size={20}/> Sign In
                                </Link>
                            </div>
                        )}

                        <Link to="/cart" className="relative p-2 text-gray-600 hover:text-red-600 transition group">
                            <ShoppingCart size={28} className="group-hover:scale-110 transition-transform"/>
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 text-gray-700">
                            <ShoppingCart size={24} />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cart.length}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-red-600 transition">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4 shadow-lg absolute w-full">
                    <Link to="/" className="block font-bold text-gray-700 text-lg" onClick={() => setIsMenuOpen(false)}>Menu</Link>
                    {user ? (
                        <>
                            <Link to="/profile" className="block font-bold text-gray-700 py-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="block font-bold text-red-600 py-2" onClick={() => setIsMenuOpen(false)}>Admin Dashboard</Link>
                            )}
                            <button onClick={handleLogout} className="block font-bold text-red-600 w-full text-left py-2">Logout</button>
                        </>
                    ) : (
                        <Link to="/login" className="block font-bold text-red-600 border-t border-gray-100 pt-4" onClick={() => setIsMenuOpen(false)}>Sign In / Register</Link>
                    )}
                </div>
            )}
        </nav>
    );
}
