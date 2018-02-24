<?php

$list = array();
$gradeArr = array(20,400);

for($i = 0;$i<70;$i++){
	$shotRandNum = rand(0,19);
	if($shotRandNum == 0){
		$grade = $gradeArr[1];
		$isDie = true;
	}else{
		$grade = $gradeArr[0];
		$isDie = false;
	}
	$target = rand(0,6);
	$isShot = rand(0,3);
	$score = rand(0,2000);
	$list[] = array(
		'playerID'=>'Chian Play'.($i+1),
		'isShot'=>$isShot,
		'target'=>$target,
    );
}

echo json_encode($list);

?>
