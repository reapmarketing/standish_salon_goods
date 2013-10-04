$ = require('jquery-browserify');

$('.newsletter-signup button').on( 'click', function(){
	console.log( $( '.newsletter-signup input' ).attr('value') );
});

require('./hellobar.js');