package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
)

/*
net/http - a production-ready HTTP server and client in the standard library.
Go 1.22 routing patterns:  "GET /items/{id}"  with r.PathValue("id")
Run a real server with:    http.ListenAndServe(":8080", mux)
Here httptest.NewServer starts it on a free local port so the example can call itself.
*/

type store struct {
	mu    sync.Mutex
	items map[string]Item
}

func newMux() *http.ServeMux {
	s := &store{items: map[string]Item{"1": {"pen", 10}}}
	mux := http.NewServeMux()

	mux.HandleFunc("GET /items/{id}", func(w http.ResponseWriter, r *http.Request) {
		s.mu.Lock()
		item, ok := s.items[r.PathValue("id")]
		s.mu.Unlock()
		if !ok {
			http.Error(w, "not found", http.StatusNotFound)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(item)
	})

	mux.HandleFunc("POST /items/{id}", func(w http.ResponseWriter, r *http.Request) {
		var item Item
		if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
			http.Error(w, "bad JSON", http.StatusBadRequest)
			return
		}
		s.mu.Lock()
		s.items[r.PathValue("id")] = item
		s.mu.Unlock()
		w.WriteHeader(http.StatusCreated)
	})
	return mux
}

func httpServerAndClient() {
	server := httptest.NewServer(newMux())
	defer server.Close()

	show := func(resp *http.Response, err error) {
		if err != nil {
			fmt.Println("error:", err)
			return
		}
		defer resp.Body.Close()
		body, _ := io.ReadAll(resp.Body)
		fmt.Println(resp.StatusCode, strings.TrimSpace(string(body)))
	}

	show(http.Get(server.URL + "/items/1"))                                                                     // 200 {"name":"pen","price":10}
	show(http.Get(server.URL + "/items/99"))                                                                    // 404 not found
	show(http.Post(server.URL+"/items/2", "application/json", strings.NewReader(`{"name":"bag","price":900}`))) // 201
	show(http.Get(server.URL + "/items/2"))                                                                     // 200 {"name":"bag","price":900}
	req, _ := http.NewRequest(http.MethodDelete, server.URL+"/items/1", nil)
	show(http.DefaultClient.Do(req)) // 405 Method Not Allowed
}
