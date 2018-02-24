define(function(require) {

  var customerHead = require('./customerHead');
  var ch = new customerHead();
  ch.render();

  var dashBoard = require('./dashBoard');
  var dashB = new dashBoard();

});

