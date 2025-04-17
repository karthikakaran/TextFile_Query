# TextFile_Query

Front-end : ReactJS, HTML, React Bootstrap CSS
Backend : Golang
API for fuzzy search: GenAI LLM API

Setup instructions:

1. Install Vscode or some editor
2. Clone the repo from https://github.com/karthikakaran/TextFile_Query.git
   git clone https://github.com/karthikakaran/TextFile_Query.git
3. Ensure Go is installed

Run the project:

1. Get a gemini-flash model API key (which is free) and add it to the .env file in the Back-end folder in the repo
   https://aistudio.google.com/apikey
2. Open the terminal and navigate to "Front-end" folder
3. Type "npm run dev" to run the react code built from Vite scaffolding
4. Open another terminal and navigate to "Back-end/handlers" folder
5. Type "go run .\main.go .\rootHandler.go .\queryHandler.go .\uploadHandler.go .\helper.go"
6. Optional : "go mod tidy"
   => Now the frontend will be running in localhost:5173/5174 (See the terminal message)
   => Backend will be running in localhost:8080

Inputs and working:

1. Allows only .txt file, .pdf needs minor modification which is commented in the Go code
2. Upload an text file
3. Try a query and hit Search
4. The fuzzy found answer snippet will be displayed in the display card below as text

Example:

File input: Machine.txt
File content: A machine is a physical system that uses power to apply forces and control movement to perform an action. The term is commonly applied to artificial devices, such as those employing engines or motors, but also to natural biological macromolecules, such as molecular machines.

Query input: What are the uses of a machine ?

Result: Uses are power to apply forces and control movement to perform an action.

Design document : https://docs.google.com/document/d/12MCCJi7CZtxzQqESk56DtyqBwCUzTO0-vel4Dgv6lm8/edit?usp=sharing
