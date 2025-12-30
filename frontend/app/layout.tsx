import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, Heart } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: "Lica.vn - Kênh mua sắm mỹ phẩm chính hãng",
  description: "Mỹ phẩm chính hãng 100%, giao hàng toàn quốc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${playfair.variable} bg-white font-sans text-[#333]`}>
        
        <div className="bg-[#1a1a1a] text-white text-[11px] py-2 tracking-wide">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="flex gap-4">
              <span>Tải ứng dụng Lica</span>
              <span>Kết nối với chúng tôi</span>
            </div>
            <div className="flex gap-4">
              <span>Trợ giúp</span>
              <span>Kiểm tra đơn hàng</span>
            </div>
          </div>
        </div>

        <header className="bg-white sticky top-0 z-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-8">
              
              <Link href="/" className="text-3xl font-bold font-serif tracking-tighter text-black shrink-0">
                LICA<span className="text-[#ea859e]">.</span>VN
              </Link>

              <div className="flex-1 max-w-xl relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Bạn đang tìm gì hôm nay? (Son môi, Cushion...)" 
                  className="w-full h-10 pl-4 pr-12 rounded-full border border-gray-200 bg-[#f9f9f9] text-sm focus:outline-none focus:border-[#ea859e] focus:bg-white transition-all"
                />
                <button className="absolute right-1 top-1 h-8 w-10 bg-[#ea859e] rounded-full flex items-center justify-center text-white hover:bg-[#d66e85]">
                  <Search size={16} />
                </button>
              </div>

              <div className="flex items-center gap-6 text-[#333]">
                {/* --- UPDATE: Link về Profile, trang Profile sẽ tự check login --- */}
                <Link href="/profile" className="flex flex-col items-center cursor-pointer hover:text-[#ea859e] group">
                  <User size={22} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase font-bold mt-1 group-hover:text-[#ea859e]">Tài khoản</span>
                </Link>
                <div className="flex flex-col items-center cursor-pointer hover:text-[#ea859e] group">
                  <Heart size={22} strokeWidth={1.5} />
                  <span className="text-[10px] uppercase font-bold mt-1 group-hover:text-[#ea859e]">Yêu thích</span>
                </div>
                <Link href="/cart" className="flex flex-col items-center cursor-pointer hover:text-[#ea859e] group relative">
                  <div className="relative">
                    <ShoppingBag size={22} strokeWidth={1.5} />
                    <span className="absolute -top-1 -right-1 bg-[#ea859e] text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full">2</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold mt-1 group-hover:text-[#ea859e]">Giỏ hàng</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4">
              <nav className="flex items-center justify-center gap-8 py-3 text-[13px] font-bold tracking-widest uppercase text-gray-700">
                <div className="flex items-center gap-2 cursor-pointer hover:text-[#ea859e]">
                  <Menu size={16} /> Danh mục
                </div>
                <Link href="#" className="hover:text-[#ea859e] relative group">
                  Khuyến mãi
                  <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#ea859e] transition-all group-hover:w-full"></span>
                </Link>
                <Link href="#" className="hover:text-[#ea859e] relative group">
                  Thương hiệu
                  <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#ea859e] transition-all group-hover:w-full"></span>
                </Link>
                <Link href="#" className="hover:text-[#ea859e] relative group">
                  Hàng mới về
                  <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#ea859e] transition-all group-hover:w-full"></span>
                </Link>
                <Link href="#" className="hover:text-[#ea859e] text-[#ea859e] relative group">
                  Lica Blog
                  <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#ea859e] transition-all group-hover:w-full"></span>
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen bg-white">
          {children}
        </main>

        <footer className="bg-[#fcfcfc] border-t border-gray-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
            <div>
              <h4 className="font-serif text-lg font-bold mb-6">Lica.vn</h4>
              <p className="text-gray-500 leading-relaxed mb-4">
                Kênh mua sắm mỹ phẩm chính hãng, uy tín hàng đầu Việt Nam. Nơi bạn tìm thấy vẻ đẹp đích thực.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">F</div>
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">I</div>
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center">Y</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-xs">Thông tin</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#" className="hover:text-[#ea859e]">Về chúng tôi</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Tuyển dụng</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Điều khoản sử dụng</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Chính sách bảo mật</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-xs">Hỗ trợ khách hàng</h4>
              <ul className="space-y-3 text-gray-500">
                <li><a href="#" className="hover:text-[#ea859e]">Hướng dẫn mua hàng</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Phương thức thanh toán</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Chính sách vận chuyển</a></li>
                <li><a href="#" className="hover:text-[#ea859e]">Trả hàng & Hoàn tiền</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider mb-6 text-xs">Đăng ký nhận tin</h4>
              <p className="text-gray-500 mb-4 text-xs">Nhận thông tin khuyến mãi mới nhất từ Lica.</p>
              <div className="flex">
                <input type="text" placeholder="Email của bạn" className="bg-white border border-gray-300 px-3 py-2 text-xs w-full focus:outline-none focus:border-black" />
                <button className="bg-black text-white px-4 text-xs uppercase font-bold">Gửi</button>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-xs">
            © 2025 Lica.vn - All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}
