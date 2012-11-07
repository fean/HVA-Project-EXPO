using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace Project.EXPO
{
    public class Collective
    {
        public static Dictionary<string, SessionWrap> SessionPool = new Dictionary<string, SessionWrap>();
    }
}