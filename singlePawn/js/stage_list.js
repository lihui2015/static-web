var CURRENTPAGE = 1;
var PLAYERSNUM;
var PLAYERS;
var LEVELSNUM;
var LEVELS;
var __LEVELINFO__ = [];
var RANKLIST;
var EACHPAGEPLAYERINFO;
var PAGES;
var AUTOPLAYTIME;
var AUTOPALY;

$(function(){
	getParams();
	generateRankList();
	generateEachPagePlayerInfo();
	var tb="levelnum"+LEVELSNUM;//关卡列对应的class
	generate_content();
	getLevelInfo();
	setInterval(getLevelInfo, 10000); // 每 100/1000 秒向后台获取数据
	changeLevel();
	var changeInterval = setInterval(changeLevel, 3000); // 每 50/1000 更改状态 30
	AUTOPALY = setInterval(autoPlay, AUTOPLAYTIME);

	$('.prev').click(function(){
		if (CURRENTPAGE == 1) {
			CURRENTPAGE = PAGES;
		} else {
			CURRENTPAGE -= 1;
		}
		generate_content();
		$('.page').html('第'+CURRENTPAGE+'页');
		clearInterval(AUTOPALY);
		AUTOPALY = setInterval(autoPlay, AUTOPLAYTIME);
	});

	$('.next').click(function(){
		if (CURRENTPAGE == PAGES) {
			CURRENTPAGE = 1;
		} else {
			CURRENTPAGE += 1;
		}
		generate_content();
		$('.page').html('第'+CURRENTPAGE+'页');
		clearInterval(AUTOPALY);
		AUTOPALY = setInterval(autoPlay, AUTOPLAYTIME);		
	});	

	/**
	 * functions
	 */
	function getParams(){
		(jQuery).ajaxSettings.async = false; 
		$.getJSON('./params.php', {}, function(data) {
			PLAYERSNUM = data.playerNums;
			PLAYERS = data.players;
			LEVELSNUM = data.levelNum;
			LEVELS = data.levels;
			AUTOPLAYTIME = data.autoPlayTime;
		});
	}	

	/**
	 * 生成排序列表
	 */
	function generateRankList(){
		var perNum = 10;
		var rankList = [];
		var pages = Math.floor(PLAYERSNUM / 10) + 1;
		PAGES = pages;
		var lastPageNum = PLAYERSNUM - 10 * (pages - 1);
		for (var i = 1; i <= pages; i++) {
			var tmp = [];
			//最后一页
			if (i == pages) {
				for (var j = 1; j <= lastPageNum; j++) {
					var index = 10 * (i - 1) + j - 1;
					tmp.push(index);
				}
			} else {
				for (var j = 1; j <= 10; j++) {
					var index = 10 * (i - 1) + j - 1;
					tmp.push(index);
				}	
			}
			rankList.push(tmp);
		}
		RANKLIST = rankList;
	}

	/**
	 * 自动翻页
	 */
	function autoPlay(){
		$('.next').trigger('click');
	}

	/**
	 * 每个分页的选手id信息数组
	 */
	function generateEachPagePlayerInfo(){
		var eachPagePlayerInfo = [];
		$.each(RANKLIST, function(key, value) {
			var tmp = [];
			$.each(value, function(k, v) {
				tmp.push(''+PLAYERS[v][0]+'');
			});
			eachPagePlayerInfo.push(tmp);
		});
		EACHPAGEPLAYERINFO = eachPagePlayerInfo;
	}

	function generate_content(){
		var html = '';
		html += '<table class='+tb+'>';
		html += '<thead>';
		html += '<tr class="row row_title clearfix">';
		html += '<td class="item1">选手</td>';
		for (var i = 0; i < LEVELSNUM; i++) {
			html += '<td class="item2">'+LEVELS[''+i+''][0]+'</td>';
		}
		html += '<td class="item3">得分</td>';
		html += '<td class="item3">排名</td>';
		html += '</tr>';
		html += '</thead>';
		html += '<tbody>';
		//前三名
		var arr_rank = [1, 2, 3];
		var marks = ['status_unreached', 'status_failure', 'status_pass'];
		var t= 1;
		$.each(RANKLIST[CURRENTPAGE-1], function(k, value) {
			var position = 10 * (CURRENTPAGE - 1) + t;
			k_ = k + 1;
			if($.inArray(k_, arr_rank) >= 0 && CURRENTPAGE == 1){
				html += '<tr class="row player'+k_+'_stage clearfix playerCom rank_no_'+k_+'" id="player0'+k_+'_stage">';
			} else {
				html += '<tr class="row player'+k_+'_stage clearfix playerCom" id="player0'+k_+'_stage">';
			}
			html += '<td class="item1">'+PLAYERS[value][1]+'</td>';
			for (var j = 0; j < LEVELSNUM; j++) {
				html += '<td class="item2 item2_'+j+'"><span class="stage_status '+marks[PLAYERS[value][3][j]]+'"></span></td>';
			}
			html += '<td class="item3">'+PLAYERS[value][2]+'</td>';
			html += '<td class="item3 ranking"><span class="player_rank">'+position+'</span></td>';
			html += '</td>';
			html += '</tr>';
			t++;
		});
		html += '</tr>';	
		html += '</tbody>';
		html += '</table>';
		$('.stage_list').html(html);
	}

	/**
	 * 获取关数变动信息
	 */
	function getLevelInfo(){
		(jQuery).ajaxSettings.async = false; 
		$.getJSON('stageInfo.php',{'levelNum':LEVELSNUM, 'playersNum':PLAYERSNUM},function(data){
			$.each(data,function(key,value){
				__LEVELINFO__.push(value);
			});
		});	
		changeLevel();	
	}

	/**
	 * change
	 */
	function changeLevel(){
		var marks = ['status_unreached', 'status_failure', 'status_pass'];
		if (__LEVELINFO__.length !== 0) {
			var levelInfo = __LEVELINFO__.shift();
			var levelInfoArr = levelInfo.split('_');	
			var playerIndex = levelInfoArr[0];
			var levelIndex = levelInfoArr[1];
			var markIndex = levelInfoArr[2];

			//更改对应选手分值
			var playersTmp = PLAYERS;
			if (markIndex == 2) {
				playersTmp[playerIndex][2] += LEVELS[levelIndex][1];	
			}
			playersTmp[playerIndex][3][levelIndex-1] = markIndex;
			//排序
			playersTmp.sort(function(x, y){
				return y[2] - x[2];
			});
			PLAYERS = playersTmp;
			generateEachPagePlayerInfo();

			if ($.inArray(playerIndex, EACHPAGEPLAYERINFO[CURRENTPAGE-1]) >= 0) {
				var obj = $('.playerCom:eq('+playerIndex+') .item2:eq('+levelIndex+') .stage_status');
				if (!obj.hasClass(marks[''+markIndex+''])) {
					obj.removeClass('status_unreached status_failure status_pass').addClass('animated flipInX').addClass(marks[''+markIndex+'']);
					// setTimeout(function(){
					// 	obj.removeClass('animated flipInX');
					// }, 1000);	
					setTimeout(generate_content, 1500);			
				}	
			} else {
				changeLevel();
			}
		}
	}



});