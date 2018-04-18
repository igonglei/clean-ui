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
    elModalLabel: "#scModalLabel",
    elImg: "#scImg",
    data: [
        { title: "环境设计器", img: "enveditor.png" },
        { title: "SuperLAB首页", img: "homepage.png" },
        { title: "武研运维实验室基础设施", img: "owl-inf.png" },
        { title: "武研运维实验室利用率管理", img: "owl-uti.png" },
        { title: "SDE运维看板首页", img: "sde-kanban-home.png" },
        { title: "SDE运维看板告警", img: "sde-kanban-warn.png" },
        { title: "SDE运维看板服务响应", img: "sde-kanban-order.png" },
        { title: "SDE运维看板SDN", img: "sde-kanban-sdn.png" },
        { title: "SDE运维看板TOPO", img: "sde-kanban-topo.png" },
        { title: "SDE运维首页", img: "sde-home.png" },
        { title: "SDE运维告警", img: "sde-warn.png" },
        { title: "环境商城搜索", img: "envmall-search.png" },
        { title: "环境商城预定", img: "envmall-book.png" },
        { title: "环境商城组网", img: "envmall-network.png" },
        { title: "日志查看", img: "supertool-logview.png" }
    ],
    init: function() {
        var self = this, $el = $(self.el);
        $.each(self.data, function (i, v) {
            $el.append('<div class="col-xs-3"><img src="https://raw.githubusercontent.com/igonglei/clean-ui/gh-pages/assets/{img}" title="{title}" data-toggle="tooltip" data-placement="top"></div>'.template(v));
        });
        $el.on("click", "img", function() {
            var $img = $(this);
            $(self.elImg).attr("src", $img.attr("src"));
            $(self.elModalLabel).html($img.attr("data-original-title"));
            $(self.elModal).modal();
        });
         $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
    }
};
