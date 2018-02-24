$(function(){
	//********************************   dialog  *******************************// 
var barW = 17,barH = 0.053 * window.innerHeight,
    browser_width = window.innerWidth,
    browser_heidth = window.innerHeight - barW,
    mapLeft = browser_width * 0.1613,
    mapTop = 50 + 0.03 * browser_heidth;

resizeMap();
window.onload = function(){
    //musicControl();
    showTime();
    bindEvent();
    //ajaxAttack();
}
window.onresize = function(){
    resizeMap();
}

function musicControl(){
    $(".J_audio").on("click",function(){
        var audio = document.getElementById("music");
        if(audio!==null){             
          if(audio.paused){                    
                audio.play();
                $(".musicBg").removeClass("pause");
          }else{
                audio.pause();
                $(".musicBg").addClass("pause");
          }
         } 
    })
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

function bindEvent(){
    $(".J_sortBtn").on("click",function(){
        var target = $(this).data("cont");
        $("#"+target).slideToggle();
        $(this).toggleClass('active');
    });
    $(".J_infoBtn").on("click",function(){
        var target = $(this).data("cont");
        $("#"+target).toggleClass("open");
        $(this).toggleClass('active')
    });

    if(browser_heidth <= 750){
        $(".J_flex").removeClass("active");
        $("#chartsBox").hide();
    };

    $(".J_flexBtn").on("click",function(){
        var obj1 = $(".J_flex"),
            obj2 = $(".J_flexH"),
            isFlex1 = obj1.hasClass("active"),
            isFlex2 = obj2.hasClass("active");
        if(isFlex1 && !isFlex2){
            obj2.addClass("active");
            $("#liveAttackBox").addClass("open");
        }else if(!isFlex1 && isFlex2){
            obj1.addClass("active");
            $("#chartsBox").show();
        }else{
            obj1.toggleClass('active');
            $("#chartsBox").slideToggle();
            obj2.toggleClass('active');
            $("#liveAttackBox").toggleClass("open");
        }
    });

    $(".starsBox").delegate(".J_starInfoBtn","click",function(){
        var target = $(this).data("cont");
        $(this).parents("."+target).removeClass("open");
    });
    
}
function resizeMap(){
    browser_width = window.innerWidth;
    var mapH = browser_width * 258 / 1920;
    $('.mapBox').css({"height":mapH});
    $('.currentPageBox').css({"bottom":mapH+20});
    var fSize = browser_width / 1920 * 20;
    $("html").css({"fontSize": fSize +"px"});
}

function ajaxAttack(){
    /*setInterval(function(){
        $.getJSON("./demo.php",function(result){
            var str ='';
            $.each(result, function(i, field){
                //console.log(field);
                var port = +(field.dport),
                color = 'hsl(' + (+port%360) + ', 100%, 70%)';
                str += '<div class="td"><span class="time">'+field.time+'</span><span class="source '+field.countrycode+'"><i>'+field.country+'</i></span><span class="target">'+field.country2+'</span><span class="type colorMH" style="color:'+color+'">'+field.type+'</span><span class="port">'+port+'</span></div>';
            });
            //console.log(str);
            $(".attack .tdWrap").html(str)
        });
    },1000);*/
}

})