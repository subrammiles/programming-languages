package c_advanced.sockets;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.OutputStream;
import java.net.Socket;

public class SimpleClientSendData {
	
	final static int SOCKET_PORT_ADDRESS=3333;

	public static void main(String[] args) throws Exception {
		Socket socket; 
		socket = new Socket("localhost", SOCKET_PORT_ADDRESS);
		/*Socket has out put and input streams to accept and send data*/
		
		DataOutputStream socketOutputStream= new DataOutputStream(socket.getOutputStream());
		
		/*Send Data to Server*/
		socketOutputStream.writeUTF("Hello Server");
		socketOutputStream.flush();
		socketOutputStream.close();
		socket.close();
		
	}

}
