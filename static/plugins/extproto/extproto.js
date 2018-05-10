/*!
 * Extend prototype function
 * Copyright 2016, Gonglei
 */
(function($) {
    "use strict";
    //复制时间
    Date.prototype.clone = function() {
        return new Date(this.valueOf());
    };
    //日期增加天数
    Date.prototype.addDays = function(day) {
        var date = this.clone(),
            days = date.getDate();
        date.setDate(days + day);
        return date;
    };
    //日期增加小时
    Date.prototype.addHours = function(hour) {
        var date = this.clone(),
            hours = date.getHours();
        date.setHours(hours + hour);
        return date;
    };
    //四舍五入
    Number.prototype.round = function(decimal) {
        var temp = Math.pow(10, decimal);
        return Math.round(this * temp) / temp;
    };
    //上舍
    Number.prototype.ceil = function(decimal) {
        var temp = Math.pow(10, decimal);
        return Math.ceil(this * temp) / temp;
    };
    //下舍
    Number.prototype.floor = function(decimal) {
        var temp = Math.pow(10, decimal);
        return Math.floor(this * temp) / temp;
    };
    //数组中的元素转为小写
    Array.prototype.toLowerCase = function() {
        var arr = $.map(this, function(n, i) {
            return n.toLowerCase();
        });
        return arr;
    };
    //数值唯一
    Array.prototype.distinct = function(key) {
        var arr = [];
        $.each(this, function(i, v) {
            if (key) {
                var tmp = $.grep(arr, function(n, m) {
                    return n[key] == v[key];
                });
                if (tmp.length === 0) {
                    arr.push(v);
                }
            } else if ($.inArray(v, arr) < 0) {
                arr.push(v);
            }
        });
        return arr;
    };
    //数组求和
    Array.prototype.sum = function() {
        var sum = 0;
        $.each(this, function(i, v) {
            sum += v;
        });
        return sum;
    };
    //数组排序，顺序，key为对象的排序字段，可为空
    Array.prototype.orderByAsc = function(key) {
        return this.order("asc", key);
    };
    //数组排序，逆序，key为对象的排序字段，可为空
    Array.prototype.orderByDesc = function(key) {
        return this.order("desc", key);
    };
    //是否是数值数组
    Array.prototype.isNumberArray = function() {
        var isNumber = true;
        $.each(this, function(i, v) {
            if (isNaN(Number(v))) {
                isNumber = false;
                return false;
            }
        });
        return isNumber;
    };
    //数组排序（字符串或者数值），sort为排序（asc或者desc）
    Array.prototype.sort2 = function(sort) {
        if (this.isNumberArray()) {
            this.sort(function(a, b) {
                return a - b;
            });
        } else {
            this.sort();
        }
        if (sort == "desc") {
            this.reverse();
        }
        return this;
    };
    //数组排序，包括对象数组，sort为排序（asc或者desc），key为排序字段
    Array.prototype.order = function(sort, key) {
        var oArr = this;
        if (oArr.length === 0) {
            return oArr;
        }
        if (typeof oArr[0] === "object") {
            if (!key) {
                return oArr;
            }
            var arr = $.map(oArr, function(n, m) {
                return n[key] || "";
            }).distinct().sort2(sort);
            var nArr = [];
            $.each(arr, function(i, v) {
                var tmp = $.grep(oArr, function(n, m) {
                    return (n[key] || "") == v;
                });
                $.merge(nArr, tmp);
            });
            return nArr;
        } else {
            return oArr.sort2(sort);
        }
    };
    //移动数组项的位置
    Array.prototype.moveTo = function(key, value, index) {
        if (this.length === 0) {
            return;
        }
        var idx = $.map(this, function(n, m) {
            if (n[key] == value) {
                return m;
            }
        })[0] || 0;
        var se = this[idx];
        this.splice(idx, 1);
        this.splice(index || 0, 0, se);
    };
    //根据条件返回数组的第一个对象
    Array.prototype.first = function(key, value) {
        return $.grep(this, function(n, m) {
            return n[key] == value;
        })[0];
    };
    //mongo模糊查询
    Array.prototype.mongoFilter = function(value, stringify) {
        value = {
            $regex: value,
            $options: "i"
        };
        value = stringify ? JSON.stringify(value) : value;
        return $.map(this, function(n, m) {
            var o = {};
            o[n] = value;
            return o;
        });
    };
    //以某字符开始
    String.prototype.startWith = function(str) {
        var reg = new RegExp("^" + str);
        return reg.test(this);
    };
    //换行转换
    String.prototype.showbr = function() {
        return this && this.replace(/\r\n|\n|\r/g, "<br/>");
    };
    //转换成时间
    String.prototype.parseDate = function() {
        return this && Date.parse(this.replace(/-/g, "/"));
    };
    //把工号全称转换为姓名和工号
    //去掉工号全称最后一个逗号
    String.prototype.removeLastChar = function() {
        return this.replace(/\s*,\s*$/, "");
    };
    //获取用户id
    String.prototype.getUserId = function() {
        var text = this;
        var arr = [];
        if (text.length > 0) {
            var reg = /\((.*?)\)/gi;
            var match = text.match(reg);
            if (match) {
                arr = $.map(match, function(n, m) {
                    return n && n.replace(reg, "$1").toLowerCase();
                });
            }
        }
        return arr;
    };
    //获取用户名称
    String.prototype.getUserName = function() {
        var text = this.removeLastChar();
        var arr = [];
        if (text.length > 0) {
            var reg = /\((.*?)\)/gi;
            text = text.replace(reg, "");
            arr = text.split(",");
        }
        return arr;
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
    //距今天数
    String.prototype.daysToNow = function() {
        var now = new Date().format("yyyy-MM-dd").parseDate();
        var date = this.valueOf().parseDate();
        return (now - date) / (1e3 * 60 * 60 * 24);
    };
    //选中项
    $.fn.select = function(selectedClass) {
        selectedClass = selectedClass || "selected";
        return this.each(function() {
            $(this).addClass(selectedClass).siblings().removeClass(selectedClass);
        });
    };
})(jQuery);