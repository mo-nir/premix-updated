$(function($) {
    "use strict";

    $(window).on('load', function() {
        var themeUrl = '<link id="themes-color" href="css/theme-color.css" type="text/css" rel="stylesheet">'
        $(themeUrl).appendTo('head');

    });

    var tgl = "0";

    function fnPanelTgl() {
        if (tgl == "0") {
            $('.style-switcher').addClass('panel-merge')
            return tgl = "1";
        } else if (tgl == "1") {

            $('.style-switcher').removeClass('panel-merge')
            return tgl = "0";
        }
    }


    $('.cl-item').each(function() {
        var themeColor = $(this).data('color');
        $(this).css({
            'background-color': themeColor
        })
    });


    $('.cl-item').click(function() {
        var stylesheet = $(this).attr('title').toLowerCase();
        $('#themes-color').attr('href', 'css' + '/' + stylesheet + '.css');
    });



    $('.side-toggle').on('click', function(e) {
        e.preventDefault();
        fnPanelTgl();
    });



});