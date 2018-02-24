$(function(){

	/**
	 * 自定义关数
	 * 取值为 3 4 5 6 7 8 9 10
	 * planet_c 为中间的星球，其余的键名勿更改
	 */
	var __PLANETINFO__ = {
		'planet_c': {
			'levelNum' : 3,
			'links' : ['','http://www.baidu.com','']			
		},		
		'planet_1': {
			'levelNum' : 4,
			'links' : ['http://www.baidu.com','http://www.baidu.com','','']
		},
		'planet_2': {
			'levelNum' : 5,
			'links' : ['','http://www.baidu.com','','','']
		},
		'planet_3': {
			'levelNum' : 6,
			'links' : ['','http://www.baidu.com','','','','']
		},
		'planet_4': {
			'levelNum' : 7,
			'links' : ['','http://www.baidu.com','','','','','']
		},
		'planet_5': {
			'levelNum' : 8,
			'links' : ['','http://www.baidu.com','','','','','','','']
		},
		'planet_6': {
			'levelNum' : 9,
			'links' : ['','http://www.baidu.com','','','','','','','']
		},	
							
	};

	$.each(__PLANETINFO__, function(key,value){
		var obj = $('.'+key+'');
		var singleDeg = 360 / (value.levelNum * 2);

		var html = '';
		html += '<ul class="outer">';
		for (var i = 0; i < value.levelNum; i++) {
			var link = value.links[i] == '' ? '#' : value.links[i];
			html += '<li style="transform:rotate('+(i*singleDeg*2)+'deg) skew('+(90-singleDeg)+'deg)">';
			html += '<a href="'+link+'" style="transform:skew(-'+(90-singleDeg)+'deg) rotate(-'+(90-singleDeg*0.5)+'deg) scale(1);" class="isPassed"></a>';
			html += '<div class="cover"></div>';
			html += '<div class="border_b"></div>';
			html += '<div class="border_r border_r_'+value.levelNum+'"></div>';
			html += '</li>';	
		};
		html += '</ul>';

		obj.prepend(html);

	});

	/**
	 * empty the backgroundColor when the level is passed
	 */
	$('.planet_c .outer li:eq(0) .isPassed').addClass('passed');
	$('.planet_c .outer li:eq(1) .isPassed').addClass('passed');
	$('.planet_c .outer li:eq(2) .isPassed').addClass('passed');
	$('.planet_1 .outer li:eq(0) .isPassed').addClass('passed');
	$('.planet_1 .outer li:eq(1) .isPassed').addClass('passed');
	$('.planet_5 .outer li:eq(0) .isPassed').addClass('passed');
	$('.planet_4 .outer li:eq(0) .isPassed').addClass('passed');
	$('.planet_6 .outer li:eq(0) .isPassed').addClass('passed');

});