<?php 
	$playerNum = 10; //人数
	$levelNum = 12; // 关数
	$marks = array(1,2,3); //0正常 1未通过 2通过
	$data = array();
	for ($i=1; $i < $playerNum+1; $i++) { 
		$status = array();
		for ($k=1; $k < $levelNum+1; $k++) { 
			$status['stage'.$k] = array_rand($marks,1);
		}
		$data["player".change2($i)]['id'] = $i;
		$data['player'.change2($i)]['status'] = $status;
	};
	echo json_encode($data);

	function change2($i){
		if (strlen($i) == 1) {
			return "0".$i;
		} else {
			return $i;
		}
	}
 ?>