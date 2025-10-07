package main

// NOTE: This is the Encore version - replace imports with local versions for testing
// import (
// 	"context"
// 	"encore.dev"
// 	"encore.dev/rlog"
// )

import (
	"context"
	"log"
)

// Mock rlog for local development
var rlog = struct {
	Info func(msg string, args ...interface{})
}{
	Info: func(msg string, args ...interface{}) { log.Printf(msg, args...) },
}

// Service represents our main G.O.A.T Alliance service
// In Encore: //encore:service
type Service struct{}

// initService initializes the service
func initService() (*Service, error) {
	rlog.Info("G.O.A.T. Alliance backend starting...")
	return &Service{}, nil
}

var service, _ = initService()

// HealthCheck endpoint for basic health monitoring
// In Encore: //encore:api public method=GET path=/health
func (s *Service) HealthCheck(ctx context.Context) (*HealthResponse, error) {
	return &HealthResponse{
		Status:  "ok",
		Message: "G.O.A.T. Alliance backend is healthy",
	}, nil
}

// GetContractors returns a list of featured contractors
// In Encore: //encore:api public method=GET path=/contractors
func (s *Service) GetContractors(ctx context.Context) (*ContractorsResponse, error) {
	contractors := []Contractor{
		{
			ID:          1,
			Name:        "Elite Construction Co",
			Rating:      5.0,
			Specialties: []string{"General Construction", "Commercial"},
			Phone:       "+1-555-0101",
			Email:       "contact@eliteconstruction.com",
		},
		{
			ID:          2,
			Name:        "Precision Plumbing",
			Rating:      4.9,
			Specialties: []string{"Plumbing", "Emergency Repairs"},
			Phone:       "+1-555-0102",
			Email:       "info@precisionplumbing.com",
		},
	}

	return &ContractorsResponse{
		Contractors: contractors,
		Total:       len(contractors),
	}, nil
}

type HealthResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

type Contractor struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Rating      float64  `json:"rating"`
	Specialties []string `json:"specialties"`
	Phone       string   `json:"phone"`
	Email       string   `json:"email"`
}

type ContractorsResponse struct {
	Contractors []Contractor `json:"contractors"`
	Total       int          `json:"total"`
}