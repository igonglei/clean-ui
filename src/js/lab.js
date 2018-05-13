//菜单名称
NAVNAME = "Home";
MENUNAME = "lab";
PAGEHEIGHT = 1150;

//初始化
$(function() {
    Lab.init();
});

//实验室
var Lab = {
    el: "#lab",
    //初始化
    init: function() {
        var $el = $(this.el);
        $el.labDesigner({
            lab: "446f9acf-5b71-4633-a305-8d2563e21182",
            editorMode: false
        });
    }
};