import { useEffect, useState } from 'react';
import axios from 'axios';

const emptyForm = {
    name: '',
    category: 'veg',
    description: '',
    image: '',
    varients: ['small', 'medium', 'large'],
    prices: { small: '', medium: '', large: '' }
};

export default function AdminDashboard() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [menu, setMenu] = useState([]);
    const [orders, setOrders] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const getAuthHeader = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        return { Authorization: `Bearer ${user?.token}` };
    };

    const fetchData = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.isAdmin) {
            setIsAdmin(false);
            return;
        }

        setIsAdmin(true);

        try {
            const [pizzaRes, orderRes] = await Promise.all([
                axios.get('http://localhost:5000/api/pizzas'),
                axios.get('http://localhost:5000/api/orders/all', { headers: getAuthHeader() })
            ]);

            setMenu(pizzaRes.data);
            setOrders(orderRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'small' || name === 'medium' || name === 'large') {
            setForm((prev) => ({
                ...prev,
                prices: { ...prev.prices, [name]: value }
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.isAdmin) {
            alert('Admin access required');
            return;
        }

        const payload = {
            name: form.name,
            category: form.category,
            description: form.description,
            image: form.image,
            varients: ['small', 'medium', 'large'],
            prices: [{
                small: Number(form.prices.small || 0),
                medium: Number(form.prices.medium || 0),
                large: Number(form.prices.large || 0)
            }]
        };

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/pizzas/${editingId}`, payload, { headers: getAuthHeader() });
                alert('Pizza updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/pizzas', payload, { headers: getAuthHeader() });
                alert('Pizza added successfully');
            }

            setForm(emptyForm);
            setEditingId(null);
            fetchData();
        } catch (error) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    const handleEdit = (pizza) => {
        setEditingId(pizza._id);
        setForm({
            name: pizza.name,
            category: pizza.category,
            description: pizza.description,
            image: pizza.image,
            varients: pizza.varients || ['small', 'medium', 'large'],
            prices: {
                small: pizza.prices?.[0]?.small || '',
                medium: pizza.prices?.[0]?.medium || '',
                large: pizza.prices?.[0]?.large || ''
            }
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this pizza?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/pizzas/${id}`, { headers: getAuthHeader() });
            fetchData();
        } catch (error) {
            alert('Delete failed');
        }
    };

    const handleStatusUpdate = async (orderId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/status/${orderId}`, { status }, { headers: getAuthHeader() });
            fetchData();
        } catch (error) {
            alert('Status update failed');
        }
    };

    if (!isAdmin) {
        return (
            <div className="max-w-xl mx-auto px-6 py-20">
                <div className="bg-white rounded-3xl shadow-sm border p-10 text-center">
                    <h2 className="text-3xl font-black mb-4">Admin Access Required</h2>
                    <p className="text-gray-600 mb-6">Please log in with an admin account to access the dashboard.</p>
                    <a href="/login" className="bg-red-600 text-white px-6 py-3 rounded-full font-bold">Go to Login</a>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-10">
            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                <h1 className="text-3xl font-black mb-6">Admin Dashboard</h1>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Pizza Name</label>
                        <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded-xl p-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Category</label>
                        <select name="category" value={form.category} onChange={handleChange} className="w-full border rounded-xl p-3">
                            <option value="veg">Veg</option>
                            <option value="nonveg">Non-Veg</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Image URL</label>
                        <input name="image" value={form.image} onChange={handleChange} className="w-full border rounded-xl p-3" required />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold mb-2">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-xl p-3" rows="3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Small Price</label>
                        <input name="small" type="number" value={form.prices.small} onChange={handleChange} className="w-full border rounded-xl p-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Medium Price</label>
                        <input name="medium" type="number" value={form.prices.medium} onChange={handleChange} className="w-full border rounded-xl p-3" required />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Large Price</label>
                        <input name="large" type="number" value={form.prices.large} onChange={handleChange} className="w-full border rounded-xl p-3" required />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                        <button type="submit" className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">
                            {editingId ? 'Update Pizza' : 'Add Pizza'}
                        </button>
                        {editingId && (
                            <button type="button" onClick={() => { setEditingId(null); setForm(emptyForm); }} className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                <h2 className="text-2xl font-black mb-6">Menu Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {menu.map((pizza) => (
                        <div key={pizza._id} className="border rounded-2xl overflow-hidden">
                            <img src={pizza.image} alt={pizza.name} className="h-44 w-full object-cover" />
                            <div className="p-4">
                                <div className="flex justify-between items-start gap-2 mb-2">
                                    <h3 className="font-black text-xl">{pizza.name}</h3>
                                    <span className="text-xs uppercase bg-gray-100 px-2 py-1 rounded-full">{pizza.category}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{pizza.description}</p>
                                <div className="text-sm text-gray-700 space-y-1 mb-4">
                                    {pizza.varients?.map((variant) => (
                                        <div key={variant} className="flex justify-between">
                                            <span className="capitalize">{variant}</span>
                                            <span>₹{pizza.prices?.[0]?.[variant] || 0}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(pizza)} className="flex-1 bg-gray-100 text-gray-800 py-2 rounded-xl font-bold">Edit</button>
                                    <button onClick={() => handleDelete(pizza._id)} className="flex-1 bg-red-600 text-white py-2 rounded-xl font-bold">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border p-8 shadow-sm">
                <h2 className="text-2xl font-black mb-6">All Orders</h2>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order._id} className="border rounded-2xl p-5">
                            <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
                                <div>
                                    <p className="text-sm text-gray-500">Customer</p>
                                    <p className="font-bold">{order.user?.name || 'Unknown'}</p>
                                    <p className="text-sm text-gray-500">{order.user?.email || ''}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Total</p>
                                    <p className="font-black text-red-600">₹{order.orderAmount}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Address</p>
                                    <p className="font-medium">{order.shippingAddress?.street || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500 block mb-2">Status</label>
                                    <select value={order.status || 'pending'} onChange={(e) => handleStatusUpdate(order._id, e.target.value)} className="border rounded-xl p-2">
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="out_for_delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {order.orderItems?.map((item, idx) => (
                                    <div key={idx} className="flex justify-between text-sm text-gray-700">
                                        <span>{item.name} ({item.varient})</span>
                                        <span>₹{item.price}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
