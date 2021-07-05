//菜单名称
NAVNAME = "Home";
MENUNAME = "screenshots";

//初始化
$(function() {
    Screenshots.init();
});

var IS_IE = /MSIE/i.test(navigator.userAgent);
var IS_MOBILE = /(iPad|iPhone|iPod|Android)/i.test(navigator.userAgent);

//截图对象
var Screenshots = {
    el: ".screenshots",
    elModal: "#scModal",
    elImg: "#scImg",
    elSmallImg: ".smallImg",
    elFullscreen: '.fullscreen',
    elClose: '.close',
    elImgTitle: '.scImg-title',
    elArrowLeft: '.arrow-left',
    elArrowRight: '.arrow-right',
    data: [{
        system: 'FitIDP',
        title: '组件设计器',
        path:'/work/fitidp/',
        cover: 'table.cover.png',
        img: 'table.png'
    }, {
        system: 'FitIDP',
        title: '组件设计器',
        path:'/work/fitidp/',
        cover: 'form.cover.png',
        img: 'form.png'
    }, {
        system: '人力资源电子地图',
        title: '中国',
        path:'/work/hrmap/',
        cover: 'china.cover.png',
        img: 'china.png'
    }, {
        system: '人力资源电子地图',
        title: '武汉',
        path:'/work/hrmap/',
        cover: 'wuhan.cover.png',
        img: 'wuhan.png'
    }, {
        system: '人力资源电子地图',
        title: '产业园',
        path:'/work/hrmap/',
        cover: 'park.cover.png',
        img: 'park.png'
    }, {
        system: 'OWL',
        title: '实验室布局',
        path:'/work/owl/',
        cover: 'uti.cover.png',
        img: 'uti.png'
    }, {
        system: 'OWL',
        title: '实验室布局',
        path:'/work/owl/',
        cover: 'lab.cover.png',
        img: 'lab.png'
    }, {
        system: 'SDE',
        title: '看板',
        path:'/work/sde/',
        cover: 'home.cover.png',
        img: 'home.png'
    }, {
        system: 'SDE',
        title: '订单',
        path:'/work/sde/',
        cover: 'order.cover.png',
        img: 'order.png'
    }, {
        system: 'SDE',
        title: '拓扑大网',
        path:'/work/sde/',
        cover: 'topo.cover.png',
        img: 'topo.png'
    }, {
        system: 'SDE',
        title: '环境设计器',
        path:'/work/sde/',
        cover: 'enveditor.cover.png',
        img: 'enveditor.png'
    }, {
        system: '斗鱼',
        title: '语音天后加冕之战',
        path:'/work/douyu/',
        cover: 'voice-queen.cover.png',
        img: 'voice-queen.png'
    }, {
        system: '斗鱼极速版',
        title: '激励体系',
        path:'/work/douyu/',
        cover: 'invite-share.cover.png',
        img: 'invite-share.png',
        mobile: true
    }, {
        system: '斗鱼极速版',
        title: '激励体系',
        path:'/work/douyu/',
        cover: 'invite-rules.cover.png',
        img: 'invite-rules.png',
        mobile: true
    }, {
        system: '斗鱼APP',
        title: '活动页',
        path:'/work/douyu/',
        cover: 'activity.cover.png',
        img: 'activity.png',
        mobile: true
    }, {
        system: '斗鱼APP',
        title: 'PUBG弹幕应援',
        path:'/work/douyu/',
        cover: 'pubg-barrage.cover.png',
        img: 'pubg-barrage.png',
        mobile: true
    }],
    init: function() {
        var self = this,
            $el = $(self.el),
            $model = $(self.elModal);
        $.each(self.data, function(i, v) {
            v.index = i;
            v.cdn = CLOUD + v.path;
            $el.append('<div class="col-xs-12 col-sm-3"><img class="smallImg" src="{cdn}{cover}" data-mobile="{mobile}" data-src="{cdn}{img}" title="{system}-{title}" data-title="{system}-{title}" data-index="{index}"></div>'.template(v));
        });
        $el.on("click", "img", function() {
            self.showBigImg($(this));
            $model.modal();
        });
        this.bindArrowEvents();
        if (IS_MOBILE) {
            this.bindTouchEvent();
            return;
        }
        this.bindFullscreenEvent();
        this.bindKeyEvents();
        $model.on('shown.bs.modal', function() {
            if (localStorage.getItem('fullscreenTipShown')) {
                return;
            }
            localStorage.setItem('fullscreenTipShown', true);
            toastr.info('左右方向键切换图片');
        });
        $(this.elSmallImg + ',' + this.elClose + ',' + this.elArrowLeft + ',' + this.elArrowRight).tooltip({ container: 'body' });
    },
    showBigImg: function($img) {
        var mobileCls = $img.attr('data-mobile') === 'true' ? 'mobile-modal' : '';
        $(this.elModal).removeClass('mobile-modal').addClass(mobileCls);
        $(this.elImg).attr("src", $img.attr("data-src")).attr("data-index", $img.attr("data-index"));
        $(this.elImgTitle).html($img.attr("data-title"));
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
    switchImg: function ($scImg, $smImg, isRight) {
        var index = parseInt($scImg.attr('data-index'));
        var newIndex = isRight ? Math.min($smImg.length - 1, index + 1) : Math.max(0, index - 1);
        if (newIndex == index) {
            return;
        }
        var $img = $smImg.eq(newIndex);
        if ($img.length == 0) {
            return;
        }
        this.showBigImg($img);
    },
    bindFullscreenEvent: function () {
        if (IS_IE) {
            return;
        }
        var self = this;
        $(this.elFullscreen).show().on('click', function() {
            self.enterFullscreen();
        });
    },
    bindKeyEvents: function() {
        var self = this,
            $scImg = $(self.elImg),
            $smImg = $(self.elSmallImg);
        $(document).on('keydown', function(event) {
            event.preventDefault();
            var isShow = $scImg.is(':visible');
            if (!isShow) {
                return;
            }
            switch (event.keyCode) {
                case 13:
                    !IS_IE && self.enterFullscreen();
                    return;
                case 37:
                    self.switchImg($scImg, $smImg);
                    break;
                case 39:
                    self.switchImg($scImg, $smImg, true);
                    break;
            }
        });
    },
    bindArrowEvents: function () {
        var $scImg = $(this.elImg),
            $smImg = $(this.elSmallImg),
            self = this;
        $(this.elArrowLeft).on('click', function () {
            self.switchImg($scImg, $smImg);
        });
        $(this.elArrowRight).on('click', function () {
            self.switchImg($scImg, $smImg, true);
        });
    },
    bindTouchEvent: function () {
        var startX,
            endX,
            $scImg = $(this.elImg),
            $smImg = $(this.elSmallImg),
            self = this;
        $scImg.on('touchstart', function (e) {
            e.preventDefault();
            startX = e.originalEvent.targetTouches[0].pageX;
        }).on('touchend', function (e) {
            e.preventDefault();
            endX = e.originalEvent.changedTouches[0].pageX;
            if (Math.abs(endX - startX) > 30) {
                self.switchImg($scImg, $smImg, startX - endX > 30);
            }
        });
    }
};
