'use client';
import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag, ArrowRight, Copy } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Giả lập tạo mã đơn hàng ngẫu nhiên
    const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
    
    // Xóa giỏ hàng sau khi đặt thành công (nếu dùng localStorage thật)
    // localStorage.removeItem('cart');
  }, []);

  return (
    <div className="bg-[#f9f9f9] min-h-screen pb-20 font-sans text-[#333]">
      
      {/* --- PROGRESS BAR (Bước 3: Hoàn tất) --- */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-400">
            <div className="flex items-center gap-2 text-[#ea859e]">
              <div className="w-6 h-6 rounded-full bg-[#ea859e] text-white flex items-center justify-center text-xs">1</div>
              <span>Giao hàng</span>
            </div>
            <div className="h-[1px] bg-[#ea859e] flex-1 mx-4"></div>
            <div className="flex items-center gap-2 text-[#ea859e]">
              <div className="w-6 h-6 rounded-full bg-[#ea859e] text-white flex items-center justify-center text-xs">2</div>
              <span>Thanh toán</span>
            </div>
            <div className="h-[1px] bg-[#ea859e] flex-1 mx-4"></div>
            <div className="flex items-center gap-2 text-[#ea859e] font-bold">
              <div className="w-6 h-6 rounded-full bg-[#ea859e] text-white flex items-center justify-center text-xs">3</div>
              <span>Hoàn tất</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
          
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-500 w-10 h-10" />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold text-[#333] mb-2">Đặt hàng thành công!</h1>
          <p className="text-gray-500 mb-8">Cảm ơn bạn đã mua sắm tại Lica.vn</p>

          <div className="bg-[#fcfcfc] border border-dashed border-gray-300 rounded-lg p-6 mb-8">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Mã đơn hàng của bạn</p>
            <div className="flex justify-center items-center gap-3">
              <span className="text-2xl font-bold text-[#ea859e]">{orderId}</span>
              <button className="text-gray-400 hover:text-gray-600" title="Copy">
                <Copy size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              (Chúng tôi sẽ gửi email xác nhận đơn hàng cho bạn ngay)
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block w-full bg-[#ea859e] text-white py-3 rounded font-bold uppercase tracking-wider hover:bg-[#d66e85] transition shadow-lg shadow-pink-100 flex items-center justify-center gap-2">
              <ShoppingBag size={18} /> Tiếp tục mua sắm
            </Link>
            
            <Link href="#" className="block w-full bg-white border border-gray-300 text-gray-600 py-3 rounded font-bold uppercase tracking-wider hover:bg-gray-50 transition flex items-center justify-center gap-2">
              Xem chi tiết đơn hàng <ArrowRight size={18} />
            </Link>
          </div>

        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Cần hỗ trợ? Liên hệ Hotline <span className="font-bold text-[#ea859e]">1800 6324</span>
        </div>
      </div>
    </div>
  );
}
