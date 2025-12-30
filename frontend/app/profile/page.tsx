'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Package, Heart, MapPin, LogOut, Settings, Camera, Search, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

// Mock Data Đơn hàng
const MOCK_ORDERS = [
  {
    id: 'ORD-829312',
    date: '2025-12-28',
    status: 'completed', // completed, shipping, pending, cancelled
    statusText: 'Giao hàng thành công',
    total: 1590000,
    items: [
      {
        name: 'Nước Tẩy Trang Bioderma Sensibio H2O',
        image: 'https://sociolla.com/assets/img/default-avatar.png', // Thay bằng ảnh thật nếu có
        variant: '500ml',
        quantity: 2,
        price: 350000
      },
      {
        name: 'Kem Dưỡng Ẩm Neutrogena Hydro Boost',
        image: 'https://sociolla.com/assets/img/default-avatar.png',
        variant: '50g',
        quantity: 1,
        price: 890000
      }
    ]
  },
  {
    id: 'ORD-992831',
    date: '2025-12-30',
    status: 'shipping',
    statusText: 'Đang vận chuyển',
    total: 450000,
    items: [
      {
        name: 'Son Kem Lì Black Rouge Air Fit Velvet Tint',
        image: 'https://sociolla.com/assets/img/default-avatar.png',
        variant: 'A12 - Dashed Brown',
        quantity: 1,
        price: 150000
      }
    ]
  },
  {
    id: 'ORD-112233',
    date: '2025-10-15',
    status: 'cancelled',
    statusText: 'Đã hủy',
    total: 2200000,
    items: [
      {
        name: 'Máy Rửa Mặt Foreo Luna Mini 3',
        image: 'https://sociolla.com/assets/img/default-avatar.png',
        variant: 'Mint',
        quantity: 1,
        price: 2200000
      }
    ]
  }
];

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('orders'); // orders | wishlist | address
  const [orderFilter, setOrderFilter] = useState('all'); // all | pending | shipping | completed | cancelled

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fullName = localStorage.getItem('full_name');
    
    if (!token) {
      router.push('/login');
      return;
    }

    setUser({
      name: fullName || 'Lica Member',
      email: 'member@lica.vn',
      avatar: 'https://sociolla.com/assets/img/default-avatar.png',
      level: 'Pink Member',
      points: 150
    });
  }, [router]);

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('full_name');
      window.location.href = '/';
    }
  };

  // Filter Orders Logic
  const filteredOrders = MOCK_ORDERS.filter(order => {
    if (orderFilter === 'all') return true;
    return order.status === orderFilter;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'shipping': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'cancelled': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-[#ea859e]">Đang tải...</div>;

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-20 pt-8 font-sans text-[#333]">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb nhỏ */}
        <div className="text-xs text-gray-500 mb-6">
          <Link href="/">Trang chủ</Link> / <span className="text-[#333]">Tài khoản của tôi</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDEBAR --- */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 text-center mb-4 relative overflow-hidden">
              <div className="h-20 bg-[#fcecf0] absolute top-0 left-0 right-0 z-0"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto bg-white p-1 rounded-full shadow-md mb-3 relative group cursor-pointer">
                  <img src={user.avatar} className="w-full h-full rounded-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <Camera className="text-white" size={20}/>
                  </div>
                </div>
                <h2 className="font-serif text-xl font-bold text-[#333]">{user.name}</h2>
                <p className="text-xs text-gray-500 mb-2">{user.level}</p>
                <div className="inline-block bg-[#ea859e] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {user.points} SOCO Points
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <nav className="flex flex-col text-sm">
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-6 py-4 hover:bg-[#fff0f3] transition ${activeTab === 'orders' ? 'text-[#ea859e] font-bold border-l-4 border-[#ea859e] bg-[#fff0f3]' : 'text-gray-600 border-l-4 border-transparent'}`}
                >
                  <Package size={18} /> Quản lý đơn hàng
                </button>
                <button 
                  onClick={() => setActiveTab('wishlist')}
                  className={`flex items-center gap-3 px-6 py-4 hover:bg-[#fff0f3] transition ${activeTab === 'wishlist' ? 'text-[#ea859e] font-bold border-l-4 border-[#ea859e] bg-[#fff0f3]' : 'text-gray-600 border-l-4 border-transparent'}`}
                >
                  <Heart size={18} /> Sản phẩm yêu thích
                </button>
                <button 
                  onClick={() => setActiveTab('address')}
                  className={`flex items-center gap-3 px-6 py-4 hover:bg-[#fff0f3] transition ${activeTab === 'address' ? 'text-[#ea859e] font-bold border-l-4 border-[#ea859e] bg-[#fff0f3]' : 'text-gray-600 border-l-4 border-transparent'}`}
                >
                  <MapPin size={18} /> Sổ địa chỉ
                </button>
                <button 
                  className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-[#fff0f3] border-l-4 border-transparent transition"
                >
                  <Settings size={18} /> Cài đặt tài khoản
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-4 text-gray-600 hover:bg-gray-50 border-t border-gray-100 transition mt-2"
                >
                  <LogOut size={18} /> Đăng xuất
                </button>
              </nav>
            </div>
          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-9">
            
            {/* TAB: ORDERS */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 min-h-[600px]">
                
                {/* Order Filter Tabs */}
                <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
                  {[
                    {id: 'all', label: 'Tất cả'},
                    {id: 'pending', label: 'Chờ thanh toán'},
                    {id: 'shipping', label: 'Đang giao'},
                    {id: 'completed', label: 'Hoàn thành'},
                    {id: 'cancelled', label: 'Đã hủy'},
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setOrderFilter(tab.id)}
                      className={`px-6 py-4 text-sm font-bold uppercase whitespace-nowrap transition border-b-2 ${orderFilter === tab.id ? 'border-[#ea859e] text-[#ea859e]' : 'border-transparent text-gray-500 hover:text-[#333]'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Search Order */}
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <div className="relative max-w-md">
                    <input 
                      type="text" 
                      placeholder="Tìm kiếm theo Mã đơn hàng hoặc Tên sản phẩm..." 
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-[#ea859e]"
                    />
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                  </div>
                </div>
                
                {/* Order List */}
                <div className="p-6 space-y-6">
                  {filteredOrders.length === 0 ? (
                    <div className="text-center py-20">
                      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package size={40} className="text-gray-300" />
                      </div>
                      <p className="text-gray-500">Chưa có đơn hàng nào</p>
                      <Link href="/" className="text-[#ea859e] font-bold text-sm hover:underline mt-2 inline-block">Mua sắm ngay</Link>
                    </div>
                  ) : (
                    filteredOrders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg hover:shadow-md transition bg-white">
                        
                        {/* Header Order */}
                        <div className="flex flex-wrap justify-between items-center p-4 border-b border-gray-100 bg-[#fbfbfb]">
                          <div className="text-sm flex gap-4">
                            <span className="font-bold text-[#333]">#{order.id}</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-500">{order.date}</span>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase border ${getStatusColor(order.status)}`}>
                            {order.statusText}
                          </span>
                        </div>
                        
                        {/* Items */}
                        <div className="p-4 space-y-4">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-4">
                              <div className="w-16 h-16 border border-gray-200 rounded flex-shrink-0">
                                <img 
                                  src={item.image} 
                                  onError={(e) => e.currentTarget.src = 'https://placehold.co/100x100?text=SP'}
                                  className="w-full h-full object-cover p-1" 
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-[#333] mb-1">{item.name}</h4>
                                <div className="flex justify-between items-end">
                                  <div className="text-xs text-gray-500">
                                    <p>Phân loại: {item.variant}</p>
                                    <p>x{item.quantity}</p>
                                  </div>
                                  <span className="text-sm font-bold text-gray-700">{item.price.toLocaleString()} ₫</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Footer Order */}
                        <div className="p-4 border-t border-gray-100 bg-[#fcfcfc] rounded-b-lg">
                          <div className="flex justify-end items-center gap-2 mb-4">
                            <span className="text-sm text-gray-600">Thành tiền:</span>
                            <span className="text-lg font-bold text-[#ea859e]">{order.total.toLocaleString()} ₫</span>
                          </div>
                          <div className="flex justify-end gap-3">
                            <button className="px-6 py-2 border border-gray-300 rounded text-xs font-bold uppercase text-gray-600 hover:bg-white hover:border-gray-400 transition">
                              Xem chi tiết
                            </button>
                            <button className="px-6 py-2 bg-[#ea859e] text-white rounded text-xs font-bold uppercase hover:bg-[#d66e85] transition shadow-sm">
                              Mua lại
                            </button>
                          </div>
                        </div>

                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB: WISHLIST */}
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 min-h-[500px]">
                <h3 className="font-serif text-xl font-bold mb-6 border-b border-gray-100 pb-4">Sản phẩm yêu thích</h3>
                <div className="text-center py-20 text-gray-400">
                  <Heart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Danh sách yêu thích đang trống</p>
                  <Link href="/" className="text-[#ea859e] hover:underline text-sm font-bold mt-2 inline-block">Khám phá ngay</Link>
                </div>
              </div>
            )}

            {/* TAB: ADDRESS */}
            {activeTab === 'address' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 min-h-[500px]">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <h3 className="font-serif text-xl font-bold">Sổ địa chỉ</h3>
                  <button className="bg-[#333] text-white px-4 py-2 rounded text-xs font-bold uppercase hover:bg-black transition">
                    + Thêm địa chỉ mới
                  </button>
                </div>
                
                <div className="border border-[#ea859e] bg-[#fff0f3] rounded-lg p-5 relative">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-[#333] text-base">{user.name}</h4>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-600 text-sm">(+84) 912 345 678</span>
                      </div>
                      <p className="text-sm text-gray-600">71 Hoàng Hoa Thám</p>
                      <p className="text-sm text-gray-600">Phường 13, Quận Tân Bình, TP. Hồ Chí Minh</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[#ea859e] text-[10px] font-bold bg-white px-2 py-1 rounded border border-[#ea859e] uppercase tracking-wide">Mặc định</span>
                      <button className="text-blue-600 text-xs hover:underline mt-1">Chỉnh sửa</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
