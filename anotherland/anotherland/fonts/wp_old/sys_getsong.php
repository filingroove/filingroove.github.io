<?php 
//phpinfo();

function userErrorHandler($errno,$errmsg,$filename,$linenum,$vars) {
	// время возникновения ошибки
	$dt=date("Y-m-d H:i:s (T)");
	$errortype = array(
		1    => "Error",
		2    => "Warning",
		4    => "Parsing Error",
		8    => "Notice",
		16   => "Core Error",
		32   => "Core Warning",
		64   => "Compile Error",
		128  => "Compile Warning",
		256  => "User Error",
		512  => "User Warning",
		1024 => "User Notice"
	);
	if (($errno==2)&&(strpos($errmsg,'failed to open stream')))
		$err = "Информация об ID3-тегах отсутствует\n";
	else {
/*		$err.="время ($dt), номер ошибки ($errno), ";
		$err.="тип ошибки (".$errortype[$errno]."): ";
		$err.=$errmsg."файл $filename, строка (";
		$err.=$linenum.")\n";*/
	}
	echo $err;
}
error_reporting(0); // не выводить сообщения PHP
$old_error_handler=set_error_handler("userErrorHAndler");



//ini_set('allow_url_fopen', 'On');
$server = 'http://77.47.130.190:8000'; //url to your icecast server, with "http://", without the ending "/"
//$server = 'http://10.33.1.4:8000/radiokpi';
$mount= '/radiokpi'; //your radio's mount point, with the leading "/"

function getStreamStatus($server, $mount){
	$header = get_headers($server.$mount);
	if($header[0] == 'HTTP/1.0 200 OK'){
		return 'On Air';
	}
	else{
		return  'Off Air';
	}
}

function getStreamInfo($server, $mount){
	$output = file_get_contents($server.'/status.xsl?mount='.$mount);
	$temp_array = array(); 
	$search_for = "<td\s[^>]*class=\"streamdata\">(.*)<\/td>"; 
	$search_td = array('<td class="streamdata">','</td>'); 

	if(preg_match_all("/$search_for/siU",$output,$matches)) { 
	   foreach($matches[0] as $match) { 
		  $to_push = str_replace($search_td,'',$match); 
		  $to_push = trim($to_push); 
		  array_push($temp_array,$to_push); 
	   } 
	}
		 
	$stream_info['title'] = $temp_array[0]; 
	$stream_info['description'] = $temp_array[1]; 
	$stream_info['content_type'] = $temp_array[2]; 
	$stream_info['mount_start'] = $temp_array[3]; 
	$stream_info['bit_rate'] = $temp_array[4]; 
	$stream_info['listeners'] = $temp_array[5]; 
	$stream_info['peak_listeners'] = $temp_array[6]; 
	$stream_info['genre'] = $temp_array[7]; 
	$stream_info['url'] = $temp_array[8];
	$stream_info['artist_song'] = $temp_array[9];
		$x = explode(" - ",$temp_array[9]); 
	$stream_info['artist'] = $x[0]; 
	$stream_info['song'] = $x[1];
//print_r($stream_info);
	return $stream_info;
}

header('Content-Type: text/plain; charset=UTF-8');
$status = getStreamStatus($server, $mount);
//echo "<hr/>$status<hr/>";
if($status == 'On Air'){
	$stream_info = getStreamInfo($server, $mount);
	/*echo "<hr/>";
	foreach($stream_info as $key=>$value) {
		echo "$key: $value<br/>";
	}
	echo "<hr/>";*/
	$cur_song = $stream_info['artist_song'];
	$cur_song_1 = iconv('utf-8','KOI8-R',$cur_song);
	$cur_song_11 = html_entity_decode(iconv('KOI8-R','utf-8',$cur_song_1)); 
	echo $cur_song_11;
	//$cur_song_1 = iconv('CP1252','utf-8',$cur_song);
	//$cur_song_1 = iconv('CP1252','utf-8',$cur_song);
	//$cur_song_11 = html_entity_decode(iconv('CP1251','utf-8',$cur_song_11)); 
//	echo $cur_song_11;
}
//else echo "Off Air";

?>