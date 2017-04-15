(function ($) {
    "use strict";
    $(document).ready(function () {


        $('#main-nav .sf-menu').onePageNav({
            scrollOffset: 85,
            currentClass: 'current',
            easing: 'easeInExpo',
            filter: ':not(.external)'
        });

        $(window).on("scroll.animateNumbers",function(){
           if($(".number-animate").length>0 && $(".number-animate").is_on_screen()){
               $('.number-animate').each(function () {
                   $(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"),10));
               });
               $(window).off("scroll.animateNumbers");
           }
        });



        var jRes = jRespond([{
            label: 'small',
            enter: 0,
            exit: 800
        }, {
            label: 'large',
            enter: 800,
            exit: 10000
        }]);

        jRes.addFunc({
            breakpoint: 'small',
            enter: function () {
                $('.left-toggle').on('click',function (e) {
                    e.preventDefault();
                });

                $("#m-menu").mmenu({
                    classes: "mm-slide",
                    slidingSubmenus: false,
                    dragOpen: false,
                    header: true,
                    counters: true

                });
                $('#m-menu > ul').onePageNav({
                    scrollOffset: 0,
                    currentClass: 'current',
                    easing: 'easeInExpo',
                    filter: ':not(.external)'
                });


            },
            exit: function () {
                var $menu = $('#m-menu');
                if ($menu.hasClass('mm-opened')) {
                    $('html').removeClass('mm-background mm-slide mm-opened mm-opening');
                    $menu.removeClass('mm-current mm-opened');
                }
            }


        });

        jRes.addFunc({
            breakpoint: 'large',
            enter: function () {
                $('#main-nav .sf-menu').superfish({
                    hoverClass: 'sfHover', // the class applied to hovered list items
                    delay: 800, // the delay in milliseconds that the mouse can remain outside a submenu without it closing
                    animation: {
                        opacity: 'show'
                    }, // an object equivalent to first parameter of jQuery’s .animate() method. Used to animate the submenu open
                    animationOut: {
                        opacity: 'hide'
                    }, // an object equivalent to first parameter of jQuery’s .animate() method Used to animate the submenu closed
                    speed: 'normal', // speed of the opening animation. Equivalent to second parameter of jQuery’s .animate() method
                    speedOut: 'fast', // speed of the closing animation. Equivalent to second parameter of jQuery’s .animate() method
                    cssArrows: true, // set to false if you want to remove the CSS-based arrow triangles
                    disableHI: false // set to true to disable hoverIntent detection
                });

            }

        });

        //$("html").niceScroll({
        //    zindex: "2000",
        //    cursorcolor: "rgba(0,0,0,0.7)",
        //    cursorwidth: "5px",
        //    cursorborder: "0px solid #fff",
        //    cursorborderradius: "0px",
        //    background: "rgba(255,255,255,0.5)"
        //});


        $.scrollUp({
            scrollName: 'scrollUp', // Element ID
            topDistance: '300', // Distance from top before showing element (px)
            topSpeed: 300, // Speed back to top (ms)
            animation: 'fade', // Fade, slide, none
            animationInSpeed: 200, // Animation in speed (ms)
            animationOutSpeed: 200, // Animation out speed (ms)
            scrollText: '<i class="fa fa-angle-up"></i>', // Text for element
            activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
        });

        $('.my-flickr').jflickrfeed({
            limit: 12,
            qstrings: {
                id: '44802888@N04'
            },
            itemTemplate: '<li>' +
            '<a href="{{image_b}}"><img src="{{image_s}}" alt="{{title}}" /></a>' +
            '</li>'
        });

        $(".testimonial-wrap").owlCarousel({
            items: 1
        });


        $(".vdo-wrap").fitVids();


        //   wow animation

        new WOW().init();


        //portfolio filter set active class

        $('.portfolio-filter li').on("click",function (event) {
            $('.active').removeClass('active');
            $(this).addClass('active');
            event.preventDefault();
        });

        //isotope
        // init Isotope
        var $container = $('.portfolio');
        if ($.fn.imagesLoaded && $container.length > 0) {
            imagesLoaded($container, function () {
                $('.portfolio-slider').flexslider({
                    animation: "slide",
                    direction: "vertical",
                    slideshowSpeed: 3000
                });

                $('.portfolio-slider-alt').flexslider({
                    animation: "slide",
                    direction: "horizontal",
                    slideshowSpeed: 4000
                });

                $container.isotope({
                    itemSelector: '.portfolio-item',
                    layoutMode: 'fitRows',
                    filter: '*'
                });

                $(window).trigger("resize");
                // filter items on button click


                $('.portfolio-slider, .portfolio-slider-alt').each(function () { // the containers for all your galleries
                    var _items = $(this).find("ul.slides li > a");
                    var items = [];
                    var tempitems = [];
                    for (var i = 0; i < _items.length; i++) {
                        if(tempitems.indexOf($(_items[i]).attr("href"))==-1) {
                            items.push({src: $(_items[i]).attr("href"), title: $(_items[i]).attr("title")});
                            tempitems.push($(_items[i]).attr("href"));
                        }
                    }
                    $(this).parent().find(".action-btn").magnificPopup({
                        items: items,
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                    $(this).parent().find(".portfolio-description").magnificPopup({
                        items: items,
                        type: 'image',
                        gallery: {
                            enabled: true
                        }
                    });
                });

            });
        }


        $('.popup-link').magnificPopup({
            type: 'image'
            // other options
        });


        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        //individual gallery


        //filtering
        $('.portfolio-filter').on('click', 'a', function () {
            $('#filters button').removeClass('current');
            $(this).addClass('current');
            var filterValue = $(this).attr('data-filter');
            $(this).parents(".text-center").next().isotope({filter: filterValue});
        });
        //});


    });

    $.fn.is_on_screen = function () {

        var win = $(window);

        var viewport = {
            top: win.scrollTop(),
            left: win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + this.outerWidth();
        bounds.bottom = bounds.top + this.outerHeight();

        return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    };
})(jQuery);