<?php

$list = array();
$gradeArr = array(20,400);
$areas = array();
$areas[] = array(
		'playerImg'=>'./images/img.jpg',
		'playerInfo'=>'奔跑吧兄弟队的队长，是一名中国业界知名的高手，擅长XXX技术，在之前XXXXXXXX杯赛获得过冠军'
);
$areas[] = array(
		'playerImg'=>'./images/img1.jpg',
		'playerInfo'=>'碰瓷是不对的队的队长，是一名业界知名的高手，擅长XXX技术，在之前XXXXXXXX杯赛获得过冠军'
);
for($i = 0;$i<3;$i++){
	shuffle($areas);
	$s = $areas[0];
	$playerID = rand(0,49);
	$list[] = array(
		'playerID'=>'Chian Play'.$playerID,
		'code'=>'CN'
    );
}

echo json_encode($list);

?>
