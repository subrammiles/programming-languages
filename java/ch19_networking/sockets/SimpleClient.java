package c_advanced.sockets;
import java.io.*;
import java.net.*;

public class SimpleClient {	
		
	final static int SOCKET_PORT_ADDRESS=3333;

		public static void main(String[] args) throws Exception {
			Socket socket; 
			socket = new Socket("localhost", SOCKET_PORT_ADDRESS);	
		}
}



