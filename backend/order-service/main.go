package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"

    _ "github.com/lib/pq"
)

// Cấu trúc nhận từ Frontend
type OrderRequest struct {
    CustomerName  string `json:"customer_name"`
    Phone         string `json:"phone"`
    Address       string `json:"address"`
    PaymentMethod string `json:"payment_method"`
    Total         int    `json:"total"`
    Items         []struct {
        ID       int    `json:"ID"`
        Name     string `json:"Name"`
        Price    int    `json:"Price"`
        Quantity int    `json:"quantity"`
    } `json:"items"`
}

func main() {
    connStr := os.Getenv("DATABASE_URL")
    db, err := sql.Open("postgres", connStr)
    if err != nil { log.Fatal(err) }
    defer db.Close()

    http.HandleFunc("/orders", func(w http.ResponseWriter, r *http.Request) {
        // CORS setup
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        
        if r.Method == "OPTIONS" { return }
        if r.Method != "POST" {
            http.Error(w, "Method not allowed", 405)
            return
        }

        // 1. Parse dữ liệu JSON
        var req OrderRequest
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
            http.Error(w, err.Error(), 400)
            return
        }

        // 2. Lưu vào DB (Transaction để an toàn)
        tx, err := db.Begin()
        if err != nil { http.Error(w, err.Error(), 500); return }

        // Insert Order
        var orderID int
        err = tx.QueryRow(
            "INSERT INTO orders (customer_name, phone, address, total_amount, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            req.CustomerName, req.Phone, req.Address, req.Total, req.PaymentMethod,
        ).Scan(&orderID)

        if err != nil {
            tx.Rollback()
            http.Error(w, "Lỗi lưu đơn hàng: "+err.Error(), 500)
            return
        }

        // Insert Order Items
        for _, item := range req.Items {
            _, err = tx.Exec(
                "INSERT INTO order_items (order_id, product_id, product_name, quantity, price) VALUES ($1, $2, $3, $4, $5)",
                orderID, item.ID, item.Name, item.Quantity, item.Price,
            )
            if err != nil {
                tx.Rollback()
                http.Error(w, "Lỗi lưu sản phẩm: "+err.Error(), 500)
                return
            }
        }

        // Commit
        tx.Commit()

        // Phản hồi thành công
        w.Header().Set("Content-Type", "application/json")
        fmt.Fprintf(w, `{"status": "success", "order_id": %d, "message": "Đặt hàng thành công"}`, orderID)
    })

    fmt.Println("Order Service running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
