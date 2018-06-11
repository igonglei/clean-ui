if ($.fn.showLoader) {
    $.extend($.fn.showLoader.defaults, {
        color: "#3c8ad8",
        backgroundColor: "rgba(255,255,255,0.6)"
    });
}

//菜单名称
NAVNAME = "Home";
MENUNAME = "editor";
PAGEHEIGHT = 1050;

//初始化
$(function() {
    var plugObj = EnvEditor.Init();
});