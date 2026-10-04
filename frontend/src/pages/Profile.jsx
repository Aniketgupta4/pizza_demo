import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
            window.location.href = '/login';
            return;
        }

        const fetchProfile = async () => {
            try {
                const profileRes = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${currentUser.token}` }
                });

                const ordersRes = await axios.get(`http://localhost:5000/api/orders/userorders/${currentUser._id}`);

                setUser(profileRes.data);
                setOrders(ordersRes.data);
                setFormData({
                    name: profileRes.data.name,
                    email: profileRes.data.email,
                    phone: profileRes.data.phone || '',
                    address: profileRes.data.address || ''
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('user'));

        try {
            const res = await axios.put('http://localhost:5000/api/auth/profile', formData, {
                headers: { Authorization: `Bearer ${currentUser.token}` }
            });

            localStorage.setItem('user', JSON.stringify({ ...currentUser, ...res.data }));
            setUser(res.data);
            alert('Profile updated successfully');
        } catch (error) {
            alert(error.response?.data?.message || 'Profile update failed');
        }
    };

    if (isLoading) {
        return <div className="max-w-6xl mx-auto px-6 py-20 text-center">Loading profile...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 bg-white rounded-3xl shadow-sm border p-8">
                    <div className="w-20 h-20 bg-red-100 text-red-600 text-3xl font-black rounded-full flex items-center justify-center mb-6 mx-auto">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <h2 className="text-2xl font-black text-center mb-2">{user?.name}</h2>
                    <p className="text-center text-gray-500 mb-6">{user?.email}</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Name</label>
                            <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border rounded-xl p-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border rounded-xl p-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Phone</label>
                            <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full border rounded-xl p-3" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Address</label>
                            <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full border rounded-xl p-3" rows="3" />
                        </div>
                        <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-xl font-bold">Save Profile</button>
                    </form>
                </div>

                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border p-8">
                    <h3 className="text-2xl font-black mb-6">My Orders</h3>
                    {orders.length === 0 ? (
                        <p className="text-gray-500">You haven’t placed any orders yet.</p>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order._id} className="border rounded-2xl p-5">
                                    <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-bold">{order._id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Status</p>
                                            <span className="inline-block mt-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                {order.status || 'pending'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Total</p>
                                            <p className="font-black text-red-600">₹{order.orderAmount}</p>
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
                    )}
                </div>
            </div>
        </div>
    );
}
