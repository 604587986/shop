$(function () {
    //		从入驻协议跳到基本信息
    $(".next").click(function () {
        if ($(".right-agreement input[name=checked]").is(':checked')) {
            window.location.href = "./basic-information.html";
        } else {
            return;
        }

    });
})