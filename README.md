# Clean UI

> 基于jQuery&CSS3的插件库

## 预览

### [在线预览](https://igonglei.github.io/clean-ui/)

### 预览图
<p>
  <a href="https://igonglei.github.io/clean-ui/" target="_blank">
    <img src="https://raw.githubusercontent.com/igonglei/clean-ui/gh-pages/preview/plugins.png">
    <img src="https://raw.githubusercontent.com/igonglei/clean-ui/gh-pages/preview/map.png">
  </a>
</p>

### 1、loader.js
>CSS3加载动画插件，支持多种动画，用法简单，美观实用，支持ie10~ie11和chrome

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="/plugins/loader/loader.min.css">
<script src="/plugins/loader/loader.min.js"></script>
```

##### html

```html
<div id="content"></div>
```

##### 显示

```js
$("#content").showLoader();
```

##### 隐藏

```js
$("#content").hideLoader();
```

##### 属性

```js
{
    //动画效果
    animation: "ball-beat",
    //颜色
    color: "#fff",
    //背景
    backgroundColor: "rgba(0,0,0,0.6)",
    //z-index
    zIndex: 10000
}
```

##### 动画效果

`ball-beat`
`ball-jump`
`ball-spin`

### 2、pbar.js
>进度条插件，有加载动画、持续动画，用法简单，美观实用，支持ie8~ie11和chrome

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<script src="/plugins/pbar/pbar.min.js"></script>
```

##### html

```html
<div id="bar"></div>
```

##### 用法

```js
$("#bar").pbar({
    value: 0.5
});
```

##### 属性

```js
{
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
    //持续效果
    blur: false,
    //持续颜色
    blurColor: "#8bfb78"
}
```

##### 方法

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">instance</td>
        <td style="border-color: #dce6f0;">返回构造函数实例</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">options</td>
        <td style="border-color: #dce6f0;">返回参数</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">getValue</td>
        <td style="border-color: #dce6f0;">返回进度值</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">setValue</td>
        <td style="border-color: #dce6f0;">设置进度值</td>
        <td style="border-color: #dce6f0;">0~1之间的数值</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">setIncrement</td>
        <td style="border-color: #dce6f0;">设置进度值，增量</td>
        <td style="border-color: #dce6f0;">0~1之间的数值</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">setBlur</td>
        <td style="border-color: #dce6f0;">是否需要模糊效果</td>
        <td style="border-color: #dce6f0;">true或false</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">setColor</td>
        <td style="border-color: #dce6f0;">设置进度条颜色</td>
        <td style="border-color: #dce6f0;">色值</td>
    </tr>
</table>

### 3、csgrid.js
>自定义表格插件，简洁设计，用法简单，美观实用，支持ie8~ie11和chrome

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<link rel="stylesheet" href="/plugins/csgrid/csgrid.min.css">
<script src="/plugins/csgrid/csgrid.min.js"></script>
```

##### html

```html
<table id="grid"></table>
```

##### 用法

```js
$("#grid").csgrid({
    columns: [{
        field: 'LCMDeviceName',
        title: '名称',
        width: '45%',
        aligh: 'left',
        tooltip: true
    }, {
        field: 'IP',
        title: 'IP',
        width: '40%'
    }, {
        field: '_id',
        title: '选择',
        width: '15%',
        formatter: function(value, index, row) {
            return '<input type="checkbox" name="ckb" value="' + value + '" />';
        }
    }],
    pager: false,
    height: 320,
    footer: true,
    url: '/Monitor/GetDevicesByTestBedGID',
    queryParams: {
        sParams: JSON.stringify({
            BaseQuery: {
                TestBedGID: data && data._id
            }
        })
    },
    queryFilter: function(queryParams) {
        var opts = $(this).csgrid('options');
        var oParams = JSON.parse(queryParams.sParams);
        oParams.Page = {
            Limit: opts.pageSize,
            Skip: (opts.pageNumber - 1) * opts.pageSize
        };
        queryParams.sParams = JSON.stringify(oParams);
        return queryParams;
    },
    onBeforeLoad: function() {
        $(this).csgrid('body').showLoader(LOADER);
    },
    loadFilter: function(data) {
        var rows = $.map(data.Documents, function(n, m) {
            return JSON.parse(n);
        });
        return {
            total: data.Count,
            rows: rows
        };
    },
    onLoadSuccess: function(data) {
        $(this).csgrid('body').hideLoader();
    }
});
```

##### 属性

```js
{
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
    footerMsg: "共{total}条"
}
```

##### 列属性

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">值</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">title</td>
        <td style="border-color: #dce6f0;">标题</td>
        <td style="border-color: #dce6f0;">文本，必须</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">field</td>
        <td style="border-color: #dce6f0;">数据字段</td>
        <td style="border-color: #dce6f0;">文本，必须</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">haligh</td>
        <td style="border-color: #dce6f0;">表头文字对齐</td>
        <td style="border-color: #dce6f0;">center(默认值),left,right</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">aligh</td>
        <td style="border-color: #dce6f0;">表体文字对齐</td>
        <td style="border-color: #dce6f0;">center(默认值),left,right</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">colspan</td>
        <td style="border-color: #dce6f0;">表头合并列数</td>
        <td style="border-color: #dce6f0;">正整数</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">rowspan</td>
        <td style="border-color: #dce6f0;">表头合并行数</td>
        <td style="border-color: #dce6f0;">正整数</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">formatter</td>
        <td style="border-color: #dce6f0;">格式化单元格</td>
        <td style="border-color: #dce6f0;">方法，参数为（值，索引，行数据），返回文本</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">rowStyler</td>
        <td style="border-color: #dce6f0;">设置单元格样式</td>
        <td style="border-color: #dce6f0;">方法，参数为（值，索引，行数据），返回文本</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">tooltip</td>
        <td style="border-color: #dce6f0;">单元格鼠标提示文字</td>
        <td style="border-color: #dce6f0;">true/false或者方法，参数为（值，索引，行数据），返回文本</td>
    </tr>
</table>

##### 事件

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">queryFilter</td>
        <td style="border-color: #dce6f0;">查询参数过滤器</td>
        <td style="border-color: #dce6f0;">查询参数</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">onBeforeLoad</td>
        <td style="border-color: #dce6f0;">开始加载事件</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">loadFilter</td>
        <td style="border-color: #dce6f0;">数据过滤器</td>
        <td style="border-color: #dce6f0;">后台返回数据</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">onLoadSuccess</td>
        <td style="border-color: #dce6f0;">加载完成事件</td>
        <td style="border-color: #dce6f0;">返回数据</td>
    </tr>
</table>

##### 方法

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">instance</td>
        <td style="border-color: #dce6f0;">返回构造函数实例</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">options</td>
        <td style="border-color: #dce6f0;">返回参数</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">reload</td>
        <td style="border-color: #dce6f0;">重新加载</td>
        <td style="border-color: #dce6f0;">参数</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">loadData</td>
        <td style="border-color: #dce6f0;">填充数据</td>
        <td style="border-color: #dce6f0;">本地数据</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">getData</td>
        <td style="border-color: #dce6f0;">获取数据</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">grid</td>
        <td style="border-color: #dce6f0;">返回grid对象</td>
        <td style="border-color: #dce6f0;">body或header或footer</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">body</td>
        <td style="border-color: #dce6f0;">返回表体</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">resize</td>
        <td style="border-color: #dce6f0;">重置大小</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
</table>

### 4、labDesigner.js
>实验室设计器，专为实验室设计，基于mxgraph二次开发，用法简单，美观实用

##### 引入

```html
<script>
    mxBasePath = '/third/mxgraph';
</script>
<script src="/third/jquery/jquery.min.js"></script>
<script src="/third/mxgraph/js/mxClient.min.js"></script>
<link rel="stylesheet" href="/plugins/labDesigner/labDesigner.min.css">
<script src="/plugins/labDesigner/labDesigner.min.js"></script>
```

##### html

```html
<div id="lab"></div>
```

##### 用法

```js
$("#lab").labDesigner({
    backgroundImage: "data/lab-layout.png",
    url: "data/lab.json",
    tooltip: function (cell) {
        if (!/^cab/i.test(cell.style) || !cell.value) {
            return;
        }
        var html = "这是一个提示框";
        return html;
    },
    contextMenu: function (menu, cell) {
        menu.addItem("详情", null, function () {
            alert("右键事件");
        }, null, "sl-icon-info");
    }
});
```

##### 属性

```js
{
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
    //高亮边框宽度
    highlightWidth: 1
}
```

##### 事件

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">tooltip</td>
        <td style="border-color: #dce6f0;">鼠标移入提示信息</td>
        <td style="border-color: #dce6f0;">mxgraph的cell对象</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">contextMenu</td>
        <td style="border-color: #dce6f0;">鼠标右键事件</td>
        <td style="border-color: #dce6f0;">mxgraph的menu对象和cell对象</td>
    </tr>
</table>

##### 方法

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">instance</td>
        <td style="border-color: #dce6f0;">返回构造函数实例</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">options</td>
        <td style="border-color: #dce6f0;">返回参数</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">graph</td>
        <td style="border-color: #dce6f0;">返回mxgraph的实例</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">zoomIn</td>
        <td style="border-color: #dce6f0;">放大画布</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">zoomOut</td>
        <td style="border-color: #dce6f0;">缩小画布</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">resize</td>
        <td style="border-color: #dce6f0;">重置画布大小</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
</table>

### 5、divbar.js
>分块进度条插件，有加载动画、跳跃动画，用法简单，美观实用，支持ie8~ie11和chrome

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<script src="/plugins/divbar/divbar.min.js"></script>
```

##### html

```html
<div id="bar"></div>
```

##### 用法

```js
$("#bar").divbar({
    value: 0.6
});
```

##### 属性

```js
{
    //边框颜色
    borderColor: "#2D4A34",
    //边框宽度
    borderWidth: 1,
    //边框样式
    borderStyle: "solid",
    //2个分块相隔的距离
    margin: 2,
    //分块数量
    divs: 15,
    //分块的颜色
    color: ["#486F14,#8EC63F,60%", "#D9B404,#FFA800,20%", "#D64C01,#D84C00,20%"],
    //值
    value: 0,
    //动画
    animation: true,
    //动画时长，毫秒
    duration: 100,
    //跳动分块数
    beat: 3,
    //跳动时长，毫秒
    beatDuration: 100
}
```

##### 方法

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">instance</td>
        <td style="border-color: #dce6f0;">返回构造函数实例</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">options</td>
        <td style="border-color: #dce6f0;">返回参数</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
</table>

### 6、extproto.js
>扩展的一些原型方法，简单实用

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<script src="/plugins/extproto/extproto.min.js"></script>
```
##### 方法

<table class="table table-bordered table-striped table-condensed" style="font-size: 0.9rem;">
    <tr style="border-color: #dce6f0;">
        <th style="border-color: #dce6f0;">类型</th>
        <th style="border-color: #dce6f0;">名称</th>
        <th style="border-color: #dce6f0;">描述</th>
        <th style="border-color: #dce6f0;">参数</th>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td rowspan="3" style="border-color: #dce6f0;">Date</td>
        <td style="border-color: #dce6f0;">clone</td>
        <td style="border-color: #dce6f0;">复制时间</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">addDays</td>
        <td style="border-color: #dce6f0;">日期增加天数</td>
        <td style="border-color: #dce6f0;">天数</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">addHours</td>
        <td style="border-color: #dce6f0;">日期增加小时</td>
        <td style="border-color: #dce6f0;">小时</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td rowspan="3" style="border-color: #dce6f0;">Number</td>
        <td style="border-color: #dce6f0;">round</td>
        <td style="border-color: #dce6f0;">四舍五入</td>
        <td style="border-color: #dce6f0;">小数位</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">ceil</td>
        <td style="border-color: #dce6f0;">上舍</td>
        <td style="border-color: #dce6f0;">小数位</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">floor</td>
        <td style="border-color: #dce6f0;">下舍</td>
        <td style="border-color: #dce6f0;">小数位</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td rowspan="5" style="border-color: #dce6f0;">Array</td>
        <td style="border-color: #dce6f0;">distinct</td>
        <td style="border-color: #dce6f0;">数值去重，支持对象数组</td>
        <td style="border-color: #dce6f0;">主键（可选）</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">orderByAsc</td>
        <td style="border-color: #dce6f0;">数组顺序排序，支持对象数组</td>
        <td style="border-color: #dce6f0;">主键（可选）</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">orderByDesc</td>
        <td style="border-color: #dce6f0;">数组倒序排序，支持对象数组</td>
        <td style="border-color: #dce6f0;">主键（可选）</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">moveTo</td>
        <td style="border-color: #dce6f0;">移动对象数组项的位置</td>
        <td style="border-color: #dce6f0;">主键，值，位置</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">mongoFilter</td>
        <td style="border-color: #dce6f0;">mongodb模糊查询条件构造</td>
        <td style="border-color: #dce6f0;">值，是否转成字符串</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td rowspan="5" style="border-color: #dce6f0;">String</td>
        <td style="border-color: #dce6f0;">template</td>
        <td style="border-color: #dce6f0;">格式化模板</td>
        <td style="border-color: #dce6f0;">数据对象</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">showbr</td>
        <td style="border-color: #dce6f0;">换行符转换成br标签</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">parseDate</td>
        <td style="border-color: #dce6f0;">转换成时间戳</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style="background-color: #f3f6fa;border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">daysToNow</td>
        <td style="border-color: #dce6f0;">距今天数</td>
        <td style="border-color: #dce6f0;">无</td>
    </tr>
    <tr style=";border-color: #dce6f0;">
        <td style="border-color: #dce6f0;">startWith</td>
        <td style="border-color: #dce6f0;">以某字符串开始</td>
        <td style="border-color: #dce6f0;">字符串</td>
    </tr>
</table>

### 7、csechart.js
>echarts的3个实例，风格简单，有闪烁动画

##### 引入

```html
<script src="/third/jquery/jquery.min.js"></script>
<script src="/third/echarts/echarts.min.js"></script>
<script src="/plugins/csechart/csechart.min.js"></script>
```

##### html

```html
<div id="chart"></div>
```

##### 用法

```js
//环形图
$("#chart").cspie({
    title: {
        text: "上电率"
    },
    series: [{
        data: [
        {
            value: 0.8
        },
        {
            value: 0.2
        }]
    }]
});
//线形图
$("#chart").csline({
    title: {
        text: "上电率趋势"
    },
    xAxis: {
        data: [1,2,3]
    },
    series: [{
        name: "上电率",
        data: [0.6,0.5,0.7]
    }]
});
//仪表图
$("#chart").csgauge({
    title: {
        text: "平均温度"
    },
    series: [{
        max: 50,
        detail: {
            formatter: '{value}℃',
        },
        data: [{ value: 35 }]
    }]
});
```

##### 属性
>参照echarts的属性