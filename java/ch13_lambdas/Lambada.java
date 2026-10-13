package c_advanced.f_lambdaexpressions;


 

public class Lambada {
	
	interface WebSocket{	
		void connect();
	}
	
	
	static void connectToWebSocket1() {
		/*Let check without Lambada expression*/
		WebSocket w=new WebSocket(){

			@Override
			public void connect() {
				
				System.out.println("Connected to web socket");
			}
			
		};
		w.connect();
		
	}
	
	static void connectToWebSocket2() {
		/*Let check without Lambada expression*/
		WebSocket w=()->{
			System.out.println("Connected to web socket-2");
		};
		
		w.connect();
	}
	
	
	public static void main(String[] args) {
		connectToWebSocket1();
		connectToWebSocket2();
	}
}
