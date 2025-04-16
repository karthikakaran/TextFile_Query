package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

func QueryHandler(w http.ResponseWriter, r *http.Request) {
	EnableCors(&w)
	if r.Method != http.MethodGet {
		w.WriteHeader(http.StatusMethodNotAllowed) // 405
		fmt.Fprintf(w, "Method not allowed: %s", r.Method)
		return
	}

	// Get the query parameters from the URL.
	queryValues := r.URL.Query()
	fileName := queryValues.Get("fileName")
	queryText := queryValues.Get("queryText")

	ctx := context.Background()
	// apiKey := os.Getenv("")
	client, err := genai.NewClient(ctx, option.WithAPIKey("AIzaSyAbAFMtv1vikIFIQECG9hRRFofyvBjhu4w"))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.0-flash")

	// Read the file
	textBytes, err := os.ReadFile(fileName)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}
	text := string(textBytes)

	prompt := fmt.Sprintf(`Answer the following question using only the information provided in the document below. Do not use any external knowledge.
			<document>
			%s
			</document>
			Question: %s`, text, queryText)

	//For PDF with UTF8
	// ensureUTF8 := func(s string) string {
	// if !utf8.ValidString(s) {
	// 	return strings.ToValidUTF8(s, "") // Replace invalid
	// }
	// return s
	// }

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		log.Fatal(err)
	}

	resultString := "" // Initialize an empty string to accumulate the parts

	for _, cand := range resp.Candidates {
		if cand.Content != nil {
			for _, part := range cand.Content.Parts {
				// Access the text using part.Data if part is of type Text.
				switch p := part.(type) {
				case genai.Text:
					resultString += string(p) + " "
				default:
					fmt.Println("Unsupported part type")
				}

			}
		}
	}
	// fmt.Println(resultString)
	w.Header().Set("Content-Type", "text/plain") //"application/json"
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, "%s", resultString)
}
