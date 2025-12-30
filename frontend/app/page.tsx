'use client';
import { useEffect, useState } from 'react';
import { Star, ArrowRight, Heart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  ID: number;
  Name: string;
  Price: number;
  ImageURL: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="pb-20">
      
      {/* --- HERO BANNER --- */}
      <div className="w-full h-[350px] md:h-[450px] bg-[#f9e6e9] relative overflow-hidden flex items-center justify-center">
        <img 
          src="https://sociolla.com/assets/img/main-banner-placeholder.png" 
          onError={(e) => e.currentTarget.src = 'https://placehold.co/1920x600/fcecf0/333?text=BEAUTY+SALE+50%25'}
          alt="Hero Banner" 
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="relative z-10 text-center bg-white/80 backdrop-blur-sm p-8 max-w-lg mx-auto shadow-sm">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2 text-[#333]">New Year Sale</h2>
          <p className="text-gray-600 mb-6 font-light">Ưu đãi lên đến 50% cho các thương hiệu hàng đầu</p>
          <button className="bg-black text-white px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-[#ea859e] transition">Mua ngay</button>
        </div>
      </div>

      {/* --- ICON CATEGORIES --- */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center gap-8 md:gap-16 flex-wrap">
          {[
            {name: "Skincare", icon: "🧴"},
            {name: "Makeup", icon: "💄"},
            {name: "Body", icon: "🛁"},
            {name: "Hair", icon: "💇‍♀️"},
            {name: "Accessories", icon: "🎀"},
            {name: "Supplements", icon: "💊"},
          ].map((cat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-3 group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#fff0f3] flex items-center justify-center text-3xl group-hover:bg-[#ea859e] group-hover:text-white transition duration-300 shadow-sm">
                {cat.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-600 group-hover:text-[#ea859e]">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- EDITOR'S CHOICE --- */}
      <div className="bg-[#fbfbfb] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="font-serif text-3xl font-bold text-[#333] mb-2">Editor's Choice</h3>
            <p className="text-gray-500 font-light italic">Sản phẩm được yêu thích nhất tuần này</p>
            <div className="w-10 h-1 bg-[#ea859e] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.length > 0 ? products.slice(0, 5).map((p) => (
              <Link href={`/products/${p.ID}`} key={p.ID} className="bg-white p-4 group cursor-pointer hover:shadow-xl transition duration-500 relative block">
                <div className="absolute top-0 left-0 bg-[#ea859e] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wide z-10">Best Seller</div>
                
                <div className="aspect-square overflow-hidden mb-4 relative">
                  <img 
                    src={p.ImageURL || 'https://placehold.co/400x400'} 
                    alt={p.Name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center py-2 text-xs uppercase font-bold translate-y-full group-hover:translate-y-0 transition duration-300">
                    Thêm vào giỏ
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Thương hiệu</div>
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-2 h-10 mb-2 group-hover:text-[#ea859e] transition">{p.Name}</h4>
                  
                  <div className="flex justify-center items-center gap-1 mb-2">
                    <div className="flex text-[#ea859e]">
                      {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-gray-400">(120)</span>
                  </div>

                  <div className="text-base font-bold text-[#333]">{p.Price.toLocaleString()} ₫</div>
                </div>
              </Link>
            )) : (
              <p className="col-span-5 text-center text-gray-400 py-10 font-light">Đang tải sản phẩm...</p>
            )}
          </div>
        </div>
      </div>

      {/* --- TRENDING NOW --- */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#333]">Trending Now</h3>
            <p className="text-gray-500 text-sm mt-1">Xu hướng làm đẹp mới nhất</p>
          </div>
          <a href="#" className="flex items-center gap-1 text-sm font-bold text-[#ea859e] hover:underline uppercase tracking-wider">
            Xem tất cả <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((p) => (
            <Link href={`/products/${p.ID}`} key={p.ID} className="group cursor-pointer block">
              <div className="bg-gray-50 mb-3 relative overflow-hidden">
                <img 
                  src={p.ImageURL} 
                  className="w-full h-64 object-cover group-hover:opacity-90 transition"
                  alt={p.Name}
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-[#ea859e] transition transform scale-0 group-hover:scale-100">
                  <Heart size={18} />
                </button>
              </div>
              <div>
                <h4 className="text-sm font-normal text-gray-800 hover:text-[#ea859e] transition mb-1">{p.Name}</h4>
                <div className="font-bold text-[#333]">{p.Price.toLocaleString()} ₫</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
