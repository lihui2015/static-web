<?php

$list = array();
$gradeArr = array(20,400);

for($i = 0;$i<80;$i++){
	$shotRandNum = rand(0,10);
	if($shotRandNum == 0){
		$grade = $gradeArr[1];
		$isDie = true;
	}else{
		$grade = $gradeArr[0];
		$isDie = false;
	}
	$target = rand(0,6);
	$isShot = rand(0,100);
	$score = rand(0,3000);
	$list[] = array(
		'playerID'=>'Chian Play'.($i+1),
		'isShot'=>$isShot,
		'score'=>$score,			
		'code'=>'CN',
		'target'=>$target,
		'grade'=>$grade,
		'isDie'=>$isDie
    );
}

echo json_encode($list);

?>
