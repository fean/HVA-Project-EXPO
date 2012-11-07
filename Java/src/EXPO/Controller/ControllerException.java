package EXPO.Controller;

@SuppressWarnings("serial")
public class ControllerException extends Throwable {
	public String Message;
	
	public ControllerException(String Message) {
		this.Message = Message;
	}
}
