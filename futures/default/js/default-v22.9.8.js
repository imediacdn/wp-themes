//enquire.min.js enquire v1.5.3 - Awesome Media Queries in JavaScript https://www.github.com/WickyNilliams/enquire.js
window.enquire=function(e){"use strict";function t(e,t){var n=0,r=e.length,i;for(n;n<r;n++){i=t(e[n],n);if(i===!1)break}}function n(e){return Object.prototype.toString.apply(e)==="[object Array]"}function r(e){return typeof e=="function"}function i(e){this.initialised=!1,this.options=e,e.deferSetup||this.setup()}function s(e,t){this.query=e,this.isUnconditional=t,this.handlers=[],this.matched=!1}function o(){if(!e)throw new Error("matchMedia is required");var t=new s("only all");this.queries={},this.listening=!1,this.browserIsIncapable=!t.matchMedia()}return i.prototype={setup:function(e){this.options.setup&&this.options.setup(e),this.initialised=!0},on:function(e){this.initialised||this.setup(e),this.options.match(e)},off:function(e){this.options.unmatch&&this.options.unmatch(e)},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(e){return this.options===e||this.options.match===e}},s.prototype={matchMedia:function(){return e(this.query).matches},addHandler:function(e,t){var n=new i(e);this.handlers.push(n),t&&this.matched&&n.on()},removeHandler:function(e){var n=this.handlers;t(n,function(t,r){if(t.equals(e))return t.destroy(),!n.splice(r,1)})},assess:function(e){this.matchMedia()||this.isUnconditional?this.match(e):this.unmatch(e)},match:function(e){if(this.matched)return;t(this.handlers,function(t){t.on(e)}),this.matched=!0},unmatch:function(e){if(!this.matched)return;t(this.handlers,function(t){t.off(e)}),this.matched=!1}},o.prototype={register:function(e,i,o){var u=this.queries,a=o&&this.browserIsIncapable,f=this.listening;return u.hasOwnProperty(e)||(u[e]=new s(e,a),this.listening&&u[e].assess()),r(i)&&(i={match:i}),n(i)||(i=[i]),t(i,function(t){u[e].addHandler(t,f)}),this},unregister:function(e,n){var r=this.queries;return r.hasOwnProperty(e)?(n?r[e].removeHandler(n):(t(this.queries[e].handlers,function(e){e.destroy()}),delete r[e]),this):this},fire:function(e){var t=this.queries,n;for(n in t)t.hasOwnProperty(n)&&t[n].assess(e);return this},listen:function(e){function s(t){var n;r(t,function(t){n&&clearTimeout(n),n=setTimeout(function(){i.fire(t)},e)})}var t="resize",n="orientationChange",r=window.addEventListener||window.attachEvent,i=this;return e=e||500,window.attachEvent&&(t="on"+t,n="on"+n),this.listening?this:(i.fire(),s(t),s(n),this.listening=!0,this)}},new o}(window.matchMedia);

//jquery.nanoscroller.min.js
(function(d,i,j){var k,h,l,m;l={paneClass:"pane",sliderClass:"slider",contentClass:"content",iOSNativeScrolling:!1,preventPageScrolling:!1,disableResize:!1,alwaysVisible:!1,flashDelay:1500,sliderMinHeight:20,sliderMaxHeight:null};k="Microsoft Internet Explorer"===i.navigator.appName&&/msie 7./i.test(i.navigator.appVersion)&&i.ActiveXObject;h=null;m=function(){var a,b;a=j.createElement("div");b=a.style;b.position="absolute";b.width="100px";b.height="100px";b.overflow="scroll";b.top="-9999px";j.body.appendChild(a);
b=a.offsetWidth-a.clientWidth;j.body.removeChild(a);return b};var c=function(a,b){this.el=a;this.options=b;h||(h=m());this.$el=d(this.el);this.doc=d(j);this.win=d(i);this.generate();this.createEvents();this.addEvents();this.reset()};c.prototype.preventScrolling=function(a,b){this.isActive&&("DOMMouseScroll"===a.type?("down"===b&&0<a.originalEvent.detail||"up"===b&&0>a.originalEvent.detail)&&a.preventDefault():"mousewheel"===a.type&&a.originalEvent&&a.originalEvent.wheelDelta&&("down"===b&&0>a.originalEvent.wheelDelta||
"up"===b&&0<a.originalEvent.wheelDelta)&&a.preventDefault())};c.prototype.updateScrollValues=function(){var a;a=this.content;this.maxScrollTop=a.scrollHeight-a.clientHeight;this.contentScrollTop=a.scrollTop;this.maxSliderTop=this.paneHeight-this.sliderHeight;this.sliderTop=this.contentScrollTop*this.maxSliderTop/this.maxScrollTop};c.prototype.createEvents=function(){var a=this;this.events={down:function(b){a.isBeingDragged=!0;a.offsetY=b.pageY-a.slider.offset().top;a.pane.addClass("active");a.doc.bind("mousemove",
a.events.drag).bind("mouseup",a.events.up);return!1},drag:function(b){a.sliderY=b.pageY-a.$el.offset().top-a.offsetY;a.scroll();a.updateScrollValues();a.contentScrollTop>=a.maxScrollTop?a.$el.trigger("scrollend"):0===a.contentScrollTop&&a.$el.trigger("scrolltop");return!1},up:function(){a.isBeingDragged=!1;a.pane.removeClass("active");a.doc.unbind("mousemove",a.events.drag).unbind("mouseup",a.events.up);return!1},resize:function(){a.reset()},panedown:function(b){a.sliderY=(b.offsetY||b.originalEvent.layerY)-
0.5*a.sliderHeight;a.scroll();a.events.down(b);return!1},scroll:function(b){a.isBeingDragged||(a.updateScrollValues(),a.sliderY=a.sliderTop,a.slider.css({top:a.sliderTop}),null!=b&&(a.contentScrollTop>=a.maxScrollTop?(a.options.preventPageScrolling&&a.preventScrolling(b,"down"),a.$el.trigger("scrollend")):0===a.contentScrollTop&&(a.options.preventPageScrolling&&a.preventScrolling(b,"up"),a.$el.trigger("scrolltop"))))},wheel:function(b){if(null!=b)return a.sliderY+=-b.wheelDeltaY||-b.delta,a.scroll(),
!1}}};c.prototype.addEvents=function(){var a;this.removeEvents();a=this.events;this.options.disableResize||this.win.bind("resize",a.resize);this.slider.bind("mousedown",a.down);this.pane.bind("mousedown",a.panedown).bind("mousewheel DOMMouseScroll",a.wheel);this.$content.bind("scroll mousewheel DOMMouseScroll touchmove",a.scroll)};c.prototype.removeEvents=function(){var a;a=this.events;this.win.unbind("resize",a.resize);this.slider.unbind();this.pane.unbind();this.$content.unbind("scroll mousewheel DOMMouseScroll touchmove",
a.scroll)};c.prototype.generate=function(){var a,b,c,g,e;c=this.options;g=c.paneClass;e=c.sliderClass;a=c.contentClass;!this.$el.find(""+g).length&&!this.$el.find(""+e).length&&this.$el.append('<div class="'+g+'"><div class="'+e+'" /></div>');this.$content=this.$el.children("."+a);this.$content.attr("tabindex",0);this.content=this.$content[0];this.slider=this.$el.find("."+e);this.pane=this.$el.find("."+g);h&&(b={right:-h},this.$el.addClass("has-scrollbar"));c.iOSNativeScrolling&&(b||(b={}),b.WebkitOverflowScrolling=
"touch");null!=b&&this.$content.css(b);return this};c.prototype.restore=function(){this.stopped=!1;this.pane.show();return this.addEvents()};c.prototype.reset=function(){var a,b,c,g,e,d,f;this.$el.find("."+this.options.paneClass).length||this.generate().stop();this.stopped&&this.restore();a=this.content;c=a.style;g=c.overflowY;k&&this.$content.css({height:this.$content.height()});b=a.scrollHeight+h;d=this.pane.outerHeight();f=parseInt(this.pane.css("top"),10);e=parseInt(this.pane.css("bottom"),10);
e=d+f+e;f=Math.round(e/b*e);f<this.options.sliderMinHeight?f=this.options.sliderMinHeight:null!=this.options.sliderMaxHeight&&f>this.options.sliderMaxHeight&&(f=this.options.sliderMaxHeight);"scroll"===g&&"scroll"!==c.overflowX&&(f+=h);this.maxSliderTop=e-f;this.contentHeight=b;this.paneHeight=d;this.paneOuterHeight=e;this.sliderHeight=f;this.slider.height(f);this.events.scroll();this.pane.show();this.isActive=!0;a.scrollHeight===a.clientHeight||this.pane.outerHeight(!0)>=a.scrollHeight&&"scroll"!==
g?(this.pane.hide(),this.isActive=!1):this.el.clientHeight===a.scrollHeight&&"scroll"===g?this.slider.hide():this.slider.show();this.options.alwaysVisible?this.pane.css({opacity:1,visibility:"visible"}):this.pane.css({opacity:"",visibility:""});return this};c.prototype.scroll=function(){this.sliderY=Math.max(0,this.sliderY);this.sliderY=Math.min(this.maxSliderTop,this.sliderY);this.$content.scrollTop(-1*((this.paneHeight-this.contentHeight+h)*this.sliderY/this.maxSliderTop));this.slider.css({top:this.sliderY});
return this};c.prototype.scrollBottom=function(a){this.reset();this.$content.scrollTop(this.contentHeight-this.$content.height()-a).trigger("mousewheel");return this};c.prototype.scrollTop=function(a){this.reset();this.$content.scrollTop(+a).trigger("mousewheel");return this};c.prototype.scrollTo=function(a){this.reset();a=d(a).offset().top;a>this.maxSliderTop&&(a/=this.contentHeight,this.sliderY=a*=this.maxSliderTop,this.scroll());return this};c.prototype.stop=function(){this.stopped=!0;this.removeEvents();
this.pane.hide();return this};c.prototype.flash=function(){var a=this;this.reset();this.pane.addClass("flashed");setTimeout(function(){a.pane.removeClass("flashed")},this.options.flashDelay);return this};d.fn.nanoScroller=function(a){return this.each(function(){var b;if(!(b=this.nanoscroller))b=d.extend({},l,a),this.nanoscroller=b=new c(this,b);if(a&&"object"===typeof a){d.extend(b.options,a);if(a.scrollBottom)return b.scrollBottom(a.scrollBottom);if(a.scrollTop)return b.scrollTop(a.scrollTop);if(a.scrollTo)return b.scrollTo(a.scrollTo);
if("bottom"===a.scroll)return b.scrollBottom(0);if("top"===a.scroll)return b.scrollTop(0);if(a.scroll&&a.scroll instanceof d)return b.scrollTo(a.scroll);if(a.stop)return b.stop();if(a.flash)return b.flash()}return b.reset()})}})(jQuery,window,document);

//jquery.infinitescroll.min.js Infinite Scroll https://github.com/paulirish/infinitescroll + version 2.0b2.110713 + Documentation: http://infinite-scroll.com/
(function(window,$,undefined){$.infinitescroll=function infscr(options,callback,element){this.element=$(element);this._create(options,callback);};$.infinitescroll.defaults={loading:{finished:undefined,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"http://www.infinite-scroll.com/loading.gif",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:'fast',start:undefined},state:{isDuringAjax:false,isInvalidPage:false,isDestroyed:false,isDone:false,isPaused:false,currPage:1},callback:undefined,debug:false,behavior:undefined,binder:$(window),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:false,pathParse:undefined,dataType:'html',appendCallback:true,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:undefined,path:undefined};$.infinitescroll.prototype={_binding:function infscr_binding(binding){var instance=this,opts=instance.options;if(!!opts.behavior&&this['_binding_'+opts.behavior]!==undefined){this['_binding_'+opts.behavior].call(this);return;}
if(binding!=='bind'&&binding!=='unbind'){this._debug('Binding value  '+binding+' not valid')
return false;}
if(binding=='unbind'){(this.options.binder).unbind('smartscroll.infscr.'+instance.options.infid);}else{(this.options.binder)[binding]('smartscroll.infscr.'+instance.options.infid,function(){instance.scroll();});};this._debug('Binding',binding);},_create:function infscr_create(options,callback){if(!this._validate(options)){return false;}
var opts=this.options=$.extend(true,{},$.infinitescroll.defaults,options),relurl=/(.*?\/\/).*?(\/.*)/,path=$(opts.nextSelector).attr('href');opts.contentSelector=opts.contentSelector||this.element;opts.loading.selector=opts.loading.selector||opts.contentSelector;if(!path){this._debug('Navigation selector not found');return;}
opts.path=this._determinepath(path);opts.loading.msg=$('<div id="infscr-loading"><img alt="Loading..." src="'+opts.loading.img+'" /><div>'+opts.loading.msgText+'</div></div>');(new Image()).src=opts.loading.img;opts.pixelsFromNavToBottom=$(document).height()-$(opts.navSelector).offset().top;opts.loading.start=opts.loading.start||function(){$(opts.navSelector).hide();opts.loading.msg.appendTo(opts.loading.selector).show(opts.loading.speed,function(){beginAjax(opts);});};opts.loading.finished=opts.loading.finished||function(){opts.loading.msg.fadeOut('normal');};opts.callback=function(instance,data){if(!!opts.behavior&&instance['_callback_'+opts.behavior]!==undefined){instance['_callback_'+opts.behavior].call($(opts.contentSelector)[0],data);}
if(callback){callback.call($(opts.contentSelector)[0],data);}};this._setup();},_debug:function infscr_debug(){if(this.options.debug){return window.console&&console.log.call(console,arguments);}},_determinepath:function infscr_determinepath(path){var opts=this.options;if(!!opts.behavior&&this['_determinepath_'+opts.behavior]!==undefined){this['_determinepath_'+opts.behavior].call(this,path);return;}
if(!!opts.pathParse){this._debug('pathParse manual');return opts.pathParse;}else if(path.match(/^(.*?)\b2\b(.*?$)/)){path=path.match(/^(.*?)\b2\b(.*?$)/).slice(1);}else if(path.match(/^(.*?)2(.*?$)/)){if(path.match(/^(.*?page=)2(\/.*|$)/)){path=path.match(/^(.*?page=)2(\/.*|$)/).slice(1);return path;}
path=path.match(/^(.*?)2(.*?$)/).slice(1);}else{if(path.match(/^(.*?page=)1(\/.*|$)/)){path=path.match(/^(.*?page=)1(\/.*|$)/).slice(1);return path;}else{this._debug('Sorry, we couldn\'t parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.');opts.state.isInvalidPage=true;}}
this._debug('determinePath',path);return path;},_error:function infscr_error(xhr){var opts=this.options;if(!!opts.behavior&&this['_error_'+opts.behavior]!==undefined){this['_error_'+opts.behavior].call(this,xhr);return;}
if(xhr!=='destroy'&&xhr!=='end'){xhr='unknown';}
this._debug('Error',xhr);if(xhr=='end'){this._showdonemsg();}
opts.state.isDone=true;opts.state.currPage=1;opts.state.isPaused=false;this._binding('unbind');},_loadcallback:function infscr_loadcallback(box,data){var opts=this.options,callback=this.options.callback,result=(opts.state.isDone)?'done':(!opts.appendCallback)?'no-append':'append',frag;if(!!opts.behavior&&this['_loadcallback_'+opts.behavior]!==undefined){this['_loadcallback_'+opts.behavior].call(this,box,data);return;}
switch(result){case'done':this._showdonemsg();return false;break;case'no-append':if(opts.dataType=='html'){data='<div>'+data+'</div>';data=$(data).find(opts.itemSelector);};break;case'append':var children=box.children();if(children.length==0){return this._error('end');}
frag=document.createDocumentFragment();while(box[0].firstChild){frag.appendChild(box[0].firstChild);}
this._debug('contentSelector',$(opts.contentSelector)[0])
$(opts.contentSelector)[0].appendChild(frag);data=children.get();break;}
opts.loading.finished.call($(opts.contentSelector)[0],opts)
if(opts.animate){var scrollTo=$(window).scrollTop()+$('#infscr-loading').height()+opts.extraScrollPx+'px';$('html,body').animate({scrollTop:scrollTo},800,function(){opts.state.isDuringAjax=false;});}
if(!opts.animate)opts.state.isDuringAjax=false;callback(this,data);},_nearbottom:function infscr_nearbottom(){var opts=this.options,pixelsFromWindowBottomToBottom=0+$(document).height()-(opts.binder.scrollTop())-$(window).height();if(!!opts.behavior&&this['_nearbottom_'+opts.behavior]!==undefined){this['_nearbottom_'+opts.behavior].call(this);return;}
this._debug('math:',pixelsFromWindowBottomToBottom,opts.pixelsFromNavToBottom);return(pixelsFromWindowBottomToBottom-opts.bufferPx<opts.pixelsFromNavToBottom);},_pausing:function infscr_pausing(pause){var opts=this.options;if(!!opts.behavior&&this['_pausing_'+opts.behavior]!==undefined){this['_pausing_'+opts.behavior].call(this,pause);return;}
if(pause!=='pause'&&pause!=='resume'&&pause!==null){this._debug('Invalid argument. Toggling pause value instead');};pause=(pause&&(pause=='pause'||pause=='resume'))?pause:'toggle';switch(pause){case'pause':opts.state.isPaused=true;break;case'resume':opts.state.isPaused=false;break;case'toggle':opts.state.isPaused=!opts.state.isPaused;break;}
this._debug('Paused',opts.state.isPaused);return false;},_setup:function infscr_setup(){var opts=this.options;if(!!opts.behavior&&this['_setup_'+opts.behavior]!==undefined){this['_setup_'+opts.behavior].call(this);return;}
this._binding('bind');return false;},_showdonemsg:function infscr_showdonemsg(){var opts=this.options;if(!!opts.behavior&&this['_showdonemsg_'+opts.behavior]!==undefined){this['_showdonemsg_'+opts.behavior].call(this);return;}
opts.loading.msg.find('img').hide().parent().find('div').html(opts.loading.finishedMsg).animate({opacity:1},2000,function(){$(this).parent().fadeOut('normal');});opts.errorCallback.call($(opts.contentSelector)[0],'done');},_validate:function infscr_validate(opts){for(var key in opts){if(key.indexOf&&key.indexOf('Selector')>-1&&$(opts[key]).length===0){this._debug('Your '+key+' found no elements.');return false;}
return true;}},bind:function infscr_bind(){this._binding('bind');},destroy:function infscr_destroy(){this.options.state.isDestroyed=true;return this._error('destroy');},pause:function infscr_pause(){this._pausing('pause');},resume:function infscr_resume(){this._pausing('resume');},retrieve:function infscr_retrieve(pageNum){var instance=this,opts=instance.options,path=opts.path,box,frag,desturl,method,condition,pageNum=pageNum||null,getPage=(!!pageNum)?pageNum:opts.state.currPage;beginAjax=function infscr_ajax(opts){opts.state.currPage++;instance._debug('heading into ajax',path);box=$(opts.contentSelector).is('table')?$('<tbody/>'):$('<div/>');desturl=path.join(opts.state.currPage);method=(opts.dataType=='html'||opts.dataType=='json')?opts.dataType:'html+callback';if(opts.appendCallback&&opts.dataType=='html')method+='+callback'
switch(method){case'html+callback':instance._debug('Using HTML via .load() method');box.load(desturl+' '+opts.itemSelector,null,function infscr_ajax_callback(responseText){instance._loadcallback(box,responseText);});break;case'html':case'json':instance._debug('Using '+(method.toUpperCase())+' via $.ajax() method');$.ajax({url:desturl,dataType:opts.dataType,complete:function infscr_ajax_callback(jqXHR,textStatus){condition=(typeof(jqXHR.isResolved)!=='undefined')?(jqXHR.isResolved()):(textStatus==="success"||textStatus==="notmodified");(condition)?instance._loadcallback(box,jqXHR.responseText):instance._error('end');}});break;}};if(!!opts.behavior&&this['retrieve_'+opts.behavior]!==undefined){this['retrieve_'+opts.behavior].call(this,pageNum);return;}
if(opts.state.isDestroyed){this._debug('Instance is destroyed');return false;};opts.state.isDuringAjax=true;opts.loading.start.call($(opts.contentSelector)[0],opts);},scroll:function infscr_scroll(){var opts=this.options,state=opts.state;if(!!opts.behavior&&this['scroll_'+opts.behavior]!==undefined){this['scroll_'+opts.behavior].call(this);return;}
if(state.isDuringAjax||state.isInvalidPage||state.isDone||state.isDestroyed||state.isPaused)return;if(!this._nearbottom())return;this.retrieve();},toggle:function infscr_toggle(){this._pausing();},unbind:function infscr_unbind(){this._binding('unbind');},update:function infscr_options(key){if($.isPlainObject(key)){this.options=$.extend(true,this.options,key);}}}
$.fn.infinitescroll=function infscr_init(options,callback){var thisCall=typeof options;switch(thisCall){case'string':var args=Array.prototype.slice.call(arguments,1);this.each(function(){var instance=$.data(this,'infinitescroll');if(!instance){return false;}
if(!$.isFunction(instance[options])||options.charAt(0)==="_"){return false;}
instance[options].apply(instance,args);});break;case'object':this.each(function(){var instance=$.data(this,'infinitescroll');if(instance){instance.update(options);}else{$.data(this,'infinitescroll',new $.infinitescroll(options,callback,this));}});break;}
return this;};var event=$.event,scrollTimeout;event.special.smartscroll={setup:function(){$(this).bind("scroll",event.special.smartscroll.handler);},teardown:function(){$(this).unbind("scroll",event.special.smartscroll.handler);},handler:function(event,execAsap){var context=this,args=arguments;event.type="smartscroll";if(scrollTimeout){clearTimeout(scrollTimeout);}
scrollTimeout=setTimeout(function(){$.event.handle.apply(context,args);},execAsap==="execAsap"?0:100);}};$.fn.smartscroll=function(fn){return fn?this.bind("smartscroll",fn):this.trigger("smartscroll",["execAsap"]);};})(window,jQuery);

// Custom JS Start
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

// provides cross-browser focusin and focusout events
// IE has native support, in other browsers, use event caputuring (neither bubbles)

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	// only implement if not provided by jQuery core (since 1.4)
	// TODO verify if jQuery 1.4's implementation is compatible with older jQuery special-event APIs
	if (!jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener) {
		$.each({
			focus: 'focusin',
			blur: 'focusout'
		}, function( original, fix ){
			$.event.special[fix] = {
				setup:function() {
					this.addEventListener( original, handler, true );
				},
				teardown:function() {
					this.removeEventListener( original, handler, true );
				},
				handler: function(e) {
					var args = arguments;
					args[0] = $.event.fix(e);
					args[0].type = fix;
					return $.event.handle.apply(this, args);
				}
			};
			function handler(e) {
				e = $.event.fix(e);
				e.type = fix;
				return $.event.handle.call(this, e);
			}
		});
	}
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));
