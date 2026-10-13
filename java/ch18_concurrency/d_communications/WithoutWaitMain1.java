package e_threads.d_communications;

//AccountBalace contaisn amount.One Threads produces data and another thread need to use thata dat
 class AccountBalance {
	int amount=0;

	synchronized void addMoney(int amount) {
		this.amount = amount;
		System.out.println("Amount Added: " + amount);
	}

	synchronized int getBalance() {
		System.out.println("Data Received: " + amount);
		return amount;
	}
}
 
 class Thread1 extends Thread {
		AccountBalance obj;

		Thread1(AccountBalance obj) {
			this.obj = obj;
		}

		@Override
		public void run() {
			for (int j = 1; j <= 5; j++) {
				obj.addMoney(j);
			}
		}
}

 class Thread2 extends Thread {
		AccountBalance obj;

		Thread2(AccountBalance obj) {
			this.obj = obj;
		}

		public void run() {
			for (int k = 0; k <= 5; k++) {
				obj.getBalance();
			}
		}
	}
public class WithoutWaitMain1 {

	public static void main(String[] args) {
		AccountBalance obj = new AccountBalance();
		Thread1 t1 = new Thread1(obj);
		Thread2 t2 = new Thread2(obj);
		t1.start();
		t2.start();
	}

}
