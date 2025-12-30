'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, MapPin, Truck, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ShippingPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    province: '',
    district: '',
    ward: '',
    address: '',
    note: ''
  });

  // Load giỏ hàng (Giả lập lấy từ API/LocalStorage)
  useEffect(() => {
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Mock 2 sản phẩm để demo
        const demoCart = data.slice(0, 2).map((p: any) => ({ ...p, quantity: 1 }));
        setCartItems(demoCart);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.Price * item.quantity), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic lưu địa chỉ vào Context/LocalStorage
    console.log('Shipping Info:', form);
    router.push('/order/success');
    // router.push('/order/payment'); // Bước tiếp theo (sẽ làm sau)
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ea859e]">Đang tải...</div>;

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-20 font-sans text-[#333]">
      
      {/* --- PROGRESS BAR --- */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2 text-[#ea859e]">
              <div className="w-6 h-6 rounded-full bg-[#ea859e] text-white flex items-center justify-center text-xs">1</div>
              <span>Giao hàng</span>
            </div>
            <div className="h-[1px] bg-gray-300 flex-1 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">2</div>
              <span>Thanh toán</span>
            </div>
            <div className="h-[1px] bg-gray-300 flex-1 mx-4"></div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs">3</div>
              <span>Hoàn tất</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- LEFT: SHIPPING FORM --- */}
        <div className="lg:col-span-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="font-serif text-xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="text-[#ea859e]" /> Thông tin giao hàng
            </h2>

            <form id="shipping-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Họ tên người nhận <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none"
                    placeholder="Ví dụ: Nguyễn Văn A"
                    onChange={e => setForm({...form, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Số điện thoại <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" required
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none"
                    placeholder="Ví dụ: 0912345678"
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tỉnh / Thành phố <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none" required>
                    <option value="">Chọn Tỉnh/Thành</option>
                    <option value="Hanoi">Hà Nội</option>
                    <option value="HCM">TP. Hồ Chí Minh</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Quận / Huyện <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none" required>
                    <option value="">Chọn Quận/Huyện</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Phường / Xã <span className="text-red-500">*</span></label>
                  <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none" required>
                    <option value="">Chọn Phường/Xã</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Địa chỉ chi tiết <span className="text-red-500">*</span></label>
                <input 
                  type="text" required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none"
                  placeholder="Số nhà, tên đường, tòa nhà..."
                  onChange={e => setForm({...form, address: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Ghi chú giao hàng</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-[#ea859e] focus:outline-none"
                  placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao..."
                  onChange={e => setForm({...form, note: e.target.value})}
                />
              </div>
            </form>
          </div>

          <div className="mt-6">
            <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-[#ea859e] text-sm font-medium">
              <ArrowLeft size={16} /> Quay lại giỏ hàng
            </Link>
          </div>
        </div>

        {/* --- RIGHT: ORDER SUMMARY --- */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-32">
            <h3 className="font-serif text-lg font-bold mb-4 border-b border-gray-100 pb-4">Đơn hàng ({cartItems.length} món)</h3>
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
              {cartItems.map((item) => (
                <div key={item.ID} className="flex gap-3">
                  <div className="w-12 h-12 border border-gray-200 rounded flex-shrink-0">
                    <img src={item.ImageURL} className="w-full h-full object-cover p-0.5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-[#333] line-clamp-2">{item.Name}</p>
                    <p className="text-xs text-gray-500">x{item.quantity}</p>
                  </div>
                  <div className="text-xs font-bold text-[#ea859e]">
                    {(item.Price * item.quantity).toLocaleString()} ₫
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Tạm tính</span>
                <span>{totalPrice.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Phí vận chuyển</span>
                <span className="text-[#ea859e] font-medium">30.000 ₫</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-2">
                <span className="font-bold text-base">Tổng cộng</span>
                <span className="font-bold text-xl text-[#ea859e]">{(totalPrice + 30000).toLocaleString()} ₫</span>
              </div>
            </div>

            <button 
              type="submit" 
              form="shipping-form"
              className="w-full bg-[#ea859e] text-white py-3 rounded mt-6 font-bold uppercase tracking-wider hover:bg-[#d66e85] transition shadow-lg shadow-pink-100 flex items-center justify-center gap-2"
            >
              Tiếp tục thanh toán <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
