package main

import "net/http"

func EnableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Credentials", "true")
	(*w).Header().Set("Access-Control-Max-Age", "1800")
	(*w).Header().Set("Access-Control-Allow-Headers", "content-type")
	(*w).Header().Set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS")
}
