(function($){$(window).scroll(function(){if($(this).scrollTop()>500){$(".back-to-top").addClass("show-back-to-top")}else{$(".back-to-top").removeClass("show-back-to-top")}});$(".back-to-top").click(function(){$("html, body").animate({scrollTop:0},800);return false});$(".menu-toggle").click(function(){$("#hidden-header").slideToggle("slow")});$(".search-toggle").click(function(){$("#hidden-header").slideToggle("slow")});$(window).on("resize",function(){var windowWidth=window.innerWidth;if(windowWidth>=800){$("#hidden-header").hide();$("#page").removeClass("menu-toggled")}}).trigger("resize");$(".menu-item-has-children").on("focusin focusout",function(){$(this).toggleClass("focus")});$(".search-toggle").click(function(){$(this).toggleClass("toggled");if($(this).hasClass("toggled")){$("#desktop-search input").focus()}$(".search-toggle").on("blur",function(){$("#desktop-search input").focus()});$("#desktop-search .search-submit").on("blur",function(){$(".search-toggle").focus()})});$(".menu-toggle").click(function(){$(".menu-toggle").on("blur",function(){$("#mobile-navigation").find("a:eq(0)").focus()});$("#mobile-navigation .search-submit").on("blur",function(){$(".menu-toggle").focus()})});if($("body").hasClass("fullscreen-slider")){$("#masthead").wrap("<div class='wrapper'></div>");$("#colophon").wrap("<div class='wrapper'></div>")}$(window).load(function(){var optionOne=apertureSlider.aperture_animation;var optionTwo=apertureSlider.aperture_direction;var optionThree=(apertureSlider.aperture_slideshow==="true");var optionFour=parseInt(apertureSlider.aperture_sliderspeed);$(".flexslider").flexslider({animation:optionOne,direction:optionTwo,slideshow:optionThree,slideshowSpeed:optionFour,controlNav:false,})})})(jQuery);(function(){var container,button,menu;container=document.getElementById("page");if(!container){return}button=container.getElementsByTagName("button")[2];if("undefined"===typeof button){return}menu=container.getElementsByTagName("nav")[0];if("undefined"===typeof menu){button.style.display="none";return}menu.setAttribute("aria-expanded","false");if(-1===menu.className.indexOf("nav-menu")){menu.className+=" nav-menu"}button.onclick=function(){if(-1!==container.className.indexOf("menu-toggled")){container.className=container.className.replace(" menu-toggled","");button.setAttribute("aria-expanded","false");menu.setAttribute("aria-expanded","false")}else{container.className+=" menu-toggled";button.setAttribute("aria-expanded","true");menu.setAttribute("aria-expanded","true")}}})();