//菜单名称
NAVNAME = "Home";
MENUNAME = "topo";
PAGEHEIGHT = 1040;

//初始化
$(function() {
    Topo.init();
});

//拓扑大网
var Topo = {
    el: "#topo",
    //初始化
    init: function() {
        $(this.el).topoViewer();
    },
    //重置大小
    resize: function() {
        $(this.el).topoViewer("resize");
    }
};

//页面自适应
var onPageResize = function() {
    Topo.resize();
};