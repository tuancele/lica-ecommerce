'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://api.lica.vn/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          Email: form.email, 
          Password: form.password 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Lưu token vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('full_name', data.full_name);
        alert('🎉 Đăng nhập thành công!');
        router.push('/'); // Về trang chủ
        window.location.reload(); // Reload để cập nhật Header
      } else {
        alert('❌ Đăng nhập thất bại: ' + (data.error || 'Lỗi không xác định'));
      }
    } catch (error) {
      alert('❌ Lỗi kết nối server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfc]">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="font-serif text-3xl text-center font-bold text-[#333] mb-2">Chào mừng trở lại</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Vui lòng đăng nhập tài khoản Lica của bạn</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#ea859e]"
              onChange={e => setForm({...form, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Mật khẩu</label>
            <input 
              type="password" required
              className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#ea859e]"
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-xs text-gray-500 hover:text-[#ea859e] hover:underline">Quên mật khẩu?</a>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-[#333] text-white h-11 rounded font-bold uppercase tracking-wider hover:bg-[#ea859e] transition duration-300"
          >
            {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản? <Link href="/register" className="font-bold text-[#ea859e] hover:underline">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
}
