'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronDown, Star, Heart, ShoppingBag, Filter, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

interface Product {
  ID: number;
  Name: string;
  Price: number;
  ImageURL: string;
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categoryName = slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Sản phẩm';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');

  // Load sản phẩm từ API
  useEffect(() => {
    setLoading(true);
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20 font-sans text-[#333]">
      
      {/* --- BREADCRUMB --- */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-[#ea859e]">Trang chủ</Link>
          <span>/</span>
          <span className="text-[#333] font-bold">{categoryName}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- LEFT SIDEBAR (FILTERS) --- */}
          <div className="hidden lg:block lg:col-span-3 space-y-8">
            
            {/* Danh mục con */}
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#333]">Danh mục</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between cursor-pointer hover:text-[#ea859e] font-bold text-[#ea859e]">
                  <span>Tất cả {categoryName}</span>
                  <span className="text-xs bg-pink-100 px-2 py-0.5 rounded-full text-[#ea859e]">120</span>
                </li>
                {['Làm sạch', 'Dưỡng ẩm', 'Đặc trị', 'Chống nắng', 'Mặt nạ'].map((item) => (
                  <li key={item} className="flex justify-between cursor-pointer hover:text-[#ea859e]">
                    <span>{item}</span>
                    <span className="text-xs text-gray-400">24</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lọc theo giá */}
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#333]">Khoảng giá</h3>
              <div className="space-y-3">
                {[
                  'Dưới 200.000đ',
                  '200.000đ - 500.000đ',
                  '500.000đ - 1.000.000đ',
                  'Trên 1.000.000đ'
                ].map((price, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#ea859e] border-gray-300 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-[#ea859e] transition">{price}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lọc theo thương hiệu */}
            <div className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-[#333]">Thương hiệu</h3>
              <div className="relative mb-3">
                <input type="text" placeholder="Tìm thương hiệu..." className="w-full border border-gray-200 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-[#ea859e]" />
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 pr-2">
                {['Lica Official', 'La Roche-Posay', 'Vichy', 'Skin1004', 'Klairs', 'Cocoon', 'L\'Oreal'].map((brand, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 accent-[#ea859e] border-gray-300 rounded" />
                    <span className="text-sm text-gray-600 group-hover:text-[#ea859e] transition">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* --- RIGHT CONTENT --- */}
          <div className="lg:col-span-9">
            
            {/* Banner Category */}
            <div className="w-full h-48 md:h-64 bg-[#f9e6e9] rounded-xl overflow-hidden mb-8 relative flex items-center justify-center">
               <img 
                  src="https://sociolla.com/assets/img/main-banner-placeholder.png" 
                  onError={(e) => e.currentTarget.src = 'https://placehold.co/900x300/fcecf0/ea859e?text=' + categoryName}
                  className="w-full h-full object-cover absolute inset-0"
               />
               <div className="relative z-10 bg-white/90 backdrop-blur px-8 py-4 rounded shadow-sm text-center">
                 <h1 className="font-serif text-3xl font-bold text-[#333] mb-1">{categoryName} Collection</h1>
                 <p className="text-xs text-gray-500 uppercase tracking-widest">Khám phá vẻ đẹp đích thực</p>
               </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <div className="text-sm text-gray-500 mb-2 md:mb-0">
                Hiển thị <span className="font-bold text-[#333]">1-{products.length}</span> trong <span className="font-bold text-[#333]">{products.length}</span> kết quả
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="hidden md:inline">Sắp xếp theo:</span>
                  <div className="relative">
                    <select 
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 px-4 py-2 pr-8 rounded focus:outline-none focus:border-[#ea859e] text-sm cursor-pointer"
                    >
                      <option value="popular">Phổ biến nhất</option>
                      <option value="newest">Mới nhất</option>
                      <option value="price_asc">Giá tăng dần</option>
                      <option value="price_desc">Giá giảm dần</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* Mobile Filter Button */}
                <button className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                  <SlidersHorizontal size={16} /> Lọc
                </button>
              </div>
            </div>

            {/* PRODUCT GRID */}
            {loading ? (
              <div className="text-center py-20 text-gray-400">Đang tải sản phẩm...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-gray-400">Không có sản phẩm nào trong danh mục này.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {products.map((p) => (
                  <Link href={`/products/${p.ID}`} key={p.ID} className="group cursor-pointer bg-white rounded-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-pink-100 overflow-hidden">
                    
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                      <img 
                        src={p.ImageURL} 
                        alt={p.Name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/300x400'}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="bg-[#ea859e] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide rounded-sm">Hot</span>
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-[#ea859e] hover:text-white transition text-gray-400">
                        <Heart size={16} />
                      </button>

                      {/* Quick Add Button (Slide Up) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur py-3 px-4 translate-y-full group-hover:translate-y-0 transition duration-300 border-t border-pink-100 flex items-center justify-center gap-2 text-[#ea859e] font-bold text-xs uppercase tracking-wider hover:bg-[#ea859e] hover:text-white">
                        <ShoppingBag size={14} /> Thêm vào giỏ
                      </div>
                    </div>

                    {/* Info Area */}
                    <div className="p-3">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Lica Official</div>
                      <h3 className="text-sm text-gray-800 font-medium line-clamp-2 min-h-[40px] mb-2 group-hover:text-[#ea859e] transition">{p.Name}</h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex text-[#ea859e]">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={10} fill="currentColor" />
                          ))}
                        </div>
                        <span className="text-[10px] text-gray-400">(25)</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-[#333]">{p.Price.toLocaleString()} ₫</span>
                          <span className="text-[10px] text-gray-400 line-through">{(p.Price * 1.2).toLocaleString()} ₫</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-12 gap-2">
              {[1, 2, 3, '...', 10].map((page, idx) => (
                <button 
                  key={idx}
                  className={`w-10 h-10 flex items-center justify-center rounded border text-sm font-bold transition ${page === 1 ? 'bg-[#ea859e] text-white border-[#ea859e]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#ea859e] hover:text-[#ea859e]'}`}
                >
                  {page}
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
