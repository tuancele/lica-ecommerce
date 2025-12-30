import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { 
  ShoppingBag, 
  ClipboardList, 
  Truck, 
  BarChart2, 
  Settings, 
  CreditCard, 
  MessageSquare,
  Bell,
  User,
  LayoutGrid
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kênh Người Bán - Lica.vn",
  description: "Trang quản trị hệ thống Lica.vn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className + " bg-[#f6f6f6] text-sm text-[#333]"}>
        <div className="flex h-screen overflow-hidden">
          
          {/* --- SIDEBAR (Giống Shopee) --- */}
          <aside className="w-64 bg-white shadow-sm flex flex-col overflow-y-auto scrollbar-thin">
            {/* Logo */}
            <div className="h-14 flex items-center px-4 border-b border-gray-100">
              <span className="text-xl font-bold text-[#ee4d2d]">Shopee</span>
              <span className="ml-2 text-gray-500">Seller Centre</span>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-4 space-y-1">
              
              {/* Group: Vận Chuyển */}
              <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <Truck size={16} /> Vận chuyển
              </div>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Quản lý Vận chuyển</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Giao Hàng Loạt</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Cài Đặt Vận Chuyển</Link>

              {/* Group: Quản Lý Đơn Hàng */}
              <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <ClipboardList size={16} /> Quản Lý Đơn Hàng
              </div>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Tất Cả</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Đơn Hủy</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Trả Hàng/Hoàn Tiền</Link>

              {/* Group: Quản Lý Sản Phẩm (ACTIVE) */}
              <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <ShoppingBag size={16} /> Quản Lý Sản Phẩm
              </div>
              <Link href="/" className="block px-10 py-2 text-[#ee4d2d] bg-[#fef6f5] border-r-4 border-[#ee4d2d]">
                Tất Cả Sản Phẩm
              </Link>
              <Link href="/product/new" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Thêm Sản Phẩm</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Sản Phẩm Vi Phạm</Link>

              {/* Group: Tài Chính */}
              <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <CreditCard size={16} /> Tài Chính
              </div>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Doanh Thu</Link>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Số Dư TK Shopee</Link>

              {/* Group: Dữ Liệu */}
              <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <BarChart2 size={16} /> Dữ Liệu
              </div>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Phân Tích Bán Hàng</Link>

               {/* Group: Thiết lập */}
               <div className="px-4 py-2 font-bold text-gray-800 flex items-center gap-2 mt-2">
                <Settings size={16} /> Thiết Lập Shop
              </div>
              <Link href="#" className="block px-10 py-2 text-gray-600 hover:text-[#ee4d2d]">Hồ Sơ Shop</Link>

            </nav>
          </aside>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="h-14 bg-white shadow-sm flex items-center justify-between px-6 z-10">
              <div className="text-gray-600 text-sm">Kênh Người Bán &gt; Quản Lý Sản Phẩm &gt; Tất Cả Sản Phẩm</div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1 text-gray-600 hover:text-[#ee4d2d] cursor-pointer">
                   <LayoutGrid size={18} />
                </div>
                <div className="flex items-center gap-1 text-gray-600 hover:text-[#ee4d2d] cursor-pointer">
                   <MessageSquare size={18} />
                </div>
                <div className="flex items-center gap-1 text-gray-600 hover:text-[#ee4d2d] cursor-pointer">
                   <Bell size={18} />
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                   <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                     <User size={16}/>
                   </div>
                   <span className="text-gray-700 font-medium">lica_vietnam</span>
                </div>
              </div>
            </header>

            {/* Content Scrollable */}
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
