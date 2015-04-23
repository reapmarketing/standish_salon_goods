
//*******SCROLL TRACKING CODE*****
jQuery(function($) {
    // Debug flag
    var debugMode = true;

    // Default time delay before checking location
    var callBackTime = 100;

    // # px before tracking a reader
    var readerLocation = 150;

    // Set some flags for tracking & execution
    var timer = 0;
    var scroller = false;
    var endContent = false;
    var didComplete = false;

    // Set some time variables to calculate reading time
    var startTime = new Date();
    var beginning = startTime.getTime();
    var totalTime = 0;
    
    // Get some information about the current page
    var pageTitle = document.title;

    // Track the aticle load
    if (!debugMode) {
        ga('send', 'event', 'Reading', 'ArticleLoaded', pageTitle, {'nonInteraction': 1});
    } else {
    }

    // Check the location and track user
    function trackLocation() {
        bottom = $(window).height() + $(window).scrollTop();
        height = $(document).height();

        // If user starts to scroll send an event
        if (bottom > readerLocation && !scroller) {
            currentTime = new Date();
            scrollStart = currentTime.getTime();
            timeToScroll = Math.round((scrollStart - beginning) / 1000);
            if (!debugMode) {
                ga('send', 'event', 'Scroll', 'StartReading', pageTitle, timeToScroll, {'metric1' : timeToScroll});
            } else {
                ga('send', 'event', 'Scroll', 'StartReading', pageTitle, timeToScroll, {'metric1' : timeToScroll});
            }
            scroller = true;
        }

        // If user has hit the bottom of the content send an event
        if (bottom >= $('.product-details').scrollTop() + $('.product-details').innerHeight() && !endContent) {
            currentTime = new Date();
            contentScrollEnd = currentTime.getTime();
            timeToContentEnd = Math.round((contentScrollEnd - scrollStart) / 1000);
            if (!debugMode) {
                 if (timeToContentEnd < 60) {
                    ga('set', 'dimension5', 'Scanner'); 
                } else {
                    ga('set', 'dimension5', 'Reader'); 
                }
                ga('send', 'event', 'Scroll', 'ContentBottom', pageTitle, timeToContentEnd, {'metric2' : timeToContentEnd});
            } else {
               ga('send', 'event', 'Scroll', 'ContentBottom', pageTitle, timeToContentEnd, {'metric2' : timeToContentEnd});
            }
            endContent = true;
        }

        // If user has hit the bottom of page send an event
        if (bottom >= height && !didComplete) {
            currentTime = new Date();
            end = currentTime.getTime();
            totalTime = Math.round((end - scrollStart) / 1000);
            if (!debugMode) {
                ga('send', 'event', 'Scroll', 'PageBottom', pageTitle, totalTime, {'metric3' : totalTime});
            } else {
                ga('send', 'event', 'Scroll', 'PageBottom', pageTitle, totalTime, {'metric3' : totalTime});
            }
            didComplete = true;
        }
    }

    // Track the scrolling and track location
    $(window).scroll(function() {
        if (timer) {
            clearTimeout(timer);
        }

        // Use a buffer so we don't call trackLocation too often.
        timer = setTimeout(trackLocation, callBackTime);
    });
});