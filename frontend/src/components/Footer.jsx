import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 mt-auto border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
                        <span>🍕</span> PizzaExpress
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-400">
                        The best wood-fired pizzas delivered hot and fresh to your door in 30 minutes or it's free! Quality ingredients, crafted with passion.
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul className="space-y-3 text-sm font-medium">
                        <li><Link to="/" className="hover:text-red-500 transition">Our Menu</Link></li>
                        <li><Link to="/cart" className="hover:text-red-500 transition">Your Cart</Link></li>
                        <li><Link to="/login" className="hover:text-red-500 transition">Sign In</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
                    <div className="space-y-3 text-sm text-gray-400">
                        <p>📍 123 Pizza Street, Foodville, NY 10001</p>
                        <p>✉️ support@pizzaexpress.com</p>
                        <p>📞 1-800-PIZZA-NOW</p>
                    </div>
                </div>
            </div>
            <div className="text-center text-xs mt-12 border-t border-gray-800 pt-8 text-gray-500">
                &copy; {new Date().getFullYear()} PizzaExpress Inc. All rights reserved.
            </div>
        </footer>
    );
}
