'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ fullname: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('https://api.lica.vn/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          FullName: form.fullname,
          Email: form.email, 
          Password: form.password 
        }),
      });

      if (res.ok) {
        alert('🎉 Đăng ký thành công! Vui lòng đăng nhập.');
        router.push('/login');
      } else {
        const data = await res.json();
        alert('❌ Đăng ký thất bại: ' + (data.error || 'Email đã tồn tại'));
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
        <h1 className="font-serif text-3xl text-center font-bold text-[#333] mb-2">Tạo tài khoản</h1>
        <p className="text-center text-gray-500 text-sm mb-8">Trở thành thành viên của Lica ngay hôm nay</p>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Họ và tên</label>
            <input 
              type="text" required
              className="w-full h-10 px-3 border border-gray-300 rounded focus:outline-none focus:border-[#ea859e]"
              onChange={e => setForm({...form, fullname: e.target.value})}
            />
          </div>
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

          <button 
            type="submit" disabled={loading}
            className="w-full bg-[#ea859e] text-white h-11 rounded font-bold uppercase tracking-wider hover:bg-[#d66e85] transition duration-300 shadow-md"
          >
            {loading ? 'Đang xử lý...' : 'Đăng Ký'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản? <Link href="/login" className="font-bold text-[#333] hover:underline">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
}
