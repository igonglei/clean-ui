//常量
var ERRCODE_SUCCESS = "0x0000",
    PAGEHEIGHT = 900,
    NAVNAME, MENUNAME, LOADER = {
        color: '#00aaff',
        backgroundColor: 'rgba(238,238,238,0.3)'
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
            }, 100);
        });
    },
    //返回页面顶部
    scrollTop: function() {
        var $top = $(this.elTop);
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $top.show();
            } else {
                $top.hide();
            }
        });
        $top.click(function() {
            $(window).scrollTop(0);
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
        url: "plugins.html"
    },{
        text: "GitHub",
        value: "GitHub",
        icon: "social-github",
        url: "https://github.com/igonglei/clean-ui"
    }],
    tpl: '<li class="{cls}"><a href="{url}"><div class="icon"><i class="icon-{icon}"></i></div><div class="text">{text}</div></a></li>',
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
            text: "插件实例",
            value: "plugins",
            icon: "cursor",
            url: "plugins.html"
        }]
    }],
    tpl: {
        parent: '<li><div class="item {cls}"><i class="icon-{icon}"></i><span>{text}</span><i class="icon-arrow-up arrow"></i></div><ul class="sub-nav">{subHtml}</ul></li>',
        child: '<li data-val="{value}" class="{cls}"><a href="{url}"><i class="icon-{icon}"></i><span class="name">{text}</span></a></li>'
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
