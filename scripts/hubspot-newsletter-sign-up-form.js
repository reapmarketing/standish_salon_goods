// Footer HubSpot newsletter sign up form
hbspt.forms.create({ 
	portalId: '239485',
	formId: '934570fd-43b6-4393-b73a-43cc4bcaea41',
	css: '',
	onFormReady: function() {
		// Clear Placeholder on click of email element
		$('.hbspt-form input[type=email]').each( function () {
			if( $(this).val() == 'Enter Email' ) {
				var element = $(this);
				element.one( 'click', function() {
					element.val('');
				});
			}
		});
	}
});