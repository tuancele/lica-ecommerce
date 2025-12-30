'use client';
import { useState } from 'react';
import { ChevronRight, Image as ImageIcon, Plus, HelpCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Price: '',
    ImageURL: '',
    Stock: 100 // Mặc định giả lập
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.Name || !formData.Price) {
      alert('Vui lòng nhập Tên và Giá sản phẩm');
      return;
    }

    setLoading(true);
    try {
      // Gọi API Backend thật
      const res = await fetch('https://api.lica.vn/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: formData.Name,
          Price: Number(formData.Price),
          Description: formData.Description,
          ImageURL: formData.ImageURL
        }),
      });

      if (res.ok) {
        alert('✅ Sản phẩm đã được đăng bán!');
        router.push('/'); // Quay về danh sách
      } else {
        alert('❌ Lỗi khi lưu sản phẩm');
      }
    } catch (error) {
      alert('❌ Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 max-w-5xl mx-auto">
      {/* HEADER PAGE */}
      <div className="py-4">
        <h1 className="text-lg font-medium text-gray-800">Thêm 1 sản phẩm mới</h1>
        <p className="text-xs text-gray-500 mt-1">Vui lòng chọn đúng ngành hàng để tối ưu hiệu quả hiển thị.</p>
      </div>

      <div className="space-y-4">
        
        {/* --- SECTION 1: THÔNG TIN CƠ BẢN --- */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Thông tin cơ bản</h2>
          
          {/* Tên sản phẩm */}
          <div className="grid grid-cols-12 gap-4 mb-6 items-center">
            <div className="col-span-2 text-right text-sm text-gray-600">
              <span className="text-red-500">*</span> Tên sản phẩm
            </div>
            <div className="col-span-8">
              <div className="relative">
                <input 
                  type="text" 
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 focus:ring-0"
                  placeholder="Nhập vào"
                />
                <span className="absolute right-3 top-2 text-xs text-gray-400">{formData.Name.length}/120</span>
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="grid grid-cols-12 gap-4 mb-6">
            <div className="col-span-2 text-right text-sm text-gray-600 pt-2">
              <span className="text-red-500">*</span> Mô tả sản phẩm
            </div>
            <div className="col-span-8">
              <div className="relative">
                <textarea 
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 focus:ring-0 resize-none"
                  placeholder="Nhập mô tả chi tiết..."
                />
                <span className="absolute right-3 bottom-2 text-xs text-gray-400">{formData.Description.length}/3000</span>
              </div>
            </div>
          </div>

          {/* Ngành hàng (Mock UI) */}
          <div className="grid grid-cols-12 gap-4 mb-6 items-center">
            <div className="col-span-2 text-right text-sm text-gray-600">
              <span className="text-red-500">*</span> Ngành hàng
            </div>
            <div className="col-span-8">
              <div className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-50 text-gray-500 flex justify-between cursor-pointer">
                <span>Chọn ngành hàng</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THÔNG TIN BÁN HÀNG --- */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Thông tin bán hàng</h2>
          
          {/* Giá */}
          <div className="grid grid-cols-12 gap-4 mb-6 items-center">
            <div className="col-span-2 text-right text-sm text-gray-600">
              <span className="text-red-500">*</span> Giá
            </div>
            <div className="col-span-8">
              <div className="relative">
                <div className="absolute left-3 top-2 text-gray-400 text-sm">₫</div>
                <input 
                  type="number"
                  name="Price"
                  value={formData.Price}
                  onChange={handleChange} 
                  className="w-full border border-gray-300 rounded pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-gray-500"
                  placeholder="Nhập vào"
                />
              </div>
            </div>
          </div>

          {/* Kho hàng */}
          <div className="grid grid-cols-12 gap-4 mb-6 items-center">
            <div className="col-span-2 text-right text-sm text-gray-600">
              <span className="text-red-500">*</span> Kho hàng
            </div>
            <div className="col-span-8">
              <input 
                type="number" 
                value={formData.Stock}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-gray-100 text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* --- SECTION 3: QUẢN LÝ HÌNH ẢNH --- */}
        <div className="bg-white rounded shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-6">Quản lý hình ảnh</h2>
          
          <div className="grid grid-cols-12 gap-4 mb-6">
             <div className="col-span-2 text-right text-sm text-gray-600 pt-2">
              <span className="text-red-500">*</span> Link Ảnh bìa
            </div>
            <div className="col-span-10 flex gap-4">
              {/* Ô nhập link ảnh */}
              <div className="flex-1">
                 <input 
                  type="text"
                  name="ImageURL"
                  value={formData.ImageURL}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gray-500 mb-2"
                  placeholder="Dán đường dẫn ảnh (URL) vào đây..."
                />
                
                {/* Preview Ảnh */}
                <div className="w-24 h-24 border-2 border-dashed border-[#ee4d2d] rounded flex items-center justify-center bg-[#fef6f5] relative overflow-hidden group">
                  {formData.ImageURL ? (
                    <img src={formData.ImageURL} className="w-full h-full object-cover" alt="Preview" onError={(e) => e.currentTarget.style.display = 'none'} />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="mx-auto text-[#ee4d2d]" size={20} />
                      <div className="text-xs text-[#ee4d2d] mt-1">Thêm ảnh</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Các ô ảnh phụ (Mock UI) */}
              {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="w-24 h-24 border border-dashed border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <div className="text-center text-gray-400">
                      <Plus className="mx-auto" size={20} />
                      <div className="text-xs mt-1">Hình ảnh {i}</div>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* --- FOOTER ACTION --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] py-4 px-6 flex justify-end gap-4 z-50 ml-64">
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-2 rounded text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Hủy
        </button>
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 rounded text-sm font-medium text-white bg-[#ee4d2d] hover:bg-[#d73211] shadow-sm disabled:opacity-70"
        >
          {loading ? 'Đang xử lý...' : 'Lưu & Hiển thị'}
        </button>
      </div>
    </div>
  );
}
