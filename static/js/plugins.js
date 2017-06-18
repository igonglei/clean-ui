//菜单名称
NAVNAME = "Home";
MENUNAME = "plugins";

//初始化
$(function() {
    Loader.init();
    pBar.init();
    divBar.init();
    csPie.init();
    csGrid.init();
});

var onPageResize = function() {
    Loader.reset();
};

//加载动画
var Loader = {
    el: ".loader",
    init: function() {
        $(this.el + 1).showLoader();
        $(this.el + 2).showLoader({
            animation: "ball-spin",
            color: "#42a1ce"
        });
        $(this.el + 3).showLoader({
            animation: "ball-jump"
        });
    },
    remove: function() {
        for (var i = 1; i < 4; i++) {
            $(this.el + i).hideLoader();
        }
    },
    reset: function() {
        this.remove();
        this.init();
    }
};

//进度条
var pBar = {
    el: ".pbar",
    init: function() {
        $(this.el + 1).pbar({
            value: 0.7,
            borderWidth: 0,
            shadowColor: "transparent",
            gradient: true,
            linearGradient: 'linear-gradient(90deg, #3dba45 60%, #e3ff31 100%)',
            symbol: 'drop',
            symbolValue: 0.8
        });
        $(this.el + 2).pbar({
            value: 0.8,
            borderWidth: 0,
            borderRadius: 0,
            fillColor: "#FFA800",
            blurColor: "#EFE30F",
            blur: true
        });
    }
};

//进度条
var divBar = {
    el: ".divbar",
    init: function() {
        $(this.el).divbar({
            value: 0.8
        });
    }
};

//环形图
var csPie = {
    el: ".cspie",
    init: function() {
        $(this.el).cspie({
            series: [{
                data: [{
                    value: 0.8
                }, {
                    value: 0.2
                }]
            }]
        });
    }
};

//日志级别
var LogLevel = [{
    name: "一般",
    icon: "icon-info",
    color: "#31708f"
}, {
    name: "警告",
    icon: "icon-exclamation",
    color: "#8a6d3b"
}, {
    name: "错误",
    icon: "icon-close",
    color: "#a94442"
}];

//表格
var csGrid = {
    el: "#grid",
    init: function() {
        $(this.el).csgrid({
            columns: [{
                field: 'time',
                title: '时间',
                width: '25%',
                aligh: 'left'
            }, {
                field: 'level',
                title: '级别',
                width: '25%',
                formatter: function(value) {
                    return '<div style="color:{color};"><i class="{icon}"></i>&nbsp;<span>{name}</span></div>'.template(LogLevel[value]);
                }
            }, {
                field: 'msg',
                title: '消息',
                width: '50%'
            }],
            pager: false,
            height: 280,
            data: [{
                time: "2017-04-07 15:30",
                level: 0,
                msg: "这是一般日志！"
            }, {
                time: "2017-04-07 15:30",
                level: 1,
                msg: "这是警告日志！"
            }, {
                time: "2017-04-07 15:30",
                level: 2,
                msg: "这是错误日志！"
            }, {
                time: "2017-04-07 15:30",
                level: 0,
                msg: "这是一般日志！"
            }, {
                time: "2017-04-07 15:30",
                level: 1,
                msg: "这是警告日志！"
            }, {
                time: "2017-04-07 15:30",
                level: 2,
                msg: "这是错误日志！"
            }]
        });
    }
};
