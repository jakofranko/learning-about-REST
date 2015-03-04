(function($) {
	Router = Backbone.Router.extend({
		routes: {
			'': 'home'
		}
	});
	var router = new Router();
	router.on('route:home', function() {
		// console.log(this);
	});

	Backbone.history.start();

	Person = Backbone.Model.extend({
		defaults: {
            name: 'Fetus',
            age: 0,
            child: ''
        },
        initialize: function(){
            this.on("change:name", function(model){
                var name = model.get("name"); // 'Stewie Griffin'
                alert("Changed my name to " + name );
            });
        },
        adopt: function( newChildsName ){
            this.set({ child: newChildsName });
        }
    });
    
    var person = new Person();
    person.adopt('John Resig');
	var child = person.get("child"); // 'John Resig'
    console.log(child);

    var thomas = new Person({ name: "Thomas", age: 67, child: 'Ryan'});

    var age = thomas.get("age"); // 67
    var name = thomas.get("name"); // "Thomas"
    var child = thomas.get("child"); // 'Ryan'

    thomas.set({name: 'John Gault'});
})(jQuery);