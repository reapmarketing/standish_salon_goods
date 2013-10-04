require('./jqueryCookie.js');
urlParams = require('./urlParams.js');

$hello     = $('.hello');
$header    = $('.header');
$a         = $('a');
$helloTab  = $('.hello-tab');
cookieName = 'hello'

if( urlParams.hello === 'true' ){
	$hello.css({ 'top': 0 });
	$header.css({ 'margin-top': '60px' });
}

if( $.cookie( cookieName ) === 'true' ){
	$hello.css({ 'top': 0 });
	$header.css({ 'margin-top': '60px' });
	$helloTab.css({ 'top': '55px' });
	$helloTab.find('i').removeClass('icon-caret-down').addClass('icon-caret-up');
}
else{
	$hello.css({ 'top': '-60px' });
	$header.css({ 'margin-top': 0 });
}

// moves the bar up and down
$helloTab.on( 'click', function( e ){
	if( $.cookie( cookieName ) === 'true' ){
		$.cookie( cookieName, 'false' );
		$hello.animate({ 'top': '-60px' }, 800);
		$header.animate({ 'margin-top': 0 }, 800);
		$helloTab.animate({ 'top': '-5px' }, 800, function(){
			$helloTab.find('i').removeClass('icon-caret-up').addClass('icon-caret-down');
		});
	}
	else {
		$.cookie( cookieName, 'true' );
		$helloTab.animate({ 'top': '55px' }, 800, function(){
			$helloTab.find('i').removeClass('icon-caret-down').addClass('icon-caret-up');
		});
		$hello.animate({ 'top': 0 }, 800, function(){});
		$header.animate({ 'margin-top': '60px' }, 800, function(){});
	}
});

// moves the bar down for first time visitiors clicking on an anchor
$a.on( 'click', function( e ){
	if( $.cookie( cookieName ) !== 'false' ){
		e.preventDefault();
		var href = $(this).attr('href');
		if( $.cookie( cookieName ) !== 'true' ){
			$.cookie( cookieName, 'true' );
			href += '?hello=true'
		}
		$hello.animate({ 'top': 0 }, 800, function(){});
		$helloTab.animate({ 'top': '55px' }, 800, function(){
			$helloTab.find('i').removeClass('icon-caret-down').addClass('icon-caret-up');
			document.location = href;
		});
	}
});
