package c_advanced.nonblockingio;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.util.Iterator;

public class NonBlockingIoTest {
	
	public static void main(String[] args) throws IOException {
		
		Selector selector =Selector.open();	
		/*We use selector to choose the channel*/
		
		
		ServerSocketChannel serverSocketChannel = ServerSocketChannel.open();
		
		serverSocketChannel.bind(new InetSocketAddress(3000));
		serverSocketChannel.configureBlocking(false);
		serverSocketChannel.register(selector,SelectionKey.OP_ACCEPT);
		
		
		while(true) {
			selector.select();
			Iterator<SelectionKey> it=selector.selectedKeys().iterator();
//			while(it.hasNext()){
//				SelectionKey key=it.next();
//				if(key.isAcceptable()) {
//					newConnection(selector,key);
//				}else if(key.isReadable()) {
//					echo(key);
//				}else if(key.isWritable()) {
//					continueEcho(selector,key);
//				}
//				it.remove();
//			}
		}
	}

}
