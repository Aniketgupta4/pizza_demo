import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Plus, Flame, Star, ShoppingBag } from 'lucide-react';

export default function Home() {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        axios.get('http://localhost:5000/api/pizzas')
            .then(res => {
                setPizzas(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);
            });
    }, []);

    const handleSeed = () => {
        axios.post('http://localhost:5000/api/pizzas/seed')
            .then(() => window.location.reload())
            .catch(err => alert("Make sure backend is running"));
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop" 
                    alt="Delicious Pizza Background" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col items-start">
                    <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest mb-6 flex items-center gap-2 shadow-lg">
                        <Flame size={16} className="text-yellow-300"/> HOT & FRESH
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
                        Craving Pizza? <br/> <span className="text-red-500">We've Got You.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-medium leading-relaxed">
                        Experience the best wood-fired pizzas in town, delivered hot to your door in under 30 minutes. Order now and satisfy your cravings!
                    </p>
                    <a href="#menu" className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-red-500/40 transition transform hover:-translate-y-1 flex items-center gap-2">
                        <ShoppingBag size={20}/> Explore Menu
                    </a>
                </div>
            </div>

            {/* Menu Section */}
            <div id="menu" className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-200 pb-6">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2">Our Top Picks</h2>
                        <div className="h-1.5 w-24 bg-red-600 rounded-full mx-auto md:mx-0"></div>
                    </div>
                    {pizzas.length === 0 && !isLoading && (
                        <button onClick={handleSeed} className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-gray-800 transition">
                            Load Demo Menu
                        </button>
                    )}
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center py-32">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {pizzas.map(pizza => (
                            <div key={pizza._id} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={pizza.image} 
                                        alt={pizza.name} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-2 shadow-md">
                                        <div className={`w-2.5 h-2.5 rounded-full ${pizza.category.toLowerCase() === 'veg' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></div>
                                        <span className="uppercase tracking-widest text-gray-800">{pizza.category}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-2xl font-black text-gray-900 leading-tight pr-4">{pizza.name}</h3>
                                        <div className="flex items-center bg-yellow-100 text-yellow-700 px-2.5 py-1 rounded-md text-xs font-black tracking-wide">
                                            <Star size={12} className="fill-current mr-1"/> 4.8
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-6 flex-grow font-medium leading-relaxed">{pizza.description}</p>
                                    
                                    <div className="flex flex-wrap items-end justify-between mt-auto gap-4 pt-4 border-t border-gray-100">
                                        <div className="flex flex-col">
                                            <label className="text-[10px] text-gray-400 font-bold mb-1.5 uppercase tracking-wider">Select Size</label>
                                            <select id={`varient-${pizza._id}`} className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-red-500 focus:border-red-500 block w-28 p-2.5 font-bold outline-none cursor-pointer transition">
                                                {pizza.varients.map(v => <option key={v} value={v} className="capitalize">{v}</option>)}
                                            </select>
                                        </div>
                                        <button 
                                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center flex-grow sm:flex-grow-0 shadow-sm hover:shadow-red-500/30 group/btn"
                                            onClick={() => {
                                                const varient = document.getElementById(`varient-${pizza._id}`).value;
                                                addToCart(pizza, varient);
                                            }}
                                            title="Add to Cart"
                                        >
                                            <Plus size={24} className="group-hover/btn:rotate-90 transition-transform duration-300"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
