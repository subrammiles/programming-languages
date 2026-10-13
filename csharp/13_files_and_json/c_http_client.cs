// HttpClient: calling web APIs.
//  - create ONE HttpClient and reuse it (or use IHttpClientFactory in ASP.NET Core apps)
//  - GetFromJsonAsync / PostAsJsonAsync (System.Net.Http.Json) handle JSON for you
//  - EnsureSuccessStatusCode() throws HttpRequestException for 4xx/5xx responses
//  - the JsonTypeInfo overloads use source-generated JSON code (see b_json.cs)
// This example starts a tiny local web server so it needs no internet access.
// Run: dotnet run 13_files_and_json/c_http_client.cs

using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

using var server = new HttpListener();
int port = Random.Shared.Next(20000, 60000);
server.Prefixes.Add($"http://localhost:{port}/");
server.Start();
_ = Task.Run(async () =>
{
    while (server.IsListening)
    {
        HttpListenerContext ctx;
        try { ctx = await server.GetContextAsync(); } catch { break; }
        string path = ctx.Request.Url!.AbsolutePath;
        (int status, string body) = path switch
        {
            "/todos/1" => (200, """{"id":1,"title":"Learn C#","completed":false}"""),
            "/todos" when ctx.Request.HttpMethod == "POST" => (201, """{"id":2,"title":"created","completed":false}"""),
            _ => (404, """{"error":"not found"}"""),
        };
        ctx.Response.StatusCode = status;
        ctx.Response.ContentType = "application/json";
        byte[] bytes = Encoding.UTF8.GetBytes(body);
        await ctx.Response.OutputStream.WriteAsync(bytes);
        ctx.Response.Close();
    }
});

using var http = new HttpClient { BaseAddress = new Uri($"http://localhost:{port}/"), Timeout = TimeSpan.FromSeconds(5) };

Todo? todo = await http.GetFromJsonAsync("todos/1", TodoJson.Default.Todo);
Console.WriteLine($"{todo!.Id}: {todo.Title}"); // 1: Learn C#

HttpResponseMessage created = await http.PostAsJsonAsync("todos", new Todo(0, "Write tests", false), TodoJson.Default.Todo);
Console.WriteLine($"{(int)created.StatusCode} {(await created.Content.ReadFromJsonAsync(TodoJson.Default.Todo))!.Id}"); // 201 2

try
{
    var response = await http.GetAsync("todos/999");
    response.EnsureSuccessStatusCode();
}
catch (HttpRequestException e)
{
    Console.WriteLine($"HttpRequestException: {(int?)e.StatusCode}"); // 404
}

server.Stop();

record Todo(int Id, string Title, bool Completed);

[JsonSourceGenerationOptions(JsonSerializerDefaults.Web)]
[JsonSerializable(typeof(Todo))]
partial class TodoJson : JsonSerializerContext;
