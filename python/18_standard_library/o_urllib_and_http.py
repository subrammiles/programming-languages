"""
HTTP with the standard library: urllib.request and http.server.
For real projects most people install "requests" or "httpx" (pip install httpx),
but urllib works with no installs.
This example starts a tiny local server, so it needs no internet.
"""
import json
import threading
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, HTTPServer


class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        body = json.dumps({"hello": query.get("name", ["world"])[0]}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, *args):  # keep the output quiet
        pass


server = HTTPServer(("127.0.0.1", 0), Handler)  # port 0 -> pick a free port
threading.Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_port}"

url = base + "/greet?" + urllib.parse.urlencode({"name": "Asha"})
with urllib.request.urlopen(url, timeout=5) as response:
    print(response.status, response.headers["Content-Type"])  # 200 application/json
    print(json.load(response))  # {'hello': 'Asha'}

print(urllib.parse.urlparse("https://example.com:8080/path?q=1#top"))
server.shutdown()
