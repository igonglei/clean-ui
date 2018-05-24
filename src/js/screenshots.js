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
    elSmallImg: ".smallImg",
    elFullscreen: '.fullscreen',
    data: [
        { title: "环境设计器", img: "enveditor.png" },
        { title: "SuperLAB首页", img: "homepage.png" },
        { title: "武研运维实验室基础设施", img: "owl-inf.png" },
        { title: "武研运维实验室利用率管理", img: "owl-uti.png" },
        { title: "武研运维实验室设计器", img: "owl-designer.png" },
        { title: "SDE运维看板首页", img: "sde-kanban-home.png" },
        { title: "SDE运维看板告警", img: "sde-kanban-warn.png" },
        { title: "SDE运维看板服务响应", img: "sde-kanban-order.png" },
        { title: "SDE运维看板SDN", img: "sde-kanban-sdn.png" },
        { title: "SDE运维看板TOPO", img: "sde-kanban-topo.png" },
        { title: "SDE运维首页", img: "sde-home.png" },
        { title: "SDE运维告警", img: "sde-warn.png" },
        { title: "环境商城环境搜索", img: "envmall-search.png" },
        { title: "环境商城环境详情", img: "envmall-envinfo.png" },
        { title: "环境商城环境预定", img: "envmall-book.png" },
        { title: "环境商城自组网", img: "envmall-network.png" }
    ],
    init: function() {
        var self = this,
            $el = $(self.el),
            $model = $(self.elModal);
        $.each(self.data, function(i, v) {
            v.index = i;
            $el.append('<div class="col-xs-3"><img class="smallImg" src="static/assets/{img}" title="{title}" data-index="{index}" data-toggle="tooltip" data-placement="top"></div>'.template(v));
        });
        $el.on("click", "img", function() {
            self.showBigImg($(this));
            $model.modal();
        });
        $('[data-toggle="tooltip"]').tooltip({ container: 'body' });
        $(this.elFullscreen).on('click', function() {
            self.enterFullscreen();
        });
        this.bindKeyEvents();
        $model.on('shown.bs.modal', function() {
            toastr.info('回车键进入全屏<br>左右方向键切换');
        });
    },
    showBigImg: function($img) {
        $(this.elImg).attr("src", $img.attr("src")).attr("data-index", $img.attr("data-index"));
        $(this.elModalLabel).html($img.attr("data-original-title"));
    },
    enterFullscreen: function() {
        var fullscreen = function(el) {
            var fs = el.requestFullscreen ||
                el.webkitRequestFullscreen ||
                el.mozRequestFullScreen ||
                el.msRequestFullscreen;
            if (fs) {
                fs.call(el);
            }
        };
        fullscreen($(this.elImg)[0]);
    },
    bindKeyEvents: function() {
        var self = this,
            $scImg = $(self.elImg),
            $smImg = $(self.elSmallImg),
            total = $smImg.length;
        $(document).on('keydown', function(event) {
            event.preventDefault();
            var isShow = $scImg.is(':visible');
            if (!isShow) {
                return;
            }
            var index = parseInt($scImg.attr('data-index')),
                newIndex;
            switch (event.keyCode) {
                case 13:
                    self.enterFullscreen();
                    return;
                case 37:
                    newIndex = Math.max(0, index - 1);
                    break;
                case 39:
                    newIndex = Math.min(total - 1, index + 1);
                    break;
            }
            if (newIndex == index) {
                return;
            }
            var $img = $smImg.eq(newIndex);
            if ($img.length == 0) {
                return;
            }
            self.showBigImg($img);
        });
    }
};