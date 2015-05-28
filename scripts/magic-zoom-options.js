// 3DCart Code
	if (typeof jQuery == 'undefined') {
		document.write("<script type=\"text/javascript\" src=\"assets/templates/common/js/jquery.min.js\"></" + "script>");
	}
	
	MagicZoomPlus.options = {
		'opacity':'65',
		'expand-effect':'elastic',
		'background-opacity':'50',
		'zoom-fade':'true',
		'zoom-position':'right',
		'fit-zoom-window':'false',
		'hint':'false'
	}
	var width = document.body.clientWidth;
	if (width < 750) {
		//mobile only
		MagicZoomPlus.options = {
			 'disable-zoom': true
		 };
	 }
	// START: qaScript //
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
//-- END: qaScript --//

	//thumbnail script
	var image1,image2,image3,image4,selectedimage;
	var imagemaxwidth, imagemaxheight

	imagemaxwidth=[image_medium_w];
	imagemaxheight=0;

	image1="[image1]";
	image2="[image2]";
	image3="[image3]";
	image4="[image4]";
	image5="[image5]";
	image6="[image6]";
	image7="[image7]";
	image8="[image8]";
	image9="[image9]";
	image10="[image10]";
	image11="[image11]";
	image12="[image12]";
	image13="[image13]";
	image14="[image14]";
	image15="[image15]";
	imagecaption1="[imagecaption1]";
	imagecaption2="[imagecaption2]";
	imagecaption3="[imagecaption3]";
	imagecaption4="[imagecaption4]";
	imagecaption5="[imagecaption5]";
	imagecaption6="[imagecaption6]";
	imagecaption7="[imagecaption7]";
	imagecaption8="[imagecaption8]";
	imagecaption9="[imagecaption9]";
	imagecaption10="[imagecaption10]";
	imagecaption11="[imagecaption11]";
	imagecaption12="[imagecaption12]";
	imagecaption13="[imagecaption13]";
	imagecaption14="[imagecaption14]";
	imagecaption15="[imagecaption15]";
	selectedimage='[image1]'; //pre load image1
	zoom_enable=[3dzoom_enabled]; //0 = zoomify | 1 = magiczoom

	function image_click(clicks)
	{
		if (document.getElementById('listing_main_image_link')!=undefined)
		{
			if (zoom_enable==1)
			{
				selectedimage=eval('image'+clicks);
				MagicZoomPlus.update('listing_main_image_link', selectedimage, 'thumbnail.asp?file=' + selectedimage + '&maxx='+imagemaxwidth+'&maxy='+imagemaxheight, 'show-title: false');
				changecontent("imagecaptiont",eval('imagecaption'+clicks));
				document.getElementById('listing_main_image_link').href=this.name;
			}else
			{
		
				selectedimage=eval('image'+clicks);
				document.getElementById('large').src='thumbnail.asp?file=' + selectedimage + '&maxx='+imagemaxwidth+'&maxy='+imagemaxheight;
				document.getElementById('listing_main_image_link').href='#';
				document.getElementById('listing_main_image_link').onclick=zoomify_popup;
				changecontent("imagecaptiont",eval('imagecaption'+clicks));
			}
		}
	}
	function zoomify_popup()
	{
		popupsimple('zoomify.asp?catalogid=[catalogid]&img=' + selectedimage ,500,500);
	}

	function check_stock(what,partnum)
	{
		var soption;
		var i;
		var product_availability='[availability]';
		var backordermode='[allowbackorder]';
		var avail_instock='[productAvailability-Instock]';
		var avail_outofstock='[productAvailability-Outofstock]';
		var avail_backorder='[productAvailability-Backorder]';
		var optionfound=0;

		if (inventoryarray[catalogid].length==0) //if there is no advanced options, don't look for stock
		{
			return true;
		}
		else
		{
			for(i=0;i<inventoryarray[catalogid].length;i++) 
			{
				soption=inventoryarray[catalogid][i];
				field_array=soption.split("-");
				//Dynamic Part for advanced options
				if (typeof((idarray[catalogid])) != "undefined")
				{
					soptionid=idarray[catalogid][i]; 
					aoprice=aopricearray[catalogid][i]; 
					if (field_array[0]==partnum)
					{
						if (soptionid != '')
							changeid(soptionid); 
						if (aoprice != '0')
							changeprice(aoprice);
					}
				}
			
				if ((field_array[0]==partnum))
				{	
					changecontent("product_inventory",field_array[1]);
					if (eval(GetValue(what,"qty-0"))>field_array[1]) 
					{
						optionfound=optionfound+1;
						if (backordermode==1)
						{
							changecontent("availability",avail_backorder); 
							return true;
							optionfound=optionfound+1;
						}
						else 
						{
							changecontent("availability",avail_outofstock);
							alert("The options you selected are not currently available.");
							optionfound=optionfound+2;
							return false;
						}
					}

				}
			}

			if (optionfound==0)
			{ 
				changecontent("availability",product_availability);
				return true;
			}
		
			if (optionfound==1)
			{
				changecontent("availability",avail_instock);
				return true;
			}
		}
	}


	function add_wishlist()
	{
		document.add.action = "add_cart.asp?action=addWishList";
		document.add.submit();
	}

	function add_giftregistry()
	{
		document.add.action = "add_cart.asp?action=addGiftRegistry";
		document.add.submit();
	}

	function check_and_add(formx)
	{
		// This is a 3DCart Function
		// Modifed to report Cart Addition to GA EECom Tracking
		if (document.add.std_price==null)
		{
			GAEEC_addToCart(product)
			document.add.submit();
		}
		else
		{
			var readytoadd=validateValues(formx,1)
			if (readytoadd==true)
			{
				GAEEC_addToCart(product)
				document.add.submit();
			}
		}
	}

	function GAEEC_addToCart(product) {
		var purchasedProduct = product;
		purchasedProduct['price'] = '[price]';
		purchasedProduct['quantity'] = $('#quantity').val();
		console.log( purchasedProduct );
		ga( 'ec:addProduct', purchasedProduct );
		ga( 'ec:setAction', 'add' );
		ga( 'send', 'event', 'UX', 'click', 'add to cart' );
	}
	
	
	// --- @todo find out what this does -- select options and send put to current URL  --- //
	
	
	function selectOption(objElement) {

		var strElementName = "";
		var strElementType = "";
		var intHasRules = "[has_rules]";
		objElement = null;

		if (intHasRules != "1") {
			return;
		}

		add_overlay("divOptionsBlock", 1);
		var url = 'prod_options.asp?ajax=1&action=buildOptions&strElementType=' + escape(strElementType) + '&strElementName=' + escape(strElementName) + '&no-cache=' + Math.random();

		jQuery.ajax({
			url: url,
			dataType: 'html',
			type: 'POST',
			data: jQuery(add).serialize(),
			cache: false,
			success: function (strResult) {
				jQuery("#divOptionsBlock").html(strResult);
			},
			complete: afterOptionSelection,
			error: reportError
		});
	}

	function afterOptionSelection(req) {
		remove_overlay("divOptionsBlock");
		return;
	}

	function getElementById_s(strId) {
		var obj = null;
		if (document.getElementById) {
			obj = get_Element(strId);
		} else if (document.all) {
			obj = document.all[strId];
		}
		return obj;
	}

	function remove_overlay(panel) {
		var objBody = getElementById_s('overlay_' + panel);
		if (objBody != null && objBody != 'null' && objBody != undefined && objBody != 'undefined')
			objBody.style.display = 'none';
	}

	function add_overlay(panel, loading) {
		var objBody = getElementById_s(panel);
		var objOverlay = document.createElement("div");

		objOverlay.setAttribute('id', 'overlay_' + panel);
		objOverlay.className = 'overlay';
		objOverlay.style.position = 'absolute';
		objOverlay.style.textAlign = 'center';
		objOverlay.style.width = objBody.clientWidth + "px";
		objOverlay.style.height = objBody.clientHeight + "px";
		//alert(objOverlay.style.height);
		objBody.insertBefore(objOverlay, objBody.firstChild);
		objOverlay.style.display = 'block';

		if (loading == 1) {
			get_Element('overlay_' + panel).innerHTML = '<table border=0 width=100% height=100%><td style="text-align: center;"><img src="assets/templates/common/images/loading.gif">';
		}
		else {
			get_Element('overlay_' + panel).innerHTML = '<table border=0 width=100% height=100%>';
		}
	}

	function get_Element(i) {
	
	}

	function reportError(jqXHR, textStatus) {
		remove_overlay("divOptionsBlock");

		//jqXHR.responseText
		if (jqXHR.status > 0)
			alert("Error processing request " + jqXHR.status + " - " + textStatus);
	}

	selectOption(null);
	
	
