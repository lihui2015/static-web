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
    mLeft = 250,
    mTop = browser_width / 1920 * 20 * 7 + browser_width * 258 / 1920;

var isClick = false;
var colorArr = [['#1552a8','#24add8'],['#d48d1a','#f2e18d'],['#ab230f','#fba093'],['#361a9c','#a087fd']];
var colorRgb1 = [[{'r':21,'g':82,'b':168},{'r':36,'g':173,'b':216}],[{'r':212,'g':141,'b':26},{'r':242,'g':225,'b':141}],[{'r':171,'g':35,'b':15},{'r':251,'g':160,'b':147}],[{'r':54,'g':26,'b':156},{'r':160,'g':135,'b':253}]];
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
    this.clickEffect.scaleX = this.clickEffect.scaleY = 0.2;
    this.clickEffect.x = numX-this.Lbit.getWidth() * .5;
    this.clickEffect.y = numY + this.Lbit.getHeight()*.8;
    this.clickEffect.alpha = 1;
    this.view.addChild(this.clickEffect);
    //planeSprite.addChild(this.clickEffect);

    this.textInfo = new LTextField();
    this.textInfo.setWordWrap(true,30);
    this.textInfo.htmlText = "<font face='Arial' color=\"#ffffff\" size='10'>"+name+"</font>";
    this.textInfo.scaleX = this.textInfo.scaleY = this._scaleP ;
    this.textInfo.x = numX-this.Lbit.getWidth() * .6 + this.clickEffect.getWidth();
    this.textInfo.y = numY +  this.Lbit.getHeight()*.85 + 2;
    this.textInfo.textBaseline = "alphabetic";
    planeSprite.addChild(this.textInfo);

    var _plane = this;

    this.imgLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
        var player = db.players.find({'playerID':name})[0];
        if(typeof(player) != 'undefined'){
            $(".J_score").html(player.score);
        }
        //$("#infoCont").find(".cont").html(_plane.infoBox).end().toggleClass("open");
        //$(".J_infoBtn").toggleClass("active");
        var fs = document.getElementsByTagName("html")[0].style.fontSize;
        var tempFS = parseFloat(fs.replace(/px/,""));
        var pX = numX + 6 * tempFS - 40,
            pY = numY + 6 * tempFS - 15;
            console.log(pX);
            console.log(_plane.Lbit.x);
        $(".J_circle").hasClass('active')?$(".J_circle").css({'top':pY,'left':pX}):$(".J_circle").toggleClass("active").css({'top':pY,'left':pX});
        getSingleInfo(player);
    });
}
/**
 * 获取单个飞机信息
 */
function getSingleInfo(player){
    $.getJSON('./json/singlePlanetInfo.php', {playerID:player.playerID}, function(data) {
        var myData = [data.abality1, data.level, data.ATK, data.abality2, data.abality3, data.abality4, data.abality5];
        var DATA = {
            labels : ["能力1","等级","攻击力","能力2","能力3","能力4","能力5"],
            datasets : [
                {
                    fillColor : "rgba(92,187,241,0.5)",
                    strokeColor : "rgba(92,187,241,0.7)",
                    pointStrokeColor : "#fff",
                    data : myData
                }
            ]
        }        
        new Chart(ctx).Radar(DATA, options);
        $('.J_name').html(data.playerID);
        $('.J_score').html(data.score);
        $('.tab').eq(2).html('排名：第'+data.ranking);
    });
}

function shot(obj,data){
    this.bullet = new LSprite();
    obj.view.addChild(this.bullet);
    this.delay = (Math.floor(Math.random()*4) + 1) * .3;
    this.starObj = typeof(starArr[data.target]) != "undefined" ? starArr[data.target] : starArr[0];
    this.p0 = {x:obj.pointX + obj.Lbit.getWidth()*0.8,y:obj.pointY + obj.Lbit.getHeight()*obj.direction};
    this.p1 = {x:this.starObj.pointerX,y:this.starObj.pointerY};
    this.delT = Math.atan2(this.p1.y - this.p0.y, this.p1.x - this.p0.x);
    this.radius = 100;
    this.color = colorArr[obj.rand4-1];
    this.colorRgb = colorRgb1[obj.rand4-1];
    this.shotData = data;
    if(data.tag == 'scoreShot'){
        this.radius = 260;
        this.color = ['#d8b200','#ffe154'];
        this.colorRgb = [{'r':216,'g':178,'b':0},{'r':255,'g':225,'b':84}];

        this.tempText = new LTextField();
        //this.tempText.setWordWrap(false);
        //this.tempText.width = 500;
        this.tempText.font = 'Microsoft Yahei';
        this.tempText.color = '#ffffff';
        this.tempText.textAlign = 'center';
        this.tempText.size = 18;

        this.tempText.text = "战队"+this.shotData.playerID+" 攻击战队"+this.starObj.starData.name+" 成功，成功获得"+this.shotData.grade+" 分";
        this.tempText.scaleX = this.tempText.scaleY = 1;
        //this.tempText.x = this.starObj.pointerX;
        //this.tempText.y = this.starObj.pointerY-50;
        //this.tempText.x = LGlobal.width - this.tempText.width - 200;
        this.tempText.x = LGlobal.width *.5;
        this.tempText.y = 60;
        this.tempText.textBaseline = "alphabetic";
        this.tempText.alpha = 1;

        if(this.shotData.isDie){
            this.color = ['#be0000','#ff0000'];
            this.colorRgb = [{'r':190,'g':0,'b':0},{'r':255,'g':0,'b':0}];
            this.tempText.size = 18;
            this.tempText.weight = "bolder";
            this.tempText.color = "#ffffff";
            this.tempText.text = "战队"+this.shotData.playerID+" 成功击败战队"+this.starObj.starData.name+" ，成功获得"+this.shotData.grade+" 分";
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
    if(shotArr.length){
        textSprite.removeAllChild();

        var TS = shotArr[0].tempText;
        if(TS.y>15){
            textSprite.addChild(TS);
            LTweenLite.to(TS,.5,{y:TS.y -45,alpha:1,ease:Sine.easeIn,onComplete:function(e){
                shotArr.shift();
            }});
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

var planeArr=[],db = new dbStuff(),htmlArr = '',pageSize = 25;
function addPlane(){
    textSprite = new LSprite();
    stageLayer.addChild(textSprite);
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
            numX = parseFloat(v.px)*LGlobal.width*.5;
            numY = parseFloat(v.py)*LGlobal.height;

            var player = {
                playerID:v.playerID,
                score:0,
                code:v.code,
                count:1
            };
            db.players.insert(player);
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
        var resultset=db.players.chain().find({'count': {'$gt': 0}});
        var list=resultset.compoundsort(['score',true]).offset(0).limit(3).data(); 
        var sortObj = $(".seniorList li");
        $.each(sortObj,function(j,k){
            $(k).find('.flag_logo').attr('src','./images/flag/'+list[j].code+'.png');
            $(k).find('.name').html(list[j].playerID);
        })
        playerSort();
        planeShot();
        scoreShot();
    });
}
var playerSortID;
function playerSort(){
    var sortObj = $(".seniorList li");
    if(playerSortID) clearTimeout(playerSortID);
    LAjax.get("./playerSort.php",{},function(str){
        var data = JSON.parse(str);
        $.each(sortObj,function(i,k){
            $(k).find('.flag_logo').attr('src','./images/flag/'+data[i].code+'.png');
            $(k).find('.name').html(data[i].playerID);
        })
    });
    playerSortID = setTimeout(playerSort, 2000);   
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
        (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (planeArr[i].score = v.score);
        if(v.isShot == 0){
            var tempData = {};
            var scoreShot;
            tempData.tag = 'scoreShot';
            tempData.target = v.target;
            tempData.score = v.score;
            tempData.playerID = v.playerID;
            tempData.grade = v.grade;
            tempData.isDie = v.isDie;
            (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (scoreShot = new shot(planeArr[i],tempData));
        }
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
            tempData.target = v.target;
            tempData.playerID = v.playerID;

            (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (planeShot = new shot(planeArr[i],tempData));
        }
    });
}

/**
 * 添加所有星球对象
 * */
var starArr=[];
function addStar(){
    linkSprite = new LSprite();
    stageLayer.addChild(linkSprite);

    starSprite = new LSprite();
    stageLayer.addChild(starSprite);

    initStar();
    
    updateStar();
}
function initStar(){
    var baseX = LGlobal.width * 0.62,
        baseY = 150;
    LAjax.get("./stars.json",{},function(str){
        var data = JSON.parse(str);
        $.each(data,function(i,v){
            numX = baseX+v.X*browser_width;
            numY = baseY+v.Y*browser_heidth;
            t = new Star();
            var tempStar = {};
            tempStar.imgNum = v.imgNum;
            tempStar.id = v.id;
            tempStar.links = v.links;
            tempStar.name = v.name;
            tempStar.text = v.text;
            t.Init(numX,numY,tempStar);
            starArr.push(t);
            starSprite.addChild(t.view);
        });
        //linkStar();
    })
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
    //starInfo = setTimeout(updateStar, 1000);
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
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(width < 1280){
        this._scale = 0.2;
    }else if(width > 1280 && width < 1366){
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
    this.pointerX = numX-this.Lbit.getWidth()*.5;
    this.pointerY = numY-this.Lbit.getHeight()*.5;
    this.Lbit.x = numX-this.Lbit.getWidth()*.5;
    this.Lbit.y = numY-this.Lbit.getHeight()*.5;
    this.Lbit.alpha = 1;
    this.view.addChild(this.Lbit);
    this.view.name = 'star'+ this.starData.id;
    this.view.useCursor="pointer";
    this.links = this.starData.links;

    this.textInfo = new LTextField();
    this.textInfo.setWordWrap(false);
    this.textInfo.htmlText = "<font face='Microsoft Yahei' color=\"#ffffff\" size='16'>"+this.starData.text+"</font>";
    this.textInfo.scaleX = this.textInfo.scaleY = 1;
    this.textInfo.x = numX-this.Lbit.getWidth() * .5;
    this.textInfo.y = numY - 15;
    this.textInfo.textAlign = 'center';
    this.textInfo.textBaseline = "alphabetic";
    this.view.addChild(this.textInfo);

    var _star = this;
    var fSize = browser_width/1920*20;
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
            var pX = _star.pointerX + 0,
                pY = _star.pointerY + 0;
            $("#starInfo"+(_star.starData.imgNum-1)).siblings().removeClass("open");
            $("#starInfo"+(_star.starData.imgNum-1)).css({'opacity':1,'top':pY+6.5*fSize-8*fSize,'left':pX-6*fSize-_star.Lbit.getWidth()*.5}).toggleClass("open");
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

function bezierCurve(t, p0, p1){
        return p0 * (1-t) + p1 * t;
    }
function bezierCurve1(t, p0, p1, p2){
        return p0 * Math.pow(1-t, 2) + 2 * p1 * t * Math.pow(1-t, 1) + p2 * Math.pow(t, 2);
    }
function bezierCurve2(t, p0, p1, p2, p3){
        return p0 * Math.pow(1-t, 3) + 3 * p1 * t * Math.pow(1-t, 2) + 3 * p2 * Math.pow(t, 2) * (1-t) + p3 * Math.pow(t, 3);
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


//右下角蛛网图
    var canvas = document.getElementById("radar");
    var ctx = canvas.getContext("2d");
    var data = {
        labels : ["能力1","等级","攻击力","能力2","能力3","能力4","能力5"],
        datasets : [
            {
                // 填充颜色
               fillColor : "rgba(92,187,241,0.5)",
　　　　　　　　 // 线的颜色
               strokeColor : "rgba(92,187,241,0.7)",
　　　　　　　 　// 点的边线颜色
               pointStrokeColor : "#fff",
              data : [65,100,200,120,20,90,40]
            }
        ]
    }   

    var options = {
        scaleShowLine : true,
        scaleOverlay : true,
        scaleOverride : true,
        scaleLineColor : "rgba(255,255,255,.2)",
        pointLabelFontColor : "#fff",
        // y轴刻度的个数
        scaleSteps : 1,
        // y轴每个刻度的宽度
         scaleStepWidth : 50,
        // y轴的起始值
        scaleStartValue : null,
        // x轴y轴的线宽    
        scaleLineWidth : 1, 
        scaleFontColor : "#fff",
        // 是否显示点
        pointDot : false,
        // 点的半径
        pointDotRadius : 3,
        // 点的线宽
        pointDotStrokeWidth : 1,
        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,
        // 数据线的线宽
        datasetStrokeWidth : 2,
        // 数据线是否填充颜色
        datasetFill : true,
        // 是否显示角度线
        angleShowLineOut : true,
        // 角度线的颜色
        angleLineColor : "rgba(255,255,255,.2)",
        // 角度线的线宽
        angleLineWidth : 1,            
    
    }
var myNewChart = new Chart(ctx).Radar(data, options);