$(document).on('change mouseover scroll', function(event) {
    addButton();
});

function get_vid(target) {
    var parent = target.parent(); 
    var vid_div = parent.find("._qzesf");
    var vid = vid_div.find("video");
    var vid_href = vid.attr("src");
    return vid_href;
}

function get_img(target) {
    var parent = target.parent();
    var img_div = parent.find("._4rbun"); 
    var img = img_div.find("img");
    var img_href = img.attr("src");
    return img_href;
}


//mouse move on img
$(document).on('mousemove', "div[class^='_e3il2 ']", function(e) { //yes, it have space on the class's name
    var btn = $(this).find(".action-button");
    img_href = get_img($(e.target));
    btn.attr({
        "href": img_href,
        "download": ""
    });
    btn.show();
}).on('mouseout', "div[class^='_e3il2 ']", function() { //yes, it have space on the class's name
    $(this).find(".action-button").hide();
});

//mouse move on vid
$(document).on('mouseover', '._gwyj6', function(e) {
    var btn = $(this).find(".action-button");
    vid_href = get_vid($(e.target));
    btn.attr({
        "href": vid_href,
        "download": ""
    });
    btn.show();
}).on('mouseout', '._gwyj6', function() {
    $(this).find(".action-button").hide();
});


function addButton() {
    $("div[class^='_e3il2 ']:not(:has(>.instaget-image))").
    	prepend('<a href="javascript:void(0)" class="action-button shadow animate green instaget-image" title="Down this image" style="display: none;">⤵</a>');
    $('._l6uaz:not(:has(>.instaget-video))').
	    append('<div class="instaget-video"></div>').
		    parent().
		    parent().
		    parent().
		    parent().
		    parent().
		    parent().
	    		append('<a href="javascript:void(0)" class="action-button shadow animate red instaget-video" title="Down this video"  style="display: none;">⤵</a>');
}