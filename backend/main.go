package main

import (
"log"
"net/http"
"os"
"time"

"github.com/gin-gonic/gin"
"github.com/golang-jwt/jwt/v5"
"github.com/joho/godotenv"
"golang.org/x/crypto/bcrypt"
"gorm.io/driver/postgres"
"gorm.io/gorm"
)

// --- DATABASE MODELS ---
type User struct {
ID        uint      `gorm:"primaryKey"`
Email     string    `gorm:"uniqueIndex;not null"`
Password  string    `gorm:"not null"`
FullName  string    `gorm:"size:100"`
Role      string    `gorm:"default:'user'"`
}

type Product struct {
ID          uint      `gorm:"primaryKey"`
Name        string    `gorm:"not null"`
Price       float64   `gorm:"not null"`
Description string    `gorm:"type:text"`
ImageURL    string    `gorm:"type:text"`
UserID      uint
CreatedAt   time.Time
}

var DB *gorm.DB

// --- SETUP ---
func ConnectDB() {
dsn := os.Getenv("DATABASE_URL")
if dsn == "" {
dsn = "host=postgres user=postgres password=postgres_password_secret dbname=lica_db port=5432 sslmode=disable TimeZone=Asia/Ho_Chi_Minh"
}
var err error
DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
if err != nil {
log.Fatal("Failed to connect to database:", err)
}
DB.AutoMigrate(&User{}, &Product{})
}

// --- MIDDLEWARE CORS ĐA MIỀN (QUAN TRỌNG) ---
func CORSMiddleware() gin.HandlerFunc {
return func(c *gin.Context) {
// Danh sách các tên miền được phép gọi API
allowedOrigins := map[string]bool{
"https://lica.vn":       true,
"https://admin.lica.vn": true,
"http://localhost:3000": true, // Cho phép test local
"http://localhost:3001": true, // Cho phép test local
}

origin := c.Request.Header.Get("Origin")

// Nếu tên miền gọi đến nằm trong danh sách cho phép
if allowedOrigins[origin] {
c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
}

c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

if c.Request.Method == "OPTIONS" {
c.AbortWithStatus(204)
return
}
c.Next()
}
}

// --- PRODUCT CONTROLLERS ---
func CreateProduct(c *gin.Context) {
var input Product
if err := c.ShouldBindJSON(&input); err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
return
}
if result := DB.Create(&input); result.Error != nil {
c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
return
}
c.JSON(http.StatusOK, gin.H{"message": "Đăng bán thành công!", "product": input})
}

func GetProducts(c *gin.Context) {
var products []Product
DB.Order("created_at desc").Find(&products)
c.JSON(http.StatusOK, products)
}

// --- AUTH CONTROLLERS ---
func Register(c *gin.Context) {
var input User
if err := c.ShouldBindJSON(&input); err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
return
}
bytes, _ := bcrypt.GenerateFromPassword([]byte(input.Password), 14)
input.Password = string(bytes)
if result := DB.Create(&input); result.Error != nil {
c.JSON(http.StatusInternalServerError, gin.H{"error": "Email exist"})
return
}
c.JSON(http.StatusOK, gin.H{"message": "OK"})
}

func Login(c *gin.Context) {
var input struct { Email, Password string }
if err := c.ShouldBindJSON(&input); err != nil {
c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
return
}
var user User
if err := DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
c.JSON(http.StatusUnauthorized, gin.H{"error": "Login failed"})
return
}
if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(input.Password)); err != nil {
c.JSON(http.StatusUnauthorized, gin.H{"error": "Login failed"})
return
}
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{"sub": user.ID, "exp": time.Now().Add(time.Hour * 72).Unix()})
t, _ := token.SignedString([]byte("LICA_SECRET"))
c.JSON(http.StatusOK, gin.H{"token": t, "full_name": user.FullName})
}

// --- MAIN ---
func main() {
godotenv.Load()
ConnectDB()
r := gin.Default()
r.Use(CORSMiddleware())

auth := r.Group("/auth")
{
auth.POST("/register", Register)
auth.POST("/login", Login)
}

api := r.Group("/api")
{
api.GET("/products", GetProducts)
api.POST("/products", CreateProduct)
}

r.Run(":8080")
}
