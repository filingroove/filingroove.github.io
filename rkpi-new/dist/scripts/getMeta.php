<?php
	
	header('content-type: application/json; charset=utf-8');
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Methods: GET");

	$my_little_dom = new DOMDocument(); // ^__^
	@$my_little_dom->loadHTMLFile('http://rkpi.mr-gamer.net/');
	$xpath = new DOMXpath($my_little_dom);

	$song = $xpath->query("(//tr/td)[last()]");
	
	$ret = array("song" => $song->item(0)->nodeValue);

	echo json_encode($ret);
?>