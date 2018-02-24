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
    mLeft = 252,
    mTop = 86 + 50;
var isClick = false;
var colorArr = [['#1552a8','#24add8'],['#d48d1a','#f2e18d'],['#ab230f','#fba093'],['#361a9c','#a087fd']];
var colorRgb1 = [[{'r':21,'g':82,'b':168},{'r':36,'g':173,'b':216}],[{'r':212,'g':141,'b':26},{'r':242,'g':225,'b':141}],[{'r':171,'g':35,'b':15},{'r':251,'g':160,'b':147}],[{'r':54,'g':26,'b':156},{'r':160,'g':135,'b':253}]];
var colorRgb = [[{'r':36,'g':173,'b':216},{'r':21,'g':82,'b':168}],[{'r':212,'g':141,'b':26},{'r':242,'g':225,'b':141}],[{'r':206,'g':26,'b':0},{'r':251,'g':160,'b':147}],[{'r':160,'g':135,'b':253},{'r':54,'g':26,'b':156}]];

LInit(50,"targetCanvas",browser_width-252,browser_heidth-mTop,main);
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
Plane.prototype.Init = function(numX,numY,str,rotate,direction,code,name){
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
    //this.data = data;
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
    this.clickEffect.scaleX = this.clickEffect.scaleY = 0.12;
    this.clickEffect.x = numX-this.Lbit.getWidth() * .5;
    this.clickEffect.y = numY + this.Lbit.getHeight()*.8;
    this.clickEffect.alpha = 1;
    this.view.addChild(this.clickEffect);
    //planeSprite.addChild(this.clickEffect);

    this.textInfo = new LTextField();
    this.textInfo.setWordWrap(true,30);
    this.textInfo.htmlText = "<font face='Arial' color=\"#ffffff\" size='10'>"+name+"</font>";
    this.textInfo.scaleX = this.textInfo.scaleY = .8;
    this.textInfo.x = numX-this.Lbit.getWidth() * .5 + this.clickEffect.getWidth();
    this.textInfo.y = numY +  this.Lbit.getHeight()*.8 + 2;
    this.textInfo.textBaseline = "alphabetic";
    planeSprite.addChild(this.textInfo);

    var _plane = this;

    this.imgLayer.addEventListener(LMouseEvent.MOUSE_DOWN, function(event){
        $("#infoCont").find(".cont").html(_plane.infoBox).end().toggleClass("open");
        $(".J_score").html(_plane.tempData.score);
        $(".J_infoBtn").toggleClass("active");

        var pX = numX + 250,
            pY = numY + 60 + _plane.Lbit.getHeight()*.5;
        $(".J_circle").toggleClass("active").css({'top':pY,'left':pX});
    });
    
}
Plane.prototype._shot = function(tempData){
    var _self = this;
    //_self.score = score;
    _self.shotData = tempData;
    //$(".J_score").html(_self.score);
    var bullet = new LSprite();
    bullet.name="bullet";
    _self.view.addChild(bullet);
    var i = Math.floor(Math.random()*4) + 1;
    i = .3*i;
    this.target = typeof(starArr[_self.shotData.target])!="undefined"?starArr[_self.shotData.target]:starArr[0];
    var starObj = typeof(starArr[_self.shotData.target])!="undefined"?starArr[_self.shotData.target]:starArr[0];
    //_self.target = target;
    _self.p0={x:_self.pointX + _self.Lbit.getWidth()*0.8,y:_self.pointY + _self.Lbit.getHeight()*_self.direction};
    _self.p1 = {x:starObj.pointerX,y:starObj.pointerY}

    _self.circle = new LShape();
    _self.circle.x = _self.p0.x;
    _self.circle.y = _self.p0.y;
    _self.circle.graphics.drawArc("#FF0000",1,[0,0,0,0,Math.PI*2],true,"#FF0000");
    //planeSprite.addChild(_self.circle);
    var pointList=[];
    pointList.push(_self.p0);
    //pointList.push(_self.p1);

    _self.slope = (_self.p1.y - _self.p0.y)/(_self.p1.x - _self.p0.x);
    //_self.delT = Math.atan(_self.slope);
    _self.delT = Math.atan2(_self.p1.y - _self.p0.y, _self.p1.x - _self.p0.x);
    _self.radius = 100;
    _self.color = colorArr[_self.rand4-1];
    _self.colorRgb = colorRgb1[_self.rand4-1];
    pointList.push({x:starObj.pointerX-_self.radius*Math.cos(_self.delT),y:starObj.pointerY-_self.radius*Math.sin(_self.delT)});
    this.dx = pointList[1].x - pointList[0].x;
    this.dy = pointList[1].y - pointList[0].y;
    var distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.speed = this.rand4*120 + 200;
    this.Time=distance/this.speed;

    LTweenLite.to(this.Lbit,0.4,{delay:i,alpha:1,scaleX:this._scale+0.00,scaleY:this._scale+0.00,x:_self.pointX-5,ease:Elastic.easeOut})
    .to(this.Lbit,0,{scaleX:this._scale,scaleY:this._scale,x:_self.pointX,ease:Sine.easeIn});
    var ellipseW = 20;
    var ellipseH = 1;
    var tempDelt = _self.delT;

    LTweenLite.to(_self.circle,_self.Time,{delay:i+.2,coordinate:pointList,ease:LEasing.Cubic.easeIn,onUpdate:function(event){
        bullet.graphics.clear();
        var grd = LGlobal.canvas.createLinearGradient(event.target.x,event.target.y,event.target.x+_self.radius*Math.cos(tempDelt),event.target.y+_self.radius*Math.sin(tempDelt));
        grd.addColorStop(0,_self.color[0]); 
        grd.addColorStop(1,_self.color[1]); 
        bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [event.target.x,event.target.y, _self.radius, tempDelt - Math.PI/270, tempDelt + Math.PI/270,false,true], true, grd);
        bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [event.target.x+_self.radius*Math.cos(tempDelt),event.target.y+_self.radius*Math.sin(tempDelt), 1.2, 0, 2*Math.PI], true, _self.color[1])

    },onComplete:function(event){
        _self._showText();
        bullet.graphics.clear();
        var tempX = event.target.x+_self.radius*Math.cos(tempDelt),
            tempY = event.target.y+_self.radius*Math.sin(tempDelt);
        var grd = LGlobal.canvas.createLinearGradient(event.target.x,event.target.y,event.target.x+_self.radius*Math.cos(tempDelt),event.target.y+_self.radius*Math.sin(tempDelt));
        grd.addColorStop(0,_self.color[0]); 
        grd.addColorStop(1,_self.color[1]); 
        bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [event.target.x,event.target.y, _self.radius, tempDelt - Math.PI/270, tempDelt + Math.PI/270,false,true], true, grd);
        bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [event.target.x+_self.radius*Math.cos(tempDelt),event.target.y+_self.radius*Math.sin(tempDelt), 1.2, 0, 2*Math.PI], true, _self.color[1]);
        //fire begin
        var particles = [];
        var particle_count = 40;
        if(_self.shotData.isDie == true){
            //particle_count = 500;
        }
        for(var i = 0; i < particle_count; i++) {
            particles.push(new particle(tempX,tempY,_self.colorRgb[0]));
        }

        setTimeout(function(){
            LTweenLite.to(_self.circle,1.2,{ease:Sine.easeIn,onUpdate:function(event){

                bullet.graphics.clear();
                bullet.blendMode = LBlendMode.LIGHTER;
                //LGlobal.canvas.globalCompositeOperation = "lighter";
                /*ellipseW = ellipseW + 3;
                ellipseH = ellipseH + 1;
                bullet.graphics.drawArc(2, _self.color[1], [tempX, tempY, ellipseH,0,2*Math.PI]);
                bullet.alpha = bullet.alpha*0.96;*/

                //fire begin
                for(var i = 0; i < particles.length; i++)
                {
                    var p = particles[i];
                    p.opacity = Math.round(p.death/p.life*100)/100
                    var gradient = LGlobal.canvas.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
                    gradient.addColorStop(0, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
                    gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
                    gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
                    bullet.graphics.drawArc(1, "rgba(255,255,255,0)", [p.location.x,p.location.y, p.radius, 0, 2*Math.PI], true, gradient);
                    p.death--;
                    p.radius++;
                    p.location.x += (p.speed.x);
                    p.location.y -= (p.speed.y);
                }
            },onComplete:function(){
                _self._shakeStar(event,bullet);
            }})
        },100)
    }});
}
var tween;
Plane.prototype._showText = function(){
    var _self = this;

    var tempText = new LTextField();
    //tempText.setWordWrap(false);
    //tempText.width = 500;
    tempText.color = _self.color[1];
    tempText.textAlign = 'center';
    tempText.size = 14;

    tempText.text = "战队"+_self.shotData.playerID+" 攻击战队"+_self.target.starData.name+" 成功，成功获得"+_self.shotData.grade+" 分";
    tempText.scaleX = tempText.scaleY = 1;
    tempText.x = _self.target.pointerX;
    tempText.y = _self.target.pointerY-50;
    //tempText.x = LGlobal.width - tempText.width - 200;
    //tempText.y = 160;
    tempText.textBaseline = "alphabetic";
    tempText.alpha = 1;
    if(_self.shotData.isDie){
        addEff(3,_self.target.pointerX,_self.target.pointerY);
        tempText.size = 16;
        tempText.weight = "bolder";
        tempText.color = "#ffffff";
        tempText.text = "战队"+_self.shotData.playerID+" 成功击败战队"+_self.target.starData.name+" ，成功获得"+_self.shotData.grade+" 分";
    }

    _self.view.addChild(tempText);

    LTweenLite.to(tempText,2.5,{y:_self.target.pointerY - 200,alpha:1,ease:Sine.easeIn,onComplete:function(e){
        setTimeout(function(){
            _self.view.removeChild(tempText);
        },600);
    }});
}
Plane.prototype._shakeStar=function(event,bullet){
    var _self = this;
    
    setTimeout(function(){
        bullet.graphics.clear();
        _self.view.removeChild(bullet);
        _self.circle.graphics.clear();
    },100);

    /*var str = '<p>战队'+playerid+'攻击战队B成功，成功获得20分</p>';
    var pObj = $(".barrageBox p");
    $(".barrageBox").append(str).find('p:last').css({'top':((pObj.length-1) * 1.2 + 1.5) + 'rem'}).addClass('active');

    var aObj = $(".barrageBox").find('p:last');
    aObj.animate({'top':'0'},200,'linear',function(){
        var fObj = $(".barrageBox p:first");
        fObj.remove();
    });*/

    /*var str = '<p>战队A攻击战队B成功，成功获得20分</p>';
    $(".barrageBox").append(str).find('p:last').addClass('active');
    var aObj = $(".barrageBox").append(str).find('p:last');
    LTweenLite.to(aObj,1,{top:0,ease:LEasing.Strong.easeInOut,onComplete:function(e){
        trace(e.currentTarget);
        trace(e.target);//circle
    }});

    var pObj = $(".barrageBox p");*/
   
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

function animateCircle(cir){
    LTweenLite.to(cir,1,{rotate:180,loop:true,playStyle:LTweenLite.PlayStyle.Init}).to(cir,1,{rotate:360});
}

var planeArr=[];
function addPlane(){

    planeSprite = new LSprite();
    stageLayer.addChild(planeSprite);
    var _scale = .2;
    var plane,rand4,numX,numY,t,rotate=0;
    var totalN = 80;
    var areaA = Math.ceil(.31 * totalN),
        areaB = Math.ceil(.31 * totalN),
        areaC = Math.ceil(.2 * totalN),
        areaD = totalN - areaA - areaB - areaC;

    planeSprite.removeAllChild();

    LAjax.get("./demo.php",{},function(str){
        var data = JSON.parse(str);
        totalN = data.length;
        $.each(data,function(i,v){
            for (var f = 0; f < 10; f++) {
                if(i<areaA){
                    numX = Math.random() * LGlobal.width*.21 + 18;
                    numY = Math.random() * LGlobal.height*.36+18;
                    direction = 0.3;
                    rotate=-8;
                }else if(i>=areaA && i<(areaB+areaA)){
                    numX = Math.random() * LGlobal.width*.21 + LGlobal.width*.30;
                    numY = Math.random() * LGlobal.height*.36+18;
                    direction = 0.3;
                    rotate=-8;
                }else if(i>=(areaB+areaA) && i<(areaB+areaA+areaC)){
                    numX = Math.random() * LGlobal.width*.20 + LGlobal.width*.21;
                    numY = Math.random() * LGlobal.height*.27+LGlobal.height*.43;
                    rotate=-20;
                    direction = 0.1;
                }else{
                    numX = Math.random() * LGlobal.width*.19 + 18;
                    numY = Math.random() * (LGlobal.height*.30-20)+LGlobal.height*.69;
                    rotate=-35;
                    direction = -0.1;
                }
                if (isNotTooCloseFromOthers(numX, numY,30,planeArr)) {
                    break
                }     
            }
            var str = '<span class="img"><img src="'+v.playerImg+'" alt=""></span><span class="playid">ID:'+v.playerID+'</span><span class="playScore">得分：<i class="J_score">0</i></span><span class="playInfo">介绍：'+v.playerInfo+'</span>';
            //var shot = Math.floor(Math.random()*2);
            //var tar = Math.floor(Math.random()*7);
            //var attackData = {"isShot":1,"target":v.target};
            t = new Plane();
            t.Init(numX,numY,str,rotate,direction,v.code,v.playerID);
            planeArr.push(t);
            planeSprite.addChild(t.view);
            planeSprite.addChild(t.imgLayer);
            //planeSprite.addChild(t.view2);
        })
        planeShot();
    });
}
var shotInfo;
function planeShot(){
    if(shotInfo) clearTimeout(shotInfo);
    LAjax.get("./shot.php",{},function(str){
        var data = JSON.parse(str);
        shotCallback(data);
    });
    shotInfo = setTimeout(planeShot, 3500);   
}
function shotCallback(data){
    var html = '';
    $.each(data,function(i,v){
        (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && (planeArr[i].score = v.score);
        if(i<25){
            html+='<li><div class="perBg" style="width:'+v.score/totalScore*100+'%;"></div><span class="sort">'+(i+1)+'</span><span class="userid '+v.code+'">'+v.playerID+'</span><span class="score">'+v.score+'</span></li>';
        }
        if(v.isShot == 0){

            var tempData = {};
            tempData.target = v.target;
            tempData.score = v.score;
            tempData.playerID = v.playerID;
            tempData.grade = v.grade;
            tempData.isDie = v.isDie;

            (planeArr[i] != 'undefined' && planeArr[i] !='' && planeArr[i] != null) && planeArr[i]._shot(tempData);
        }
        
    });
    $(".J_sortList").html(html);
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
    var baseX = LGlobal.width * 0.6,
        baseY = LGlobal.height * 0.5;
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
            t.Init(numX,numY,tempStar);
            starArr.push(t);
            starSprite.addChild(t.view);
        });
        linkStar();
    })
}
var starInfo;
function updateStar(){
    if(starInfo) clearTimeout(starInfo);
        LAjax.get("./starInfo.php",{},function(str){
            var data = JSON.parse(str);
            $.each(data,function(i,v){
                var str = '<div class="starInfoTitle"><i>'+v.statTitle+'</i><span class="infoBtn active J_starInfoBtn" data-cont="starInfoBox"></span></div><div class="starInfoCont"><div class="tBox tStarBox"><h6>靶场达人</h6><ul><li>1st：'+v.first+'</li><li>2nd：'+v.second+'</li><li>3rd：'+v.third+'</li></ul></div><div class="tBox tCountBox"><h6>靶场统计</h6><ul><li>攻击成功战队：'+v.success+'</li><li>正在成功战队：'+v.attack+'</li></ul></div></div>';

                typeof(starArr[i])!="undefined" && starArr[i].UpdateInfo(str,i);
            });
        });
    starInfo = setTimeout(updateStar, 1000);
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
    this.pointerX = numX-this.Lbit.getWidth()*.5;
    this.pointerY = numY-this.Lbit.getHeight()*.5;
    this.Lbit.x = numX-this.Lbit.getWidth()*.5;
    this.Lbit.y = numY-this.Lbit.getHeight()*.5;
    this.Lbit.alpha = 1;
    this.view.addChild(this.Lbit);
    this.view.name = 'star'+ this.starData.id;
    this.view.useCursor="pointer";
    this.links = this.starData.links;

    var _star = this;
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
    })
    this.view.addEventListener(LMouseEvent.MOUSE_UP, function(event){
        _star.dragging = false;
        _star.data = null;
        //event.clickTarget.stopDrag();
        if(_star.isdrag){
            linkStar();
        }else{
            var pX = _star.pointerX + 250,
                pY = _star.pointerY + 95;
            $("#starInfo"+(_star.starData.imgNum-1)).css({'opacity':1,'top':pY-214,'left':pX-_star.Lbit.getWidth()-53}).toggleClass("open");
        }
        
    })
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