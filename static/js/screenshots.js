//菜单名称
NAVNAME = "Home";
MENUNAME = "screenshots";

//初始化
$(function() {
    Screenshots.init();
});

//截图对象
var Screenshots = {
    el: ".screenshots",
    elModal: "#scModal",
    elImg: "#scImg",
    init: function() {
        var self = this;
        $(self.el).on("click", "img", function() {
            var $img = $(this);
            $(self.elImg).attr("src", $img.attr("src"));
            $(self.elModal).modal();
        });
    }
};
