package EXPO.Controller;

import flexjson.*;
import java.io.*;
import java.net.*;

import EXPO.Controller.ControllerException;
public class EXPOController {
	private String ServerName = "http://expo.solutions-net.nl/event/"; private String token;
        private JSONDeserializer<StandardResult> serializer = new JSONDeserializer<>();
	
	public EXPOController(String ServerName, String HandlerName) throws Throwable{
            this.ServerName = "http://" + ServerName + "/" + HandlerName + "/";
            try {
                SessionResult SessRes = (new JSONDeserializer<SessionResult>()).deserialize(
                        (new BufferedReader(new InputStreamReader((new URL(ServerName + "create/").openStream()))).readLine()));
                if (SessRes.Action) {
                    this.token = SessRes.Token;
                } else {
                    throw new Exception("The action was unsuccessfull.");
                }
            } catch (Exception E) {
                throw new ControllerException("The action was unsuccessfull.");   
            }
	}
	
	public EXPOController() throws Throwable {
        try {
            SessionResult SessRes = (new JSONDeserializer<SessionResult>()).deserialize(
                    (new BufferedReader(new InputStreamReader((new URL(ServerName + "create/").openStream()))).readLine()));
            if (SessRes.Action) {
                this.token = SessRes.Token;
            } else {
                throw new Exception("The action was unsuccessfull.");
            }
        } catch (Exception E) {
         throw new ControllerException("The action was unsuccessfull.");   
        }
        }
	
	public void StartLoop() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "startloop/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void ExitLoop() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "exitloop/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartSE() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "startse/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartITM() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "startitm/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartSNE() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "startsne/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartHCD() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "starthcd/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartGD() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "startgd/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
	
	public void StartTC() throws Throwable {
		try{
			StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "starttc/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
		}
		catch (Exception E) {
			throw new Exception("An exception has occured on runtime.");
		}
	}
        
        public void close() throws Throwable {
            try {
                        StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "delete/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			}
            } catch (Exception e) {
                throw new Exception("An exception has occured on runtime.");
            }
        }
        
        public void reset(boolean createNew) throws Throwable {
            try {
                        StandardResult response = serializer.deserialize((new BufferedReader(new InputStreamReader((
                                new URL(ServerName + "delete/" + token)).openStream()))).readLine());
			if (!response.Action)  {
				throw new ControllerException("The action was unsuccessfull.");
			} else {
                            if (createNew) {
                                SessionResult SessRes = (new JSONDeserializer<SessionResult>()).deserialize(
                                        (new BufferedReader(new InputStreamReader((new URL(ServerName + "create/").openStream()))).readLine()));
                                if (SessRes.Action) {
                                    this.token = SessRes.Token;
                                } else {
                                    throw new Exception("The action was unsuccessfull.");
                                }                                
                            }
                        }
            } catch (Exception e) {
                throw new Exception("An exception has occured on runtime.");
            }
        }
        
        private class StandardResult {
            public boolean Action;
        }
        private class SessionResult {
            public boolean Action;
            public String Token;
        }
}
