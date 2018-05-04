jQuery(document).ready(function ($) {
    let btn_html = '<a class="action-button" style="display: none;">⤵</a>';
    $(document).on('mouseover', '._sxolz', function () {         //mouseover img or video
        //adding btn
        $(this).find('div:not([class]):not(:has(.action-button)):last')
            .prepend(btn_html);
        //
        let href = 'javascript:void(0)',
            $btn = $(this).find('.action-button');
        if ($(this).find('div[class^="_e3il2 "]').length > 0) { //is img
            href = $(this).find('img').attr('src');
            $btn.addClass('easyinsta-image');
            if ($btn.hasClass('easyinsta-video')) {
                $btn.removeClass('easyinsta-video');
            }
        } else { //is video
            href = $(this).find('video').attr('src');
            $btn.addClass('easyinsta-video');
            if ($btn.hasClass('easyinsta-image')) {
                $btn.removeClass('easyinsta-image');
            }
        }
        $btn.attr({
            'href': href,
            'download': "",
            'title': `Download this ${$btn.hasClass('easyinsta-image') ? 'Image' : 'Video'}`
        });
        if ($btn.attr('href') !== "javascript:void(0)") {
            $btn.show();
        }
    }).on('mouseout', '._sxolz', function () {
        $(this).find('.action-button').hide();
    }).on('mouseover', 'a[class*="coreSprite"]', function (event) {     //mouseover next/back picture btn
        event.stopPropagation();
    }).on('mouseover', 'a[class*="videoSprite"]', function (event) {    //mouseover play video btn
        /**
         *  _v7u5u _pqxoc videoSpritePlayButton
         *  _v7u5u _pqxoc _75c7w videoSpritePlayButton
         */
        //if visible
        if ($(this).hasClass('_75c7w')) {
            event.stopPropagation();
        }
    }).on('mouseover', '._r1f36, ._te9am', function () {    //mouseover story
        //adding btn
        $(this).find('._jtktu:not(:has(.action-button))')
            .prepend(btn_html);
        let href = 'javascript:void(0)',
            $btn = $(this).find('.action-button:first'),
            $img = $(this).find("img"),
            $source = $(this).find("source:first");
        if ($source.length > 0) {
            href = $source.attr('src');        //avc1.4D401E vs avc1.42E01E
            $btn.addClass('easyinsta-video');
        } else {
            href = $img.attr('src');
            $btn.addClass('easyinsta-image');
        }
        $btn.attr({
            'href': href,
            'download': "",
            'title': `Download this ${$btn.hasClass('easyinsta-image') ? 'Image' : 'Video'}`
        });
        if ($btn.attr('href') !== "javascript:void(0)") {
            $btn.show();
        }
    }).on('mouseout', '._r1f36, ._te9am', function () {
        $(this).find('.action-button:first').hide();
    });
});
