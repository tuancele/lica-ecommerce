FROM golang:1.24-alpine

WORKDIR /app
RUN apk add --no-cache git
COPY . .

RUN rm -f go.mod go.sum || true
RUN go mod init lica-order
RUN go get github.com/lib/pq golang.org/x/crypto/bcrypt github.com/golang-jwt/jwt/v5

RUN go build -o main .
EXPOSE 8080
CMD ["./main"]
