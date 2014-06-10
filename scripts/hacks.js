jQuery( function($) {

	// unWrappers
/* 	$( '.productBlockContainer').unwrap(); */
	$( '.productContainer' ).unwrap();
	$( '.listing' ).unwrap();

	// Remove <br> from login page
	if( $('.page_headers').text() === "My Account" ){
		$('br').first().remove();
	}
	
	$("a.cat:contains(Supplies)").append('<span><i class="icon icon-star"></i> New</span>');
	$("a:contains(Break Room)").append('<span><i class="icon icon-star"></i> New</span>');
	$("a:contains(Helen of Troy)").append('<span><i class="icon icon-star"></i> New</span>');
	$("a:contains(Betty Dain)").append('<span><i class="icon icon-star"></i> New</span>');
	$("a:contains(Fromm)").append('<span><i class="icon icon-star"></i> New</span>');
	$("a:contains(King)").append('<span><i class="icon icon-star"></i> New</span>');

});

var qs = (function(a) {
	if (a == "") return {};
	var b = {};
	for (var i = 0; i < a.length; ++i)
	{
		var p=a[i].split('=');
		if (p.length != 2) continue;
		b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	}
	return b;
})(window.location.search.substr(1).split('&'));
