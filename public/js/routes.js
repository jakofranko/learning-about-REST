var Beerlocker = Backbone.Router.extend({

  routes: {
    "backbone/:beerID":                 "beer",    // #help
    "search/:query":        "search",  // #search/kiwis
    "search/:query/p:page": "search"   // #search/kiwis/p7
  },

  beer: function(beerID) {
    return $.get('');
  }

});