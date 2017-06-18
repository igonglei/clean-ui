/*!
 * labDesigner - lab designer based on mxgraph
 * Copyright 2017, Gonglei
 */
(function($, window, document, undefined) {
    "use strict";
    //默认参数
    var defaults = {
        //背景图片
        backgroundImage: null,
        //本地数据
        data: null,
        //数据url
        url: null,
        //mxGraph的变量
        graph: {
            //元素是否锁定
            cellsLocked: true,
            //是否显示label
            labelsVisible: false
        },
        //是否显示动画
        animation: true,
        //tooltip事件
        tooltip: null,
        //右键事件
        contextMenu: null,
        //高亮边框宽度
        highlightWidth: 1
    }, //常量以及方法
    plugin = {
        //插件名称
        name: "labDesigner",
        //初始化
        init: function(instance) {
            this.newGraph(instance);
            this.setBackground(instance);
            this.setContextMenu(instance);
            this.setTooltip(instance);
            this.setHighlight(instance);
            this.setAnimation(instance);
            this.loadData(instance, function(data) {
                if (!data || data.length === 0) {
                    return;
                }
                instance.data = data;
                this.putStyle(instance);
                this.fillGraph(instance);
            });
        },
        //创建一个mxgraph实例
        newGraph: function(instance) {
            var graph = instance.graph = new mxGraph(instance.dom);
            $.extend(graph, instance.options.graph);
        },
        //设置背景
        setBackground: function(instance) {
            var src = instance.options.backgroundImage, dom = instance.dom;
            if (src) {
                var img = new mxImage(src, dom.clientWidth, dom.clientHeight);
                instance.graph.setBackgroundImage(img);
            }
        },
        //设置右键
        setContextMenu: function(instance) {
            var contextMenu = instance.options.contextMenu;
            mxEvent.disableContextMenu(instance.dom);
            if (typeof contextMenu === "function") {
                instance.graph.popupMenuHandler.factoryMethod = function(menu, cell, evt) {
                    return contextMenu.apply(instance, arguments);
                };
            }
        },
        //设置tooltip
        setTooltip: function(instance) {
            var tooltip = instance.options.tooltip, graph = instance.graph;
            if (typeof tooltip === "function") {
                new mxTooltipHandler(graph);
                graph.getTooltipForCell = function(cell) {
                    return tooltip.apply(instance, arguments);
                };
            }
        },
        //设置高亮效果
        setHighlight: function(instance) {
            var tracker = new mxCellTracker(instance.graph);
            tracker.highlight.strokeWidth = instance.options.highlightWidth;
        },
        //增加动画
        setAnimation: function(instance) {
            var graph = instance.graph;
            if (instance.options.animation) {
                graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt) {
                    var changes = evt.getProperty("edit").changes;
                    mxEffects.animateChanges(graph, changes);
                });
            }
        },
        //加载数据
        loadData: function(instance, onLoad) {
            var self = this, opts = instance.options, url = opts.url;
            if (url) {
                $.get(url, function(data) {
                    onLoad && onLoad.call(self, data);
                });
                return;
            }
            onLoad && onLoad.call(self, opts.data);
        },
        //增加样式
        putStyle: function(instance) {
            var graph = instance.graph, style = instance.data.style;
            $.each(style, function(type, value) {
                $.each(value, function(name, o) {
                    if (type === "vertex") {
                        var style = graph.getStylesheet().getDefaultVertexStyle();
                        graph.getStylesheet().putCellStyle(name, o);
                    }
                });
            });
        },
        //填充数据
        fillGraph: function(instance) {
            var graph = instance.graph, data = instance.data;
            graph.getModel().beginUpdate();
            try {
                var parent = graph.getDefaultParent(), vertex = data.vertex;
                $.each(vertex, function(i, v) {
                    graph.insertVertex(parent, null, v.value, v.x, v.y, v.width, v.height, v.style);
                });
            } finally {
                graph.getModel().endUpdate();
            }
        },
        //重置大小
        resize: function(instance) {
            var graph = instance.graph;
            graph.center();
        }
    };
    //构造函数
    var labDesigner = function(dom, opts) {
        this.dom = dom;
        this.options = $.extend(true, {}, defaults, opts);
        this.init();
    };
    //原型
    labDesigner.prototype = {
        constructor: labDesigner,
        //初始化
        init: function() {
            plugin.init(this);
        },
        //放大
        zoomIn: function() {
            this.graph.zoomIn();
        },
        //缩小
        zoomOut: function() {
            this.graph.zoomOut();
        },
        //重置大小
        resize: function() {
            plugin.resize(this);
        }
    };
    window.labDesigner = labDesigner;
    //jQuery方法扩展
    $.fn.labDesigner = function(opts, params) {
        if (typeof opts === "string") {
            return $.fn.labDesigner.methods[opts](this[0], params);
        }
        return this.each(function() {
            var lab = new labDesigner(this, opts);
            $.data(this, plugin.name, lab);
            return lab;
        });
    };
    //方法
    $.fn.labDesigner.methods = {
        //获取实例
        instance: function(el) {
            return $.data(el, plugin.name);
        },
        //参数
        options: function(el) {
            return this.instance(el).options;
        },
        //返回mxgraph对象
        graph: function(el) {
            return this.instance(el).graph;
        },
        //放大
        zoomIn: function(el) {
            return this.instance(el).zoomIn();
        },
        //缩小
        zoomOut: function(el) {
            return this.instance(el).zoomOut();
        },
        //重置大小
        resize: function(el) {
            return this.instance(el).resize();
        }
    };
})(jQuery, window, document);
