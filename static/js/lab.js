//菜单名称
NAVNAME = "Home";
MENUNAME = "lab";

//初始化
$(function() {
    Lab.init();
});

//实验室
var Lab = {
    el: "#lab",
    tplTooltip: '<div class="cabTooltip"><div class="title"><span>{name}</span><a href="javascript:void(0)">查看详情</a></div>' +
        '<div class="rate"><span>U位利用率：{rate}%</span><span class="u">U位：<div class="bar"><div class="success" style="width:{rate}%"></div></div>{use_u}/{total_u}</span></div>' +
        '<table class="devices"><thead><tr><th>设备({device_count})<th>设备利用率</th></tr></thead><tbody>{device_html}</tbody></table></div>',
    tplDev: '<tr><td><a class="name" href="javascript:void(0)">{type} {ip}</a></td><td>{rate}</td></tr>',
    //初始化
    init: function() {
        var $el = $(this.el),
            self = this,
            root = "/static/";
        $el.labDesigner({
            backgroundImage: root + "images/lab/lab-layout.png",
            url: root + "data/lab.min.json",
            tooltip: function(cell) {
                if (!/^cab/i.test(cell.style) || !cell.value) {
                    return;
                }
                var value = cell.value,
                    devices = value.devices || [],
                    device_html = value.device_html || "";
                if (!device_html) {
                    $.each(devices, function(i, v) {
                        v.rate = v.rate === undefined ? "-" : v.rate + "%";
                        v.ip = v.ip === undefined ? "" : v.ip;
                        device_html += self.tplDev.template(v);
                    });
                    value.device_count = devices.length;
                    value.rate = value.total_u > 0 ? (value.use_u / value.total_u * 100).toFixed(1) : 0;
                    value.device_html = device_html;
                }
                return self.tplTooltip.template(value);
            },
            contextMenu: function(menu, cell) {
                menu.addItem("详情", null, function() {}, null, "icon-info");
            }
        });
    },
    //重置大小
    resize: function() {
        $(this.el).labDesigner("resize");
    }
};

//页面重置
var onPageResize = function() {
    //Lab.resize();
};
