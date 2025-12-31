FROM golang:1.24-alpine

WORKDIR /app

# Cài đặt Git để tải thư viện
RUN apk add --no-cache git

# Copy toàn bộ code vào
COPY . .

# Xóa file mod cũ và khởi tạo lại để đảm bảo sạch sẽ
RUN rm -f go.mod go.sum || true
RUN go mod init lica-product
RUN go get github.com/golang-jwt/jwt/v5
RUN go get github.com/lib/pq

# Build ứng dụng
RUN go build -o main .

EXPOSE 8080

CMD ["./main"]
