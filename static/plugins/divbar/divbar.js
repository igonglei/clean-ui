/*!
 * divbar - a jQuery progress bar plugin with division effect
 * Copyright 2017, Gonglei
 */
(function(root, factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD
        define(["jquery"], factory);
    } else if (typeof module === "object" && typeof module.exports === "object") {
        // CommonJS
        module.exports = factory(require("jquery"));
    } else {
        // Browser globals
        root.divbar = factory(root.jQuery);
    }
}(this, function($) {
    //默认参数
    var defaults = {
            //边框颜色
            borderColor: "#2D4A34",
            //边框宽度
            borderWidth: 1,
            //边框样式
            borderStyle: "solid",
            //2个分块相隔的距离
            margin: 2,
            //分块数量
            divs: 15,
            //分块的颜色
            color: ["#486F14,#8EC63F,47%", "#539102,#8DC53E,14%", "#D9B404,#FFA800,14%", "#D64C01,#D84C00,25%"],
            //值
            value: 0,
            //动画
            animation: true,
            //动画时长，毫秒
            duration: 100,
            //跳动分块数
            beat: 3,
            //跳动时长，毫秒
            beatDuration: 100
        }, //常量以及方法
        plugin = {
            //插件名称
            name: "divbar",
            //初始化
            init: function(instance) {
                var self = this,
                    $el = $(instance.dom),
                    opts = instance.options,
                    divs = opts.divs,
                    margin = opts.margin,
                    divHeight = $el.height() / divs - margin;
                for (var i = 0; i < divs; i++) {
                    $el.append("<div></div>");
                }
                var $div = $el.children();
                $div.css({
                    "border-color": opts.borderColor,
                    "border-width": opts.borderWidth,
                    "border-style": opts.borderStyle,
                    height: divHeight,
                    "margin-bottom": margin,
                    "transition": "all .1s ease-in-out"
                });
                this.fillColor(instance, $div, opts);
            },
            //填充颜色
            fillColor: function(instance, $div, opts) {
                var self = this,
                    divs = opts.divs,
                    colorDivs = Math.ceil(opts.value * divs),
                    colors = this.getColor(opts.color, divs),
                    animation = opts.animation,
                    duration = opts.duration,
                    fill = function(index) {
                        $div.eq(divs - index - 1).css(colors[index]);
                    },
                    beat = function() {
                        self.beat(instance, $div, colorDivs, colors);
                    };
                for (var i = 0; i < colorDivs; i++) {
                    if (animation) {
                        (function(i) {
                            setTimeout(function() {
                                fill(i);
                            }, duration * i);
                        })(i);
                    } else {
                        fill(i);
                    }
                }
                if (animation) {
                    setTimeout(beat, duration * colorDivs);
                } else {
                    beat();
                }
            },
            //获取所有颜色
            getColor: function(color, divs) {
                var self = this,
                    colors = [];
                $.each(color, function(i, v) {
                    var arr = v.split(","),
                        bgColor = arr[0],
                        borderColor = arr[1],
                        range = Math.round(self.parsePercent(arr[2]) * divs);
                    for (var n = 0; n < range; n++) {
                        colors.push({
                            "background-color": bgColor,
                            "border-color": borderColor
                        });
                    }
                });
                return colors;
            },
            //把百分比转换成小数
            parsePercent: function(value) {
                return value.replace(/%$/g, "") / 100;
            },
            //跳动
            beat: function(instance, $div, colorDivs, colors) {
                var opts = instance.options,
                    beat = opts.beat;
                if (beat <= 0) {
                    return;
                }
                var divs = opts.divs,
                    start = Math.max(0, colorDivs - beat - 1),
                    end = Math.min(divs, colorDivs + beat),
                    i = colorDivs,
                    asc = true,
                    defaultColor = {
                        "background-color": "",
                        "border-color": opts.borderColor
                    };
                instance.interval = setInterval(function() {
                    if (i === end) {
                        asc = false;
                        i--;
                    } else if (i === start) {
                        asc = true;
                        i++;
                    }
                    var color = asc ? colors[i] || {} : defaultColor;
                    $div.eq(divs - i - 1).css(color);
                    if (asc) {
                        i++;
                    } else {
                        i--;
                    }
                }, opts.beatDuration);
            }
        };
    //构造函数
    var divbar = function(dom, opts) {
        this.dom = dom;
        this.options = $.extend({}, defaults, opts);
        this.init();
    };
    //原型
    divbar.prototype = {
        constructor: divbar,
        //初始化
        init: function() {
            plugin.init(this);
        }
    };
    //jQuery方法扩展
    $.fn.divbar = function(opts, params) {
        if (typeof opts === "string") {
            return $.fn.divbar.methods[opts](this[0], params);
        }
        return this.each(function() {
            var bar = new divbar(this, opts);
            $.data(this, plugin.name, bar);
            return bar;
        });
    };
    //方法
    $.fn.divbar.methods = {
        //返回实例
        instance: function(el) {
            return $.data(el, plugin.name);
        },
        //返回参数
        options: function(el) {
            return this.instance(el).options;
        }
    };
    $.fn.divbar.defaults = defaults;
    return divbar;
}));