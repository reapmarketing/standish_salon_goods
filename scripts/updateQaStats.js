function updateQAStats(id, vote, user){

	var url = '';
	var params = '';

	if (user == '') user = 0;
	
	params = 'id=' + id;
	params += '&vote=' + vote;
	params += '&userid=' + user;
	
	url = 'productqaVote_ajax.asp?' + params + '&no-cache='+Math.random();

	//window.location = url;
	
	jQuery.ajax({
		url: url,
		dataType: 'html',
		type: 'GET',
		cache: false,
		success: function (strResult) {
			if (strResult == '') {
				alert('[productqa_helpful-notupdated]');
			}
			else {
				jQuery('#spn' + id).html(strResult);
				alert('[productqa_update-helpful]');
			}
		
		},
		error: reportQAError
	});
	
}

function reportQAError(jqXHR, textStatus) {
	if (jqXHR.status > 0)
	{
		alert(jqXHR.responseText);
		alert("Error processing request " + jqXHR.status + " - " + jqXHR);
		
	}
}
