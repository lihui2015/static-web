<?php 

	/**
	 *  返回 所有当前已过关卡的关数号
	 */

	$nodeNum = $_GET['nodeNum'];
	$nodeArr = [];	

	for ($i=0; $i < $nodeNum; $i++) { 
		array_push($nodeArr, $i);
	}

	$infoNum = mt_rand(2,$nodeNum);  //过关的 关数
	$infoArr = array_rand($nodeArr, $infoNum);  //过关的 关的关号
	$info = []; //默认所有关为 0 ，即为不过

	for ($i=1; $i < $nodeNum+1; $i++) { 
		array_push($info, 0);
	}
	
	foreach ($infoArr as $key => $value) {
		$info[$value] = 1;
	}

	shuffle($infoArr);

	echo json_encode($infoArr);

 ?>