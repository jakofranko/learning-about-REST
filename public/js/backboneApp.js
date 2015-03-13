var Beer = Backbone.Model.extend({
	initialize: function() {
		console.log("I've been initialized!");
	}
});

var Beers = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/beers',
	model: Beer
});

var beers = new Beers();

var BeerList = Backbone.View.extend({
	el: '.page',
	template: _.template($('#beerTable').html()),
	events: {
		"click .edit-beer": "editBeer"
	},
	editBeer: function(data) {
		var _id = $(data.currentTarget).siblings('[name=beerID]').val();
		var beer = beers.get({_id: _id});
		console.log(beer);
	},
	render: function () {
		var that = this;
		beers.fetch({
			success: function(beers) {
				console.log(beers.models);
				that.$el.html(that.template({beers: beers.models, _:_}));
			}
		});
	}
});

// var BeerView = Backbone.View.extend({
// 	el: '.edit-modal',
// 	template: _.template($('#editForm').html()),
// 	render: function() {
// 		var that = this;
// 		// var beer = 
// 	}
// })

var beerList = new BeerList();
beerList.render();