import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Login />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
