//常量
var ERRCODE_SUCCESS = "0x0000",
    PAGEHEIGHT = 900,
    NAVNAME = "Home",
    MENUNAME = "screenshots",
    LOADER = {
        color: '#00aaff',
        backgroundColor: 'rgba(238,238,238,0.3)'
    };

//格式化模板
String.prototype.template = function(data) {
    var tpl = this;
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
};

//页面初始化
$(function() {
    Page.init();
    Nav.init();
    Menu.init();
});

//页面自动适应
var Page = {
    elContainer: ".container-fluid",
    elHeader: ".header",
    elTop: ".fixedBar .top",
    elBox: ".box",
    //设置高度
    height: function() {
        var height = Math.max($(window).height(), PAGEHEIGHT);
        $(this.elContainer).css("height", height);
        $(this.elBox).css("height", height - $(this.elHeader).outerHeight() - 20);
        return height;
    },
    //初始化
    init: function() {
        var self = this;
        self.height();
        self.scrollTop();
        var timeout;
        $(window).bind('resize', function() {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function() {
                self.height();
                if (typeof onPageResize === "function") {
                    onPageResize();
                }
            }, 20);
        });
    },
    //返回页面顶部
    scrollTop: function() {
        var $top = $(this.elTop);
        $(window).scroll(function() {
            if ($(window).scrollTop() > 0) {
                $top.show();
            } else {
                $top.hide();
            }
        });
        $top.click(function() {
            $("html,body").animate({ scrollTop: 0 }, 300);
        });
    }
};

//顶部菜单
var Nav = {
    el: "#nav",
    selectedCls: "selected",
    data: [{
        text: "首页",
        value: "Home",
        icon: "home",
        url: "index.html",
        target: "_self"
    }, {
        text: "GitHub",
        value: "GitHub",
        icon: "social-github",
        url: "https://github.com/igonglei/clean-ui",
        target: "_blank"
    }],
    tpl: '<li class="{cls}"><a href="{url}" title="{text}" target="{target}"><div class="icon"><i class="icon-{icon}"></i></div><div class="text">{text}</div></a></li>',
    init: function() {
        var $el = $(this.el),
            data = this.data,
            tpl = this.tpl,
            selectedCls = this.selectedCls,
            html = "";
        if (!NAVNAME && data.length > 0) {
            data[0].cls = selectedCls;
        }
        $.each(data, function(i, v) {
            if (v.value === NAVNAME) {
                v.cls = selectedCls;
            }
            html += tpl.template(v);
        });
        $el.html(html);
    }
};

//左侧菜单
var Menu = {
    el: "#menu",
    selectedCls: "selected",
    data: [{
        text: "作品",
        icon: "layers",
        children: [{
            text: "作品截图",
            value: "screenshots",
            icon: "picture",
            url: "index.html"
        }, {
            text: "环境设计器",
            value: "editor",
            icon: "loop",
            url: "editor.html"
        }, {
            text: "空间布局",
            value: "lab",
            icon: "drawer",
            url: "lab.html"
        }, {
            text: "插件实例",
            value: "plugins",
            icon: "cursor",
            url: "plugins.html"
        }, {
            text: "实验室分布",
            value: "map",
            icon: "map",
            url: "map.html"
        }]
    }],
    tpl: {
        parent: '<li title="{text}"><div class="item {cls}"><i class="icon-{icon}"></i><span>{text}</span><i class="icon-arrow-up arrow"></i></div><ul class="sub-nav">{subHtml}</ul></li>',
        child: '<li data-val="{value}" class="{cls}" title="{text}"><a href="{url}"><i class="icon-{icon}"></i><span class="name">{text}</span></a></li>'
    },
    init: function() {
        var $el = $(this.el),
            data = this.data,
            tpl = this.tpl,
            selectedCls = this.selectedCls,
            html = "";
        if (!MENUNAME && data.length > 0) {
            data[0].cls = selectedCls;
        }
        $.each(data, function(i, v) {
            var subHtml = "",
                pCls = "";
            $.each(v.children, function(n, m) {
                var cls = "";
                if (m.value === MENUNAME) {
                    cls = selectedCls;
                    pCls = cls;
                }
                m.cls = cls;
                subHtml += tpl.child.template(m);
            });
            if (v.cls !== selectedCls) {
                v.cls = pCls;
            }
            v.subHtml = subHtml;
            html += tpl.parent.template(v);
        });
        $el.html(html);
        $el.off("click").on("click", ".item", function() {
            var $item = $(this);
            $item.next().slideToggle();
            $item.children(".arrow").toggleClass("icon-arrow-up").toggleClass("icon-arrow-down");
        });
    }
};