'use client';
import { useEffect, useState } from 'react';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface Product {
  ID: number;
  Name: string;
  Price: number;
  ImageURL: string;
  quantity: number; // Thêm field số lượng cho frontend
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Giả lập lấy dữ liệu giỏ hàng (Lấy 2 sản phẩm từ API để demo)
  useEffect(() => {
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => {
        // Lấy 2 sản phẩm đầu tiên add vào giỏ demo
        const demoCart = data.slice(0, 2).map((p: any) => ({ ...p, quantity: 1 }));
        setCartItems(demoCart);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  // Hàm tăng giảm số lượng
  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items => items.map(item => {
      if (item.ID === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  // Hàm xóa sản phẩm
  const removeItem = (id: number) => {
    if (confirm('Bạn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
      setCartItems(items => items.filter(item => item.ID !== id));
    }
  };

  // Tính tổng tiền
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.Price * item.quantity), 0);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ea859e]">Đang tải giỏ hàng...</div>;

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <h1 className="font-serif text-2xl font-bold text-[#333] mb-6 flex items-center gap-2">
          Giỏ hàng của bạn <span className="text-sm font-sans font-normal text-gray-500">({cartItems.length} sản phẩm)</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-100">
            <img src="https://sociolla.com/assets/img/empty-cart.png" onError={(e) => e.currentTarget.style.display='none'} className="mx-auto w-40 mb-4 opacity-50" />
            <p className="text-gray-500 mb-6">Giỏ hàng của bạn đang trống</p>
            <Link href="/" className="bg-[#ea859e] text-white px-8 py-3 rounded font-bold uppercase hover:bg-[#d66e85] transition">
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* --- LEFT: CART ITEMS --- */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                {/* Header Table */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 bg-gray-50 text-xs font-bold uppercase text-gray-500">
                  <div className="col-span-6">Sản phẩm</div>
                  <div className="col-span-2 text-center">Đơn giá</div>
                  <div className="col-span-2 text-center">Số lượng</div>
                  <div className="col-span-2 text-right">Thành tiền</div>
                </div>

                {/* Items List */}
                {cartItems.map((item) => (
                  <div key={item.ID} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 items-center last:border-0">
                    
                    {/* Product Info */}
                    <div className="col-span-6 flex gap-4">
                      <div className="w-20 h-20 border border-gray-200 rounded flex-shrink-0">
                        <img src={item.ImageURL} alt={item.Name} className="w-full h-full object-cover p-1" />
                      </div>
                      <div className="flex flex-col justify-between">
                        <div>
                          <Link href={`/products/${item.ID}`} className="text-sm font-medium text-[#333] hover:text-[#ea859e] line-clamp-2 transition">
                            {item.Name}
                          </Link>
                          <span className="text-[10px] text-gray-400 uppercase mt-1 block">Lica Official</span>
                        </div>
                        <button onClick={() => removeItem(item.ID)} className="text-gray-400 hover:text-red-500 text-xs flex items-center gap-1 w-fit">
                          <Trash2 size={12} /> Xóa
                        </button>
                      </div>
                    </div>

                    {/* Unit Price */}
                    <div className="col-span-2 text-center text-sm font-medium text-gray-600">
                      {item.Price.toLocaleString()} ₫
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded h-8">
                        <button onClick={() => updateQuantity(item.ID, -1)} className="px-2 h-full hover:bg-gray-100 text-gray-600"><Minus size={12}/></button>
                        <span className="w-8 text-center text-sm font-bold text-[#333]">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.ID, 1)} className="px-2 h-full hover:bg-gray-100 text-gray-600"><Plus size={12}/></button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="col-span-2 text-right text-sm font-bold text-[#ea859e]">
                      {(item.Price * item.quantity).toLocaleString()} ₫
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-green-600 bg-green-50 p-3 rounded border border-green-100">
                <ShieldCheck size={16} />
                Đơn hàng được miễn phí vận chuyển
              </div>
            </div>

            {/* --- RIGHT: SUMMARY --- */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                <h3 className="font-serif text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-4">Tóm tắt đơn hàng</h3>
                
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Tạm tính</span>
                    <span>{totalPrice.toLocaleString()} ₫</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Giảm giá</span>
                    <span>0 ₫</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between items-center mt-2">
                    <span className="font-bold text-[#333]">Tổng cộng</span>
                    <span className="text-xl font-bold text-[#ea859e]">{totalPrice.toLocaleString()} ₫</span>
                  </div>
                  <p className="text-[10px] text-gray-400 text-right">(Đã bao gồm VAT)</p>
                </div>

                <button className="w-full bg-[#ea859e] text-white py-3 rounded font-bold uppercase tracking-wider hover:bg-[#d66e85] transition flex items-center justify-center gap-2 shadow-lg shadow-pink-100">
                  Thanh toán ngay <ArrowRight size={16} />
                </button>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Mã giảm giá" className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#ea859e]" />
                    <button className="bg-[#333] text-white px-4 py-2 rounded text-sm font-bold hover:bg-black">Áp dụng</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
