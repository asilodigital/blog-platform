// ignore typescript error for this file
// @ts-ignore
import React, { useEffect } from 'react';

const BoardToken = 'ccf846be-754f-9045-5614-c1fdc5ef463e';

const Feedback = () => {
  useEffect(() => {
    (function (w, d, i, s) {
      function l() { if (!d.getElementById(i)) { var f = d.getElementsByTagName(s)[0], e = d.createElement(s); e.type = "text/javascript", e.async = !0, e.src = "https://canny.io/sdk.js", f.parentNode.insertBefore(e, f) } } if ("function" != typeof w.Canny) { var c = function () { c.q.push(arguments) }; c.q = [], w.Canny = c, "complete" === d.readyState ? l() : w.attachEvent ? w.attachEvent("onload", l) : w.addEventListener("load", l, !1) }
    })
      (window, document, "canny-jssdk", "script");
    Canny('render', {
      boardToken: BoardToken,
      basePath: null, // See step 2
      ssoToken: null, // See step 3
      onLoadCallback: () => console.log('done'),
    });
  }, []);

  return (
    <div className="mx-auto w-full md:w-auto py-12" data-canny />
  );
}

export default Feedback;
