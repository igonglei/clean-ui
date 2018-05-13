/* csechart - custom echarts examples
 * Copyright 2017, Gonglei
 */
(function($) {
    "use strict";
    //默认样式
    var theme = {
            color: "#0af",
            backgroundColor: "#001245",
            titleFontSize: 16,
            labelFontSize: 30,
            center: ["50%", "45%"],
            tooltipBgColor: "rgba(0,18,69,0.8)",
            lineColor: "#009aff",
            axisLineColor: "#0054a6",
            gradientColor: ["#00a7ff", "#00e3ff"],
            gaugeColor: ["#43FC24", "#1244FD", "#FD7500"],
            symbolSize: 24,
            symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACA0lEQVR4Ac3VA6wldxzF8c/Ms7Bb27bt2G6M2hE2LKLGNhujZlzEWtu2+Tj3VifJpJNOjZOci7++PwyKbrfrn1TpH1avqHinCY978l3EnZqrfBN132oAGsqh+jFYc28A85iueTZjAbUDSvRhCGNYgIWYyFiBKZzAERzN76mAOq2A/B/KwRfg0vj8QIocuB874j2BdTCH7q8BypRlPIffgFtxM67GOQEcxhaswmjGqpSpipuA1H0wJbkct+Mx3KIuLorPzZ5pnIln2gBlynMWLkv0txR44z6evZP+Hj5Zx1vfMFO5DsexF/uT2UlRWwaTuBDXwqKHefcpEYseYmKAl78E12Nlsh5q9pSy2QPDgZwn0f9SL9zFgkHSrwUYyd6yDRApajfWD9FqqCwYy3gyL2JtgG7tJjqZS89XGzW06gA7joNZch/kEm0DVDn8OPblUvTKl3y3HdHqgzz9AdHmNPlYIFVbk6ssOoztad7ZB8+4/PH3uHLBz3Vfto+qCw5gObbiEM5gvg3QqQG25SYqU4LrthxV78YGLMOSZHowgKoVUKvpbhQB7sUKLBBg5jfHO1OimbZnUb3JZyC/T6cfC5NRoI7gYHw06+ZaAVFVeyrOBXYo90Z/AHOBnMr8dMYqaAcEEkCVtE9mXQm1ufm4E/u9AFKueAZQqM//Tv0PXvr/d8D3p6K4jwIUWEgAAAAASUVORK5CYII="
        }, //默认选项
        defaults = {
            //环形图
            pie: {
                title: {
                    textStyle: {
                        color: theme.color,
                        fontSize: theme.titleFontSize
                    },
                    bottom: 0,
                    left: "center"
                },
                color: [theme.color, theme.backgroundColor],
                series: [{
                    type: "pie",
                    radius: ["80%", "84%"],
                    center: theme.center,
                    silent: true,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        name: "using",
                        value: 0,
                        label: {
                            normal: {
                                show: true,
                                position: "center",
                                formatter: function(params) {
                                    return params.percent.toFixed(0) + "%";
                                },
                                textStyle: {
                                    color: "#fff",
                                    fontSize: theme.labelFontSize
                                }
                            }
                        }
                    }, {
                        name: "idle",
                        value: 1
                    }],
                    markPoint: {
                        symbol: theme.symbol,
                        symbolSize: theme.symbolSize,
                        label: {
                            normal: {
                                show: false
                            }
                        }
                    }
                }, {
                    type: "pie",
                    radius: ["0%", "80%"],
                    center: theme.center,
                    silent: true,
                    hoverAnimation: false,
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: 1,
                        itemStyle: {
                            normal: {
                                color: theme.backgroundColor
                            },
                            emphasis: {
                                color: theme.backgroundColor
                            }
                        }
                    }]
                }]
            },
            //线形图
            line: {
                title: {
                    textStyle: {
                        color: theme.color,
                        fontSize: theme.titleFontSize
                    }
                },
                tooltip: {
                    trigger: "axis",
                    backgroundColor: theme.tooltipBgColor,
                    axisPointer: {
                        lineStyle: {
                            color: theme.lineColor,
                            type: "dashed"
                        }
                    },
                    formatter: function(params) {
                        var obj = params[0] || params;
                        obj.percent = (obj.value * 100).toFixed(0);
                        return "{name}<br/>{seriesName}：{percent}%".template(obj);
                    }
                },
                grid: {
                    top: 40,
                    bottom: 20,
                    right: 20
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: theme.axisLineColor
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: theme.color
                        }
                    }
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        lineStyle: {
                            color: theme.axisLineColor
                        }
                    },
                    axisLabel: {
                        formatter: function(value) {
                            return value * 100 + "%";
                        },
                        textStyle: {
                            color: theme.color
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: [theme.backgroundColor]
                        }
                    }
                },
                series: [{
                    type: "line",
                    smooth: true,
                    symbol: theme.symbol,
                    symbolSize: 20,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0.5,
                                color: theme.gradientColor[0]
                            }, {
                                offset: 1,
                                color: theme.gradientColor[1]
                            }], false),
                            width: 3
                        }
                    },
                    markPoint: {
                        symbol: theme.symbol,
                        symbolSize: theme.symbolSize,
                        silent: true,
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                            name: "现在",
                            type: "max",
                            valueIndex: 0
                        }]
                    }
                }]
            },
            //仪表图
            gauge: {
                title: {
                    textStyle: {
                        color: theme.color,
                        fontSize: theme.titleFontSize
                    },
                    bottom: 0,
                    left: "center"
                },
                series: [{
                    type: "gauge",
                    axisLine: {
                        lineStyle: {
                            color: [
                                [0.5, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: theme.gaugeColor[0]
                                }, {
                                    offset: 0.6,
                                    color: theme.gaugeColor[1]
                                }])],
                                [1, new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: theme.gaugeColor[0]
                                }, {
                                    offset: 0.6,
                                    color: theme.gaugeColor[2]
                                }])]
                            ],
                            width: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    pointer: {
                        show: true,
                        length: "60%",
                        width: 2
                    },
                    detail: {
                        formatter: "{value}%",
                        offsetCenter: [0, "25%"],
                        textStyle: {
                            fontSize: theme.labelFontSize,
                            color: "#fff"
                        }
                    },
                    data: [{
                        value: 0
                    }]
                }]
            }
        };
    //构造函数
    var csechart = function(dom, type, opts) {
        this.chart = echarts.init(dom);
        this.options = $.extend(true, {}, defaults[type], opts);
        this.chart.setOption(this.options);
    };
    csechart.prototype = {
        constructor: csechart,
        //获取圆弧坐标
        getPoint: function(deg, r, x, y) {
            var rad = 2 * Math.PI / 360 * deg;
            return {
                x: x + Math.sin(rad) * r,
                y: y - Math.cos(rad) * r
            };
        },
        //圆弧运动
        track: function() {
            var self = this,
                myChart = self.chart,
                option = self.options,
                serie = option.series[0],
                data = serie.data,
                using = data[0].value,
                idle = data[1].value,
                total = using + idle,
                x = myChart.getWidth() / 2,
                y = myChart.getHeight() / 2 - 8,
                r = x * 0.82;
            serie.markPoint.data = [self.getPoint(using / total * 360, r, x, y)];
            myChart.setOption(option);
        },
        //闪烁效果
        blink: function() {
            var option = this.options,
                myChart = this.chart,
                markPoint = option.series[0].markPoint,
                minSize = 14,
                maxSize = 30,
                size = minSize,
                step = 2,
                plus = true;
            if (!markPoint) {
                return;
            }
            setTimeout(function() {
                setInterval(function() {
                    if (size === maxSize) {
                        plus = false;
                    } else if (size === minSize) {
                        plus = true;
                    }
                    markPoint.symbolSize = size;
                    myChart.setOption(option);
                    if (plus) {
                        size += step;
                    } else {
                        size -= step;
                    }
                }, 100);
            }, 200);
        }
    };
    window.csechart = csechart;
    //jQuery方法扩展
    //返回实例
    var getInstance = function(type, opts) {
        var instance = $.data(this, type);
        if (instance) {
            $.extend(true, instance.options, opts);
            instance.chart.setOption(instance.options);
        } else {
            instance = new csechart(this, type, opts);
            instance.blink();
            $.data(this, type, instance);
        }
        return instance;
    };
    //环形图
    $.fn.cspie = function(opts) {
        return this.each(function() {
            var pie = getInstance.call(this, "pie", opts);
            pie.track();
            return pie;
        });
    };
    //线形图
    $.fn.csline = function(opts) {
        return this.each(function() {
            return getInstance.call(this, "line", opts);
        });
    };
    //仪表图
    $.fn.csgauge = function(opts) {
        return this.each(function() {
            return getInstance.call(this, "gauge", opts);
        });
    };
})(jQuery);