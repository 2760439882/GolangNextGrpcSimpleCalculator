package main

import (
	"calculator-backend/github.com/2760439882/calculator-backend/calculator"
	"context"
	"testing"
)

func TestCalculate(t *testing.T) {
	s := &server{}

	tests := []struct {
		name    string
		req     *calculator.CalculationRequest
		want    float64
		wantErr bool
	}{
		{"Addition", &calculator.CalculationRequest{Operand1: 1, Operand2: 2, Operator: "+"}, 3, false},
		{"Subtraction", &calculator.CalculationRequest{Operand1: 5, Operand2: 2, Operator: "-"}, 3, false},
		{"Multiplication", &calculator.CalculationRequest{Operand1: 2, Operand2: 3, Operator: "*"}, 6, false},
		{"Division", &calculator.CalculationRequest{Operand1: 6, Operand2: 2, Operator: "/"}, 3, false},
		{"DivideByZero", &calculator.CalculationRequest{Operand1: 1, Operand2: 0, Operator: "/"}, 0, true},
		{"UnknownOperator", &calculator.CalculationRequest{Operand1: 1, Operand2: 1, Operator: "%"}, 0, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			resp, err := s.Calculate(context.Background(), tt.req)
			if (err != nil) != tt.wantErr {
				t.Errorf("unexpected error: %v", err)
				return
			}
			if err == nil && resp.Result != tt.want {
				t.Errorf("got = %v, want = %v", resp.Result, tt.want)
			}
		})
	}
}
