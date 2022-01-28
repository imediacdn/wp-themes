var today = new Date(); 
var reload_expiry = new Date(today.getTime() + 365 * 24 * 3600 * 1000); // plus 365 days
function reload_set_cookie(name, id) {
    document.cookie = name + "=" + escape(document.getElementById(id).value) + "; path=/; expires=" + reload_expiry.toGMTString();
    console.log(document.cookie);
}

function reload_get_cookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
}

var tick_interval = reload_get_cookie("reload_minute");
if ( tick_interval == null ) tick_interval = tick_value / 60;
document.getElementById("reload_minute").value = tick_interval;
if ( !isNaN(tick_interval) && tick_interval > 0 ) {
	$(window).load(function() {
	    $("#progressbar").progressbar();
	    var tick_increment = 1;
	    var tick_function = function() {
	        var value = $("#progressbar").progressbar("option", "value");
	        value += tick_increment;
	        $("#progressbar").progressbar("option", "value", value);
	        if (value < 100) {
	            window.setTimeout(tick_function, tick_interval * 1000 / 100 * 60);
	        } else {
				window.location.reload(1);
	        }
	    };
	    window.setTimeout(tick_function, tick_interval * 1000  / 100 * 60);
	});
}

