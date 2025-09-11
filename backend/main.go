package main

import (
	"context"
	"log"
	"net/http"
	"encoding/json"
)

func main() {
	log.Println("G.O.A.T. Alliance backend starting...")
	
	http.HandleFunc("/health", healthCheckHandler)
	
	port := ":8080"
	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(port, nil))
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	response := HealthResponse{
		Status: "ok",
		Message: "G.O.A.T. Alliance backend is healthy",
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// HealthCheck function for testing
func HealthCheck(ctx context.Context) (*HealthResponse, error) {
	return &HealthResponse{
		Status:  "ok",
		Message: "G.O.A.T. Alliance backend is healthy",
	}, nil
}

type HealthResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}