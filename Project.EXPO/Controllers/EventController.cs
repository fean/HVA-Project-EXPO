using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Text;
using System.Web.Script.Serialization;

namespace Project.EXPO.Controllers
{
    public class EventController : Controller
    {
        public JavaScriptSerializer Serializer = new JavaScriptSerializer();

        public ActionResult Index()
        {
            return Content("Error: Call the event handler with the appropriate parameters.");
        }

        #region "Client Send Events"

        public ActionResult Create(string verifier)
        {
            if (verifier == Convert.ToBase64String((new HMACMD5()).ComputeHash(Encoding.ASCII.GetBytes("EXPO4486078"))))
            {
                String token = Convert.ToBase64String((new HMACMD5()).ComputeHash(Encoding.ASCII.GetBytes((new Random()).Next(10000, 999999999).ToString())));
                Collective.SessionPool.Add(token, new SessionWrap());
                return Content(Serializer.Serialize(new SessionResult() { Action = true, SessionToken = token }));
            }
            else
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }
        
        public ActionResult StartLoop(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartLoop"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult ExitLoop(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onExitLoop"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartSE(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartSE"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartITM(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartITM"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartSNE(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartSNE"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartHCD(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartHCD"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartGD(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartGD"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult StartTC(string token)
        {
            try
            {
                Collective.SessionPool[token].Event = "onStartTC"; Collective.SessionPool[token].Data = "true";
                foreach (KeyValuePair<int, ManualResetEvent> E in Collective.SessionPool[token].EventPool)
                {
                    E.Value.Set();
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }
        #endregion

        #region "Server Sent Events"

        public ActionResult Hook(string token)
        {
            try
            {
                ManualResetEvent Event = new ManualResetEvent(false);
                int EID = (new Random()).Next(100, 10000000); Collective.SessionPool[token].EventPool.Add(EID, Event);
                Event.WaitOne(); Collective.SessionPool[token].EventPool.Remove(EID);
                return new ServerSentEventResult()
                {
                    Content = () =>
                    {
                        return Serializer.Serialize(new EventResult() { Data = Collective.SessionPool[token].Data, Event = Collective.SessionPool[token].Event });
                    },
                    Version = (new Random()).Next(100, 10000000)
                };
            }
            catch (Exception e)
            {
                return Content("Error: An error has occured on the hooked thread. Re-hook to try again.");
            }
        }

        public ActionResult SetSession(string input)
        {
            try
            {
                SessionInput SessIn = Serializer.Deserialize<SessionInput>(input);
                if (SessIn.leftRight)
                {
                    Collective.SessionPool[SessIn.token].RightFilled = true;
                }
                else
                {
                    Collective.SessionPool[SessIn.token].LeftFilled = true;
                }
                return Content(Serializer.Serialize(new StandardResult() { Action = true }));
            }
            catch (Exception e)
            {
                return Content(Serializer.Serialize(new StandardResult() { Action = false }));
            }
        }

        public ActionResult GetSessions()
        {
            List<SendSession> Temp = new List<SendSession>();
            foreach (KeyValuePair<string, SessionWrap> E in Collective.SessionPool)
            {
                if (E.Value.LeftFilled == false || E.Value.RightFilled == false)
                {
                    Temp.Add(new SendSession() { Token = E.Key, LeftFilled = E.Value.LeftFilled, RightFilled = E.Value.RightFilled });
                }
            }
            return Content(Serializer.Serialize(Temp.ToArray()));
        }
        #endregion
    }
}
