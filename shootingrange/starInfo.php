<?php
date_default_timezone_set('Asia/Shanghai');
$areas = array();
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景'
);

$teams[] = array('team'=> '奔跑吧兄弟队');
$teams[] = array('team'=> '碰瓷是不对的队');
$teams[] = array('team'=> '有人要上天队');
$teams[] = array('team'=> '专业修bug队');
$teams[] = array('team'=> '专业修bug队1');
$teams[] = array('team'=> '专业修bug队2');

$list = array();

for($i = 1;$i<9;$i++){
	$success = rand(0,99);
	$attack = rand(0,99);
	shuffle($teams);
	$s = $areas[$i-1];
	$list[] = array(
		'statTitle'=>$s['statTitle'],
		'first'=>$teams[0]['team'],
		'second'=>$teams[1]['team'],
		'third'=>$teams[2]['team'],
		'success'=>$success,
		'attack'=>$attack
    );
}

echo json_encode($list);

?>
