/*!
 * csgrid - a custom grid plugin
 * Copyright 2016, Gonglei
 */
(function($, window, document, undefined) {
    "use strict";
    //默认参数
    var defaults = {
        //显示列
        columns: null,
        //本地数据
        data: null,
        //数据url
        url: null,
        //查询参数
        queryParams: {},
        //是否分页
        pager: false,
        //页码
        pageNumber: 1,
        //页面行数
        pageSize: 5,
        //行高
        rowHeight: 40,
        //表格高度
        height: null,
        //没有数据显示的提示文字
        noDataText: "没有数据",
        //页脚
        footer: false,
        //页脚文字
        footerMsg: "共{total}条",
        //查询参数过滤器，参数queryParams
        queryFilter: null,
        //数据过滤器，参数data
        loadFilter: null,
        //开始加载事件
        onBeforeLoad: null,
        //加载完成事件
        onLoadSuccess: null
    }, //常量以及方法
    plugin = {
        //插件名称
        name: "csgrid",
        //样式
        getCls: function() {
            var prefix = this.name + "-";
            return {
                //初始化完成样式
                load: prefix + "f",
                //表头样式
                header: prefix + "header",
                //表体样式
                body: prefix + "body",
                //页脚样式
                footer: prefix + "footer",
                //无数据样式
                noData: prefix + "nodata",
                //单元格样式
                cell: prefix + "cell",
                //空白单元格样式
                emptyCell: prefix + "emptycell"
            };
        },
        //初始化
        init: function(self) {
            var opts = self.options, cols = opts.columns;
            if (!cols || cols.length === 0) {
                return;
            }
            opts.mergeColumns = this.mergeCols(cols);
            opts.realData = {
                total: 0,
                rows: []
            };
            if (!this.cls) {
                this.cls = this.getCls();
            }
            this.grid(self).attr("id", self.instanceId);
            this.initHeader(self);
            this.reload(self);
        },
        //格式化模板
        template: function(tpl, data) {
            if (!tpl || !data) {
                return tpl;
            }
            var reg = /{(.*?)}/g, match = tpl.match(reg);
            $.each(match, function(i, v) {
                var key = v.replace(reg, "$1"), value = data[key];
                if (value !== undefined) {
                    tpl = tpl.replace(v, value);
                }
            });
            return tpl;
        },
        //获取表格结构
        grid: function(self, type) {
            var $tb = $(self.dom), cls = this.cls, loadcls = cls.load, $grid;
            if ($tb.hasClass(loadcls)) {
                $grid = $tb.parent();
                return type ? this.child($grid, type) : $grid;
            }
            $tb.addClass(loadcls).hide();
            $grid = $('<div class="' + this.name + '"><div class="' + cls.header + '"></div><div class="' + cls.body + '"></div></div>');
            $grid.insertAfter($tb);
            $tb.appendTo($grid);
            return $grid;
        },
        //获取表头或表体
        child: function($grid, type) {
            return $grid.children("div." + this.cls[type]);
        },
        //合并列
        mergeCols: function(cols) {
            var fstCols = cols[0], nextCols = cols[1], arr = [];
            if (!$.isArray(fstCols)) {
                return cols;
            }
            var tmpCols = nextCols && nextCols.concat();
            $.each(fstCols, function(i, v) {
                var key = v.field, colspan = v.colspan;
                if (key) {
                    arr.push(v);
                } else {
                    if (colspan && tmpCols) {
                        var csCols = tmpCols.splice(0, colspan);
                        arr = arr.concat(csCols);
                    }
                }
            });
            return arr;
        },
        //初始化表头
        initHeader: function(self) {
            this.resize(self);
            var $tb = $("<table><tbody></tbody></table>");
            this.grid(self, "header").html($tb);
            this.fillHeader($tb.children("tbody"), self.options.columns);
        },
        //填充表头
        fillHeader: function($tbody, cols) {
            var $tr = $("<tr></tr>"), isOneHeader = true, that = this, cellStyle = that.cls.cell;
            $.each(cols, function(i, col) {
                if ($.isArray(col)) {
                    isOneHeader = false;
                    that.fillHeader($tbody, col);
                    return;
                }
                var td = "<td", div = "<div", colspan = col.colspan, rowspan = col.rowspan, halign = col.haligh, field = col.field, value = col.title;
                if (colspan) {
                    td += ' colspan="' + colspan + '"';
                }
                if (rowspan) {
                    td += ' rowspan="' + rowspan + '"';
                }
                if (field) {
                    div += ' class="' + cellStyle + " " + cellStyle + "-" + field + '"';
                }
                if (halign) {
                    div += ' style="text-align:' + halign + ';"';
                }
                div += ' title="' + value + '">' + value + "</div>";
                td += ">" + div + "</td>";
                $tr.append(td);
            });
            if (isOneHeader) {
                $tbody.append($tr);
            }
        },
        //获取列宽度
        getColWitdh: function(width, total) {
            var value = parseInt(width);
            return isNaN(value) ? "auto" : parseInt(/%$/.test(width) ? value / 100 * total : value) - 2 + "px";
        },
        //创建单元格样式
        createCellStyle: function($grid, self, gridWidth) {
            var cols = self.options.mergeColumns, instanceId = self.instanceId, that = this, style = [ '<style type="text/css" ' + that.name + '="true" data-target="' + instanceId + '">' ], cellStyle = that.cls.cell + "-";
            $.each(cols, function(i, col) {
                var field = col.field;
                if (!field) {
                    return;
                }
                var width = that.getColWitdh(col.width, gridWidth);
                if (width === "auto") {
                    return;
                }
                style.push("#" + instanceId + " ." + cellStyle + field + "{width:" + width + "}");
            });
            style.push("</style>");
            $(style.join("\n")).appendTo($grid);
        },
        //删除单元格样式
        removeCellStyle: function($grid) {
            $grid.children("style[" + this.name + "]").remove();
        },
        //重置大小
        resize: function(self) {
            var $grid = this.grid(self);
            if ($grid.is(":hidden")) {
                return;
            }
            var $head = this.child($grid, "header"), $body = this.child($grid, "body"), $tbody = $body.children("table"), gridWidth = parseInt($grid.css("width"));
            if (this.hasScrollbar($body)) {
                gridWidth -= 20;
                this.addEmptyCell($head);
            }
            if (parseInt($tbody.css("width")) === gridWidth && $grid.children("style[data-target=" + self.instanceId + "]").length > 0) {
                return;
            }
            $tbody.css("width", gridWidth);
            $head.children("table").css("width", gridWidth);
            this.removeCellStyle($grid);
            this.createCellStyle($grid, self, gridWidth);
        },
        //是否有滚动条
        hasScrollbar: function($body) {
            var tb = $body.children("table")[0];
            return tb && parseInt($body.css("height")) < parseInt(tb.style.height);
        },
        //添加空白单元格
        addEmptyCell: function($head) {
            var emptyCls = this.cls.emptyCell, emptyCell = '<div class="' + emptyCls + '"></div>';
            if ($head.children("." + emptyCls).length === 0) {
                $head.append(emptyCell);
            }
        },
        //初始化表体
        initBody: function(self, isNoData) {
            var opts = self.options, $gbody = this.grid(self, "body");
            $gbody.empty().css("height", isNoData ? "auto" : opts.height || opts.pageSize * opts.rowHeight);
            return $gbody;
        },
        //显示无数据
        showNoData: function(self) {
            var $gbody = this.initBody(self, true);
            $gbody.html('<div class="' + this.cls.noData + '">' + self.options.noDataText + "</div>");
        },
        //初始化页脚
        initFooter: function(self) {
            var $grid = this.grid(self), $footer = this.child($grid, "footer"), opts = self.options, footer = opts.footer, data = opts.realData, html;
            if (typeof footer === "function") {
                html = footer.call(self.dom, data);
            } else if (footer === true) {
                html = this.template(opts.footerMsg, data);
            } else {
                return;
            }
            if ($footer.length === 0) {
                $footer = $('<div class="' + this.cls.footer + '"></div>');
                $footer.appendTo($grid);
            }
            $footer.html(html);
        },
        //重新加载
        reload: function(self) {
            this.initBody(self);
            var opts = self.options, onBeforeLoad = opts.onBeforeLoad;
            if (onBeforeLoad) {
                onBeforeLoad.call(self.dom);
            }
            if (opts.url) {
                this.ajaxData(self);
            } else {
                this.loadData(self);
            }
        },
        //解析数据
        parseData: function(opts) {
            var data = opts.data;
            if (opts.pager) {
                if ($.isArray(data)) {
                    var end = opts.pageNumber * opts.pageSize, start = end - opts.pageSize;
                    data = data.slice(start, end);
                }
            }
            if ($.isArray(data)) {
                return {
                    total: opts.data.length,
                    rows: data
                };
            }
            return data;
        },
        //加载远程数据
        ajaxData: function(self) {
            var opts = self.options, that = this;
            if (opts.pager) {
                var queryParams = opts.queryParams, queryFilter = opts.queryFilter;
                $.extend(queryParams, {
                    page: opts.pageNumber,
                    row: opts.pageSize
                });
                if (queryFilter) {
                    queryParams = queryFilter.call(self.dom, queryParams);
                }
                opts.queryParams = queryParams;
            }
            $.post(opts.url, opts.queryParams, function(data) {
                opts.data = data;
                that.loadData(self);
            });
        },
        //填充数据
        loadData: function(self) {
            var opts = self.options, dom = self.dom, loadFilter = opts.loadFilter, onLoadSuccess = opts.onLoadSuccess;
            if (loadFilter) {
                opts.data = loadFilter.call(dom, opts.data);
            }
            var data = this.parseData(opts);
            opts.realData = data;
            this.initFooter(self);
            if (!data || !data.total) {
                this.showNoData(self);
            } else {
                var cls = this.cls, $grid = this.grid(self), $gbody = this.child($grid, "body"), $tb = $("<table><tbody></tbody></table>"), $tbody = $tb.children("tbody"), mCols = opts.mergeColumns, rows = data.rows, height = rows.length * opts.rowHeight, gHeight = opts.height, cellStyle = cls.cell;
                if (!gHeight || gHeight > height) {
                    $gbody.css("height", height);
                }
                $tb.css("height", height).appendTo($gbody);
                this.resize(self);
                $.each(rows, function(i, v) {
                    var $tr = $('<tr data-index="' + i + '"></tr>');
                    $.each(mCols, function(n, col) {
                        var field = col.field;
                        if (!field) {
                            return;
                        }
                        var value = v[field] === undefined ? "" : v[field], style = "", title = "", rowStyler = col.rowStyler, formatter = col.formatter, tooltip = col.tooltip, align = col.align, el = $tr[0];
                        if (rowStyler) {
                            style = rowStyler.call(el, value, i, v);
                        }
                        if (formatter) {
                            value = formatter.call(el, value, i, v);
                        }
                        if (typeof tooltip === "function") {
                            title = tooltip.call(el, value, i, v);
                        } else if (tooltip === true) {
                            title = value;
                        }
                        var div = '<div class="' + cellStyle + " " + cellStyle + "-" + field + '"';
                        if (align) {
                            div += ' style="text-align:' + align + ";";
                            if (style) {
                                div += style;
                            }
                            div += '"';
                        } else {
                            if (style) {
                                div += ' style="' + style + '"';
                            }
                        }
                        if (title) {
                            div += ' title="' + title + '"';
                        }
                        div += ">" + value + "</td>";
                        $tr.append("<td>" + div + "</td>");
                    });
                    $tbody.append($tr);
                });
            }
            if (onLoadSuccess) {
                onLoadSuccess.call(dom, data);
            }
        }
    };
    //构造函数
    var csGrid = function(dom, opts) {
        this.instanceId = plugin.name + new Date().valueOf();
        this.dom = dom;
        this.options = $.extend({}, defaults, opts);
    };
    //原型
    csGrid.prototype = {
        constructor: csGrid,
        //初始化
        init: function() {
            plugin.init(this);
        },
        //重新加载
        reload: function(opts) {
            $.extend(this.options, opts);
            plugin.reload(this);
        },
        //加载本地数据
        loadData: function(data) {
            this.reload({
                data: data
            });
        },
        //返回grid对象
        grid: function(type) {
            return plugin.grid(this, type);
        },
        //重置大小
        resize: function() {
            return plugin.resize(this);
        }
    };
    window.csGrid = csGrid;
    //jQuery方法扩展
    $.fn.csgrid = function(opts, params) {
        if (typeof opts === "string") {
            return $.fn.csgrid.methods[opts](this[0], params);
        }
        return this.each(function() {
            var grid = new csGrid(this, opts);
            $.data(this, plugin.name, grid);
            grid.init();
            return grid;
        });
    };
    //方法
    $.fn.csgrid.methods = {
        //获取实例
        instance: function(el) {
            return $.data(el, plugin.name);
        },
        //参数
        options: function(el) {
            return this.instance(el).options;
        },
        //重新加载
        reload: function(el, opts) {
            return this.instance(el).reload(opts);
        },
        //填充数据
        loadData: function(el, data) {
            return this.instance(el).loadData(data);
        },
        //获取数据
        getData: function(el) {
            return this.options(el).realData;
        },
        //返回grid对象
        grid: function(el, type) {
            return this.instance(el).grid(type);
        },
        //返回表体
        body: function(el) {
            return this.grid(el, "body");
        },
        //重置大小
        resize: function(el) {
            return this.instance(el).resize();
        }
    };
})(jQuery, window, document);
