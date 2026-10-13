package e_threads.a_intro;

//Simple Banking  

class Database{
	int balance=0;
	public Database(int amount){
		this.balance=amount;
	}
}


class AddMoney extends Thread {
	int amount;
	private Database db;
	public AddMoney(int amount, Database db){
		this.amount=amount;
		this.db=db;
	}
	@Override
	public void run() {
		this.db.balance=this.db.balance+this.amount;
	}
}

class WithdrawMoney extends Thread {
	int amount;
	private Database db;
	public WithdrawMoney(int amount, Database db){
		this.amount=amount;
		this.db=db;
	}
	@Override
	public void run() {
		this.db.balance=this.db.balance-this.amount;
	}
}

public class F_SimpleThreadApplication {
	
	public static void main(String[] args) {
		Database db=new Database(0);
		AddMoney addMoney=new AddMoney(100,db);
		AddMoney addMoney2=new AddMoney(200,db);
		try {    
			addMoney.start();
			addMoney.join(); //This will waits until  addMoney finished
			addMoney2.start();
			addMoney2.join(); //This will waits until  addMoney2 finished
		} catch (InterruptedException e) {
		       e.printStackTrace();
		}

		System.out.println(db.balance);
		WithdrawMoney withdraw=new WithdrawMoney(10,db);
		try {    
			withdraw.start();
			withdraw.join(); //This will waits until  withdraw finished
		} catch (InterruptedException e) {
		       e.printStackTrace();
		}

		System.out.println(db.balance);
	}

}
