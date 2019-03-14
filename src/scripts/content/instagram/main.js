import jQuery from 'jquery/dist/jquery.min';
import '../../../styles/button.css';

jQuery(document).ready(function ($) {
    const btn_html = '<a class="action-button" style="display: none;">⤵</a>';
    const $btn = $(btn_html);
    $btn.click(function (event) {
        event.preventDefault();
        chrome.runtime.sendMessage(
            {
                action: 'download',
                source: 'instagram',
                url: $(this).attr('href')
            });
    });
    $(document).on('mouseover', '._97aPb', function () {         //mouseover img or video
        console.log('in');
        // adding btn
        $(this).not('.action-button').append($btn);
        let href = 'javascript:void(0)';

        // case that post has many pics or videos => contains <ul> tag
        const $ul = $(this).find('ul.YlNGR');
        if ($ul.length > 0) {
            console.log('abc');
            // the active image/video <li> not contains class 'plVq-'
            const $activeli = $ul.find('li._-1_m6:not(:has(.plVq-))');
            href = $activeli.find('img').attr('src');
        } else {
            href = $(this).find('img').attr('src');
        }

        if ($(this).find('.KL4Bh').length > 0) { //is img
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
    }).on('mouseout', '._97aPb', function () {
        console.log('out');
        $(this).find('.action-button').hide();
    });

    $(document).on('mouseover', 'div[class*="coreSprite"]', function (event) {     //mouseover next/back picture btn
        event.stopPropagation();
    }).on('mouseover', 'span[class*="videoSprite"]', function (event) {    //mouseover play video btn
        /**
         *  B2xwy _3G0Ji  videoSpritePlayButton
         *  B2xwy _3G0Ji PTIMp videoSpritePlayButton
         */
        // if visible
        // currently drop
    });

    $(document).on('mouseover', '.qbCDp', function () {    //mouseover story
        console.log('mouse over stories');
        //adding btn
        if ($(this).find('.action-button:first').length === 0) {
            $(this).append($btn);
        }
        let href = 'javascript:void(0)';
        const $img = $(this).find("img");
        const $source = $(this).find("source:first");

        if ($source.length > 0 && $img.length > 0) {
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
    }).on('mouseout', '.qbCDp', function () {
        $(this).find('.action-button:first').hide();
    });
});
