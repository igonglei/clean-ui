/*!
 * pbar - a jQuery progress bar plugin
 * Copyright 2016, Gonglei
 */
(function($, window, undefined) {
    "use strict";
    //默认参数
    var defaults = {
        //背景
        backgroundColor: "#eee",
        //边框宽度
        borderWidth: 1,
        //边框样式
        borderStyle: "solid",
        //边框颜色
        borderColor: "#ddd",
        //边框圆角大小
        borderRadius: 10,
        //阴影颜色
        shadowColor: "#ccc",
        //阴影模糊值
        shadowBlur: 1,
        //阴影水平偏移值
        shadowOffsetX: 1,
        //阴影垂直偏移值
        shadowOffsetY: 1,
        //进度条颜色
        fillColor: "#53b542",
        //是否显示线性渐变
        gradient: false,
        //线性渐变，ie不支持，会按下面的3个渐变属性显示
        linearGradient: null,
        //线性渐变类型，0垂直渐变，1水平渐变
        gradientType: 0,
        //线性渐变开始颜色
        gradientStartColor: "#0c6405",
        //线性渐变结束颜色
        gradientEndColor: "#cff3b5",
        //进度条值，0~1之间
        value: 0,
        //是否显示进度文字
        label: false,
        //进度文字颜色
        labelColor: "#fff",
        //进度文字大小
        labelSize: 12,
        //进度文字位置
        labelAlign: "right",
        //是否需要动画
        animation: true,
        //动画时长，毫秒
        duration: 400,
        //标志图片，默认不显示，预设标识，drop（雨滴），还可以设置自定义图片
        symbol: "none",
        //标志大小
        symbolSize: 15,
        //标志位置，0~1之间
        symbolValue: 0,
        //持续效果（已废弃）
        continuous: false,
        //持续效果
        blur: false,
        //持续颜色
        blurColor: "#8bfb78"
    }, //常量以及方法
    plugin = {
        //插件名称
        name: "pbar",
        //图片资源
        images: {
            drop: "data:image/png;base64,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",
            blur: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAKCAYAAACjd+4vAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADRSURBVDhP7Y/rBgIBEIV7tiiKKN23dL9n2+43URRFr1MsLaUoooiWUhRR1EOcdqaniP0xP4aZ853PEFCsCM1tiK0cSK5dyG39EHdBlA4RVNU4WucMOtc8encJ/UcZo1cD43cb408bw2cdg0cFvZvEN81TGjU1wb/iPojs1ofUxs3ZoYUNwswCr2yGc2KEgRYCR5d2pNZuPqan4iHMIRRGod1bgSEEY7A2w1edy1CpzuUHrh7jP7BWnrJIhsEaQ1As8MgmOKcaWDfWjXXjPzc24gsSJxP0csqLrwAAAABJRU5ErkJggg=="
        },
        //是否ie8或者ie9
        ie: navigator.userAgent.indexOf("MSIE 8") >= 0 || navigator.userAgent.indexOf("MSIE 9") >= 0,
        //小数转换为百分比
        parsePercent: function(value) {
            value = Math.min(Math.max(value, 0), 1);
            var per = Math.round(value * 100) + "%";
            return per;
        },
        //初始化进度条
        initBar: function($bar, opts) {
            $bar.css({
                position: "relative",
                "background-color": opts.backgroundColor,
                "border-style": opts.borderStyle,
                "border-width": opts.borderWidth,
                "border-color": opts.borderColor,
                "border-radius": opts.borderRadius,
                "box-shadow": opts.shadowOffsetX + "px " + opts.shadowOffsetY + "px " + opts.shadowBlur + "px " + opts.shadowColor + " inset"
            });
            $bar.empty();
            this.fillBar($bar, opts);
            this.showSymbol($bar, opts);
        },
        //填充进度条
        fillBar: function($bar, opts) {
            var $pFill = $("<div></div>"), $fill = $('<div class="fill"></div>');
            $pFill.css({
                height: "100%",
                width: "100%",
                overflow: "hidden",
                "border-radius": opts.borderRadius
            });
            $fill.css({
                position: "relative",
                height: "100%",
                width: 0,
                "border-radius": opts.borderRadius,
                "background-color": opts.fillColor,
                overflow: "hidden",
                "line-height": "100%",
                color: opts.labelColor,
                "font-size": opts.labelSize,
                "text-align": opts.labelAlign
            });
            this.showGradient($fill, opts);
            $pFill.append($fill);
            $bar.append($pFill);
        },
        //显示渐变
        showGradient: function($fill, opts) {
            if (opts.gradient) {
                var angle = opts.gradientType ? "90deg" : "180deg", startColor = opts.gradientType ? opts.gradientEndColor : opts.gradientStartColor, endColor = opts.gradientType ? opts.gradientStartColor : opts.gradientEndColor;
                $fill.css({
                    background: opts.linearGradient || "linear-gradient(" + angle + "," + startColor + ", " + endColor + ")",
                    filter: "progid:DXImageTransform.Microsoft.gradient(GradientType=" + opts.gradientType + ",startColorstr=" + startColor + ", endColorstr=" + endColor + ")"
                });
            }
        },
        //显示运行中的模糊效果
        showBlur: function($fill, self) {
            var opts = self.options, blur = opts.blur || opts.continuous, ie = plugin.ie;
            if (blur && !self.interval) {
                if (ie) {
                    var $blur = $(self.dom).find(".blur");
                    if ($blur.length === 0) {
                        $blur = $('<img class="blur"/>');
                        $blur.attr("src", plugin.images.blur);
                        $blur.css({
                            position: "absolute",
                            height: "100%",
                            left: "0",
                            width: "20px"
                        });
                        $fill.append($blur);
                    }
                }
                var st = 0;
                self.interval = setInterval(function() {
                    var per = st + "%";
                    if (ie) {
                        $blur.css("left", per);
                    } else {
                        $fill.css("background", "linear-gradient(90deg," + opts.fillColor + " 0%, " + opts.blurColor + " " + per + "," + opts.fillColor + " 100%)");
                    }
                    if (st == 100) {
                        st = 0;
                    } else {
                        st += 10;
                    }
                }, 100);
            }
        },
        //隐藏模糊效果
        hideBlur: function($fill, self) {
            var it = self.interval;
            if (!it) {
                return;
            }
            clearInterval(it);
            self.interval = null;
            if (plugin.ie) {
                var $blur = $(self.dom).find(".blur");
                $blur.remove();
            } else {
                var opts = self.options;
                $fill.css("background", opts.fillColor);
            }
        },
        //显示标志
        showSymbol: function($bar, opts) {
            var sb = opts.symbol, hideSymbol = !sb || sb == "none";
            if (hideSymbol) {
                return;
            }
            $bar.css("margin-bottom", opts.symbolSize + 2);
            var $sb = $("<img/>");
            $sb.attr("src", plugin.images[sb] || sb);
            $sb.css({
                position: "absolute",
                left: plugin.parsePercent(opts.symbolValue),
                height: 0,
                "margin-top": "2px"
            });
            $bar.append($sb);
            if (opts.animation) {
                setTimeout(function() {
                    $sb.animate({
                        height: opts.symbolSize
                    }, opts.duration);
                }, opts.duration);
            } else {
                $sb.css("height", opts.symbolSize);
            }
        },
        //设置宽度
        setWidth: function($fill, opts, width) {
            if (opts.animation) {
                $fill.animate({
                    width: width
                }, opts.duration);
            } else {
                $fill.css("width", width);
            }
        },
        //设置文字
        setLabel: function($fill, opts, width) {
            $fill.attr("title", width);
            if (opts.label) {
                $fill.text(width);
            }
        }
    };
    //构造函数
    var pBar = function(dom, opts) {
        this.dom = dom;
        this.interval = null;
        this.options = $.extend({}, defaults, opts);
        this.init();
    };
    //原型
    pBar.prototype = {
        constructor: pBar,
        init: function() {
            var $bar = $(this.dom), opts = this.options;
            plugin.initBar($bar, opts);
            this.setValue();
        },
        getValue: function() {
            return this.options.value;
        },
        setValue: function(value) {
            var opts = this.options;
            opts.value = value || opts.value;
            var $fill = $(this.dom).find(".fill"), barWidth = plugin.parsePercent(opts.value);
            plugin.setWidth($fill, opts, barWidth);
            plugin.setLabel($fill, opts, barWidth);
            this.setBlur(barWidth != "100%", $fill);
        },
        setIncrement: function(value) {
            if (!value) {
                return;
            }
            var opts = this.options;
            this.setValue(opts.value + value);
        },
        setBlur: function(isShow, $fill) {
            $fill = $fill || $(this.dom).find(".fill");
            if (isShow) {
                plugin.showBlur($fill, this);
            } else {
                plugin.hideBlur($fill, this);
            }
        },
        setColor: function(color) {
            var $fill = $(this.dom).find(".fill"), opts = this.options;
            plugin.hideBlur($fill, this);
            opts.fillColor = color || opts.fillColor;
            $fill.css("background", opts.fillColor);
        }
    };
    window.pBar = pBar;
    //jQuery方法扩展
    $.fn.pbar = function(opts, params) {
        if (typeof opts === "string") {
            return $.fn.pbar.methods[opts](this[0], params);
        }
        return this.each(function() {
            var bar = new pBar(this, opts);
            $.data(this, plugin.name, bar);
            return bar;
        });
    };
    //方法
    $.fn.pbar.methods = {
        //返回实例
        instance: function(el) {
            return $.data(el, plugin.name);
        },
        //返回参数
        options: function(el) {
            return this.instance(el).options;
        },
        //返回进度值
        getValue: function(el) {
            return this.options(el).value;
        },
        //设置进度值
        setValue: function(el, value) {
            return this.instance(el).setValue(value);
        },
        //设置进度值，增量
        setIncrement: function(el, value) {
            return this.instance(el).setIncrement(value);
        },
        //是否需要模糊效果
        setBlur: function(el, isShow) {
            return this.instance(el).setBlur(isShow);
        },
        //设置进度条颜色
        setColor: function(el, color) {
            return this.instance(el).setColor(color);
        }
    };
})(jQuery, window);
