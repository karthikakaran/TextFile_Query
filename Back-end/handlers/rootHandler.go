package main

import (
	"net/http"
)

func RootHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		//send a "405 Method Not Allowed" error.
		w.WriteHeader(http.StatusMethodNotAllowed)
		return
	}

	w.WriteHeader(http.StatusOK)
}
