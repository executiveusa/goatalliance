package main

import (
	"context"
	"testing"
)

func TestHealthCheck(t *testing.T) {
	service := &Service{}
	response, err := service.HealthCheck(context.Background())
	if err != nil {
		t.Fatalf("HealthCheck failed: %v", err)
	}
	
	if response.Status != "ok" {
		t.Errorf("Expected status 'ok', got '%s'", response.Status)
	}
	
	if response.Message == "" {
		t.Error("Expected non-empty message")
	}
}

func TestGetContractors(t *testing.T) {
	service := &Service{}
	response, err := service.GetContractors(context.Background())
	if err != nil {
		t.Fatalf("GetContractors failed: %v", err)
	}
	
	if response.Total == 0 {
		t.Error("Expected contractors to be returned")
	}
	
	if len(response.Contractors) != response.Total {
		t.Errorf("Expected %d contractors, got %d", response.Total, len(response.Contractors))
	}
}