# Dùng bản Go 1.23 mới nhất để tránh lỗi version
FROM golang:1.23-alpine AS builder
WORKDIR /app

# Copy code
COPY . .

# Tự động tải thư viện và sửa lỗi thiếu file
RUN go mod tidy

# Build ứng dụng
RUN go build -o main .

# Run Stage (Chạy ứng dụng)
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
RUN apk --no-cache add curl
CMD ["./main"]
