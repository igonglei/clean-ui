//菜单名称
NAVNAME = "Home";
MENUNAME = "plugins";

//初始化
$(function() {
    Loader.init();
    pBar.init();
    divBar.init();
    csGrid.init();
});

var onPageResize = function() {
    Loader.resize();
    divBar.resize();
    csGrid.resize();
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
    resize: function() {
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
            blur: true,
            blurImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAb1BMVEX+qgD9sAL8tAP7ugX5vgX4xAf2yAj1zQr00grz1wzx3A3w4Q/w3w7y2A300Qr2ygn4wgb6uwX8swP+rAH7tAP6uQT4wwf1zQnz0Qrx2w3w4Q7y2Az00Ar2yQn4wQb7uQXz0gry1wz2yQj8swIAAADQ0hQXAAAAAWJLR0QktAb5mQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAEpJREFUGNNjYGBkYmZhZWPn4OTi5uHl4xcQFBJmYGAUEWURYxOX4JSU4pGWkZWDCDLJAwXZFcAqZWRRVSqCVSrJCSqDVY6aST0zAU4IGFK83K40AAAAAElFTkSuQmCC"
        });
    }
};

//进度条
var divBar = {
    el: ".divbar",
    init: function() {
        this.initBar1();
        this.initBar2();
    },
    initBar1: function() {
        $(this.el + 1).divbar({
            value: 0.8,
            borderColor: "#f5f1c5"
        });
    },
    initBar2: function() {
        $(this.el + 2).divbar({
            value: 0.7,
            direction: "right",
            borderColor: "#f5f1c5"
        });
    },
    resize: function() {
        this.initBar2();
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
    },
    resize: function() {
        $(this.el).csgrid("resize");
    }
};