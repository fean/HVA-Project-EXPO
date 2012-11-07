using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace Project.EXPO
{
    public class SessionResult
    {
        public bool Action { get; set; }
        public string SessionToken { get; set; }
    }

    public class StandardResult
    {
        public bool Action { get; set; }
    }

    public class EventResult
    {
        public string Event { get; set; }
        public string Data { get; set; }
    }

    public class SessionInput
    {
        public bool leftRight { get; set; }
        public string token { get; set; }
    }
    public class SendSession
    {
        public string Token { get; set; }
        public bool LeftFilled { get; set; }
        public bool RightFilled { get; set; }
    }
    public class SessionWrap
    {
        public string Event { get; set; }
        public string Data { get; set; }
        public bool LeftFilled { get; set; }
        public bool RightFilled { get; set; }
        public Dictionary<int, ManualResetEvent> EventPool = new Dictionary<int, ManualResetEvent>();
    }
}