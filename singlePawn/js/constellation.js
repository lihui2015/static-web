var NODEINFO = [];
var PASSLIST = [];
var PASSLIST_ADD = [];
var CHANGELIST = [];
var NODEDEPARTARR = [];
$(function(){
    var imgData = [
        {name:"node",path:"images/constellation/star1.png"}
    ];
    var dataList;
    var loadingLayer,stageLayer,nodeLayer,linkSprite;
    var browser_width = window.innerWidth,
        browser_heidth = window.innerHeight;
    var canvasW = $("#consteCanvas").width(),
    	canvasH = $("#consteCanvas").height();
    var fSize = browser_width / 1920 * 20;
    var scale = 0.62 * browser_width / 1920;
    var nodeArr = [];
    var nodeInfo = [];

    var xzArr = [];
    var xzObj = $(".constellation_item");
    $.each(xzObj,function(j,k){
        var str = $(k).attr("id");
        if(typeof str != 'undefined' && str.length){
            xzArr.push(str);
            ajaxFun(str);
        }
    });

    function ajaxFun(str){

        $.getJSON('./json/'+str+'_info.json',function(result){
            nodeInfo.push(result);
        });
    }

    LInit(50,'consteCanvas',canvasW,canvasH,main);

    function main(n){
        LMouseEventContainer.set(LMouseEvent.MOUSE_MOVE,false);
        if(LGlobal.canTouch){
            LGlobal.stageScale = LStageScaleMode.EXACT_FIT;
        } else {
            LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
        }
        loadingLayer = new LoadingSample4();
        addChild(loadingLayer);
        LLoadManage.load(imgData,
        function(progress){
            loadingLayer.setProgress(progress);
        },gameInit);
    }

    function gameInit(result){
        dataList = result;
        removeChild(loadingLayer);
        loadingLayer = null;
        stageLayer = new LSprite();
        addChild(stageLayer);
        animateStart();
        LGlobal.canvasObj.onselectstart = function() {
            return false;
        };
    }

    function animateStart(){
      addNode();
      linkNode();
    }

    function addNode(){
        nodeLayer = new LSprite();
        stageLayer.addChild(nodeLayer);
        linkSprite = new LSprite();
        stageLayer.addChild(linkSprite);

        var numX,numY;
        $.each(nodeInfo,function(j,k){
            if($.inArray(k.bgImg,xzArr) > -1){
                var baseX = $("#"+k.bgImg).offset().left - $("#consteCanvas").offset().left;
                var baseY = $("#"+k.bgImg).offset().top - $("#consteCanvas").offset().top;
                $.each(k.starArr,function(i,v){
                    numX = baseX + v.X * fSize;
                    numY = baseY + v.Y * fSize;
                    var tempObj = {};
                    tempObj.conste = k.bgImg;
                    tempObj.id = v.id;
                    tempObj.px = numX;
                    tempObj.py = numY;
                    tempObj.scale = v.mScale * scale;
                    tempObj.links = v.links;
                    var nd = new Node(tempObj);
                    nodeLayer.addChild(nd.view);
                    nodeLayer.addChild(nd.circle);
                    nodeArr.push(nd);
                });
            }
        });
        NODEINFO = nodeInfo;
    }

    function Node(nobj){
        this.view = new MiddleBitmap(new LBitmapData(dataList['node']));
        this.view.scaleX = this.view.scaleY = nobj.scale * .5;
        this.view.x = nobj.px;
        this.view.y = nobj.py;
        this.view.alpha = 0.3;  //透明度 1
        this.circle = new LSprite();
        this.circle.name = nobj.conste + nobj.id;
        this.circle.x = nobj.px;
        this.circle.y = nobj.py;
        this.circle.graphics.drawArc(0,'rgba(255,255,255,0.8)',[0,0,1,0,2*Math.PI],true,'rgba(255,255,255,0.8)');
        this.links = nobj.links;
        this.conste = nobj.conste;
        this.pointerX = nobj.px;
        this.pointerY = nobj.py;
        this._flash();
    }

    Node.prototype._flash = function(){
    	// var _self = this;
    	// LTweenLite.to(_self.view,.4,{alpha:0,scale:0,ease:Sine.easeOut,loop:true}).to(_self.view,.4,{alpha:1,scale:_self.view.scale,ease:Sine.easeOut});
    }

    function linkNode(){
        linkSprite.graphics.lineWidth(1);
        linkSprite.graphics.strokeStyle("rgba(255,255,255,.3)");
        for(var i = 0;i<nodeArr.length;i++){
            var star = nodeArr[i];
            if(typeof(star.links.length) !='undefined'){
                $.each(star.links,function(n,k){
                    var target = nodeLayer.getChildByName(star.conste+k);
                    linkSprite.graphics.beginPath();
                    linkSprite.graphics.moveTo(star.pointerX,star.pointerY);
                    linkSprite.graphics.lineTo(target.x,target.y);
                    linkSprite.graphics.stroke();
                });
            }
            // nodeArr[0].view.alpha = 0;
        }
        // nodeArr[0].view.alpha = 0;  
        // LTweenLite.to(nodeArr[0].view,.4,{alpha:0,scale:0,ease:Sine.easeOut,loop:true}).to(nodeArr[0].view,.4,{alpha:1,scale:nodeArr[0].view.scale,ease:Sine.easeOut});
    }

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

    /**
     * levelInit() node分组
     * NODEDEPARTARR = [];
     */
    function levelInit(){
        var nodedepartarr = [];
        var img_num = NODEINFO.length;
        for (var i = 0; i < img_num; i++) {
            nodedepartarr[i] = NODEINFO[i].starArr.length;
        }
        var i = 0;
        $.each(nodedepartarr, function(key, value){
            var depart = [];
            for (var k = 0; k < value; k++) {
                depart.push(i);
                i++;
            }
            NODEDEPARTARR.push(depart);
        });
    }

    /**
     * 向后台请求数据
     */
    function getLevelInfo(){
        var pram_imgNum = NODEINFO.length;
        var pram_nodeNum = 0;
        $.each(NODEINFO, function(key, value){
            pram_nodeNum += value.starArr.length;
        });
        //PASSLIST
        for (var i = 0; i < pram_nodeNum; i++) {
            PASSLIST.push(0);
            PASSLIST_ADD.push(0);
        }
        //send a request per 2 mins
        setInterval(function(){
            $.getJSON('./json/levelInfo.php', {'imgNum':pram_imgNum, 'nodeNum':pram_nodeNum}, function(data){
                $.each(data, function(key, value){
                    if ($.inArray(CHANGELIST, value) == '-1' && PASSLIST[value] !== 1) {
                        CHANGELIST.push(value);
                        PASSLIST[value] = 1;
                    }
                });
            }); 
        }, 2000);
    }

    /**
     * 执行 过关的关
     */
    function changeStatus(){
        var toChangeLevel = CHANGELIST.shift();
        if (toChangeLevel !== 'undefined' && toChangeLevel !== undefined) {
            LTweenLite.to(nodeArr[toChangeLevel].view,.4,{alpha:0,scale:0,ease:Sine.easeOut,loop:false}).to(nodeArr[toChangeLevel].view,.4,{alpha:1,scale:nodeArr[toChangeLevel].view.scale,ease:Sine.easeOut});    
            PASSLIST_ADD[toChangeLevel] = 1;
            var passInfo = allPassed(toChangeLevel);
            if (passInfo.split('-')[0] == '1') {
                setTimeout(function(){
                    $('.IMG_'+passInfo.split('-')[1]+'').animate({'opacity':'1'},1000);        
                }, 800);
            }
        }
    }

    /**
     * 判断该星座所有关数是否都已通关 1-星座号 0
     * toChangeLevel 为刚通关的关
     * 按所有关数为编号
     */
    function allPassed(toChangeLevel){
        var NODEDEPARTARR_len = NODEDEPARTARR.length;
        var position = '';
        //获取所在位置 p-index (img-index)
        for (var i = 0; i < NODEDEPARTARR_len; i++) {
            $.each(NODEDEPARTARR[i], function(key, value){
                if (value == toChangeLevel) {
                    position = i+'-'+value;
                }
            });
        }
        var allPassMark = 1;
        var firstMark = parseInt(NODEDEPARTARR[position.split('-')[0]][0]);
        for (var i = 0; i < NODEDEPARTARR[position.split('-')[0]].length; i++) {
            allPassMark = allPassMark * parseInt(PASSLIST_ADD[''+firstMark+'']);
            firstMark++;
        }
        if (allPassMark == 1) {
            return '1-'+position.split('-')[0];
        } else {
            return '0';
        }
    }

    setTimeout(levelInit, 1000);
    setTimeout(getLevelInfo, 1000); // execute after 1min
    setInterval(changeStatus, 200); // execute change-program per 1 min

 

})