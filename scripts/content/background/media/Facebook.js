chrome.webRequest.onResponseStarted.addListener(function (data) {

    if (!data || data.tabId < 0) return false;

    chrome.tabs.get(data.tabId, function (tab) {

        if (chrome.runtime.lastError) {
            //console.log(chrome.runtime.lastError.message);
        }
        else if (!tab) {
            console.log(data);
        }
        else {
            data.tab = tab;
            var tabId = tab.id;
            if (/^https?:\/\/www\.facebook\.com\/(.*)/i.test(data.tab.url.toLowerCase())) {
                var url = data.url;
                // if (~url.indexOf("/api/graphqlbatch")) {
                //     return;
                // } else if (~url.indexOf("/ajax/bz")) {
                //     return;
                // } else if (~url.indexOf("/ajax/haste-response/?modules")) {
                //     return;
                // } else if (~url.indexOf("edge-chat.facebook.com/")) {
                //     return;
                // } else if (~url.indexOf("facebook.com/ajax/mercury/")) {
                //     return;
                // }
                // else {
                //     console.log(data);
                // }

                // if (~url.indexOf("video.fhan3-2.fna.")) {
                //     console.log(data);
                // }
                if (~url.indexOf("/video/video_data_async")) {
                    console.log('abc');
                    getAJAX(url, function (a, b) {
                        console.log(a, b);
                    })
                }
                // parse_VideoData(data, function (a, b) {
                //     if (~url.indexOf("/video/video_data_async")) {
                //         console.log(url);
                //     }
                // })
            }

        }

    });

}, {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame", "object", "xmlhttprequest"]
}, ["responseHeaders"]);

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        // if (request.greeting == "hello")
        //     sendResponse({farewell: "goodbye"});
        // if (request.download_url) {
        //     chrome.downloads.download({
        //         url: request.download_url
        //     });
        // }
        if (request && request.action) {
            if (request.action == 'download') {
                chrome.downloads.download({
                    url: request.url
                })
            }
        }
    }
);

function getAJAX(url, callback) {

    var ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);
    ajax.setRequestHeader('Cache-Control', 'no-cache');
    ajax.setRequestHeader('X-FVD-Extra', 'yes');

    // if (headers) {
    //     for (var key in headers) {
    //         ajax.setRequestHeader(key, headers[key]);
    //     }
    // }

    ajax.onload = function () {
        var content = this.responseText;
        callback(content, url);
    };

    ajax.onerror = function () {
        callback(null);
    };

    ajax.send(null);

    // if (url.indexOf("/api/graphqlbatch") !== -1) {
    //     callback('');
    // } else if (url.indexOf("/ajax/bz") !== -1) {
    //     callback('');
    // } else if (url.indexOf("/ajax/haste-response/?modules") !== -1) {
    //     callback('');
    // } else if (url.indexOf("edge-chat.facebook.com/") !== -1) {
    //     callback('');
    // } else {
    //
    // }

}

parse_VideoData = function (data, callback) {

    var mediaFound = false;
    var parsedMediaList = [];
    var videoTitle;

    var title = data.tab.url;

    getAJAX(data.url, null, function (content, url) {
        var mm = content.match(/<title\sid="pageTitle">(.+?)<\/title>/im);
        if (mm) title = mm[1];

        var k = 0;
        var kk = 0;
        do {
            k = content.indexOf('videoData');
            kk++;

            if (k != -1) {
                var m = content.match(/"?videoData"?:\[\{(.+?)\}\]/im);
                if (m) {
                    console.log(m, url);
                    // var info = m[1];
                    //
                    // var videoId = get_JSON_param('video_id', info);
                    // var srcHD = get_JSON_param('hd_src', info);
                    // var srcSD = get_JSON_param('sd_src', info);
                    //
                    // //var text = content.substring(0, k);
                    // //var kk = text.lastIndexOf('content');
                    // //if (kk != -1) text = text.substring(kk, text.length);
                    // //text = fvdSingleDownloader.Utils.decode_unicode(text);
                    //
                    // k += info.length;
                    // content = content.substring(k, content.length);
                    // var videoTitle = get_JSON_param('ownerName', content);
                    //
                    // var mmm = add_video(srcHD, 'HD', videoId, videoTitle || title);
                    // if (srcHD) {
                    //     parsedMediaList.push(mmm);
                    //     mediaFound = true;
                    // }
                    // if (srcSD) {
                    //     var mmm = add_video(srcSD, 'SD', videoId, videoTitle || title);
                    //     parsedMediaList.push(mmm);
                    //     mediaFound = true;
                    // }

                }
            }

        } while (k != -1 && kk < 100);

        if (parsedMediaList.length > 0) {
            callback(parsedMediaList, data.tab.id);
        }

    });
};