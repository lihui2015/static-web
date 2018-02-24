<?php 
	/**
	 * 返回变动的信息 过关或没过关，每次返回的个数根据实际情况来定
	 * $result = [uid_关数_状态];	 
	 * 状态：0正常 1未通过 2通过 (其实不返回0 要么1要么2)
	 * $result = [uid_12_1, uid_10_2, uid_8_2...];
	 */
	
	/**
	 * 模拟数据
	 */
	$playersNum = $_GET['playersNum'];
	$levelNum = $_GET['levelNum'];
	$tmp = [];

	for ($i=1; $i <= $playersNum; $i++) { 
		array_push($tmp, $i);
	}
	$playerNumArr = array_rand($tmp, rand(1, $playersNum)); // 固定的

	$result = [];
	$marks = array(0, 1, 2); //0正常 1未通过 2通过
	foreach ($playerNumArr as $key => $value) {
		$mark = array_rand($marks, 1);
		$rankLevel = rand(1, $levelNum);
		array_push($result, $value.'_'.$rankLevel.'_'.$mark);
	}

	echo json_encode($result);
 ?>