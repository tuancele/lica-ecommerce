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

type Product struct {
    ID          int    `json:"ID"`
    Name        string `json:"Name"`
    Price       int    `json:"Price"`
    ImageURL    string `json:"ImageURL"`
    Description string `json:"Description"`
}

func main() {
    // Kết nối Database
    connStr := os.Getenv("DATABASE_URL")
    if connStr == "" {
        // Fallback cho chạy local test
        connStr = "host=localhost user=postgres password=postgres_password_secret dbname=lica_db sslmode=disable"
    }
    
    db, err := sql.Open("postgres", connStr)
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // API Lấy danh sách sản phẩm (Public - Không cần Token)
    http.HandleFunc("/products", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Header().Set("Access-Control-Allow-Origin", "*") // Cho phép Frontend gọi

        rows, err := db.Query("SELECT id, name, price, image_url, description FROM products")
        if err != nil {
            http.Error(w, err.Error(), 500)
            return
        }
        defer rows.Close()

        var products []Product
        for rows.Next() {
            var p Product
            if err := rows.Scan(&p.ID, &p.Name, &p.Price, &p.ImageURL, &p.Description); err != nil {
                continue
            }
            products = append(products, p)
        }

        json.NewEncoder(w).Encode(products)
    })

    // API Chi tiết sản phẩm
    http.HandleFunc("/products/", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Header().Set("Access-Control-Allow-Origin", "*")

        id := r.URL.Path[len("/products/"):]
        var p Product
        err := db.QueryRow("SELECT id, name, price, image_url, description FROM products WHERE id = ", id).Scan(&p.ID, &p.Name, &p.Price, &p.ImageURL, &p.Description)
        
        if err != nil {
            w.WriteHeader(404)
            fmt.Fprintf(w, `{"message": "Product not found"}`)
            return
        }
        json.NewEncoder(w).Encode(p)
    })

    fmt.Println("Product Service running on :8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
