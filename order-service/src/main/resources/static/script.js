$(document).ready(function () {

    // TODO: Paste sign-out URL
    $("#sign-out").attr("href", "<paste_signout_url_here>");
    // TODO: Paste home URL
    $("#home").attr("href", "<paste_home_url_here>");

    // TODO: Replace data extraction with code below
    /*
    let pictures = [];
    get('urlToApiGateway', function(data) {
        data.forEach(picture -> pictures.push(picture));
        loadMore(pictures);
    });*/

    function loadMore(pictures) {
        let template = $('#picture-item').html();
        for (let i = 0; i < 6; i++) {
            let pictureData = pictures.shift();
            if (pictureData) {
                $(".row").append(Mustache.render(template, pictureData));
            }
        }
        $('.picture').unbind("click").on('click', bindExpandedImage);
        $('.info-button').unbind("click").on('click', openDescription);
        $('.play-button').unbind("click").on('click', openPlayer);
        $('.delete-button').unbind("click").on('click', deletePicture);
        hideAppearingElements();
        bindForMobileDevices();
    }

    // TO_BE_REMOVED_START
    let pictures = [
        { path: "https://c4.wallpaperflare.com/wallpaper/277/499/618/wlop-digital-art-drawing-women-looking-at-viewer-hd-wallpaper-preview.jpg", description: "by WLOP" },
        { path: "https://w0.peakpx.com/wallpaper/390/575/HD-wallpaper-aeolian-art-wlop-fantasy-luminos-face-princess.jpg", description: "by WLOP" },
        { path: "https://e1.pxfuel.com/desktop-wallpaper/391/826/desktop-wallpaper-wlop-digital-art-girl-art.jpg", description: "by WLOP" },
        { path: "https://www.xtrafondos.com/en/descargar.php?id=6789&resolucion=1920x1080", description: "by Unknown" },
        { path: "https://c4.wallpaperflare.com/wallpaper/611/422/478/nier-automata-artwork-video-games-digital-art-women-hd-wallpaper-preview.jpg", description: "by Unknown" },
        { path: "https://p4.wallpaperbetter.com/wallpaper/275/526/535/illustration-artwork-digital-art-fan-art-drawing-hd-wallpaper-preview.jpg", description: "by Unknown" },
        { path: "https://c4.wallpaperflare.com/wallpaper/640/987/590/anime-girls-original-characters-digital-painting-guweiz-hd-wallpaper-preview.jpg", description: "by Guweiz" },
        { path: "https://p4.wallpaperbetter.com/wallpaper/857/200/962/guweiz-digital-art-artwork-hd-wallpaper-preview.jpg", description: "by Guweiz" },
        { path: "https://c4.wallpaperflare.com/wallpaper/804/583/696/fantasy-girl-digital-art-guweiz-hd-wallpaper-preview.jpg", description: "by Guweiz" },
    ];
    loadMore(pictures);
    // TO_BE_REMOVED_END

    // Clear description on click outside or "Info" button click
    $(document).on('mouseover', function (event) {
        if (!$(event.target).closest('.picture-card').length) {
            hideAppearingElements();
        }
    });


    $('#upload-file').on('click', function (event) {
        event.preventDefault();
        $("#upload-file-input").trigger('click');
    });

    $("#upload-file-input").on('change', function () {
        const file = $(this).prop('files')[0];
        // TO_BE_REMOVED_START
        const fileDescription = { fileDescription: file.name };
        let alertTemplate = $('#file-uploaded-alert').html();
        $(".header").prepend(Mustache.render(alertTemplate, fileDescription));
        // TO_BE_REMOVED_END
        // TODO: Call POST for upload
        /*post('urlToApiGateway', file, function (data) {
            var fileDescription = { fileDescription: file.name };
            let alertTemplate = $('#file-uploaded-alert').html();
            $(".header").prepend(Mustache.render(alertTemplate, fileDescription));
            let template = $('#picture-item').html();
            $(".row").prepend(Mustache.render(template, data));
        });*/
    });

    $('#load-more').on('click', function (event) {
        event.preventDefault();
        loadMore(pictures);
        checkIfLoadMoreRequired();
    });

    checkIfLoadMoreRequired();

    function checkIfLoadMoreRequired() {
        if (pictures.length > 0) {
            $('#load-more').show();
        } else {
            $('#load-more').hide();
        }
    }

    function openDescription() {
        // TODO: Call POST for description
        /*post('urlToApiGateway', null, function (data) {
            var parent = $(this).closest('.picture-card');
            parent.find('.hover-buttons').toggle();
            parent.find('.description').toggle();
            var description = parent.find('.description-text');
            if(!description){
                description.html(data);
            }
            
        });*/

        // TO_BE_REMOVED_START
        const parent = $(this).closest('.picture-card');
        parent.find('.hover-buttons').toggle();
        parent.find('.description').addClass('appear-animation').toggle();
        // TO_BE_REMOVED_END
    }

    function openPlayer() {
        // TODO: Call POST for description
        /*post('urlToApiGateway', null, function (data) {
        var parent = $(this).closest('.picture-card');
        parent.find('.hover-buttons').toggle();
        parent.find('.audio').addClass('appear-animation').append('<audio id="audio" src="'+ data +'" controls></audio>').toggle();
        });*/

        // TO_BE_REMOVED_START
        const parent = $(this).closest('.picture-card');
        parent.find('.hover-buttons').toggle();
        parent.find('.audio').addClass('appear-animation').append('<audio id="audio" src="" controls></audio>').toggle();
        // TO_BE_REMOVED_END
    }

    function deletePicture() {
        // TODO: Call POST for delete
        /*post('urlToApiGateway', function (data) {
            var parent = $(this).closest('.picture-box');
            parent.addClass('delete-animation');
            setTimeout(function () {
                parent.remove();
            }, 500);
        });*/

        // TO_BE_REMOVED_START
        const parent = $(this).closest('.picture-box');
        parent.addClass('delete-animation');
        setTimeout(function () {
            parent.remove();
        }, 500);
        // TO_BE_REMOVED_END
    }

    function bindExpandedImage() {
        const parent = $(this).closest('img');
        $('#expanded-image').attr("src", parent.attr("src"));
    }

    function hideAppearingElements() {
        $('.description').hide();
        $('.audio').empty().hide();
        $('.hover-buttons').show();
    }
    
    // Show hover buttons for mobile devices
    function bindForMobileDevices() {    
        if ($(window).width() < 992) {
            $('.hover-buttons').css('opacity', '1');
            $('.description, .audio').on('click', hideAppearingElements);
        }
    }

    function post(url, payload, callbackReload) {
        return fetch(url, {
            method: 'POST',
            data: payload,
            credentials: 'include', // TODO: check which credentials should be provided
            headers: {
                "Accept": 'application/json, text/plain',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })
            .then(function (response) {
                if (response.status === 404) {
                    location.href = window.location.href + '/404';
                } else if (response.status === 403) {
                    location.href = window.location.href + '/403';
                } else if (response.status === 500) {
                    location.href = window.location.href + '/500';
                } else if (response.status === 418) {
                    response.json().then(function (exp) {
                        alert(exp.message);
                    });
                } else {
                    callbackReload();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function nextPage(url) {
        location.href = url;
    }

    function get(url, callbackHTML) {
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Accept": 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then(function (data) {
                $('section').append(callbackHTML(data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

});