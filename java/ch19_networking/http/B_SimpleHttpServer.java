package ch19_networking.http;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.Executors;

/*
A tiny HTTP server using only the JDK (com.sun.net.httpserver, included in every JDK).
Real projects use Spring Boot, Quarkus, Micronaut or Javalin, but the ideas are the same:
a path is mapped to a handler that reads the request and writes a response.
Uses virtual threads (Java 21) to handle each request.
Run it, then open http://localhost:8080/hello?name=Subbu  (it stops itself after the demo)
*/
public class B_SimpleHttpServer {

    public static void main(String[] args) throws Exception {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/hello", B_SimpleHttpServer::hello);
        server.createContext("/health", exchange -> send(exchange, 200, "{\"status\":\"UP\"}"));
        server.setExecutor(Executors.newVirtualThreadPerTaskExecutor());
        server.start();
        System.out.println("server running on http://localhost:8080");

        // Call our own server with HttpClient to show it working
        HttpClient client = HttpClient.newHttpClient();
        for (String path : new String[]{"/hello?name=Subbu", "/hello", "/health"}) {
            HttpResponse<String> r = client.send(
                    HttpRequest.newBuilder(URI.create("http://localhost:8080" + path)).build(),
                    HttpResponse.BodyHandlers.ofString());
            System.out.println(path + " -> " + r.statusCode() + " " + r.body());
        }
        // /hello?name=Subbu -> 200 Hello, Subbu!
        // /hello -> 200 Hello, world!
        // /health -> 200 {"status":"UP"}

        server.stop(0);
    }

    static void hello(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equals("GET")) {
            send(exchange, 405, "Method not allowed");
            return;
        }
        String query = exchange.getRequestURI().getQuery(); // name=Subbu
        String name = (query != null && query.startsWith("name=")) ? query.substring(5) : "world";
        send(exchange, 200, "Hello, " + name + "!");
    }

    static void send(HttpExchange exchange, int status, String body) throws IOException {
        byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
        exchange.sendResponseHeaders(status, bytes.length);
        try (OutputStream out = exchange.getResponseBody()) {
            out.write(bytes);
        }
    }
}
