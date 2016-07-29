//Do not change
var server = "655";
var sitenbr = "162845571";
//Wait for document load to complete to begin work
jQuery(document).ready(function() {

  var qs = document.location.search;
  qs = qs.replace(/\%ae/ig,'');

  qs == '' ? qs+='?': qs+='&';
  qs+= 'e=rsp&ajx=1&sn='+sitenbr+'&bpro=' + window.location.protocol + '//' + '&bsrv=' + window.location.host + '&bapp=' + window.location.pathname;

  proto = ('https:' == document.location.protocol ? '1' : '0');
  if(proto == "0")
    FBAjax.httpreq('http://ss' + server + '.fusionbot.com/b/q' + qs, fbCallback);
  else
    FBAjax.httpreq('https://standishsalongoods.fusionbot.com/b/q' + qs, fbCallback);

  var res = (new RegExp("[?&]k=([^&]+)")).exec(qs);
  if(res != null) { k = decodeURI(res[1]).replace(/\+/ig,' '); k = k.replace(/\%2b/ig,' '); k = k.replace(/\%2f/ig,'/'); $(".fbinputkeys").val(k);document.title = "Search Results > " + k; }

});

//custom frame for search MUST have location (id) to inject results named 'fusionbot-content'
function fbCallback() {

  rUrl = window.location.protocol + "\/\/" + window.location.host + window.location.pathname + "#t=tr&";
  var re = new RegExp(rUrl, "g");
  content = FBAjax.responseText.replace(re,"");
  if(content.substring(0, 6) == "Redir:") {

    loc = content.split("Redir:");
    if(loc.length > 1)
      window.location = loc[1];

  } else {

    $('#fusionbot-content').html(content);

    $("#fbFilters").html($("#fbFiltersHidden").html());
    $("#fbFiltersHidden").html("");
    hideCats();
    $("#leftBar").show();
    catCheckbox();
    fixPagination();

    if($("#fbnomatch").length > 0) { //no results

      $("#shopby").hide();
      //$(".paging").hide();
      //$("#leftBar").css("visibility","hidden");
      //$("#leftBar").hide();

    }

  }

  //(custom) adjust balloon position
  //curPos = $('.searchlight-balloon').css('left');

  sbPos = $("#fbsearchlight").offset();
  if(typeof sbPos != "undefined") {

    $("div.searchlight-balloon").css("left", sbPos.left + "px");

  }

  //curPosArr = curPos.split("px");
  //if(curPosArr[0].length > 0) {
  //    newPos = parseInt(curPosArr[0]) - 345 + "px";
  //    console.log(newPos);
  //    $("div.searchlight-balloon").css("right", newPos);
  //}

}

function fbTracking(trkurl) { var u = trkurl.split('\&http\:\/\/');  setTimeout( function() { FBAjax.httpreq('http://' + u[1] + '&http://' + u[2], false); }, 0); window.location = 'http://' + u[2]; }

function toggleFilters() {

 $( "#filterContent" ).slideToggle( "slow", function() {

    if($("#filterContent").is(":visible")) {

      $("#pmBtnDefaultSection").removeClass( "fa-plus-circle" );
      $("#pmBtnDefaultSection").addClass( "fa-minus-circle" );
      $("#pmBtnMobileSection").removeClass( "fa-plus-circle" );
      $("#pmBtnMobileSection").addClass( "fa-minus-circle" );

    } else {

      $("#pmBtnDefaultSection").removeClass( "fa-minus-circle" );
      $("#pmBtnDefaultSection").addClass( "fa-plus-circle" );
      $("#pmBtnMobileSection").removeClass( "fa-minus-circle" );
      $("#pmBtnMobileSection").addClass( "fa-plus-circle" );

    }

  });

}

function toggleRefinement(t,c) {


 $( "#"+c ).slideToggle( "fast", function() {

    if($("#"+c).is(":visible")) {

      $(t).children('i').removeClass('fa-plus-circle');
      $(t).children('i').addClass('fa-minus-circle');

    } else {

      $(t).children('i').removeClass('fa-minus-circle');
      $(t).children('i').addClass('fa-plus-circle');

    }

  });

}


function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  var separator = uri.indexOf('?') !== -1 ? "&": "?";
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + "=" + value + '$2');
  }
  else {
    return uri + separator + key + "=" + value;
  }
}

(function($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i)
        {
            var p=a[i].split('=');
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'))
})($);

function hideCats() {

  var cth = ["Color","Color Bar ","Price","Price Range","Sale","Sale!","brands","Shop By","Style","Type"];

  for (i = 0; i < cth.length; i++) {

    $('.flt-item[title="' + cth[i] + '"]').hide();

  }

}

function fixPagination() {

  theWidth = $( window ).width();
  if(theWidth > 550)
    return true;

  p = $.QueryString["p"];
  if(typeof p == "undefined") {
    p = 1;
  }

  if(p.length == 0)
    p = 1;

  //console.log(p);

  p = parseInt(p);

  if(p > 1) {

    firstLink = $("#fbfirst").attr("href");
    if(typeof firstLink != "undefined" && firstLink.length > 0) {

      newLink = updateQueryStringParameter(firstLink, "p", "1");
      $("#fbfirst").attr("href",newLink);
      $("#fbfirst").show();

    }

  }

  matchCnt = $("#fbmatchcnt").text();
  if(typeof matchCnt != "undefined") {

    matchCnt = parseInt(matchCnt.replace(/,/g, ''));
        pages = Math.ceil(matchCnt/30);

        if(pages > p) {

      lastLink = $("#fblast").attr("href");

      if(typeof lastLink != "undefined" && lastLink.length > 0) {
        newLink = updateQueryStringParameter(lastLink, "p", pages);
        $("#fblast").attr("href",newLink);
        $("#fblast").show();

      }

    }

  }

  //now, let's copy to bottom
  $("#fbpaginationBottom").html($("#fbpaginationTop").html());

}

function old_fixPagination() {

  theWidth = $( window ).width();
  if(theWidth > 550)
    return true;

  p = $.QueryString["p"];
  if(typeof p == "undefined") {
    p = 1;
  }

  if(p.length == 0)
    p = 1;

  //console.log(p);

  p = parseInt(p);

  if(p == 1)
    inc = 1;
  else
    inc = 2;

  for (i = p+inc; i <= p+9; i++) {

    //console.log("btn_" + i);
    if($("#btn_"+i).length > 0) {

      $("#btn_"+i).hide();

    }

  }

  if(p > 2) {

    hbtn = p - 2;

    for(i = hbtn; i > 0; i-- ) {

      if($("#btn_"+i).length > 0) {
        $("#btn_"+i).hide();
      }

    }

  }

  firstLink = $("#fbfirst").attr("href");
  if(typeof firstLink != "undefined" && firstLink.length > 0) {

    newLink = updateQueryStringParameter(firstLink, "p", "1");
    $("#fbfirst").attr("href",newLink);

  }

}

function catCheckbox() {

  $(".flt-item-a").each(function(){ 

    html = $(this)[0].outerHTML;
    href = $(this).attr("href");
    checkBox = "<input type='checkbox' style='position:relative;top:6px;' value='' onclick=\"location.href='" + href + "';\">";
    html = checkBox + "&nbsp;" + html;
    $(this).parent().html(html);


  });
  
  $(".flt-item-sub-a").each(function(){ 

    html = $(this)[0].outerHTML;
    href = $(this).attr("href");
    checkBox = "<input type='checkbox' style='position:relative;top:6px;margin-left:10px;' value='' onclick=\"location.href='" + href + "';\">";
    html = checkBox + "&nbsp;" + html;
    $(this).parent().html(html);


  });  
  
  $(".flt-item-empty").each(function(){ 

    html = $(this).html();
    checkBox = "<input type='checkbox' style='position:relative;top:6px;' value='' disabled>";
    html = checkBox + "&nbsp;" + html;
    $(this).html(html);


  });
    


}



