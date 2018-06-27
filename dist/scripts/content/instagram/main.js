'use strict';

jQuery(document).ready(function ($) {
    var btn_html = '<a class="action-button" style="display: none;">⤵</a>';
    var $btn = $(btn_html);
    $btn.click(function (event) {
        event.preventDefault();
        chrome.runtime.sendMessage({
            action: 'download',
            source: 'instagram',
            url: $(this).attr('href')
        });
    });
    $(document).on('mouseover', '._97aPb ', function () {
        //mouseover img or video
        //adding btn
        $(this).find('div:not([class]):not(:has(.action-button)):last').prepend($btn);
        //
        var href = 'javascript:void(0)';
        if ($(this).find('div.KL4Bh').length > 0) {
            //is img
            href = $(this).find('img').attr('src');
            $btn.addClass('easyinsta-image');
            if ($btn.hasClass('easyinsta-video')) {
                $btn.removeClass('easyinsta-video');
            }
        } else {
            //is video
            href = $(this).find('video').attr('src');
            $btn.addClass('easyinsta-video');
            if ($btn.hasClass('easyinsta-image')) {
                $btn.removeClass('easyinsta-image');
            }
            //remove this one to activate mouseover event on play btn
            $('.QvAa1').remove();
        }
        $btn.attr({
            'href': href,
            'download': "",
            'title': 'Download this ' + ($btn.hasClass('easyinsta-image') ? 'Image' : 'Video')
        });
        if ($btn.attr('href') !== "javascript:void(0)") {
            $btn.show();
        }
    }).on('mouseout', '._97aPb ', function () {
        $(this).find('.action-button').hide();
    }).on('mouseover', 'a[class*="coreSprite"]', function (event) {
        //mouseover next/back picture btn
        event.stopPropagation();
    }).on('mouseover', 'a[class*="videoSprite"]', function (event) {
    // }).on('mouseover', '.QvAa1', function (event) {
        //mouseover play video btn
        /**
         *  B2xwy _3G0Ji  videoSpritePlayButton
         *  B2xwy _3G0Ji PTIMp videoSpritePlayButton
         */
        //if visible
        if ($(this).hasClass('PTIMp')) {
            event.stopPropagation();
        }
    }).on('mouseover', '.qbCDp', function () {
        //mouseover story
        //adding btn        
        $(this).prepend($btn);
        var href = 'javascript:void(0)',
            $img = $(this).find("img"),
            $source = $(this).find("source:first");
        if ($source.length > 0) {
            href = $source.attr('src'); //avc1.4D401E vs avc1.42E01E
            $btn.addClass('easyinsta-video');
        } else {
            href = $img.attr('src');
            $btn.addClass('easyinsta-image');
        }
        $btn.attr({
            'href': href,
            'download': "",
            'title': 'Download this ' + ($btn.hasClass('easyinsta-image') ? 'Image' : 'Video')
        });
        if ($btn.attr('href') !== "javascript:void(0)") {
            $btn.show();
        }
    }).on('mouseout', '.qbCDp', function () {
        $(this).find('.action-button:first').hide();
    });
});
//# sourceMappingURL=main.js.map