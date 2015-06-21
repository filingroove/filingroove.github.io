(function() {
	"use strict";

    var _send = IM.send;

    var highlight = function() {
    	var msgs = document.querySelectorAll('.im_msg_text');

        for (i = 0; i < msgs.length; i++) {

        	var html = msgs[i].innerHTML;

			html = html.replace('##Code:js', '<pre><code class="language-javascript">');
			html = html.replace('##Code:css', '<pre><code class="language-css">');			

			html = html.replace("##/Code", "</pre></code>");

			msgs[i].innerHTML = html;
		}
    }

    IM.send = function() {
        _send();

        highlight();        
    };

    highlight();
})();

