package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Use the PORT environment variable, or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Register the handlers from the other files.  This is where the routing happens.
	http.HandleFunc("/query", QueryHandler)   // Route for GET requests
	http.HandleFunc("/upload", UploadHandler) // Route for POST requests
	http.HandleFunc("/", RootHandler)         //handles root

	fmt.Printf("Server listening on port %s\n", port)
	// Start the server.  Listen on the specified port.
	err := http.ListenAndServe(":"+port, nil) //  "" means listen on all available interfaces
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
