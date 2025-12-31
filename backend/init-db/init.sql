-- Bảng Sản phẩm
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    image_url TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Đơn hàng
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    total_amount INT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, paid, shipped
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INT,
    product_id INT,
    product_name VARCHAR(255),
    quantity INT,
    price INT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Dữ liệu mẫu (Seed Data) để test ngay
INSERT INTO products (name, price, image_url, description) VALUES
('Son Kem Lì Black Rouge', 150000, 'https://img.sociolla.com/4330278/1643444_500_500.jpg', 'Son kem lì mịn môi'),
('Phấn Nước Laneige Neo Cushion', 650000, 'https://img.sociolla.com/4346123/1643444_500_500.jpg', 'Che phủ hoàn hảo'),
('Nước Tẩy Trang L''Oreal', 180000, 'https://img.sociolla.com/4338901/1643444_500_500.jpg', 'Làm sạch sâu'),
('Kem Chống Nắng Anessa', 450000, 'https://img.sociolla.com/4338902/1643444_500_500.jpg', 'Bảo vệ da tối ưu');
