/** Footer HubSpot newsletter sign up form **/

// Load the dom in order to make sure parent hubspot script is loaded first
// todo -- load script and create an event based on this onload, then use the
// options for the hubspot form
document.addEventListener('DOMContentLoaded', function() {
	hbspt.forms.create({
		portalId: '239485',
		formId: '934570fd-43b6-4393-b73a-43cc4bcaea41',
		css: '',
		target: '#newsletter-target',
		onFormReady: function() {
			console.log('ready');
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
	}).done(function() {console.log('done');});
});
