package c_advanced.sockets;

import java.io.*;
import java.net.*;

public class SimpleServer {
	final static int SOCKET_PORT_ADDRESS=3333;
	
	
	
	public  static void   main(String[] args) throws Exception {
		ServerSocket serverSocket;
		Socket socket; 
		/*
		 ServerSocket is a java.net class that provides a system-independent implementation of the server side of a client/server socket connection. 
		 The constructor for ServerSocket throws an exception if it can't listen on the specified port (for example, the port is already being used). 
		 * */
		serverSocket = new ServerSocket(SOCKET_PORT_ADDRESS);
		/*1 instance of Server Socket  is enought for multiple clients*/
		
		/*Socket creation to accepts coonections from client*/
		/*If one clinet is there 1 socket instance is enought*/
		
		System.out.println("Server socket is waiting for the client.....");
		socket=serverSocket.accept();
		System.out.println("Client connectednow.........");
		
		
	}
	
	
	
}
