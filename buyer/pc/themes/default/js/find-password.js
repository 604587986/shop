
    $(function () { 
        //找回方式切换
        $(".find-title-email").click(function () {
            $(".find-by-email").show();
            $(".find-by-phone").hide();
            $(".find-title ul li").removeClass("selected");
            $(this).addClass("selected");
        });
        $(".find-title-phone").click(function () {
            $(".find-by-email").hide();
            $(".find-by-phone").show();
            $(".find-title ul li").removeClass("selected");
            $(this).addClass("selected");
        })
    })
