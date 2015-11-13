/*****************************************
*             NOW PLAYING                *
*****************************************/

var scriptpath = "hhhzzz";
var clientip = '192';

// Функция, осуществляющая AJAX запрос
function sendRequest( method, url ) {
	if ( window.XMLHttpRequest )
		req = new XMLHttpRequest();
	else if ( window.ActiveXObject )
		req = new ActiveXObject( "Microsoft.XMLHTTP" );
	if ( req ) {
		req.onreadystatechange = processReqChange;
		req.open( method, url, true );
		req.send( null );
	}
}

// Функция, выполняемая при изменении статуса запроса, если статус  равен 200, данные получены
// Изменения для корректной работы с новым серваком @Юра
function processReqChange() {
	if ( req.readyState == 4 ) {
		var div = document.getElementById("nowplaying");
		if ( div!=null ) {
			if ( req.status == 200 )
				div.innerHTML = req.responseText;  
			else
				div.innerHTML = req.statusText;
		} 
		else {
			div = document.getElementById("mq");
			if ( div!=null ) {
				if ( req.status == 200 )
					div.innerHTML = req.responseText;  
				else
					div.innerHTML = req.statusText;
			} 
		}
	}
}
	
// Функция-"запускатор"
// Изменения для корректной работы с новым серваком @Юра
function getsong() {
	var url = "http://77.47.130.190:7000/getmeta";
	//var url = scriptpath + "js/sys_getsong.php";
	//var url = "http://kitich.com/wp-content/plugins/sys_getsong.php";
	sendRequest( "GET", url );
}
// Вешаем "запускатор" на таймер
var reloader = window.setInterval(getsong, 10000);

function setpath(spath) {
	scriptpath = spath;
}
function setip(sip) {
	clientip = sip;
}

/*****************************************
*           PLAYER CONTROLS              *
*****************************************/

//var dewplayer = document.getElementById("dewplayer");
var playerpos = false;

// Играть
function radioPlay() {
	var dewp = document.getElementById("dewplayer");
	if (dewp!=null) {
		dewp.dewplay();
		playerpos = true;
		var mybutton = document.getElementById("radiobutton");
		if (mybutton!=null) {
			mybutton.src = scriptpath + 'img/player-pause.gif';
			mybutton.title = 'Остановить воспроизведение';
		}
		// change equilizer
		// start marquee
		document.getElementById("eqoff").style.display = 'none';
		document.getElementById("eqon").style.display = 'block';
	}
}

// не Играть
function radioStop() {
	document.getElementById("dewplayer_refresh").innerHTML = '<div id="dewplayer_content">Flash</div>';
	dewplayerInit();
	
	var dewp = document.getElementById("dewplayer");
	if (dewp!=null) {
		//dewp.dewstop();
		playerpos = false;
		var mybutton = document.getElementById("radiobutton");
		if (mybutton!=null) {
			mybutton.src = scriptpath + 'img/player-play.gif';
			mybutton.title = 'Начать воспроизведение';
		}
		// change equilizer
		// stop marquee
	}
	//alert('stop');
	document.getElementById("eqoff").style.display = 'block';
	document.getElementById("eqon").style.display = 'none';
}

// переключатель
function radioToggle() {
	if (playerpos)
		radioStop();
	else
		radioPlay();
}

// звук
function radioVolume() {

}

// Инициализация ПЛЕЕРА
function dewplayerInit() {
	var radiopath = "http://77.47.130.190:8000/radiokpi";
	if (clientip=='10') {
		radiopath = "http://10.33.1.4:8000/radiokpi";
		mp3link = document.getElementById('mp3ip');
		if (mp3link!=null) {
			mp3link.href = "http://10.33.1.4:8000/radiokpi"
		}
	}
	var flashvars = {
		//mp3: "http://77.47.130.190:8000/radiokpi",
		mp3: radiopath,
		javascript: "on",
		volume: '100',
		//autostart: "true",
		showtime: "true"
	};
	var params = {
		wmode: "transparent"
	};
	var attributes = {
		id: "dewplayer"
	};
	//swfobject.embedSWF(scriptpath + "js/dewplayer-radio.swf", "dewplayer_content", "200", "20", "9.0.0", false, flashvars, params, attributes);
	swfobject.embedSWF(scriptpath + "js/dewplayer-radio.swf", "dewplayer_content", "1", "20", "9.0.0", false, flashvars, params, attributes);
}

// Инициализация скрипта
function radioInit() {
	var params = {
		wmode: "transparent"
	};
	var attributes = {
		id: "eqflash"
	};
	swfobject.embedSWF(scriptpath + "js/equilizer.swf", "eqinside", "57", "20", "9.0.0", false, '', params, attributes);
	
	radioStop();
}