for (i = 0; i < msgs.length; i++) {
	html = msgs[i].innerHTML.replace("##Code", "<pre><code>");
	html = html.replace("##/Code", "</pre></code>");

	msgs[i].innerHTML = html;
}