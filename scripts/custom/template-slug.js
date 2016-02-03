jQuery( function($) {

	// Template Name Finder/Helper
	template_slug = $('.template').first().data('template');
	console.log( 'Template: ' + template_slug );
	// @TODO remove template finder.
	if( template_slug === 'category' || template_slug === 'search' || template_slug === 'search_group' || template_slug === 'extrapage' ) {

		// Show left bar on select pages... Perhaps a bad idea for SEO
		$('.left-bar').show();

		// Pagination corner helpers
		$selected = $('.selected');
		if( $selected.first().text() === "1" ) {
			$selected.addClass('first');
		}

		$pagination_blocks = $('.pagination');

		$pagination_blocks.each( function( i , v ) {
			$pagination_links = $(v).find( 'a' );
			if( $pagination_links.last().hasClass('active') ) {
				$pagination_links.last().addClass('last');
			}
		});
	}

	// Remove 3DCart clears (use the 'clearfix' class instead)
	$('div[style*=both]').remove();
});
