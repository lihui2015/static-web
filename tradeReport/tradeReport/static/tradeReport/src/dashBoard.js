define(function(require, exports, module) {

  var $ = require('jquery');
  var G2 = require('g2');
  var Handlebars = require('handlebars');
  var Shape = G2.Shape;

  function dashBoard(data) {
    this.data = {};
    this.classes = ['较差','中等','良好','优秀','极好'];
    this.shape = '';
    this.chart = '';
    this.color = ['#72b3ff', '#000cff'];
    this.count = 5;
    this.type = ['成交','成长'];
    this._init();
  }

  module.exports = dashBoard;

  dashBoard.prototype._init = function() {
    var _self = this;
    $.getJSON("./muses/tradeHealthIndex/queryIndex.json",{"globalId":window.config.globalId}, function(data){
      var deal = data.score.deal;
      deal.type = _self.type[0];
      var growth = data.score.growth;
      growth.type = _self.type[1];
      var dashBoardTemplate = Handlebars.compile($("#dashBoard-template").html());
      $('.J_deel').html(dashBoardTemplate(deal));
      $('.J_growth').html(dashBoardTemplate(growth));
      var exceedTemplate = Handlebars.compile($("#exceed-template").html());
      var exceed = data.score.total;
      $('#dashBoard').html(exceedTemplate(exceed));
      var score = data.score;
      _self.renderChart(score);
    });
  }
  dashBoard.prototype.renderChart = function(score){
    var _self = this;
    _self.data = score;
    _self.interval = _self.data.total.max/_self.count;

    // 自定义Shape 部分
    Shape.registShape('point', 'dashBoard', {
      drawShape: function(cfg, group){
        var origin = cfg.origin; // 原始数据
        var value = origin.value;
        var index = Math.floor(value/_self.interval);
        var point = cfg.points[0]; // 获取第一个标记点
        point = this.parsePoint({ // 将标记点转换到画布坐标
          x: point.x,
          y: 1.03
        });
        var center = this.parsePoint({ // 获取极坐标系下画布中心点
          x: 0,
          y: 0
        });
        var r = 12;
        var ra = 0.8 * r;
        var X1 = center.x;
        var Y1 = center.y;
        var X2 = point.x;
        var Y2 = point.y;    
        var shape;

        group.addShape('circle', {
          attrs:{
            x: X2,
            y: Y2,
            r: 5,
            fill: '#000cff'
          }
        });

        // 添加文本1
        group.addShape('text', {
          attrs: {
            x: X1,
            y: Y1-20,
            text: value,
            fontSize: 38,
            fill: '#ff831d',
            textAlign: 'center'
          }
        });

        // 添加文本2
        group.addShape('text', {
          attrs: {
            x: X1,
            y: Y1+8,
            text: _self.classes[index],
            fontSize: 18,
            fill: '#6a6a6a',
            textAlign: 'center'
          }
        });

        // 添加文本3
        // group.addShape('text', {
        //   attrs: {
        //     x: X1,
        //     y: Y1+25,
        //     text: '超越'+_self.data.total.exceed+'的同行',
        //     fontSize: 12,
        //     fill: '#c3c3c3',
        //     textAlign: 'center'
        //   }
        // });
        var text1 = group.addShape('text', {
          attrs: {
            x: X1-95,
            y: Y1+5,
            text: _self.classes[0],
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center'
          }
        });
        var text2 = group.addShape('text', {
          attrs: {
            x: X1-70,
            y: Y1-65,
            text:  _self.classes[1],
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center'
          }
        });
        var text3 = group.addShape('text', {
          attrs: {
            x: X1,
            y: Y1-95,
            text:  _self.classes[2],
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center'
          }
        });
        var text4 = group.addShape('text', {
          attrs: {
            x: X1+70,
            y: Y1-65,
            text:  _self.classes[3],
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center'
          }
        });
        var text5 = group.addShape('text', {
          attrs: {
            x: X1+95,
            y: Y1+5,
            text:  _self.classes[4],
            fontSize: 12,
            fill: '#8c8c8c',
            textAlign: 'center'
          }
        });
        return shape;
      }
    });

    // G2 语法部分
    _self.chart = new G2.Chart({
      id : 'dashBoard',
      width : 252,
      height : 190,
      plotCfg: {
        margin: [0, 10, 0, 10]
      },
      forceFit:true
    });

    _self.chart.source(_self.creatData());
    _self.chart.coord('gauge', {
      startAngle: -9/8 * Math.PI,
      endAngle: 1/8 * Math.PI
    });
    _self.chart.col('value', {
      min: 0,
      max: _self.data.total.max,
      tickInterval: _self.interval
    });
    _self.chart.axis('value', {
      labels: {
        label: {
          fontSize: 12,
          fill:'#c3c3c3'
        },
        autoRotate: false
      },
      formatter: function(dimValue) {
        return dimValue;
      },
      tickLine: {
        stroke: '#cdcdcd',
        value: -10
      },
      labelOffset: -5
    });
    _self.chart.point().position('value').shape('dashBoard');
    _self.chart.legend(false);

    _self.drawDashBoard(_self.creatData());
  }
  dashBoard.prototype.drawDashBoard = function(data){
    var _self = this;
    var val = data[0].value;
    _self.chart.guide().clear();
    _self.chart.guide().arc([0, 1.03],[_self.data.total.max, 1.03],{
      stroke: '#e8e9ee',
      lineWidth:10
    });
    _self.chart.guide()
    _self.chart.guide().arc([0, 1.03],[val, 1.03],{
      stroke: 'l (0) 0:'+this.color[0]+' 1:'+this.color[1],
      lineWidth:10
    }); 
    _self.chart.changeData(data);
  }
  dashBoard.prototype.creatData = function(){
    var _self = this;
    var data = [];
    var val = _self.data.total.score;
    data.push({value: Number(val)});
    return data;
  }
});

