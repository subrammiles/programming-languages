package c_advanced.sockets.multiclientsServer;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Socket;

public class MultiClientsClient {
	
	final static int SOCKET_PORT_ADDRESS=3333;

	public static void main(String[] args) throws Exception {
		Socket socket; 
		socket = new Socket("localhost", SOCKET_PORT_ADDRESS);
		
        DataOutputStream socketOutputStream= new DataOutputStream(socket.getOutputStream());
        
        String inputData=getDataFromCommandLineInput();
		/*Send Data to Server*/
		socketOutputStream.writeUTF(inputData);
		socketOutputStream.flush();
		socketOutputStream.close();
		socket.close();
		
		
		
	}
	
	public static String getDataFromCommandLineInput() throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		return br.readLine();
	}

}
