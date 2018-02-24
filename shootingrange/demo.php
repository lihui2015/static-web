<?php
date_default_timezone_set('Asia/Shanghai');
header("Content-type: text/html; charset=utf-8"); 
$areas = array();
$areas[] = array(
		'playerImg'=>'./images/img.jpg',
		'playerInfo'=>'奔跑吧兄弟队的队长，是一名中国业界知名的高手，擅长XXX技术，在之前XXXXXXXX杯赛获得过冠军'
);
$areas[] = array(
		'playerImg'=>'./images/img1.jpg',
		'playerInfo'=>'碰瓷是不对的队的队长，是一名业界知名的高手，擅长XXX技术，在之前XXXXXXXX杯赛获得过冠军'
);

$list = array();

//设置飞机模型页面生成的info.json数据
$planeArr ='{"imgScale":0.4,"imgNum":50,"fSize":20,"planeArr":[{"id":0,"px":"0.1475","py":"0.1853"},{"id":1,"px":"0.0728","py":"0.2020"},{"id":2,"px":"0.0731","py":"0.1453"},{"id":3,"px":"0.4108","py":"0.1857"},{"id":4,"px":"0.3416","py":"0.2753"},{"id":5,"px":"0.1911","py":"0.1101"},{"id":6,"px":"0.0283","py":"0.2843"},{"id":7,"px":"0.2090","py":"0.2262"},{"id":8,"px":"0.2988","py":"0.1387"},{"id":9,"px":"0.2634","py":"0.1919"},{"id":10,"px":"0.1916","py":"0.3087"},{"id":11,"px":"0.2935","py":"0.0973"},{"id":12,"px":"0.1163","py":"0.3084"},{"id":13,"px":"0.0231","py":"0.0638"},{"id":14,"px":"0.3169","py":"0.3149"},{"id":15,"px":"0.8667","py":"0.2750"},{"id":16,"px":"0.8564","py":"0.3747"},{"id":17,"px":"0.5909","py":"0.1388"},{"id":18,"px":"0.6479","py":"0.0790"},{"id":19,"px":"0.5919","py":"0.2714"},{"id":20,"px":"0.7509","py":"0.0704"},{"id":21,"px":"0.9212","py":"0.1734"},{"id":22,"px":"0.7028","py":"0.3470"},{"id":23,"px":"0.8039","py":"0.2497"},{"id":24,"px":"0.7916","py":"0.1202"},{"id":25,"px":"0.8767","py":"0.2266"},{"id":26,"px":"0.7052","py":"0.1983"},{"id":27,"px":"0.8767","py":"0.1076"},{"id":28,"px":"0.6845","py":"0.2614"},{"id":29,"px":"0.7152","py":"0.4827"},{"id":30,"px":"0.7460","py":"0.6351"},{"id":31,"px":"0.5906","py":"0.6095"},{"id":32,"px":"0.7596","py":"0.7042"},{"id":33,"px":"0.4427","py":"0.5903"},{"id":34,"px":"0.4846","py":"0.6569"},{"id":35,"px":"0.4969","py":"0.5480"},{"id":36,"px":"0.7835","py":"0.5219"},{"id":37,"px":"0.5152","py":"0.4676"},{"id":38,"px":"0.6178","py":"0.6940"},{"id":39,"px":"0.6498","py":"0.5557"},{"id":40,"px":"0.3625","py":"0.8374"},{"id":41,"px":"0.2405","py":"0.7813"},{"id":42,"px":"0.1111","py":"0.8069"},{"id":43,"px":"0.3613","py":"0.9475"},{"id":44,"px":"0.0437","py":"0.7404"},{"id":45,"px":"0.2158","py":"0.9590"},{"id":46,"px":"0.2367","py":"0.8732"},{"id":47,"px":"0.1048","py":"0.8604"},{"id":48,"px":"0.1911","py":"0.7311"},{"id":49,"px":"0.2922","py":"0.7309"}]}';
//$planeArr ='{"imgScale":0.4,"imgNum":2,"fSize":20,"planeArr":[{"id":0,"px":"0.1475","py":"0.1853"},{"id":1,"px":"0.0728","py":"0.2020"}]}';

$content = json_decode($planeArr,true);
$num = $content['imgNum'];
$imgScale = $content['imgScale'];
$fSize = $content['fSize'];
$planes = $content['planeArr'];

for($i = 0;$i<$num;$i++){
	shuffle($areas);
	$s = $areas[0];
	$list[] = array(
		'playerID'=>'Chian Play'.$i,
		'code'=>'CN',
		'playerImg'=>$s['playerImg'],
		'playerInfo'=>$s['playerInfo'],
		'px'=>$planes[$i]['px'],
		'py'=>$planes[$i]['py']
    );
}
$planeInfo = array(
	'imgScale'=>$imgScale,
	'fSize'=>$fSize,
	'arr'=>$list
);
echo json_encode($planeInfo);

?>
