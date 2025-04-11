package main

import (
	pb "calculator-backend/github.com/2760439882/calculator-backend/calculator" // 确保路径正确
	"context"
	"fmt"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/rs/cors" // 确保导入这个包
	"google.golang.org/grpc"
	"log"
	"net/http"
)

type server struct {
	pb.UnimplementedCalculatorServer
}

func (s *server) Calculate(ctx context.Context, req *pb.CalculationRequest) (*pb.CalculationResponse, error) {
	var result float64
	fmt.Println("服务端被调用了")
	fmt.Println("req.Operator:", req.Operator)
	fmt.Println("req.Operand1:", req.Operand1)
	fmt.Println("req.Operand2:", req.Operand2)

	switch req.Operator {
	case "+":
		result = req.Operand1 + req.Operand2
	case "-":
		result = req.Operand1 - req.Operand2
	case "*":
		result = req.Operand1 * req.Operand2
	case "/":
		if req.Operand2 == 0 {
			return nil, fmt.Errorf("division by zero")
		}
		result = req.Operand1 / req.Operand2
	default:
		return nil, fmt.Errorf("unknown operator")
	}
	return &pb.CalculationResponse{Result: result}, nil
}

func main() {
	// 原始 gRPC 监听器，供 gRPC 服务使用
	grpcServer := grpc.NewServer()
	pb.RegisterCalculatorServer(grpcServer, &server{})

	// 包装为 gRPC-Web 服务
	wrappedGrpc := grpcweb.WrapServer(grpcServer)

	// 创建 HTTP 服务监听器（用于浏览器请求）
	httpServer := http.Server{
		Addr: ":8080",
		Handler: cors.New(cors.Options{
			AllowedOrigins:   []string{"http://localhost:3000"},
			AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
			AllowedHeaders:   []string{"Content-Type", "X-Grpc-Web", "X-User-Agent", "grpc-timeout"},
			AllowCredentials: true,
		}).Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if wrappedGrpc.IsGrpcWebRequest(r) || wrappedGrpc.IsAcceptableGrpcCorsRequest(r) || wrappedGrpc.IsGrpcWebSocketRequest(r) {
				wrappedGrpc.ServeHTTP(w, r)
				return
			}
			http.NotFound(w, r)
		})),
	}

	log.Println("HTTP+gRPC-Web 服务运行在 :8080")
	if err := httpServer.ListenAndServe(); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
