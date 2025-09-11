package main

import (
	"testing"
)

func TestHealthCheck(t *testing.T) {
	response, err := HealthCheck(nil)
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