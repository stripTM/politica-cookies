var setCookie = function (name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/";
}
var getCookie = function(name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(name + "=");
		if (c_start != -1) {
			c_start = c_start + name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return null;
}
var politicaCookies = function() {
	var fCaducidad = new Date();
	var dominio = "." + location.hostname.split('.').slice(-2).join('.');
	fCaducidad.setDate(fCaducidad.getDate() + 666); /* Hacemos que la aceptación de la política sirva 666 días */
	setCookie('politica_cookies', "1", {path : "/", expires : fCaducidad, domain : dominio});
	jQuery("html").addClass("polcookie_s").removeClass("polcookie_n");
	jQuery(window).unbind("click", politicaCookies);
}

if(getCookie('politica_cookies') === "1") {
	jQuery("html").addClass("polcookie_s");
}
else {
	jQuery("html").addClass("polcookie_n")
	jQuery(window).bind("click", politicaCookies);
}