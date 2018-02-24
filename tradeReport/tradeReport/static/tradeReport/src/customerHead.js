define(function(require, exports, module) {

  var $ = require('jquery');
  var Handlebars = require('handlebars');

  function customerHead() {
    this.data = {};
  }

  module.exports = customerHead;

  customerHead.prototype.render = function() {
    var _self = this;
    $.getJSON("./muses/tradeHealthIndex/queryIndex.json",{"globalId":window.config.globalId}, function(data){
      _self.data = data;
      var customer = data.customer;

      var customerTemplate = Handlebars.compile($("#customer-template").html());
      $('.J_tempHeadLeft').html(customerTemplate(customer));

    });
    
  }

});

