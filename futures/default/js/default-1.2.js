jQuery(document).ready(function(i) {
    i("tr.clickable").click(function() {
        var c = i(this).find("a").attr("href");
        c && (window.location = c)
    })
});

jQuery(document).ready(function( $ ) {
		//Infinite Scroll
		if ((default_js_vars.infinite_scroll) == 'disabled') { } else {
			$('.posts').infinitescroll({
			      loading: {
			          msgText: "...loading more posts...",
			          finishedMsg: "- All posts loaded -"
			      },
			      nextSelector: '.post-nav-right a',
			      navSelector: '.post-nav',
			      itemSelector: 'article',
			      contentSelector: '.posts',
			      appendCallback: true
			},function () { fitvids(); flex(); });
		}


		//Replace Scrollbars
		enquire.register("screen and (min-width: 1024px)", function() {

	        $('.nano').toggleClass('overthrow navigation-content');

	        $(".navigation-content").nanoScroller({
		    	contentClass: 'navigation-inner',
		    	preventPageScrolling: 'true',
		    });

	    }).listen();

	    enquire.register("screen and (max-width: 1024px)", function() {
	        $('.nano').removeClass('overthrow navigation-content');
	    }).listen();


	    //Menu Toggle
		$(".menu-toggle").click(function() {
		  $(".header-nav, .header .widgets").slideToggle(100);
		  return false;
		});

		$( window ).resize( function() {
			var browserWidth = $( window ).width();

			if ( browserWidth > 1024 ) {
				$(".header-nav, .header .widgets").show();
			}
		} );

});

/*  Table odd row class */
$('table tr:odd').addClass('alt');

/*  Initiate Accordion */
$(document).ready(function($) {
	$('#accordion').find('.accordion-toggle').click(function(){
	  //Expand or collapse this panel
	  $(this).next().slideToggle('fast');
	  //Hide the other panels
	  $(".accordion-content").not($(this).next()).slideUp('fast');
	});
});




// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

