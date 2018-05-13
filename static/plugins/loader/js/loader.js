/*!
 * loader - a jQuery and css3 loading plugin
 * Copyright 2016, Gonglei
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
        root.loader = factory(root.jQuery);
    }
}(this, function($) {
    // Document
    var document = typeof window !== "undefined" ? window.document : {};
    //默认参数
    var defaults = {
            //动画效果
            animation: "ball-beat",
            //颜色
            color: "#fff",
            //背景
            backgroundColor: "rgba(0,0,0,0.6)",
            //z-index
            zIndex: 10000
        }, //常量以及方法
        plugin = {
            //插件名称
            name: "loader",
            //动画效果
            animations: {
                "ball-beat": 3,
                "ball-jump": 3,
                "ball-spin": 8
            }
        };
    //构造函数
    var loader = function(dom, opts) {
        this.instanceId = plugin.name + new Date().valueOf();
        this.dom = dom;
        this.options = $.extend({}, defaults, opts);
    };
    //原型
    loader.prototype = {
        constructor: loader,
        //显示
        show: function() {
            var $el = $(this.dom),
                opts = this.options,
                ani = opts.animation,
                $mask = $('<div class="' + plugin.name + '" id="' + this.instanceId + '"></div>'),
                $loader = $("<div></div>"),
                pos = $el.offset(),
                $elAni = $('<div class="' + ani + '"></div>'),
                itemCount = plugin.animations[ani] || 0;
            $mask.css({
                display: "none",
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: $el.css("width"),
                height: $el.css("height"),
                "background-color": opts.backgroundColor,
                "z-index": opts.zIndex
            });
            $loader.css({
                position: "absolute",
                top: "50%",
                left: "50%",
                color: opts.color,
                transform: "translate(-50%,-50%)"
            });
            for (var i = 0; i < itemCount; i++) {
                $elAni.append("<div></div>");
            }
            $loader.append($elAni);
            $mask.append($loader);
            $(document.body).append($mask);
            $mask.show();
        },
        //隐藏
        hide: function() {
            $("#" + this.instanceId).remove();
        }
    };
    //显示加载动画
    $.fn.showLoader = function(opts) {
        return this.hideLoader().each(function() {
            var ld = new loader(this, opts);
            $.data(this, plugin.name, ld);
            ld.show();
        });
    };
    //隐藏加载动画
    $.fn.hideLoader = function() {
        return this.each(function() {
            var ld = $.data(this, plugin.name);
            if (ld) {
                ld.hide();
            }
        });
    };
    $.fn.showLoader.defaults = defaults;
    return loader;
}));