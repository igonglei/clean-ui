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
    data: [{
        title: '环境设计器',
        cover: 'enveditor.cover.png',
        img: 'enveditor.png'
    }, {
        title: '语音天后加冕之战',
        cover: 'voice-queen.cover.png',
        img: 'voice-queen.png'
    }, {
        title: '斗鱼极速版激励体系',
        cover: 'douyu-invite-share.cover.png',
        img: 'douyu-invite-share.png',
        mobile: true
    }, {
        title: '斗鱼极速版激励体系',
        cover: 'douyu-invite-rules.cover.png',
        img: 'douyu-invite-rules.png',
        mobile: true
    }, {
        title: '斗鱼APP活动页',
        cover: 'douyu-activity.cover.png',
        img: 'douyu-activity.png',
        mobile: true
    }, {
        title: '斗鱼APP绝地求生弹幕引援',
        cover: 'douyu-pubg-barrage.cover.png',
        img: 'douyu-pubg-barrage.png',
        mobile: true
    }],
    init: function() {
        var self = this,
            $el = $(self.el),
            $model = $(self.elModal);
        $.each(self.data, function(i, v) {
            v.index = i;
            v.cdn = 'https://lg-npha00ki-1257320081.cos.ap-shanghai.myqcloud.com/';
            $el.append('<div class="col-xs-3"><img class="smallImg" src="{cdn}{cover}" data-mobile="{mobile}" data-src="{cdn}{img}" title="{title}" data-index="{index}" data-toggle="tooltip" data-placement="top"></div>'.template(v));
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
            if (localStorage.getItem('fullscreenTipShown')) {
                return;
            }
            localStorage.setItem('fullscreenTipShown', true);
            toastr.info('左右方向键切换图片');
        });
    },
    showBigImg: function($img) {
        var mobileCls = $img.attr('data-mobile') === 'true' ? 'mobile' : '';
        $(this.elImg).removeClass('mobile').addClass(mobileCls)
            .attr("src", $img.attr("data-src"))
            .attr("data-index", $img.attr("data-index"));
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