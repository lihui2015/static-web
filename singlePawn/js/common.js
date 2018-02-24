$(function(){
//********************************   dialog  *******************************// 
var barW = 17,barH = 0.053 * window.innerHeight,
    browser_width = window.innerWidth,
    browser_heidth = window.innerHeight - barW,
    mapLeft = browser_width * 0.1613,
    mapTop = 50 + 0.03 * browser_heidth;


resizeMap();
window.onload = function(){
    showTime();
    bindEvent();
}
window.onresize = function(){
    resizeMap();
}

function showTime()
{
    var EndTime= new Date(timeCount);
    var NowTime = new Date();
    var t =EndTime.getTime() - NowTime.getTime();
    var d=0;
    var hours=0;
    var mi=0;
    var se=0;
    if(t>=0){
      d=Math.floor(t/1000/60/60/24);
      hours=Math.floor(t/1000/60/60%24);
      hours = hours + d *24;
      mi=Math.floor(t/1000/60%60);
      se=Math.floor(t/1000%60);
    }

    if(hours<=9)
    hours="0"+hours;
    if(mi<=9)
    mi="0"+mi;
    if(se<=9)
    se="0"+se;

    var showClock = document.getElementById("showClock");
    show="<span>"+hours+"</span><i>:</i><span>"+mi+"</span><i>:</i>"+"<span>"+se+"</span>";
    showClock.innerHTML=show;

    setTimeout(showTime,1000);
}

function resizeMap(){
    browser_width = window.innerWidth;
    var mapH = browser_width * 258 / 1920;
    $('.mapBox').css({"height":mapH});
    $('.currentPageBox').css({"bottom":mapH+20});
    var fSize = browser_width / 1920 * 20;
    $("html").css({"fontSize": fSize +"px"});
}

function bindEvent(){
    $(".starsBox").delegate(".J_starInfoBtn","click",function(){
        var target = $(this).data("cont");
        $(this).parents("."+target).removeClass("open");
    });
}

})