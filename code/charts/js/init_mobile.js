var device = {
    
    detect: function(key) {
	if(this['_'+key] === undefined) {
	    this['_'+key] = navigator.userAgent.match(new RegExp(key, 'i'));
	}
	return this['_'+key];
    },

    iDevice: function() {
	return this.detect('iPhone') || this.detect('iPod');
    },

    android: function() {
	return this.detect('Android');
    },

    webOS: function() {
	return this.detect('webOS');
    },

    mobile: function() {
	return this.iDevice() || this.android() || this.webOS();
    }
};

if(device.mobile() != null){
    alert( device.mobile() );
    var jq_mob_js = document.createElement("script");
    jq_mob_js.setAttribute("src", "http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js");
    jq_mob_js.setAttribute("type", "text/javascript");
    $("body").append(jq_mob_js);

    var mob_js = document.createElement("script");
    mob_js.setAttribute("src", "/js/mobile.js");
    mob_js.setAttribute("type", "text/javascript");
    $("body").append(mob_js);
}
