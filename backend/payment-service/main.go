package main

import (
"database/sql"
"encoding/json"
"fmt"
"log"
"net/http"
"os"
"time"

"github.com/golang-jwt/jwt/v5"
_ "github.com/lib/pq"
"golang.org/x/crypto/bcrypt"
)

var jwtKey = []byte(os.Getenv("JWT_SECRET"))

type User struct {
Username string `json:"username"`
Password string `json:"password"`
Email    string `json:"email"`
}

func main() {
db, err := sql.Open("postgres", os.Getenv("DB_URL"))
if err != nil {
log.Fatal(err)
}
defer db.Close()

// 1. Endpoint Kiểm tra (Healthcheck)
http.HandleFunc("/auth", func(w http.ResponseWriter, r *http.Request) {
w.Header().Set("Content-Type", "application/json")
fmt.Fprintf(w, `{"status": "success", "message": "IAM Service is ready"}`)
})

// 2. Endpoint Đăng ký
http.HandleFunc("/auth/register", func(w http.ResponseWriter, r *http.Request) {
if r.Method != http.MethodPost { return }
var u User
if err := json.NewDecoder(r.Body).Decode(&u); err != nil { return }

hashed, _ := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
_, err := db.Exec("INSERT INTO users (username, password, email) VALUES ($1, $2, $3)", u.Username, string(hashed), u.Email)

w.Header().Set("Content-Type", "application/json")
if err != nil {
w.WriteHeader(400)
fmt.Fprintf(w, `{"status": "error", "message": "Tai khoan da ton tai"}`)
return
}
fmt.Fprintf(w, `{"status": "success", "message": "Dang ky thanh cong"}`)
})

// 3. Endpoint Đăng nhập
http.HandleFunc("/auth/login", func(w http.ResponseWriter, r *http.Request) {
if r.Method != http.MethodPost { return }
var u User
if err := json.NewDecoder(r.Body).Decode(&u); err != nil { return }

var hashedPass string
err := db.QueryRow("SELECT password FROM users WHERE username=$1", u.Username).Scan(&hashedPass)

w.Header().Set("Content-Type", "application/json")
if err != nil || bcrypt.CompareHashAndPassword([]byte(hashedPass), []byte(u.Password)) != nil {
w.WriteHeader(401)
fmt.Fprintf(w, `{"status": "error", "message": "Sai thong tin"}`)
return
}

token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
"user": u.Username,
"exp":  time.Now().Add(time.Hour * 24).Unix(),
})
t, _ := token.SignedString(jwtKey)
fmt.Fprintf(w, `{"status": "success", "token": "%s"}`, t)
})

fmt.Println("IAM Service: Sẵn sàng tại 8080...")
log.Fatal(http.ListenAndServe(":8080", nil))
}
