$(function () {
        // 快捷登录和普通登录的切换
        $(".login-tab ul li").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).find("a").addClass("active");
            $(this).siblings().find("a").removeClass("active");
            $(".login-interface").find(".login-show").hide().eq($(this).index()).show();
        })
    })
