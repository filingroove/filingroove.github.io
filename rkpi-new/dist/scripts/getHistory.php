<?php 
	header("Content-Type: application/json");

	$servername = "rafts.mysql.ukraine.com.ua";
	$username = "rafts_rme";
	$password = "kfqs3xbx";
	$dbname = "rafts_rme";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	// SELECT all rows
	$result = $conn->query("SELECT * FROM rkpime_playout_history ORDER BY `played-at` DESC LIMIT 15");

	// Close connection
	$conn->close();

	// JSON ensode result
	if ($result) {

	    while($row = $result->fetch_array(MYSQL_ASSOC)) {
	            $array[] = $row;
	    }
	    
	    echo json_encode($array);
	}
?>