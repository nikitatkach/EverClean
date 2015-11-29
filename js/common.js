$(document).ready(function () {

    // slider config
    var slideSpeed = 700,
        slideTimeOut = 3000,
        slideNum = 0,
        slideCount = $('.slide-list .slide').size(),
        slideTime;


    //  what clean nav
    $(".nav .item").click(function () {
        if (!$(this).hasClass("active")) {
            $(".nav .item").removeClass("active");
            var itemId = $(this).addClass("active").attr("data-name");
            var bgPath = "url(img/clean-bg/" + itemId + ".jpg) no-repeat";
            $(".what-clean").css({
                background: bgPath
            });
        }
    });


    //  custom select
    $('.select').click(function () {
        var dropBlock = $(this).parent().find('.drop');
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown();
            $(this).addClass('active');
            $('.drop li').click(function () {
                var selectResult = $(this).html();
                $(this).parent().parent().find('input').val(selectResult);
                $(this).parent().parent().find('.select-data').removeClass('active').html(selectResult);
                dropBlock.slideUp();
            });
        } else {
            $(this).removeClass('active');
            dropBlock.slideUp();
        }
    });


    //  location popup
    $(document).on("click", ".popup-click", function () {
        $(this).addClass("active").parent().find('.popup-body').addClass("show");
    }).on("click", ".popup-click.active", function () {
        $(this).removeClass("active").parent().find('.popup-body').removeClass("show");
    });


    // clean place
    $(document).on("click", ".clean-place", function () {
        $(this).addClass("active");
    }).on("click", ".clean-place.active", function () {
        $(this).removeClass("active");
    });


    // slider
    $('.slider').find(".slide").hide().eq(0).show();

    function arrow(arrow) {
        $('.slide').eq(slideNum).fadeOut(slideSpeed);
        if (arrow == "next") {
            if (slideNum == (slideCount - 1)) {
                slideNum = 0;
            } else {
                slideNum++
            }
        } else if (arrow == "prev") {
            if (slideNum == 0) {
                slideNum = slideCount - 1;
            } else {
                slideNum -= 1
            }
        } else {
            slideNum = arrow;
        }
        $('.slide-list .slide').eq(slideNum).fadeIn(slideSpeed);
        $('.progress .item').removeClass("active").eq(slideNum).addClass('active');
    }

    $('.slider .right-arrow').click(function () {
        arrow("next");
    });
    $('.slider .left-arrow').click(function () {
        arrow("prev");
    });


    // slider links
    var addLinks = '';

    $('.slide-list .slide').each(function (index) {
        if (index == 0) {
            addLinks += '<div class="item active">' + index + '</div>';
        } else {
            addLinks += '<div class="item">' + index + '</div>';
        }
    });

    $('<div class="progress">' + addLinks + '</div>').appendTo('.slider');

    $('.progress .item').click(function () {
        var goToNum = parseFloat($(this).text());
        arrow(goToNum);
    });


    // hide/show popup
    $('.popup-open').click(function () {
        $('.popup-overlay').hide();
        $('.popup-big').hide();
        var popupData = $(this).attr("data-popup");
        $('.popup-overlay').show();
        $('#popup_' + popupData).show();
    });

    $('.popup-big .close').click(function () {
        $('.popup-overlay').hide();
        $(this).parent().hide();
    });


    // tabs switch
    $('.tabs-list').find(".item").eq(0).addClass("active");
    $('.tab').hide().eq(0).show();

    $('.tabs-list .item').click(function () {
        $('.tab').hide();
        $('.tabs-list .item').removeClass("active");
        $(this).addClass("active");
        var tabData = $(this).attr("data-tab");
        $('#tab_' + tabData).show();
    });


    // calendar
    var months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];

    $("#calendar").datepicker({
        monthNames: months,
        dayNamesMin: ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        minDate: 0,
        onSelect: function (dateText, inst) {

            var data = $("#calendar").datepicker('getDate'),
                month = months[data.getMonth()],
                day = data.getDate(),
                year = data.getFullYear();
            $(".chose-day .day").html(day + ", " + month);
            $(".chose-day").find('input').val(day + "/" + month + "/" + year);
        }
    });


    // select time
    $('.time-list li label').click(function () {
        $('.time-list li').removeClass("select");
        $(this).parent().addClass("select");
        var selectTime = "/" + $(this).find("input").val();
        $('.chose-day .time').html(selectTime);
    });


    $(document).on("click", ".additional-services .item .click-bg", function () {
        $(this).parent().addClass("selected").find('input:checkbox').attr('checked', 'checked');
    }).on("click", ".additional-services .item.selected .click-bg", function () {
        $(this).parent().removeClass("selected").find('input:checkbox').removeAttr('checked');
    });


    // order, windows count
    var windowsCount = 0;

    function windowCount(count, isSelected) {
        if (isSelected) {
            if (count == "up") {
                windowsCount++;
            } else {
                if (windowsCount <= 0) {
                    windowsCount = 0;
                } else {
                    windowsCount--;
                }
            }

            $('.count-wrap .count').html(windowsCount);
            $('.count-wrap').find('input').val(windowsCount);
        } else {
            return false;
        }
    }

    $('.count-wrap .plus').click(function () {
        var isSelected = $(this).parent().parent().hasClass("selected");
        windowCount("up", isSelected);
    });

    $('.count-wrap .minus').click(function () {
        var isSelected = $(this).parent().parent().hasClass("selected");
        windowCount("down", isSelected);
    });









});