package oops.j_keywords.finaltest;

public class BlankFinalVariable {

	static class Test {
		final String ID_CARD_NUMBER;
		static final String SCHOOL_NAME;

		Test() {
			this.ID_CARD_NUMBER = "";
		}

		static {
			SCHOOL_NAME = "New Delhi School";
		}
	}

	public static void main(String args[]) {

	}

}
