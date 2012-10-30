using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.EXPO
{
    public class ServerSentEventResult : ActionResult
    {
        public delegate string GetContent();
        public GetContent Content { get; set; }
        public int Version { get; set; }

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException("context");
            }

            if (this.Content != null)
            {
                HttpResponseBase response = context.HttpContext.Response;
                response.ContentType = "text/event-stream"; response.BufferOutput = false; response.Charset = null;
                string[] newStrings = context.HttpContext.Request.Headers.GetValues("Last-Event-ID");
                if (newStrings == null || newStrings[0] != this.Version.ToString())
                {
                    try
                    {
                        response.Write("retry:250\n");
                        response.Write(string.Format("id:{0}\n", this.Version));
                        response.Write(string.Format("data:{0}\n\n", this.Content()));
                        response.End();
                    }
                    catch (HttpException e) { }
                }
                else
                {
                    response.Write(String.Empty);
                }
            }
        }
    }
}