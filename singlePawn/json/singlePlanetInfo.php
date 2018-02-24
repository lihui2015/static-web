<?php 
	//playerID
	$playerID = $_GET['playerID'];

	
	function rand100(){
		$rand = rand(0, 100);
		return $rand;
	}

	function rand1000(){
		$rand = rand(0, 1000);
		return $rand;	
	}

	$info = array(
		'playerID' => $playerID,
		'abality1' => rand100(),
		'abality2' => rand100(),
		'abality3' => rand100(),
		'abality4' => rand100(),
		'abality5' => rand100(),
		'ATK' => rand100(),
		'level' => rand100(),
		'score' => rand1000(),
		'ranking' => rand100(),
	);

	echo json_encode($info);

 ?>