package main

import (
"os"
"fmt"
"net/http"
"strings"
"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

// Middleware xác thực Token
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
return func(w http.ResponseWriter, r *http.Request) {
authHeader := r.Header.Get("Authorization")
if authHeader == "" {
w.WriteHeader(http.StatusUnauthorized)
fmt.Fprintf(w, `{"status": "error", "message": "Missing token"}`)
return
}

// Lay chuoi token tu "Bearer <token>"
tokenString := strings.TrimPrefix(authHeader, "Bearer ")

token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
return jwtKey, nil
})

if err != nil || !token.Valid {
w.WriteHeader(http.StatusUnauthorized)
fmt.Fprintf(w, `{"status": "error", "message": "Invalid token"}`)
return
}

next.ServeHTTP(w, r)
}
}

func main() {
http.HandleFunc("/products", authMiddleware(func(w http.ResponseWriter, r *http.Request) {
w.Header().Set("Content-Type", "application/json")
fmt.Fprintf(w, `{"status": "success", "data": [{"id": 1, "name": "Sản phẩm VIP cho thành viên"}]}`)
}))

fmt.Println("Product Service đang chạy có bảo mật...")
http.ListenAndServe(":8080", nil)
}
