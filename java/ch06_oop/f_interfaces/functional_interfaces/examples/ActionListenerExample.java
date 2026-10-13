package b_oops.e_interfaceexamples.functionalinterface.examples;

import java.awt.*;
import java.awt.event.*;

//1st step  
public class ActionListenerExample  {
	
	
	static  class MyActionListner implements ActionListener{
		Frame f = new Frame("ActionListener Example");
		final TextField tf = new TextField();
		Button b = new Button("Click Here");
		
		public MyActionListner(){
			tf.setBounds(50, 50, 150, 20);
			
			f.add(tf);
			f.add(b);
			
			f.setSize(400, 400);
			f.setLayout(null);
			f.setVisible(true);
			
		}
		

		@Override
		public void actionPerformed(ActionEvent e) {
			tf.setText("Welcome to Javatpoint.");
			
		}
		
	}
	
	
	
	public static void main(String[] args) {
		MyActionListner myActionListner =new MyActionListner();
		//myActionListner.s
		
	}

}
