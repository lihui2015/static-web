<?php
date_default_timezone_set('Asia/Shanghai');
$areas = array();
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景',
		'first'=>'奔跑吧兄弟队',
		'second'=>'碰瓷是不对的队',
		'third'=>'有人要上天队'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景',
		'first'=>'专业修bug队',
		'second'=>'专业修bug队1',
		'third'=>'专业修bug队2'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景',
		'first'=>'奔跑吧兄弟队',
		'second'=>'碰瓷是不对的队',
		'third'=>'有人要上天队'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景',
		'first'=>'专业修bug队',
		'second'=>'专业修bug队1',
		'third'=>'专业修bug队2'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景',
		'first'=>'奔跑吧兄弟队',
		'second'=>'碰瓷是不对的队',
		'third'=>'有人要上天队'
);
$areas[] = array(
		'statTitle'=>'某网站sql注入场景',
		'first'=>'专业修bug队',
		'second'=>'专业修bug队1',
		'third'=>'专业修bug队2'
);
$areas[] = array(
		'statTitle'=>'某论坛cookies漏洞场景',
		'first'=>'奔跑吧兄弟队',
		'second'=>'碰瓷是不对的队',
		'third'=>'有人要上天队'
);

$list = array();

for($i = 1;$i<8;$i++){
	$success = rand(0,99);
	$attack = rand(0,99);
	$s = $areas[$i-1];
	$list[] = array(
		'statTitle'=>$s['statTitle'],
		'first'=>$s['first'],
		'second'=>$s['second'],
		'third'=>$s['third'],
		'success'=>$success,
		'attack'=>$attack
    );
}

echo json_encode($list);

?>
