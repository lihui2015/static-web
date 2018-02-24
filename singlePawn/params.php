<?php 
	/**
	 * 配置文件
	 * $levelNum 显示的关数
	 * $levels 关卡名 及对应的得分
	 * $playNums 参加的总人数
	 * $players 选手id和姓名
	 * $autoPlayTime 自动轮播时间
	 */
	
	$levelNum = 15;
	$levels = [
		['第一关', 100],
		['第二关', 100],
		['第三关', 100],
		['第四关', 100],
		['第五关', 100],
		['第六关', 300],
		['第七关', 300],
		['第八关', 300],
		['第九关', 300],
		['第十关', 300],
		['第十一关', 500],
		['第十二关', 500],
		['第十三关', 500],
		['第十四关', 500],
		['第十五关', 500],
		['第十六关', 800],
		['第十七关', 800],
		['第十八关', 800],
		['第十九关', 800],
		['第二十关', 800],
	];	
	$playerNums = 73;
	$autoPlayTime = 5000;

	//	[['uid', '姓名'], ['uid', '姓名'], ['uid', '姓名'].... ]
	//	[['1', '张三'], ['2', '李四'], ['3', '王五'].... ]
	$players = [];
	for ($i=1; $i <= $playerNums; $i++) { 
		$tmp = [$i, '姓名'.$i];
		array_push($players, $tmp);
	}

	// ********* 返回 ***********//
	// 默认初始得分为0 ; 各个关卡的状态为 0
	$initStatu = [];
	for ($i=0; $i < $levelNum; $i++) { 
		array_push($initStatu, 0);
	}
	foreach ($players as $key => $value) {
		array_push($players[$key], 0);
		array_push($players[$key], $initStatu);
	}

	$data = [
		'playerNums' => $playerNums,
		'players' => $players,
		'levelNum' => $levelNum,
		'levels' => $levels,
		'autoPlayTime' => $autoPlayTime,
	];

	echo json_encode($data);


 ?>