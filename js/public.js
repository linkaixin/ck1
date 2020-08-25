$(function() {
    // setTimeout(function () {
    //     $("body").css("visibility", "unset");
    // }, 1);

    function changeSize() {
        var screenW = window.document.documentElement.clientWidth
        $('html').css('fontSize', screenW / 750 * 180);
        var cssFontSize = $('html').css('font-size');
        var fontSize = parseFloat(cssFontSize);
        if (fontSize > 180) {
            $('html').css('fontSize', 180 + 'px')
        }
        if (fontSize < 90) {
            $('html').css('fontSize', 90 + 'px')
        }
    }

    window.onresize = function () {
        changeSize();
    };
    changeSize();

    /*
    滚动显示和隐藏返回顶部
     */
    $(window).scroll(function () {
        if ($(window).scrollTop() > 500) {
            $(".back-top").attr("style", "display:block;");
        } else if ($(window).scrollTop() <= 500) {
            $(".back-top").attr("style", "display:none;");
        }
    });
    $(window).scroll(function(){
        if ($(window).scrollTop()>500){
            $(".back-top").attr("style","display:block;");
        }
        else if($(window).scrollTop()<=500)
        {
            $(".back-top").attr("style","display:none;");
        }
    });

        $(".back-top").click(function(){
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
});