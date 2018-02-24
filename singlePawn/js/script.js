$(function(){
var column_h=$(".columnList .column_item").height();	
$(".columnList .column_item .right_icon").click(function(){
	h2=-(column_h-30);
	if($(this).parents(".column_item").hasClass("closebox")){
		$(this).parents(".column_item").removeClass("closebox").addClass("deploybox");
		$(this).parents(".column_item").css({"position":"relative"}).animate({"bottom":h2,"height":"26px"},1000);
	}else if($(this).parents(".column_item").hasClass("deploybox")){
		$(this).parents(".column_item").removeClass("deploybox").addClass("closebox");
		$(this).parents(".column_item").animate({"bottom":"0","height":column_h},1000);
	}
});


})