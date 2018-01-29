jQuery(document).ready(function ($) {
    $(document).on('change mouseover scroll', function (event) {
        addButton();
    }).on('mouseover', '._sxolz', function () {
        var $btn = $(this).find('.action-button'),
            href = 'javascript:void(0)';
        if ($btn.hasClass('easyinsta-image')) {
            //mouseover on img
            var $img = $(this).find('img');
            href = $img.attr('src');
        } else if ($btn.hasClass('easyinsta-video')) {
            //mouseover on vid
            var $vid = $(this).find('video');
            href = $vid.attr('src');
        }
        $btn.attr({
            'href': href,
            'download': ""
        });
        if ($btn.attr('href') !== "javascript:void(0)") {
            $btn.show();
        }
    }).on('mouseout', '._sxolz', function () {
        $(this).find('.action-button').hide();
    });

    function addButton() {
        $('div[class^="_e3il2 "]:not(:has(.easyinsta-image))')
            .prepend
            ('<a href="javascript:void(0)" class="action-button easyinsta-image" title="Download this image" style="display: none;">⤵</a>');
        $('._l6uaz:not(:has(.easyinsta-video))')
            .append('<div class="easyinsta-video"></div>')
            .closest('div:not([class])')
            .append
            ('<a href="javascript:void(0)" class="action-button easyinsta-video" title="Download this video"  style="display: none">⤵</a>');
    }
});
