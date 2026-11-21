"""
Low-level networking with socket (TCP) and socketserver
Everything else (HTTP, databases, Redis clients) is built on sockets.
 server: socket() -> bind() -> listen() -> accept() -> recv()/sendall() -> close()
 client: socket() -> connect() -> sendall() -> recv() -> close()
TCP is a byte STREAM: one sendall() is not guaranteed to arrive as one recv().
Real protocols add framing: a newline, or a length prefix (shown below).

This file starts the servers in background threads and talks to them, so it runs by itself.
"""
import socket
import socketserver
import struct
import threading

# ---- 1. A raw echo server ----
server_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
server_sock.bind(("127.0.0.1", 0))                     # port 0: the OS picks a free port
server_sock.listen()
port = server_sock.getsockname()[1]


def serve_once():
    conn, addr = server_sock.accept()                  # blocks until a client connects
    with conn:
        data = conn.recv(1024)
        conn.sendall(b"echo: " + data.upper())


threading.Thread(target=serve_once, daemon=True).start()

with socket.create_connection(("127.0.0.1", port), timeout=2) as client:
    client.sendall(b"hello sockets")
    print(client.recv(1024).decode())                  # echo: HELLO SOCKETS
server_sock.close()


# ---- 2. socketserver: one thread per client, newline-framed messages ----
class LineHandler(socketserver.StreamRequestHandler):
    def handle(self):
        for line in self.rfile:                        # read line by line until the client closes
            command = line.decode().strip()
            reply = {"ping": "pong", "time": "12:00"}.get(command, "unknown command")
            self.wfile.write((reply + "\n").encode())


server = socketserver.ThreadingTCPServer(("127.0.0.1", 0), LineHandler)
server.daemon_threads = True                           # do not wait for handler threads on exit
threading.Thread(target=server.serve_forever, daemon=True).start()

with socket.create_connection(server.server_address) as client:
    # makefile() gives a file-like wrapper for easy line reading. It holds its own reference
    # to the socket, so close it too: otherwise the connection stays open and the server's
    # handler waits forever for more lines.
    with client.makefile("rwb") as f:
        for cmd in ("ping", "time", "dance"):
            f.write((cmd + "\n").encode())
            f.flush()
            print(cmd, "->", f.readline().decode().strip())
# ping -> pong
# time -> 12:00
# dance -> unknown command
server.shutdown()
server.server_close()


# ---- 3. Length-prefixed framing (binary protocols) ----
def send_msg(sock, payload: bytes):
    sock.sendall(struct.pack("!I", len(payload)) + payload)   # 4-byte big-endian length, then data


def recv_exact(sock, n):
    buf = b""
    while len(buf) < n:                                # recv may return fewer bytes than asked
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise ConnectionError("closed early")
        buf += chunk
    return buf


def recv_msg(sock):
    (length,) = struct.unpack("!I", recv_exact(sock, 4))
    return recv_exact(sock, length)


a, b = socket.socketpair()                             # two connected sockets, handy for tests
send_msg(a, b"first")
send_msg(a, b"second message" * 1000)
print(recv_msg(b), len(recv_msg(b)))                   # b'first' 14000
a.close()
b.close()
