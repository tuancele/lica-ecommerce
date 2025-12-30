'use client';
import { useEffect, useState } from 'react';
import { Search, Plus, Filter, Trash2, X, Loader2 } from 'lucide-react';

interface Product {
  ID: number;
  Name: string;
  Price: number;
  ImageURL: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // --- STATE CHO MODAL THÊM SẢN PHẨM ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ Name: '', Price: 0, ImageURL: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load dữ liệu ban đầu
  const loadProducts = () => {
    setLoading(true);
    fetch('https://api.lica.vn/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Hàm xử lý thêm mới
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('https://api.lica.vn/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        setIsModalOpen(false); // Đóng modal
        setNewProduct({ Name: '', Price: 0, ImageURL: '' }); // Reset form
        loadProducts(); // Load lại danh sách
        alert('✅ Đã thêm sản phẩm thành công!');
      } else {
        alert('❌ Có lỗi xảy ra!');
      }
    } catch (error) {
      console.error(error);
      alert('❌ Lỗi kết nối server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 relative">
      {/* --- STATS BAR --- */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
          <div className="text-gray-500 mb-1">Tất cả</div>
          <div className="text-2xl font-bold text-blue-600">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
          <div className="text-gray-500 mb-1">Đang hoạt động</div>
          <div className="text-2xl font-bold text-green-600">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
          <div className="text-gray-500 mb-1">Hết hàng</div>
          <div className="text-2xl font-bold text-gray-800">0</div>
        </div>
        <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
          <div className="text-gray-500 mb-1">Chờ duyệt</div>
          <div className="text-2xl font-bold text-orange-500">0</div>
        </div>
      </div>

      {/* --- MAIN ACTION AREA --- */}
      <div className="bg-white rounded shadow-sm">
        {/* TABS */}
        <div className="flex border-b px-4">
          <button className="px-6 py-4 text-[#ee4d2d] border-b-2 border-[#ee4d2d] font-medium">Tất cả</button>
          <button className="px-6 py-4 text-gray-600 hover:text-[#ee4d2d]">Đang hoạt động</button>
          <button className="px-6 py-4 text-gray-600 hover:text-[#ee4d2d]">Hết hàng</button>
          <button className="px-6 py-4 text-gray-600 hover:text-[#ee4d2d]">Vi phạm</button>
        </div>

        {/* TOOLBAR */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex gap-2">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Tìm tên sản phẩm, SKU..." 
                className="pl-8 pr-4 py-1.5 border border-gray-300 rounded text-sm w-64 focus:outline-none focus:border-gray-400"
              />
              <Search className="absolute left-2.5 top-2 text-gray-400" size={14} />
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-gray-600 text-sm hover:bg-gray-50">
              <Filter size={14} /> Ngành hàng
            </button>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1 bg-[#ee4d2d] text-white px-4 py-1.5 rounded text-sm hover:bg-[#d73211] shadow-sm"
          >
            <Plus size={16} /> Thêm 1 sản phẩm mới
          </button>
        </div>

        {/* TABLE */}
        <table className="w-full text-left border-t border-gray-200">
          <thead className="bg-[#f6f6f6] text-gray-500 text-xs uppercase font-medium">
            <tr>
              <th className="px-4 py-3 w-10"><input type="checkbox" /></th>
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">SKU phân loại</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Kho hàng</th>
              <th className="px-4 py-3">Doanh số</th>
              <th className="px-4 py-3 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-500">Đang tải dữ liệu...</td></tr>
            ) : products.length === 0 ? (
               <tr><td colSpan={7} className="p-8 text-center text-gray-500">Chưa có dữ liệu</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.ID} className="hover:bg-[#fcfcfc] group">
                  <td className="px-4 py-3 align-top"><input type="checkbox" /></td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex gap-3">
                      <img src={p.ImageURL} className="w-12 h-12 object-cover rounded border border-gray-200 bg-gray-50" alt="" />
                      <div>
                        <div className="text-sm text-gray-800 line-clamp-2 mb-1 group-hover:text-[#ee4d2d] cursor-pointer font-medium">{p.Name}</div>
                        <div className="text-xs text-gray-400">ID: #{p.ID}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top text-gray-500 text-xs">-</td>
                  <td className="px-4 py-3 align-top text-gray-800">{p.Price.toLocaleString()} ₫</td>
                  <td className="px-4 py-3 align-top text-gray-800">100</td>
                  <td className="px-4 py-3 align-top text-gray-800">0</td>
                  <td className="px-4 py-3 align-top text-right space-x-2">
                    <button className="text-blue-600 hover:underline text-sm">Sửa</button>
                    <button className="text-gray-500 hover:text-[#ee4d2d]"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="text-center text-gray-400 text-xs py-4">
        © 2025 Lica.vn - Nền tảng bán hàng đa kênh
      </div>

      {/* --- MODAL THÊM SẢN PHẨM (POPUP) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">Thêm Sản Phẩm Mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                <input 
                  type="text" required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d]"
                  placeholder="Nhập tên sản phẩm..."
                  value={newProduct.Name}
                  onChange={e => setNewProduct({...newProduct, Name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá bán (VNĐ)</label>
                <input 
                  type="number" required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d]"
                  placeholder="Ví dụ: 100000"
                  value={newProduct.Price}
                  onChange={e => setNewProduct({...newProduct, Price: Number(e.target.value)})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link Ảnh (URL)</label>
                <input 
                  type="text" required
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#ee4d2d] focus:ring-1 focus:ring-[#ee4d2d]"
                  placeholder="https://..."
                  value={newProduct.ImageURL}
                  onChange={e => setNewProduct({...newProduct, ImageURL: e.target.value})}
                />
                <p className="text-xs text-gray-500 mt-1">Gợi ý: Copy link ảnh từ Google hoặc Shopee dán vào đây.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 font-medium"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-[#ee4d2d] text-white rounded hover:bg-[#d73211] font-medium flex justify-center items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
