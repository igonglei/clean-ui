/*!
 * topoViewer - a topo viewer based on mxgraph
 * Copyright 2018, Gonglei
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
        root.topoViewer = factory(root.jQuery);
    }
})(this, function($) {
    // Document
    var document = typeof window !== "undefined" ? window.document : {};
    // 默认参数
    var defaults = {
            // 根目录
            root: "static/plugins/topoViewer/",
            // 图片目录
            imageDir: "images/",
            // 实验室布局图
            background: "background.jpg",
            // 服务端数据
            url: null,
            // 本地数据目录
            dataDir: "data/",
            // 本地数据
            data: "data.json",
            // 缩放
            scale: 1
        }, // 辅助方法
        utils = {
            // 格式化模板
            template: function(tpl, data) {
                if (!tpl || !data) {
                    return tpl;
                }
                var reg = /{(.*?)}/g,
                    match = tpl.match(reg);
                $.each(match, function(i, v) {
                    var key = v.replace(reg, "$1"),
                        value = data[key];
                    if (value !== undefined) {
                        tpl = tpl.replace(v, value);
                    }
                });
                return tpl;
            },
            // 四舍五入
            round: function(number, decimal, percent) {
                var temp = Math.pow(10, decimal);
                return Math.round(number * temp * (percent ? 100 : 1)) / temp;
            }
        }, // 常量以及方法
        plugin = {
            // 插件名称
            name: "topoViewer",
            props: {
                // mxgraph的属性
                mxGraph: {
                    cellsResizable: false,
                    cellsEditable: false,
                    edgeLabelsMovable: false,
                    allowDanglingEdges: false
                },
                // mxgraph的常量
                mxConsts: {
                    DEFAULT_FONTFAMILY: "Helvetica,Arial",
                    VERTEX_SELECTION_COLOR: "#FF0000",
                    EDGE_SELECTION_COLOR: "#FF0000",
                    VERTEX_SELECTION_STROKEWIDTH: 2,
                    EDGE_SELECTION_STROKEWIDTH: 2
                },
                // 高亮颜色
                cellHighlightColor: "#00FF00",
                // 元素样式
                cellStyle: {
                    snc: {
                        name: "snc",
                        img: "snc.png"
                    },
                    snc_error: {
                        name: "snc_error",
                        img: "snc_error.png"
                    },
                    router: {
                        name: "router",
                        img: "router.png"
                    },
                    router_error: {
                        name: "router_error",
                        img: "router_error.png"
                    },
                    fp: {
                        name: "fp",
                        img: "fp.png"
                    },
                    fp_error: {
                        name: "fp_error",
                        img: "fp_error.png"
                    }
                },
                // 分组样式
                groupStyle: {
                    circle: "circle",
                    rectangle: "rectangle",
                    cloud: "cloud"
                },
                // 链路样式
                linkStyle: {
                    link: "link",
                    link_error: "link_error"
                },
                // 设备分类
                deviceCategory: {
                    snc: "Server",
                    router: "Router",
                    fp: "Switch"
                },
                // 图例
                lengend: [{
                    name: "SNC",
                    cls: "snc"
                }, {
                    name: "S-Router",
                    cls: "router"
                }, {
                    name: "FP",
                    cls: "fp"
                }],
                // 巡检状态
                inspectStatus: [{
                    cname: "致命",
                    cls: "fatal"
                }, {
                    cname: "严重",
                    cls: "serious"
                }, {
                    cname: "一般",
                    cls: "commonly"
                }],
                // 巡检级别
                inspectLevel: {
                    fatal: 0,
                    serious: 1,
                    commonly: 2
                },
                // 元素排列方式
                arrange: {
                    grid: "grid",
                    circle: "circle"
                }
            },
            // 初始化
            init: function(instance) {
                $(document.body).addClass(this.name + "-body");
                instance.$el.addClass(this.name);
                this.initGraph(instance);
            },
            // 初始化画布
            initGraph: function(instance) {
                var opts = instance.options,
                    graphContainer = instance.dom,
                    graph = instance.graph = new mxGraph(graphContainer),
                    props = this.props;
                $.extend(graph, props.mxGraph);
                $.extend(mxConstants, props.mxConsts);
                new mxRubberband(graph);
                new mxCellTracker(graph, props.cellHighlightColor);
                mxEvent.disableContextMenu(graphContainer);
                graph.zoomTo(opts.scale);
                this.initProps(instance);
                this.setBackground(instance);
                this.setLengend(instance);
                this.setStatus(instance);
                this.configureStylesheet(instance);
                this.getTooltipForCell(graph);
                this.getLabel(graph);
                this.draw(instance);
            },
            // 初始化实例属性
            initProps: function(instance) {
                var graph = instance.graph,
                    model = graph.getModel(),
                    opts = instance.options,
                    root = opts.root,
                    imgPath = root + opts.imageDir;
                instance.mxHelper = new mxHelper(model, graph);
                instance.sourceData = {
                    devices: [],
                    links: []
                };
                instance.path = {
                    imgDir: imgPath,
                    background: imgPath + opts.background,
                    data: root + opts.dataDir + opts.data
                };
            },
            // 设置背景
            setBackground: function(instance) {
                var bg = instance.path.background;
                instance.$el.after(utils.template('<img class="topo-bg" / src="{bg}">', {
                    bg: bg
                }));
            },
            // 显示文字
            getLabel: function(graph) {
                graph.getLabel = function(cell) {
                    return cell.value && cell.value.label;
                };
            },
            // tooltip
            getTooltipForCell: function(graph) {
                var groupStyle = this.props.groupStyle,
                    buildInspectMsg = function(value) {
                        var inspectMessage = "";
                        $.each(value.inspectResult, function(i, v) {
                            inspectMessage += utils.template('<div class="col-xs-4 error">{name}</div><div class="col-xs-8 error">{msg}</div>', v);
                        });
                        value.InspectMessage = inspectMessage;
                        return value;
                    };
                graph.setTooltips(true);
                graph.getTooltipForCell = function(cell) {
                    var value = cell.value;
                    if (!value) {
                        return;
                    }
                    if (cell.edge) {
                        value = buildInspectMsg(value);
                        if (!value.InspectMessage) {
                            return;
                        }
                        var html = '<div class="row topo-cell-tooltip">{InspectMessage}</div>';
                        return utils.template(html, value);
                    } else {
                        if (cell.group) {
                            return;
                        }
                        value = buildInspectMsg(value);
                        var html = '<div class="row topo-cell-tooltip"><div class="col-xs-4">名称</div><div class="col-xs-8">{Name}</div><div class="col-xs-4">IP</div><div class="col-xs-8">{IP}</div>{InspectMessage}</div>';
                        return utils.template(html, value);
                    }
                };
            },
            // 图例
            setLengend: function(instance) {
                var $le = $('<ul class="topoLegend"></ul>').insertAfter(instance.$el);
                $.each(this.props.lengend, function(i, v) {
                    $le.append(utils.template('<li class="{cls}"><span class="icon"></span><span class="text">{name}</span></li>', v));
                });
            },
            // 告警状态
            setStatus: function(instance) {
                var $le = $('<div class="divStatus"></div>').insertAfter(instance.$el),
                    status = this.props.inspectStatus,
                    levels = this.props.inspectLevel;
                $.each(status, function(i, v) {
                    v.level = levels[v.cls];
                    $le.append(utils.template('<div class="status {cls}" data-level="{level}"><span class="text">{cname}</span><span class="value">0</span></div>', v));
                });
            },
            // 增加设备样式
            configureStylesheet: function(instance) {
                var imgPath = instance.path.imgDir,
                    cellStyle = this.props.cellStyle,
                    linkStyle = this.props.linkStyle,
                    groupStyle = this.props.groupStyle,
                    graphStyle = instance.graph.getStylesheet(),
                    putCellStyle = function(oStyle) {
                        var style = {};
                        style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_IMAGE;
                        style[mxConstants.STYLE_IMAGE] = imgPath + oStyle.img;
                        style[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                        style[mxConstants.STYLE_VERTICAL_LABEL_POSITION] = mxConstants.ALIGN_BOTTOM;
                        graphStyle.putCellStyle(oStyle.name, style);
                    };
                // 设备样式
                $.each(cellStyle, function(key, oStyle) {
                    putCellStyle(oStyle);
                });
                // 连线样式
                var idleStyle = {};
                idleStyle[mxConstants.STYLE_STROKECOLOR] = "rgba(0,155,77,0.5)";
                idleStyle[mxConstants.STYLE_STROKEWIDTH] = 2;
                idleStyle[mxConstants.STYLE_FONTSTYLE] = 3;
                idleStyle[mxConstants.STYLE_PERIMETER_SPACING] = 2;
                idleStyle[mxConstants.STYLE_ENDARROW] = "";
                graphStyle.putCellStyle(linkStyle.link, idleStyle);
                // 连线警告样式
                var linkWarnStyle = $.extend({}, idleStyle);
                linkWarnStyle[mxConstants.STYLE_STROKECOLOR] = "rgba(219,25,33,0.6)";
                graphStyle.putCellStyle(linkStyle.link_error, linkWarnStyle);
                // 圆形分组样式
                var circleStyle = {};
                circleStyle[mxConstants.STYLE_FILLCOLOR] = "rgba(255,255,255,0.1)";
                circleStyle[mxConstants.STYLE_FONTSIZE] = 0;
                circleStyle[mxConstants.STYLE_FONTCOLOR] = "#f6f7e3";
                circleStyle[mxConstants.STYLE_VERTICAL_ALIGN] = mxConstants.ALIGN_TOP;
                circleStyle[mxConstants.STYLE_ALIGN] = mxConstants.ALIGN_LEFT;
                circleStyle[mxConstants.STYLE_SPACING_LEFT] = 10;
                circleStyle[mxConstants.STYLE_SPACING_RIGHT] = 10;
                circleStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_ELLIPSE;
                graphStyle.putCellStyle(groupStyle.circle, circleStyle);
                // 矩形分组样式
                var rectStyle = $.extend({}, circleStyle);
                rectStyle[mxConstants.STYLE_FONTSIZE] = 20;
                rectStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
                graphStyle.putCellStyle(groupStyle.rectangle, rectStyle);
                // 云朵分组样式
                var cloudStyle = $.extend({}, circleStyle);
                cloudStyle[mxConstants.STYLE_FONTSIZE] = 20;
                cloudStyle[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_CLOUD;
                graphStyle.putCellStyle(groupStyle.cloud, cloudStyle);
            },
            // 画设备和链路
            draw: function(instance) {
                var self = this,
                    retry = 1;
                var request = function(method) {
                    $.ajax({
                        method: method || "GET",
                        url: instance.options.url || instance.path.data + "?ts=" + new Date().valueOf(),
                        dataType: "json",
                        success: function(data) {
                            var devices = data && data.devices;
                            if (!devices || devices.length == 0) {
                                return;
                            }
                            instance.sourceData.devices = devices;
                            instance.sourceData.links = data.links || [];
                            self.resize(instance);
                        },
                        error: function(err) {
                            if (err.status === 405) {
                                if (retry === 0) {
                                    return;
                                }
                                retry--;
                                request("POST");
                            }
                        }
                    });
                };
                request();
            },
            // 自动适应
            resize: function(instance) {
                var graph = instance.graph,
                    model = graph.getModel();
                graph.removeCells(graph.getDefaultParent().children);
                model.beginUpdate();
                try {
                    this.insertDevice(instance);
                    this.insertLink(instance);
                } finally {
                    model.endUpdate();
                    this.collapseGroup(instance);
                    this.setCount(instance);
                    this.setInspectCount(instance);
                }
            },
            // 添加设备
            insertDevice: function(instance) {
                var self = this,
                    graph = instance.graph,
                    devices = instance.sourceData.devices,
                    topoWidth = instance.$el.width();
                $.each(devices, function(i, v) {
                    if (v.group) {
                        self.insertGroup(graph, v, topoWidth);
                    } else {
                        self.insertCell(graph, v, topoWidth);
                    }
                });
            },
            // 添加元素
            insertCell: function(graph, v, topoWidth) {
                var startx = v.x,
                    len = v.cells.length;
                if (startx === "center") {
                    startx = (topoWidth - len * v.width - v.margin * (len - 1)) / 2;
                }
                $.each(v.cells, function(n, m) {
                    graph.insertVertex(null, null, m, m.x || startx + v.margin * n, m.y || v.y, m.width || v.width, m.height || v.height, m.style || v.style);
                });
            },
            // 添加分组
            insertGroup: function(graph, v, topoWidth) {
                var self = this,
                    startx = v.x,
                    len = v.cells.length,
                    arranges = self.props.arrange;
                if (startx === "center") {
                    var totalWidth = 0;
                    $.each(v.cells, function(n, m) {
                        totalWidth += m.width || v.width;
                    });
                    startx = (topoWidth - totalWidth - v.margin * (len - 1)) / 2 + (v.offset || 0) * len;
                }
                $.each(v.cells, function(n, m) {
                    if (m.collapse === undefined) {
                        m.collapse = v.collapse || false;
                    }
                    var arrange = m.arrange || v.arrange;
                    var group = graph.insertVertex(null, null, m, m.x || startx + v.margin * n, m.y || v.y, m.width || v.width, m.height || v.height, m.style || v.style);
                    group.group = true;
                    $.each(m.cells, function(o, p) {
                        var point = {
                            X: p.x || m.cellX || v.cellX,
                            Y: p.y || m.cellY || v.cellY
                        };
                        if (arrange === arranges.circle) {
                            point = self.getPointInCircle(o, m.cells.length, m.width || v.width);
                        } else if (arrange === arranges.grid) {
                            point = self.getThePointFun(m.cellX || v.cellX, m.cellY || v.cellY, m.cellMargin || v.cellMargin, m.cellMargin || v.cellMargin, o, m.cellColumn || v.cellColumn);
                        }
                        graph.insertVertex(group, null, p, point.X, point.Y, p.width || m.cellWidth || v.cellWidth, p.height || m.cellHeight || v.cellHeight, p.style || m.cellStyle || v.cellStyle);
                    });
                });
            },
            // 添加链路
            insertLink: function(instance) {
                var self = this,
                    links = instance.sourceData.links,
                    linkStyle = self.props.linkStyle.link;
                $.each(links, function(i, v) {
                    var fromCell = self.getVertexById(instance, v.DeviceRootID),
                        toCell = self.getVertexById(instance, v.PeerDeviceRootID);
                    if (fromCell && toCell) {
                        instance.graph.insertEdge(null, null, v, fromCell, toCell, v.style || linkStyle);
                    }
                });
            },
            // 在指定范围内获取指定元素的坐标，按照几行几列顺序排列
            getThePointFun: function(startX, startY, offsetX, offsetY, num, columnCount) {
                var point = {};
                var level = Math.floor(num / columnCount);
                point.X = (num - level * columnCount) * offsetX + startX;
                point.Y = level * offsetY + startY;
                return point;
            },
            // 获取圆形里面的坐标
            getPointInCircle: function(i, count, size) {
                var deg = size / count;
                var v = 2 * Math.PI / size * deg * i;
                var r = size / 2;
                return {
                    X: r + Math.sin(v) * r,
                    Y: r - Math.cos(v) * r
                };
            },
            // 折叠分组
            collapseGroup: function(instance) {
                var self = this,
                    arrCell = instance.mxHelper.getVertexs(true, function(n) {
                        return n.value.collapse;
                    });
                instance.graph.foldCells(true, true, arrCell);
            },
            // 获取画布元素
            getVertexById: function(instance, value) {
                return instance.mxHelper.getVertexs(true, function(n) {
                    return n.value && n.value.ID == value;
                })[0];
            },
            // 设置数据
            setCount: function(instance) {
                var self = this,
                    cells = instance.mxHelper.getVertexs(true),
                    sncCategory = this.props.deviceCategory.snc,
                    routerCategory = this.props.deviceCategory.router,
                    fpCategory = this.props.deviceCategory.fp,
                    linkErrorStyle = this.props.linkStyle.link_error,
                    routerLinkCount = 0,
                    routerUnLinkCount = 0,
                    fpLinkCount = 0,
                    fpUnLinkCount = 0,
                    getCount = function(category) {
                        return $.grep(cells, function(n, m) {
                            return n.value.Category === category;
                        }).length;
                    },
                    calcRate = function(linkCount, unLinkCount) {
                        if (linkCount === 0 && unLinkCount === 0) {
                            return "0%";
                        }
                        return utils.round(linkCount / (linkCount + unLinkCount), 1, true) + "%";
                    };
                $.each(instance.sourceData.links, function(i, v) {
                    var cell = self.getVertexById(instance, v.DeviceRootID),
                        peerCell = self.getVertexById(instance, v.PeerDeviceRootID);
                    if (!cell || !peerCell) {
                        return;
                    }
                    if (cell.value.Category === routerCategory && peerCell.value.Category === routerCategory || cell.value.Category === routerCategory && peerCell.value.Category === sncCategory || cell.value.Category === sncCategory && peerCell.value.Category === routerCategory) {
                        if (v.style === linkErrorStyle) {
                            routerUnLinkCount++;
                        } else {
                            routerLinkCount++;
                        }
                    }
                    if (cell.value.Category === routerCategory && peerCell.value.Category === fpCategory || cell.value.Category === fpCategory && peerCell.value.Category === routerCategory) {
                        if (v.style === linkErrorStyle) {
                            fpUnLinkCount++;
                        } else {
                            fpLinkCount++;
                        }
                    }
                });
                $("#fpRegCount").text(getCount(sncCategory));
                $("#routerCount").text(getCount(routerCategory));
                $("#fpCount").text(getCount(fpCategory));
                $("#routerLinked").text(routerLinkCount);
                $("#routerUnlinked").text(routerUnLinkCount);
                $("#routerRate").text(calcRate(routerLinkCount, routerUnLinkCount));
                $("#fpLinked").text(fpLinkCount);
                $("#fpUnlinked").text(fpUnLinkCount);
                $("#fpRate").text(calcRate(fpLinkCount, fpUnLinkCount));
            },
            // 设置巡检结果
            setInspectCount: function(instance) {
                var cells = instance.mxHelper.getCells(true),
                    inspectResults = $.map($.grep(cells, function(n) {
                        return n.value && n.value.inspectResult;
                    }), function(o) {
                        return o.value.inspectResult;
                    });
                var count = {
                        fatal: 0,
                        serious: 0,
                        commonly: 0
                    },
                    levels = this.props.inspectLevel;
                $.each(inspectResults, function(i, v) {
                    if (v.level === levels.fatal) {
                        count.fatal++;
                    } else if (v.level === levels.serious) {
                        count.serious++;
                    } else {
                        count.commonly++;
                    }
                });
                $.each(levels, function(key, value) {
                    $('.status[data-level="' + value + '"] .value').text(count[key]);
                });
            }
        };
    // mxClient的辅助方法
    var mxHelper = function(model, graph) {
        var helper = {};
        var addVertexs = function(par, arrVertex, deep) {
            var arr = model.getChildVertices(par);
            if (arr.length > 0) {
                $.merge(arrVertex, arr);
                if (deep) {
                    $.each(arr, function(i, v) {
                        addVertexs(v, arrVertex, deep);
                    });
                }
            }
        };
        var addEdges = function(par, arrEdge, deep) {
            var arr = model.getChildEdges(par);
            if (arr.length > 0) {
                $.merge(arrEdge, arr);
                if (deep) {
                    var arrVetex = model.getChildVertices(par);
                    $.each(arrVetex, function(i, v) {
                        addEdges(v, arrEdge, deep);
                    });
                }
            }
        };
        // 获取设备
        helper.getVertexs = function(deep, callback) {
            var parent = graph.getDefaultParent();
            var cells = [];
            addVertexs(parent, cells, deep);
            return callback ? $.grep(cells, callback) : cells;
        };
        // 获取连线
        helper.getEdges = function(deep, callback) {
            var parent = graph.getDefaultParent();
            var cells = [];
            addEdges(parent, cells, deep);
            return callback ? $.grep(cells, callback) : cells;
        };
        // 获取所有元素
        helper.getCells = function(deep, callback) {
            var cells = this.getVertexs(deep).concat(this.getEdges(deep));
            return callback ? $.grep(cells, callback) : cells;
        };
        return helper;
    };
    // 构造函数
    var topoViewer = function(dom, opts) {
        this.instanceId = plugin.name + new Date().valueOf();
        this.dom = dom;
        this.$el = $(dom);
        this.options = $.extend({}, defaults, opts);
        this.init();
    };
    // 原型
    topoViewer.prototype = {
        constructor: topoViewer,
        // 初始化
        init: function() {
            plugin.init(this);
        },
        // 自动适应
        resize: function() {
            plugin.resize(this);
        }
    };
    // jQuery方法扩展
    $.fn.topoViewer = function(opts, params) {
        if (typeof opts === "string") {
            return $.fn.topoViewer.methods[opts](this[0], params);
        }
        return this.each(function() {
            var viewer = new topoViewer(this, opts);
            $.data(this, plugin.name, viewer);
            return viewer;
        });
    };
    // 方法
    $.fn.topoViewer.methods = {
        // 获取实例
        instance: function(el) {
            return $.data(el, plugin.name);
        },
        // 参数
        options: function(el) {
            return this.instance(el).options;
        },
        // 自动适应
        resize: function(el) {
            return this.instance(el).resize();
        }
    };
    $.fn.topoViewer.defaults = defaults;
    return topoViewer;
});