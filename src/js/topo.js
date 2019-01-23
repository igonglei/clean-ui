//初始化
$(function() {
    Topo.init();
});

//拓扑大网
var Topo = {
    el: "#topo",
    height: function() {
        var height = Math.max($(window).height(), 880);
        $('body').css("height", height);
    },
    //初始化
    init: function () {
        var self = this;
        self.height();
        $(this.el).topoViewer();
        var timeout;
        $(window).bind('resize', function() {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                self.height();
                if (typeof onPageResize === "function") {
                    onPageResize();
                }
            }, 20);
        });
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