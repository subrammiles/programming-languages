package ch19_networking.http;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;

/*
java.net.http.HttpClient (Java 11) - the built-in modern HTTP client.
Supports HTTP/2, sync and async requests, timeouts.
These examples call https://jsonplaceholder.typicode.com, a free fake API (needs internet).
*/
public class A_HttpClient {

    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        System.out.println("<<<< GET >>>>");
        HttpRequest get = HttpRequest.newBuilder(URI.create("https://jsonplaceholder.typicode.com/todos/1"))
                .header("Accept", "application/json")
                .GET()
                .build();
        HttpResponse<String> response = client.send(get, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.statusCode()); // 200
        System.out.println(response.body());       // {"userId": 1, "id": 1, "title": ..., "completed": false}

        System.out.println("<<<< POST JSON >>>>");
        String json = """
                {"title": "Hello", "body": "From Java", "userId": 1}""";
        HttpRequest post = HttpRequest.newBuilder(URI.create("https://jsonplaceholder.typicode.com/posts"))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(json))
                .build();
        HttpResponse<String> created = client.send(post, HttpResponse.BodyHandlers.ofString());
        System.out.println(created.statusCode() + " " + created.body()); // 201 {... "id": 101}

        System.out.println("<<<< async: 3 requests in parallel >>>>");
        List<CompletableFuture<String>> futures = List.of(1, 2, 3).stream()
                .map(id -> HttpRequest.newBuilder(URI.create("https://jsonplaceholder.typicode.com/users/" + id)).build())
                .map(req -> client.sendAsync(req, HttpResponse.BodyHandlers.ofString())
                        .thenApply(r -> r.body().split("\"name\": \"")[1].split("\"")[0]))
                .toList();
        futures.forEach(f -> System.out.println(f.join()));
        // Leanne Graham, Ervin Howell, Clementine Bauch
        // (A real project would parse JSON with a library like Jackson or Gson.)
    }
}
