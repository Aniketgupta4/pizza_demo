import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Cart() {
    const { cart, removeFromCart } = useContext(CartContext);
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 50 : 0;
    const total = subtotal + deliveryFee;

    const checkout = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login first to place an order!');
            window.location.href = '/login';
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/orders/placeorder', {
                user: user._id,
                orderItems: cart,
                shippingAddress: { street: '123 Pizza St', city: 'Foodville' },
                orderAmount: total
            });
            alert('Success! Your order is on the way 🛵');
            window.location.href = '/';
        } catch (err) {
            alert('Order Failed. Is the backend running?');
        }
    };

    if (cart.length === 0) return (
        <div className="flex flex-col items-center justify-center py-32 px-6">
            <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-8 relative">
                <ShoppingBag size={80} className="text-gray-300" />
                <div className="absolute top-10 right-10 w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Your cart is feeling light</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md font-medium">Looks like you haven't added any pizzas yet. Explore our menu and find your favorite!</p>
            <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-full shadow-lg transition transform hover:-translate-y-1">
                Explore Menu
            </Link>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Secure Checkout</h1>
            <p className="text-gray-500 mb-10 font-medium">Review your items and complete your order.</p>
            
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Cart Items */}
                <div className="lg:w-2/3 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Items ({cart.length})</h2>
                        <div className="space-y-6">
                            {cart.map((item, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-center gap-6 relative group border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                                    <div className="relative">
                                        <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-2xl shadow-sm group-hover:shadow-md transition" />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <h2 className="font-black text-xl text-gray-900 mb-1">{item.name}</h2>
                                        <p className="text-gray-500 capitalize text-sm mb-3 font-medium">Size: <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">{item.varient}</span></p>
                                        <p className="font-black text-xl text-red-600">₹{item.price}</p>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(index)} 
                                        className="absolute top-0 right-0 sm:static text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-3 rounded-xl transition shadow-sm hover:shadow"
                                        title="Remove item"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-1/3">
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-lg sticky top-28">
                        <h3 className="text-2xl font-black text-gray-900 mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                        
                        <div className="space-y-4 mb-6 text-gray-600 font-medium">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-900">₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-bold text-gray-900">₹{deliveryFee}</span>
                            </div>
                            <div className="flex justify-between text-green-600 bg-green-50 p-3 rounded-lg mt-2">
                                <span className="flex items-center gap-2"><ShieldCheck size={18}/> Taxes & Charges</span>
                                <span>Included</span>
                            </div>
                        </div>
                        
                        <div className="border-t border-dashed border-gray-300 pt-6 mb-8">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-bold text-gray-900">Grand Total</span>
                                <span className="text-4xl font-black text-red-600">₹{total}</span>
                            </div>
                            <p className="text-xs text-gray-400 text-right">Secure payment powered by PizzaExpress</p>
                        </div>
                        
                        <button onClick={checkout} className="w-full bg-red-600 hover:bg-red-700 text-white font-black text-lg px-6 py-4 rounded-2xl shadow-xl shadow-red-600/20 transition transform hover:-translate-y-1 flex justify-center items-center gap-2 group">
                            Place Order <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                        
                        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500">
                            <Clock size={16} /> Delivery in ~30 mins
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
