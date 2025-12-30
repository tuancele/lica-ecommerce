'use client';
import { useEffect, useState } from 'react';
import { Star, Heart, Share2, Truck, ShieldCheck, Minus, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Gọi API lấy chi tiết (Hiện tại API list trả về all, ta lọc tạm client để demo)
    // Sau này Backend viết API get-by-id thì sửa lại url: /api/products/${id}
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p: any) => p.ID == id);
        setProduct(found);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#ea859e]">Đang tải...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Không tìm thấy sản phẩm</div>;

  return (
    <div className="bg-white pb-20">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-gray-500">
          Trang chủ / Skincare / <span className="text-[#333]">{product.Name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* --- LEFT: IMAGES --- */}
          <div className="md:col-span-5">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative">
              <img 
                src={product.ImageURL || 'https://placehold.co/500x500'} 
                alt={product.Name} 
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-[#ea859e] text-white text-xs font-bold px-2 py-1 uppercase">Best Seller</div>
            </div>
            <div className="flex gap-4 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 border border-gray-200 rounded cursor-pointer hover:border-[#ea859e]">
                   <img src={product.ImageURL} className="w-full h-full object-cover p-1" />
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="md:col-span-7">
            {/* Brand */}
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-[#ea859e] uppercase tracking-widest hover:underline cursor-pointer">Lica Official</span>
              <div className="flex gap-3 text-gray-400">
                <Heart size={20} className="hover:text-[#ea859e] cursor-pointer" />
                <Share2 size={20} className="hover:text-[#ea859e] cursor-pointer" />
              </div>
            </div>

            {/* Name */}
            <h1 className="font-serif text-3xl font-medium text-[#333] mb-4 leading-tight">
              {product.Name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-6">
              <div className="flex text-[#ea859e]">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} fill="currentColor" />)}
              </div>
              <span className="text-sm text-gray-500 border-l border-gray-300 pl-2 ml-2">128 Đánh giá</span>
              <span className="text-sm text-gray-500 border-l border-gray-300 pl-2 ml-2">568 Đã bán</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-[#ea859e]">{product.Price.toLocaleString()} ₫</span>
                <span className="text-lg text-gray-400 line-through mb-1">{(product.Price * 1.3).toLocaleString()} ₫</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded mb-2">-30%</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Đã bao gồm thuế VAT</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100"><Minus size={14}/></button>
                <span className="w-12 text-center font-bold text-sm">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100"><Plus size={14}/></button>
              </div>
              <button className="flex-1 bg-[#ea859e] text-white py-3 px-6 rounded font-bold uppercase tracking-widest hover:bg-[#d66e85] transition shadow-lg shadow-pink-100">
                Thêm vào giỏ hàng
              </button>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#333]" />
                <span>Freeship đơn từ 200k</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#333]" />
                <span>Cam kết chính hãng 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- DESCRIPTION TABS --- */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200 mb-6">
            <button className="py-3 px-6 border-b-2 border-[#ea859e] text-[#ea859e] font-bold text-sm uppercase">Thông tin sản phẩm</button>
            <button className="py-3 px-6 text-gray-500 font-bold text-sm uppercase hover:text-[#333]">Thành phần</button>
            <button className="py-3 px-6 text-gray-500 font-bold text-sm uppercase hover:text-[#333]">Hướng dẫn sử dụng</button>
          </div>
          
          <div className="text-sm text-gray-600 leading-7 space-y-4 max-w-4xl">
            <p className="font-serif text-lg text-black font-bold">Mô tả chi tiết:</p>
            <p>
              {product.Description || 'Sản phẩm đang được cập nhật mô tả. Vui lòng quay lại sau.'}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <img src={product.ImageURL} className="w-full max-w-md my-4 rounded" />
          </div>
        </div>

      </div>
    </div>
  );
}
