var imgData = [
    {name:"plane1",path:"images/plane1.png"},
    {name:"plane2",path:"images/plane2.png"},
    {name:"plane3",path:"images/plane3.png"},
    {name:"plane4",path:"images/plane4.png"},
    {name:"star1",path:"images/star1.png"},
    {name:"star2",path:"images/star2.png"},
    {name:"star3",path:"images/star3.png"},
    {name:"star4",path:"images/star4.png"},
    {name:"star5",path:"images/star5.png"},
    {name:"star6",path:"images/star6.png"},
    {name:"star7",path:"images/star7.png"},
    {name:"CN",path:"images/flag/cn.png"},
    {name:"vortex",path:"images/vortex.png"},
    {name:"effects",path:"images/effects.png"}
];
var dataList;
var loadingLayer,charaLayer,stageLayer;
var warshipDown,playerText,enemyText,windowUp,title,big_vs,background,swords,swords02;
var browser_width = window.innerWidth,
    browser_heidth = window.innerHeight,
    mLeft = 16.95*browser_width/1920*20,
    mTop = 86 + 50;
var isClick = false;
var colorArr = [['#0c6902','#89fe7d'],['#d48d1a','#f2e18d'],['#ab230f','#fba093'],['#361a9c','#a087fd']];
var colorRgb1 = [[{'r':12,'g':105,'b':2},{'r':137,'g':254,'b':125}],[{'r':212,'g':141,'b':26},{'r':242,'g':225,'b':141}],[{'r':171,'g':35,'b':15},{'r':251,'g':160,'b':147}],[{'r':54,'g':26,'b':156},{'r':160,'g':135,'b':253}]];
var colorRgb = [[{'r':36,'g':173,'b':216},{'r':21,'g':82,'b':168}],[{'r':212,'g':141,'b':26},{'r':242,'g':225,'b':141}],[{'r':206,'g':26,'b':0},{'r':251,'g':160,'b':147}],[{'r':160,'g':135,'b':253},{'r':54,'g':26,'b':156}]];

LInit(50,"targetCanvas",browser_width-mLeft,browser_heidth-mTop,main);
function main(){
    LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,false);
    if(LGlobal.canTouch){
        LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        //LSystem.screen(LStage.FULL_SCREEN);
    }else{
        LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
        //LSystem.screen(LStage.FULL_SCREEN);
    }
    loadingLayer = new LoadingSample4();
    addChild(loadingLayer);
    //读取图片
    LLoadManage.load(imgData,
        function(progress){
            loadingLayer.setProgress(progress);
        },gameInit);
    //addChild(new FPS());
}
function gameInit(result){
    dataList = result;
    removeChild(loadingLayer);
    loadingLayer = null;

    stageLayer = new LSprite();
    //console.log(LGlobal.width)
    if(LGlobal.canTouch){
        stageLayer.scaleX = .5;
        stageLayer.scaleY = .5;

        stageLayer.x = LGlobal.width * .25 - stageLayer.getWidth() * .5;
        stageLayer.y = LGlobal.height * .25 - stageLayer.getHeight() * .5;
    }
    addChild(stageLayer);
    /*动画开始*/
    animation01Start(null);
    LGlobal.canvasObj.onselectstart = function() {
            return false;
        };
}
/*
 * 第一个动画开始播放
 * */
function animation01Start(event){
    if(event){
        stageLayer.die();
        stageLayer.removeAllChild();
    }
    /*添加所有星球*/
    addStar();
    /*添加所有飞机*/
    addPlane();
}

/**
 * 添加所有飞机对象
 * */
function Plane(){
    this.view = new LSprite();
    //this.view2 = new LSprite();
    this.imgLayer = new LSprite();
    this.Lbit = '';
    this._scale = 0.25;
    this.rand4 = '';
    this.infoBox = '';
    this.clickEffect = '';
    this.textInfo = '';
    this.target = '';
    this.shotData = '';
    this.score = 0;
}
Plane.prototype.Init = function(numX,numY,str,rotate,direction,code,name,imgScale){
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
   if(width < 1280){
        this._scaleP = 0.7;
    }else if(width > 1280 && width < 1366){
        this._scaleP = 0.8;
    }else if(width >= 1366 && width < 1920){
        this._scaleP = 0.9;
    }else if(width = 1920){
        this._scaleP = 1;
    }else if(width > 1920){
        //this._scale = 0.5;
    }
    //this.data = data;
    this.name = name;
    this._scale = imgScale * this._scaleP;
    this.direction = direction;
    this.pointX = numX;
    this.pointY = numY;
    this.rand4 = Math.floor(Math.random() * 4) + 1;
    this.Lbit = new MiddleBitmap(new LBitmapData(dataList["plane" + this.rand4]));
    this.Lbit.scaleX = this.Lbit.scaleY = this._scale;
    this.Lbit.x = numX;
    this.Lbit.y = numY;
    this.Lbit.alpha = 1;
    this.Lbit.rotate = rotate; 
    this.imgLayer.addChild(this.Lbit);
    //console.log(this.imgLayer.getBounds(this.view));

    this.imgLayer.useCursor="pointer";

    this.infoBox = str;

    this.clickEffect = new MiddleBitmap(new LBitmapData(dataList[code]));
    this.clickEffect.scaleX = this.clickEffect.scaleY = 0.18;
    this.clickEffect.x = numX-this.Lbit.getWidth() * .5;
    this.clickEffect.y = numY + this.Lbit.getHeight()*.8;
    this.clickEffect.alpha = 1;
    this.view.addChild(this.clickEffect);
    //planeSprite.addChild(this.clickEffect);

    this.textInfo = new LTextField();
    this.textInfo.setWordWrap(true,30);
    this.textInfo.htmlText = "<font face='Arial' color=\"#ffffff\" size='10'>"+name+"</font>";
    this.textInfo.scaleX = this.textInfo.scaleY = this._scaleP;
    this.textInfo.x = numX-this.Lbit.getWidth() * .5 + this.clickEffect.getWidth();
    this.textInfo.y = numY +  this.Lbit.getHeight()*.8 + 5;
    this.textInfo.textBaseline = "alphabetic";
    planeSprite.addChild(this.textInfo);

    var _plane = this;

    this.imgLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
        $("#infoCont").find(".cont").html(_plane.infoBox).end().toggleClass("open");
        var player = db.players.find({'playerID':name})[0];
        if(typeof(player) != 'undefined'){
            $(".J_score").html(player.score);
        }
        
        $(".J_infoBtn").toggleClass("active");

        var pX = numX + 16.5*browser_width/1920*20,
            pY = numY + 60 + _plane.Lbit.getHeight()*.5;
        $(".J_circle").toggleClass("active").css({'top':pY,'left':pX});
    });
}

function shot(obj,data){
    this.bullet = new LSprite();
    obj.view.addChild(this.bullet);
    this.delay = (Math.floor(Math.random()*4) + 1) * .3;
    
    //console.log(this.starObj);
    this.starObj = data.target;
    //this.starObj = typeof(starArr[data.target]) != "undefined" ? starArr[data.target] : starArr[0];
    this.p0 = {x:obj.pointX + obj.Lbit.getWidth()*0.8,y:obj.pointY + obj.Lbit.getHeight()*obj.direction};
    this.p1 = {x:this.starObj.pointerX,y:this.starObj.pointerY};
    this.delT = Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
    this.radius = 100;
    this.color = colorArr[obj.rand4-1];
    this.colorRgb = colorRgb1[obj.rand4-1];
    this.shotData = data;
    if(data.tag == 'scoreShot'){
        this.radius = 260;
        this.color = ['#d5c400','#fce913'];
        this.colorRgb = [{'r':213,'g':196,'b':0},{'r':252,'g':233,'b':19}];
        
        this.text = "<li>战队<span class='lim110'>"+this.shotData.playerID+"</span> 攻击战队<span class='lim110'>"+this.starObj.starData.name+"</span> 成功，成功获得"+this.shotData.grade+" 分</li>";
        this.textHidden = 1;
        /*this.tempText = new LTextField();
        //this.tempText.setWordWrap(true);
        this.tempText.width = 500;
        this.tempText.font = 'Microsoft Yahei';
        this.tempText.color = '#ff0000';
        this.tempText.textAlign = 'center';
        this.tempText.size = 16;

        this.tempText.text = "<li>战队"+this.shotData.playerID+" 攻击战队"+this.starObj.starData.name+" 成功，成功获得"+this.shotData.grade+" 分</li>";
        this.tempText.scaleX = this.tempText.scaleY = 1;
        //this.tempText.x = this.starObj.pointerX;
        //this.tempText.y = this.starObj.pointerY-50;
        this.tempText.x = LGlobal.width - this.tempText.getWidth() * .5 - 30;
        console.log(this.tempText.getWidth());
        //this.tempText.x = LGlobal.width *.5 - 125;
        this.tempText.y = 130;
        this.tempText.textBaseline = "alphabetic";
            this.tempText.alpha = 1;*/

        if(this.shotData.isDie){
            this.color = ['#be0000','#ff0000'];
            this.colorRgb = [{'r':190,'g':0,'b':0},{'r':255,'g':0,'b':0}];
            this.text = "<li>战队<span class='lim110'>"+this.shotData.playerID+"</span> 成功击败战队<span class='lim110'>"+this.starObj.starData.name+"</span>，成功获得"+this.shotData.grade+" 分</li>";
            this.textHidden = 1;
            /*this.tempText.size = 16;
            this.tempText.weight = "bolder";
            this.tempText.color = "#ffffff";
            this.tempText.text = "<li>战队"+this.shotData.playerID+" 成功击败战队"+this.starObj.starData.name+" ，成功获得"+this.shotData.grade+" 分</li>";*/
        }

    }
    this.pointList = [this.p0];
    this.pointList.push({x:this.p1.x-this.radius*Math.cos(this.delT),y:this.p1.y-this.radius*Math.sin(this.delT)});
    this.dx = this.pointList[1].x - this.pointList[0].x;
    this.dy = this.pointList[1].y - this.pointList[0].y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.speed = obj.rand4*120 + 100;
    this.Time= this.distance/this.speed;
    this.shotType = data.tag; 
    this.bullet.x = this.p0.x;
    this.bullet.y = this.p0.y;
    this._launch(obj);
}
shot.prototype._launch = function(obj){
    var _self = this;
    LTweenLite.to(obj.Lbit,0.4,{delay:_self.delay,alpha:1,scaleX:obj._scale+0.00,scaleY:obj._scale+0.00,x:obj.pointX-5,ease:Elastic.easeOut})
    .to(obj.Lbit,0,{scaleX:obj._scale,scaleY:obj._scale,x:obj.pointX,ease:Sine.easeIn,onComplete:function(event){
        var grd = LGlobal.canvas.createLinearGradient(0,0,_self.radius*Math.cos(_self.delT),_self.radius*Math.sin(_self.delT));
        grd.addColorStop(0,_self.color[0]);
        grd.addColorStop(1,_self.color[1]);
        _self.bullet.graphics.drawArc(1,'rgba(255,255,255,0)',[0,0,_self.radius,_self.delT-Math.PI/270,_self.delT+Math.PI/270,false,true],true,grd);
        _self.bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [_self.radius*Math.cos(_self.delT),_self.radius*Math.sin(_self.delT), 1.2, 0, 2*Math.PI], true, _self.color[1]);
    }});

    LTweenLite.to(_self.bullet,_self.Time,{delay:_self.delay+.2,coordinate:_self.pointList,ease:LEasing.Cubic.easeIn,onComplete:function(event){
        if(_self.shotType == 'scoreShot'){
            if(_self.shotData.isDie){
                addEff(3,_self.starObj.pointerX,_self.starObj.pointerY);
            }
            shotArr.push(_self);
            if(isFirst){
                showText();
                isFirst = false;
            }
        }
        //fire begin
        var tempX = _self.radius*Math.cos(_self.delT),
            tempY = _self.radius*Math.sin(_self.delT);
        var particles = [];
        var particle_count = 40;
        for(var i = 0; i < particle_count; i++) {
            particles.push(new particle(tempX,tempY,_self.colorRgb[0]));
        }
        setTimeout(function(){
            LTweenLite.to(_self.bullet,1.2,{ease:Sine.easeIn,onUpdate:function(event){
                _self.bullet.graphics.clear();
                _self.bullet.blendMode = LBlendMode.LIGHTER;
                //fire begin
                for(var i = 0; i < particles.length; i++)
                {
                    var p = particles[i];
                    p.opacity = Math.round(p.death/p.life*100)/100;
                    var gradient = LGlobal.canvas.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
                    gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
                    gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
                    gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
                    _self.bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [p.location.x,p.location.y, p.radius, 0, 2*Math.PI], true, gradient);
                    p.death--;
                    p.radius++;
                    p.location.x += (p.speed.x);
                    p.location.y -= (p.speed.y);
                }
            },onComplete:function(){
                _self._destroy(obj,_self.bullet);
                
            }});
        },100);
    }});
}

var testTime;
function showText(){
    if(testTime) clearTimeout(testTime);
    var fSzie = browser_width/1920*20;
    if(shotArr.length){
        var childNum = $(".barrageBox li").length;
        if(childNum>=3){
            $(".barrageBox li").eq(0).remove();
            var textN = $(".barrageBox li");
            for(var i=0; i<textN.length; i++){
                var textObj = $(textN[i]);
                var t = textObj.position().top;
                textObj.transition({ y: -((3-i-1)*1.25*fSzie+fSzie)+'px' });
            }
        }
        
        var tempPlay=shotArr[0].shotData.playerID;
        var player = db.players.find({'playerID':tempPlay})[0];
        if(typeof(player) != 'undefined'){
            player.score = shotArr[0].shotData.score;
            db.players.update(player);
        }
        
        var pList = db.player_nodes.data();
        htmlArr = '';
        $.each(pList,function(i,v){
            htmlArr+='<li><div class="perBg" style="width:'+v.score/totalScore * 100+'%;"></div><span class="sort">'+(i+1)+'</span><span class="userid '+v.code+'">'+v.playerID+'</span><span class="score">'+v.score+'</span></li>';
        });
        /*$(".J_sortList").html("");
        $.each($(htmlArr),function(j,k){
            if(j<pageSize){
                $(".J_sortList").append(k);
            }
        });*/
        var TS = shotArr[0];

        if(TS.textHidden == 1){
            TS.textHidden = 0;
            $(".barrageBox ul").append(TS.text);
            var objs = $(".barrageBox li");
            var lastObj = objs.eq(objs.length-1);
            var tempTop = lastObj.position().top;
            var tempNum = $(".barrageBox li").length;
            var spans = lastObj.find('.lim110');
            $.each(spans,function(m,n){
                var sW = $(n).width();
                if(sW > 100){
                    var sText = $(n).text().substr(0,2) + '***' + $(n).text().substr(-2,2);
                    $(n).text(sText);
                }
            })
            
            lastObj.transition({ y: -((3-tempNum)*1.25*fSzie+fSzie)+'px' });
            shotArr.shift();
        }
    }
    testTime = setTimeout(showText,2000);
}

shot.prototype._destroy = function(obj,bullet){
    var _self = this;
    setTimeout(function(){
        bullet.graphics.clear();
        obj.view.removeChild(bullet);
    },100);
}

function particle(tempX,tempY,rgb) {
    this.speed = {x: -1+Math.random()*2, y: -1+Math.random()*3};
    this.location = {x: tempX, y:tempY};
    this.radius = .5+Math.random()*1;
    this.life = 10+Math.random()*10;
    this.death = this.life;
    this.r = rgb.r;
    this.g = Math.round(Math.random()*rgb.g);
    this.b = rgb.b;
}

function dbStuff(){
    var sortHelpers = {
      // SORTING
      // sort descending by count and ascending by alphabet
      descCountAscCountry: function (a, b) {
        return b.count > a.count ? 1 : b.count < a.count ? -1 : a.country < b.country ? 1 : b.country < a.country ? -1 : 0;
      },
      descCountAscService: function (a, b) {
        return b.count > a.count ? 1 : b.count < a.count ? -1 : a.service < b.service ? 1 : b.service < a.service ? -1 : 0;
      },
      descScoreAscPlyerID: function (a, b) {
        return b.score > a.score ? 1 : b.score < a.score ? -1 : a.playerID < b.playerID ? 1 : b.playerID < a.playerID ? -1 : 0;
      }
    };

    var db = new loki('loki.json'),
        players = db.addCollection('players');

    var player_nodes = players.addDynamicView('player_nodes');
    player_nodes.applyFind({'count': {'$gt': 0}});
    player_nodes.applySort(sortHelpers.descScoreAscPlyerID);

    var dbStuff = {
        players:players,
        player_nodes:player_nodes,
        clearData: function (){
            players.data.forEach(function (player){
                player.count = 0;
                players.update(player);
            })
        }
    };
    return dbStuff;
}

var planeArr=[],db = new dbStuff(),htmlArr = '',pageSize = 20,pageNum;
var autoPageChange;
var pageinterTime=10000,pagedelayTime=10000,curPageIndex=1;
var imgScale,fSzie;
function addPlane(){
    planeSprite = new LSprite();
    stageLayer.addChild(planeSprite);
    var _scale = .2;
    var plane,rand4,numX,numY,t,rotate=0;
    var totalN = 80,areaA,areaB,areaC,areaD;
    planeSprite.removeAllChild();

    LAjax.get("./demo.php",{},function(str){
        var data = JSON.parse(str);
        totalN = data.arr.length;
        imgScale = data.imgScale;
        fSzie = data.fSize;
        areaA = Math.ceil(.31 * totalN);
        areaB = Math.ceil(.31 * totalN);
        areaC = Math.ceil(.2 * totalN);
        areaD = totalN - areaA - areaB - areaC,
        htmlArr = '',
        tempHtml = '';
        var thisFsize = browser_width/1920*20;
        $.each(data.arr,function(i,v){
            for (var f = 0; f < 10; f++) {
                if(i<areaA){
                    direction = 0.3;
                    rotate=-8;
                }else if(i>=areaA && i<(areaB+areaA)){
                    direction = 0.3;
                    rotate=-8;
                }else if(i>=(areaB+areaA) && i<(areaB+areaA+areaC)){
                    rotate=-20;
                    direction = 0.1;
                }else{
                    rotate=-35;
                    direction = -0.1;
                } 
            }
            numX = parseFloat(v.px)*LGlobal.width*.5+30;
            numY = parseFloat(v.py)*(LGlobal.height-20);

            var player = {
                playerID:v.playerID,
                score:0,
                code:v.code,
                count:1
            };
            db.players.insert(player);
            htmlArr+='<li><div class="perBg" style="width:'+0+'%;"></div><span class="sort">'+(i+1)+'</span><span class="userid '+v.code+'">'+v.playerID+'</span><span class="score">'+0+'</span></li>';
            var str = '<span class="img"><img src="'+v.playerImg+'" alt=""></span><span class="playid">ID:'+v.playerID+'</span><span class="playScore">得分：<i class="J_score">0</i></span><span class="playInfo">介绍：'+v.playerInfo+'</span>';
            //var shot = Math.floor(Math.random()*2);
            //var tar = Math.floor(Math.random()*7);
            //var attackData = {"isShot":1,"target":v.target};
            t = new Plane();
            t.Init(numX,numY,str,rotate,direction,v.code,v.playerID,imgScale);
            planeArr.push(t);
            planeSprite.addChild(t.view);
            planeSprite.addChild(t.imgLayer);
            //planeSprite.addChild(t.view2);
        });
        $(".J_sortList").html("");
        $.each($(htmlArr),function(j,k){
            if(j<pageSize){
                $(".J_sortList").append(k);
            }
        });
        pageNum = Math.ceil(totalN/pageSize);
        $(".J_pageCode").createPage({
            pageCount:Math.ceil(totalN/pageSize),
            current:1,
            backFn:function(p){
                clearInterval(autoPageChange);
                curPageIndex = parseInt($(".J_pageCode .current").text());
                $(".J_sortList").html("");
                var SN = (curPageIndex-1) * pageSize,
                    EN = SN + pageSize,
                    Hobj = $(htmlArr);
                $.each(Hobj,function(i,v){
                    if(i>=SN && i<EN){
                        $(".J_sortList").append(v);
                    }
                })
                autoChangePageAgain(pageNum);
            }
        });

        autoChangePageAgain(pageNum);

        planeShot();
        scoreShot();
    });
}

function changeToPage(num){
    $(".J_sortList").html("");
    var SN = (num-1) * pageSize,
        EN = SN + pageSize,
        Hobj = $(htmlArr);
    $.each(Hobj,function(i,v){
        if(i>=SN && i<EN){
            $(".J_sortList").append(v);
        }
    });
    
    args = {'current':num,'pageCount':pageNum};
    obj = $('.J_pageCode');
    obj.empty();
    //上一页
    if(args.current > 1){
        obj.append('<a href="javascript:;" class="prevPage">上一页</a>');
    }else{
        obj.remove('.prevPage');
        obj.append('<span class="disabled">上一页</span>');
    }
    //中间页码
    if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
        obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
    }
    if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
        obj.append('<span>...</span>');
    }
    var start = args.current -2,end = args.current+2;
    if((start > 1 && args.current < 4)||args.current == 1){
        end++;
    }
    if(args.current > args.pageCount-4 && args.current >= args.pageCount){
        start--;
    }
    for (;start <= end; start++) {
        if(start <= args.pageCount && start >= 1){
            if(start != args.current){
                obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
            }else{
                obj.append('<span class="current">'+ start +'</span>');
            }
        }
    }
    if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
        obj.append('<span>...</span>');
    }
    if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
        obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
    }
    //下一页
    if(args.current < args.pageCount){
        obj.append('<a href="javascript:;" class="nextPage">下一页</a>');
    }else{
        obj.remove('.nextPage');
        obj.append('<span class="disabled">下一页</span>');
    }
}
//清除定时器时候的重置定时器--封装
function autoChangePageAgain(pageNum){
    autoPageChange = setInterval(function(){ 
      if(curPageIndex < pageNum){ 
        curPageIndex ++; 
      }else{ 
        curPageIndex = 1;
      }
      changeToPage(curPageIndex);
    },pageinterTime);
}

var shotInfo,scoreShotInfo;
var shotArr = [],isFirst = true;
//showText();
function scoreShot(){
    if(scoreShotInfo) clearTimeout(scoreShotInfo);
    LAjax.get("./scoreAttack.php",{},function(str){
        var data = JSON.parse(str);
        scoreShotCallback(data);
    });
    scoreShotInfo = setTimeout(scoreShot, 3500); 
}
function scoreShotCallback(data){
    //var html = '';
    $.each(data,function(i,v){
        $.each(planeArr,function(j,k){
            if((planeArr[j] != 'undefined' && planeArr[j] !='' && planeArr[j] != null) && planeArr[j].name == v.playerID){
                planeArr[j].score = v.score;
                if(v.isShot == 0){
                    var tempData = {};
                    var scoreShot;
                    tempData.tag = 'scoreShot';
                    $.each(starArr,function(key,val){
                        if(val.id == v.target){
                            tempData.target = starArr[key];
                        }
                    });
                    tempData.target || (tempData.target = starArr[0]);
                    //tempData.target = v.target;
                    tempData.score = v.score;
                    tempData.playerID = v.playerID;
                    tempData.grade = v.grade;
                    tempData.isDie = v.isDie;
                    (starArr[v.target] != 'undefined' && starArr[v.target] !='' && starArr[v.target] != null) && starArr[v.target].Lbit.alpha && (scoreShot = new shot(planeArr[j],tempData));
                }
            }
        })
        //(planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (planeArr[i].score = v.score);
        
    });
}
function planeShot(){
    if(shotInfo) clearTimeout(shotInfo);
    LAjax.get("./shot.php",{},function(str){
        var data = JSON.parse(str);
        shotCallback(data);
    });
    shotInfo = setTimeout(planeShot, 3500);   
}
function shotCallback(data){
    $.each(data,function(i,v){
        if(v.isShot == 0){
            var planeShot;
            var tempData = {};
            tempData.tag = 'shot';
            $.each(starArr,function(key,val){
                if(val.id == v.target){
                    tempData.target = starArr[key];
                }
            });
            tempData.target || (tempData.target = starArr[0]);
            tempData.playerID = v.playerID;

            (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (starArr[v.target] != 'undefined' && starArr[v.target] !='' && starArr[v.target] != null) && starArr[v.target].Lbit.alpha && (planeShot = new shot(planeArr[i],tempData));
        }
    });
}

/**
 * 添加所有星球对象
 * */
var starArr=[],specialStar=0;
function addStar(){
    linkSprite = new LSprite();
    stageLayer.addChild(linkSprite);

    starSprite = new LSprite();
    stageLayer.addChild(starSprite);

    initStar();
    
    updateStar();

    //playStar();
}
function initStar(){
    var fs = document.getElementsByTagName('html')[0].style.fontSize;
    var tempL = 250;
    var tempLL = 16.95*parseFloat($.trim(fs.replace('px','')))-250;
    var tempW = (browser_width-tempL)*0.4;
    var tempH = browser_heidth*0.5;
    var tempB = 50;
    var baseX = LGlobal.width * 0.6,
        baseY = LGlobal.height * 0.5;
    
    $('.circlesBgBox').css({'width':tempW,'height':tempH,'left':baseX+tempL,'top':baseY});

    LAjax.get("./stars.json",{},function(str){
        var data = JSON.parse(str);
        if(typeof data.stars != 'undefined'){
            var stars = data.stars;
            var circles = data.circles;
            $.each(stars,function(i,v){
                numX = baseX-tempLL+v.X*browser_width;
                numY = baseY-4.25*parseFloat($.trim(fs.replace('px','')))+v.Y*browser_heidth;
                t = new Star();
                var tempStar = {};
                tempStar.imgNum = v.imgNum;
                tempStar.id = v.id;
                //tempStar.links = v.links;
                tempStar.isSpecial = false;
                tempStar.vmdisk_id = v.vmdisk_id;
                if(v.name == data.special_star.name){
                    tempStar.isSpecial = true;
                    specialStar = i-1;
                }
                tempStar.name = v.name;
                t.Init(numX,numY,tempStar);
                starArr.push(t);
                starSprite.addChild(t.view);
            });
            var circleObj = $('.circlesBgBox .circle');
            $.each(circleObj,function(j,k){
                $(k).css({'width':circles[j].width*100+'%','height':circles[j].height*100+'%','top':(1-circles[j].height)/2*100+'%','left':(1-circles[j].width)/2*100+'%','transform':'rotateX('+circles[j].rotateX+'deg) rotateY('+circles[j].rotateY+'deg)'});
            });
            if(typeof data.special_star != 'undefined' && data.special_star!=''){
                var tempHour = data.special_star.hour.length ? parseFloat(data.special_star.hour) : 0,
                    tempMin = data.special_star.minute.length ? parseFloat(data.special_star.minute) : 0,
                    tempSec = data.special_star.second.length ? parseFloat(data.special_star.second) : 0;
                var tc = tempHour * 3600 + tempMin * 60 + tempSec;
                showSpecialStar(tc);
            }
            //tempH = tempW/data.border.width * data.border.height;
            //$('.circlesBgBox').css({'width':tempW,'height':tempH,'left':baseX+tempL,'top':baseY,'border':'1px #ffffff solid'});
        }
        //linkStar();
    });
}
var showStarTime;
function showSpecialStar(tc)
{
    var endTime= new Date(timeCount);
    var nowTime = new Date();
    var t =endTime.getTime() - nowTime.getTime();
    var se = 0;
    if(t>0){
        se=Math.floor(t/1000);
    }
    if(tc>se){
        starArr[specialStar].Lbit.alpha = 1;
        clearTimeout(showStarTime);
    }else if(tc == se){
        var obj = starArr[specialStar].Lbit;
        var sacleO = obj.scaleX;
        LTweenLite.to(obj,0.2,{alpha:1,scaleX:obj.scaleX+.1,scaleY:obj.scaleY+.1,ease:Sine.easeOut})
        .to(obj,0.2,{scaleX:sacleO,scaleY:sacleO,ease:Sine.easeIn});
        clearTimeout(showStarTime);
    }else{
        showStarTime = setTimeout(showSpecialStar,1000,[tc]);
    }  
}
var starInfo;
function updateStar(){
    if(starInfo) clearTimeout(starInfo);
    LAjax.get("./starInfo.php",{},function(str){
        var data = JSON.parse(str);
        $.each(data,function(i,v){
            var str = '<div class="starInfoTitle"><i>'+v.statTitle+'</i><span class="infoBtn active J_starInfoBtn" data-cont="starInfoBox"></span></div><div class="starInfoCont"><div class="tBox tStarBox"><ul><li><span class="flag CN"></span><span class="title">'+v.first+'</span></li><li><span class="flag CN"></span><span class="title">'+v.second+'</span></li><li><span class="flag CN"></span><span class="title">'+v.third+'</span></li></ul></div></div>';

            typeof(starArr[i])!="undefined" && starArr[i].UpdateInfo(str,i);
        });
    });
    starInfo = setTimeout(updateStar, 1000);
}
var curIndex = 0, 
    imgLen = $(".starInfoBox").length; 
var loopTime;
var autoChange;
/**
* @interTime 星球信息弹出框切换时间
* @delayTime 重复轮播间时间间隔
**/
/*var interTime=15000,delayTime=120000;
var firstChange = setTimeout(function(){
    $(".starInfoBox").removeClass("open").eq(0).css({'opacity':1}).addClass("open");
    autoChangeAgain();
},3000);*/

function changeTo(num){ 
    var obj = $(".starInfoBox");
    obj.removeClass("open");
    obj.eq(num).css({'opacity':1}).addClass("open");
}
//清除定时器时候的重置定时器--封装
function autoChangeAgain(){
    if(loopTime) clearTimeout(loopTime);
    if(curIndex == 0){
        $(".starInfoBox").removeClass("open").eq(0).css({'opacity':1}).toggleClass("open");
    }
    autoChange = setInterval(function(){ 
      if(curIndex < imgLen){ 
        curIndex ++; 
        changeTo(curIndex);
      }else{ 
        curIndex = 0;
        clearInterval(autoChange);
        $(".starInfoBox").eq(imgLen-1).removeClass("open");
        loopTime = setTimeout(autoChangeAgain,delayTime);
      }
    },interTime);
}

function Star(){
    this.view = new LSprite();
    this.infoBox = '';
    this.isFirstShake = true; 
    this.del = 0;
    this.tween;
}
Star.prototype.Init = function(numX,numY,tempStar){
    LMultitouch.inputMode = LMultitouchInputMode.TOUCH_POINT;
    this.starData = tempStar;
    this.id = this.starData.vmdisk_id-1;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width > 1280 && width < 1366){
        this._scale = 0.2;
    }else if(width >= 1366 && width < 1920){
        this._scale = 0.3;
    }else if(width = 1920){
        this._scale = 0.4;
    }else if(width > 1920){
        //this._scale = 0.5;
    }

    this.Lbit = new MiddleBitmap(new LBitmapData(dataList["star" + this.starData.imgNum]));
    this.Lbit.scaleX = this.Lbit.scaleY = this._scale;
    this.pointerX = numX;
    this.pointerY = numY;
    this.Lbit.x = numX;
    this.Lbit.y = numY;
    this.Lbit.alpha = 1;
    if(this.starData.isSpecial){
        this.Lbit.alpha = 0;
    }

    this.view.addChild(this.Lbit);
    this.view.name = 'star'+ this.starData.id;
    this.view.useCursor="pointer";

    //this.links = this.starData.links;

    var _star = this;
    var fs = document.getElementsByTagName('html')[0].style.fontSize;
    var tempL = 12.5*parseFloat($.trim(fs.replace('px','')));
    var pX = _star.pointerX + tempL,
        pY = _star.pointerY,
        sW = _star.Lbit.getWidth(),
        sH = _star.Lbit.getHeight();
    var IW = $("#starInfo"+(_star.starData.id-1)).width(),
        IH = $("#starInfo"+(_star.starData.id-1)).height();
    $("#starInfo"+(_star.starData.id-1)).css({'top':pY-sH*.38,'left':pX-sW*.5-IW*.5});
    this.view.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
        _star.dragging = true;
        _star.isdrag = false;   
        _star.data = event;  
    });
    this.view.addEventListener(LMouseEvent.MOUSE_MOVE, function(event){
        if(_star.dragging){
            var newposition = new LPoint(_star.data.offsetX,_star.data.offsetY);
            var r = Math.sqrt((newposition.x - event.offsetX) * (newposition.x - event.offsetX) + (newposition.y - event.offsetY) * (newposition.y - event.offsetY));
            if(r > 14){
                //_star.isdrag = true; 
                //event.clickTarget.startDrag(event.touchPointID);
                //_star.pointerX = event.offsetX;
                //_star.pointerY = event.offsetY;
            }
        }
    });
    this.view.addEventListener(LMouseEvent.MOUSE_UP, function(event){
        _star.dragging = false;
        _star.data = null;
        //event.clickTarget.stopDrag();
        if(_star.isdrag){
            linkStar();
        }else{
            //clearInterval(autoChange);
            //curIndex = _star.starData.id-1;
            $("#starInfo"+(_star.starData.id-1)).siblings().removeClass("open");
            $("#starInfo"+(_star.starData.id-1)).css({'opacity':1}).toggleClass("open");
            //changeTo(curIndex);
            //autoChangeAgain();
        }
    });
}
Star.prototype.UpdateInfo = function(str,n){
    this.infoBox=str;
    $("#starInfo"+n).html(this.infoBox);
}

Star.prototype.Shake = function(plane){  
    this.tween = LTweenLite.to(this.Lbit,0.3,{delay:0,scaleX:this._scale+0.03,scaleY:this._scale+0.03,x:this.pointerX+15,ease:Elastic.easeOut})
    .to(this.Lbit,0,{scaleX:this._scale,scaleY:this._scale,x:this.pointerX,ease:Sine.easeIn});
    this.del+=1;
}

function linkStar(){
    linkSprite.graphics.lineWidth(2);
    linkSprite.graphics.strokeStyle("#ffffff");
    for(var i = 0;i<starArr.length;i++){
        var star = starArr[i];
        if(typeof(star.links.length) !='undefined'){
            $.each(star.links,function(n,k){
                var target = starSprite.getChildByName('star'+k).childList[0];
                linkSprite.graphics.beginPath();
                linkSprite.graphics.moveTo(star.pointerX,star.pointerY);
                linkSprite.graphics.lineTo(target.x,target.y);
                linkSprite.graphics.stroke();
            })
        }
    }
}

function isNotTooCloseFromOthers(e,t,num,arr){
    var n;
    var r;
    var i;
    var s = num * num;
    var o;
    var u = arr.length;
    for (o = 0; o < u; o++) {
        dot = arr[o];
        n = e - dot.Lbit.x;
        r = t - dot.Lbit.y;
        i = n * n + r * r;
        if (i < s) {
            return false
        }
    }
    return true
};
    
/**
 * 将LBitmap对象的中心放到一个对象的原点，并返回这个对象
 * */
function MiddleBitmap(bitmapData){
    var self = this;
    base(self,LSprite,[]);
    self.bitmapTitle = new LBitmap(bitmapData);
    self.bitmapTitle.x = -self.bitmapTitle.getWidth()*0.5;
    self.bitmapTitle.y = -self.bitmapTitle.getHeight()*0.5;
    self.t = 0;
    self.p0 = {x:0,y:0};
    self.p1 = {x:700,y:200};
    self.p2 = {x:200,y:200};
    self.p3 = {x:200,y:20};
    self.addChild(self.bitmapTitle);
}

function addEff(index,x,y){
    var eff = new Effect(index);
    eff.x = x;
    eff.y = y;
    stageLayer.addChild(eff);
}
/**
 * 特效类，特效图片加入后，特效显示完毕之后自动消失
 * */
function Effect(index){
    var self = this;
    base(self,LSprite,[]);
    var bitmapData;
    switch(index){
        case 0:
            bitmapData = new LBitmapData(dataList["effects"],99,45,116,96);
            break;
        case 1:
            bitmapData = new LBitmapData(dataList["effects"],102,278,110,88);
            break;
        case 2:
            bitmapData = new LBitmapData(dataList["effects"],357,85,122,127);
            break;
        case 3:
            bitmapData = new LBitmapData(dataList["effects"],346,357,108,99);
            break;
        case 4:
            bitmapData = new LBitmapData(dataList["effects"],246,918,57,62);
            break;
    }
    self.item = new MiddleBitmap(bitmapData);
    self.item.scaleX = self.item.scaleY = 0.1;
    self.item.blendMode = LBlendMode.LIGHTER;
    self.addChild(self.item);
    
    LTweenLite.to(self.item,0.4,{scaleX:2,scaleY:2,ease:Quad.easeInOut})
    .to(self.item,0.7,{scaleX:3,scaleY:3,alpha:0,ease:Quad.easeInOut,onComplete:function(obj){
        var eff = obj.parent;
        eff.parent.removeChild(eff);
    }});
}