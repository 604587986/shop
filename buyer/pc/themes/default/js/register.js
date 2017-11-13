    $(function () {
        $(".next-button").click(function () {
            $(".mobile-content").hide();
            $(".usef-info-content").show();
        });
        $(".btn-disabled").click(function () {
            $(".usef-info-content").css("display", "none");
            $(".reg-content").css("display", "block");
        })
    })