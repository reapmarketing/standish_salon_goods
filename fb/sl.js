/*
 * jQuery Search Light Plugin
 * version: 1.0.1 (2009/07/29)
 * @requires jQuery v1.3.0 or later
 *
 * Copyright 2009 Ryan Williams
 *   http://ryanwilliams.org
 *   searchlight@ryanwilliams.org
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

//For jsonp version of searchlight, surround the .jso template content in the FusionBot account
//in a static function named jsonp_callback()

//make global var, so can reference outside of dynamic function
var searchlight;

(function($) {
    var SearchLight = function(input, url, options) {
        settings = $.extend({
            minimumCharacters: 3,
            searchDelay: 100,
            limitPerCategory: 5,
            actionFunction: null,
            align: 'left',
            width: '300',
            showIcons: true,
            showEffect: 'scroll', // TODO
            hideEffect: 'fade'  // TODO
        }, options);
        this._settings = settings;

        var input = $(input);
        var container = $(document.createElement('div'));
        container.attr('class',  'searchlight-balloon');

        //myTop defined before insertion of sl.js in client side page, to hard code position of preview box, rather than calculate dynamically
        if(typeof myTop == "undefined")
        {
           container.css({
              position: 'absolute',
              top: input.offset().top + input.outerHeight(),
              display: 'none'
          });
        }
        else
        {
           container.css({
              position: 'absolute',
              top: myTop,
              display: 'none'
          });

        }


        if (settings.width == 'auto') {
            container.css('width', input.outerWidth());
        }

        if (settings.align == 'left') {
          //myLeft defined before insertion of sl.js in client side page, to hard code position of preview box, rather than calculate dynamically
          if(typeof myLeft == "undefined")
            container.css('left', input.offset().left);
          else
            container.css('left', myLeft);


        } else if (settings.align == 'right') {
            if(typeof myRight == "undefined")
              container.css('right', $(document.body).innerWidth() - (input.offset().left + input.outerWidth()));
            else
              container.css('right', myRight);
        }


        var results = $(document.createElement('div'));
        results.attr('class', 'searchlight-results-wrapper');
        //results.css({
        //    height: '100%'
        //});

        //if ($.browser.msie && parseFloat($.browser.version) <= 7) {
        //    results.css({
        //        width: '100%'
        //    });
        //}

        container.append(results);
        $(document.body).append(container);


        this._input = input;
        this._container = container;
        this._searchURL = url;
        this._resultsContainer = results;

        input.bind('focus.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;
            if (this.value.length >= settings.minimumCharacters) {
                searchlight.search(this.value);
            }
        });
        $(document.body).bind('mousedown.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;

            // Make sure we didn't click the searchlight
            var node = evt.target;
            var c = 0
            while (node) {
                // Clicked searchlight, so return
                if (node == searchlight._input[0] || node == searchlight._container[0]) {
                    return;
                }
                node = node.parentNode;
            }

            searchlight.hide();
        });

        input.bind('keydown.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;
            if (evt.which == 38 && searchlight._selectedRow > 0) {
                // Up arrow
                searchlight.selectRow(searchlight._selectedRow-1);
            } else if (evt.which == 40 && searchlight._selectedRow < searchlight._rowCount -1) {
                // Down arrow
                searchlight.selectRow(searchlight._selectedRow+1);
            } else if (evt.which == 13 && searchlight._selectedRow > -1) {
                searchlight.activateRow(searchlight._selectedRow);
            }
            //if (evt.which == 13 || evt.which == 38 || evt.which == 40) {
            //remove 13 so can submit search with enter key
            if (evt.which == 38 || evt.which == 40) {
                evt.preventDefault();
            }
        });
        input.bind('keyup.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;
            if (searchlight._searchDelayTimer) {
                clearTimeout(searchlight._searchDelayTimer);
            }
            searchlight._searchDelayTimer = setTimeout(function() {
                var input = searchlight._input[0];
                if (input.value == searchlight._previousQuery) {
                } else if (input.value.length >= settings.minimumCharacters) {
                    searchlight.search(input.value);
                } else {
                    searchlight.hide();
                }
            }, settings.searchDelay);
        });
        input.bind('keypress.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;
        });
        this._container.bind('mouseleave.searchlight', {searchlight: this}, function(evt) {
            searchlight = evt.data.searchlight;
            searchlight.selectRow(-1);
        });


        this.resultAction = settings.actionFunction ? settings.actionFunction : this.defaultResultAction;
    };
    SearchLight.prototype.show = function() {
        if (!this._container.is(':visible')) {
            this._container.fadeIn('fast');
        }
    };
    SearchLight.prototype.hide = function() {
        if (this._disableHide) {
            return;
        }
        this._container.fadeOut('fast');
    };

    SearchLight.prototype.search = function(query) {
        searchlight = this;
        this._previousXHR = $.ajax({
          dataType: 'jsonp',
          data: 'k=' + query,
          url: this._searchURL,
          success: function jsonp_callback(results){}
        });
        searchlight.show();
    };

    SearchLight.prototype.clearResults = function() {
        this._categoryCount = 0;
        this._rowCount = 0;
        this._selectedRow = -1;
        this._resultsContainer.html('<table class="searchlight-results"></table>');
    };

    SearchLight.prototype.addFooter = function(results) {

      if(results.length == 6) {

        theForm = "";
        if(document.fbsearch !== undefined)
          theForm = "fbsearch";
        else if(document.searchForm !== undefined)
          theForm = "searchForm";

        if(theForm.length > 0) {

          var tr = document.createElement('tr');
          $(tr).attr('id', 'searchlight-footer');
          var td = document.createElement('td');
          $(td).attr('align', 'center');
          $(td).attr('width', '100%');
          $(td).attr('colspan', '2');
          //$(td).html('<div id="searchlight-footer" onclick="document.getElementsByName(theForm)[0].submit();">More...</div>');
          $(td).html('<div id="searchlight-footer" onclick="document.getElementsByName(theForm)[0].submit();">More...<div id="qsMoleculeDiv"><a onclick="event.stopPropagation();" href="https://www.fusionbot.com/default.asp?source=FB-162845571" target="_blank"><img id="qsMoleculeImg" title="Powered by FusionBot" src="/assets/templates/standish-responsive/fb/molecule.png" border=0></a></div></div>');
          $(tr).append(td);
          this._resultsContainer.children('table').append(tr);

        }

      }

    };


SearchLight.prototype.addResultCategory = function(name, results) {
        var first = true;
        for (var i = 0; i < results.length; i++) {
            var r = results[i];

            var tr = document.createElement('tr');
            $(tr).attr('class', 'searchlight-not-selected');

            //var th = document.createElement('th');
            var td = document.createElement('td');
            //$(th).html('<span class="searchlight-header-text"></span>');
            $(td).html('<span class="searchlight-result-text"></span>');
            //var th_d = th.firstChild;
            var td_d = td.firstChild;

            //if (first) {
            //    $(th_d).text(name);
            //    first = false;
            //}

            if (this._settings.showIcons) {
                var img = document.createElement('img');
                img.className = 'searchlight-result-icon';
                img.style.width = '50px';
                if(typeof noHeight == "undefined")
                  img.style.height = '50px';
                // If icon, then use that otherwise use blank
                img.src = r[2] ? r[2] : 'assets/templates/common/images/spacer.gif';
                $(td_d).append(img);
            }

            $(td_d).append("<span class=sl_title>" + r[1] + "</span>");
            if(!r[4] || 0 === r[4].length || r[4] == "-1") {
              $(td_d).append("<br><span align=left class=search-price>" + r[3] + "</span>");
            } else {
              if(typeof fbsource == "undefined")
                $(td_d).append("<br><span align=left class=search-price>" + r[3] + "</span>&nbsp;<img src='assets/templates/common/images/star" + r[4] + ".png'>");
              else
                $(td_d).append("<br><span align=left class=search-price>" + r[3] + "</span>&nbsp;<img src='http://images.fusionbot.com/" + r[4] + ".png'>");
            }

            //$(tr).append(th);
            $(tr).append(td);

            $(tr).bind('mousemove', {searchlight: this}, function(evt) {
                searchlight = evt.data.searchlight;
                searchlight.selectRow(this._rowId);
            });
            $(tr).bind('click', {searchlight: this}, function(evt) {
                searchlight = evt.data.searchlight;
                searchlight.activateRow(this._rowId);
            });

            tr._rowId = this._rowCount;
            tr._actionValue = r[0];
            this._resultsContainer.children('table').append(tr);
            this._rowCount++;
        }

        // Add spacer if this isn't the first category
        var tr = document.createElement('tr');
        //var th = document.createElement('th');
        var td = document.createElement('td');
        tr.className = 'searchlight-spacer-row';

        //$(tr).append(th);
        $(tr).append(td);
        this._resultsContainer.children('table').append(tr);

        this._categoryCount++;
    };


    SearchLight.prototype.selectRow = function(id) {
        this._selectedRow = id;

        this._resultsContainer.find('tr:not(.searchlight-spacer-row)').each(function(i) {
            if (this._rowId == id) {
                if (!$(this).hasClass('searchlight-selected')) {
                    $(this).removeClass('searchlight-not-selected');
                    $(this).addClass('searchlight-selected');
                }
            } else {
                if (!$(this).hasClass('searchlight-not-selected')) {
                    $(this).removeClass('searchlight-selected');
                    $(this).addClass('searchlight-not-selected');
                }
            }
        });
    };

    SearchLight.prototype.activateRow = function(id) {
        this.resultAction(this._resultsContainer.find('tr:not(.searchlight-spacer-row):eq('+ id +')')[0]._actionValue);
    }

    SearchLight.prototype.defaultResultAction = function(val) {
        window.location.href = val;
    };


    $.fn.searchlight = function(url, options) {
        this.each(function() {
            new SearchLight(this, url, options);
        });
    };
})(jQuery);

//custom callback function for ajax based searchlight / quicksearch (cross domain requires jsonp callbacks)
function jsonp_callback(results) {
  searchlight.clearResults();
  for (var i = 0; i < results.length; i++) {
    var r = results[i]
    if (r.results.length > 0) {
      searchlight.addResultCategory(r.title, r.results);
    }
  }
  searchlight.addFooter(r.results);

  //run custom stuff directly in search results template (file that instansiates search light), if desired.  Just include function in main template
  if (typeof slPostProcessing == 'function') {
    slPostProcessing();
  }

}