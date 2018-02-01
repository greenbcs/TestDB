var pie3 = echarts.init(document.getElementById("pieWarehouing"));
var girth = [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6];
$.getScript("backend/data/hamamatsuarray.js",function(){  //加载test.js,成功后，并执行回调函数
    var mark=array.mark;
    var list = array.list;
    var NO = [];
    var SK = [];
    var SP = [];
    var IDB = [];
    var SKB = [];
    var Ebb = [];
    var DC = [];
    var Tr = [];
    var Tf = [];
    var PP = [];
    var AP = [];
    var QE = [];
    var DE = [];
    $.each(list, function (index, array) { //遍历json数据列
        NO[index] = array['NO'];
        SK[index] = array['SK'];
        SP[index] = array['SP'];
        IDB[index] = array['IDB'];
        SKB[index] = array['SKB'];
        Ebb[index] = array['Ebb'];
        DC[index] = array['DC'];
        Tr[index] = array['Tr'];
        Tf[index] = array['Tf'];
        PP[index] = array['PP'];
        AP[index] = array['AP'];
        QE[index] = array['QE'];
        DE[index] = array['DE'];
    });
    {
        for (i = Tr.length - 1;  i >=0; i--) {
            if (Tr[i] == "" ||Tr[i] === undefined) {
                Tr.splice(i, 1);
            }
        }
        for (i = Tf.length - 1;  i >=0; i--) {
            if (Tf[i] == "" ||Tf[i] === undefined) {
                Tf.splice(i, 1);
            }
        }
        for (i = QE.length - 1;  i >=0; i--) {
            if (QE[i] == 0 ||QE[i] == "" ||QE[i] === undefined) {
                QE.splice(i, 1);
            }
        }
        //alert(Math.max.apply(null,SK));PP
    }
    var girth = [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2, 11.3, 11.4, 11.4, 11.7, 12.0, 12.9, 12.9, 13.3, 13.7, 13.8, 14.0, 14.2, 14.5, 16.0, 16.3, 17.3, 17.5, 17.9, 18.0, 18.0, 20.6];

// See https://github.com/ecomfe/echarts-stat
    var bins = ecStat.histogram(SK);

    var interval;
    var min = Infinity;
    var max = -Infinity;

    data = echarts.util.map(bins.data, function (item, index) {
        var x0 = bins.bins[index].x0;
        var x1 = bins.bins[index].x1;
        interval = x1 - x0;
        min = Math.min(min, x0);
        max = Math.max(max, x1);
        return [x0, x1, item[1]];
    });

    function renderItem(params, api) {
        var yValue = api.value(2);
        var start = api.coord([api.value(0), yValue]);
        var size = api.size([api.value(1) - api.value(0), yValue]);
        var style = api.style();

        return {
            type: 'rect',
            shape: {
                x: start[0] + 1,
                y: start[1],
                width: size[0] - 2,
                height: size[1]
            },
            style: style
        };
    }

    option = {
        title: {
            text: 'Girths of Black Cherry Trees',
            subtext: 'By ecStat.histogram',
            sublink: 'https://github.com/ecomfe/echarts-stat',
            left: 'center',
            top: 10
        },
        color: ['rgb(25, 183, 207)'],
        grid: {
            top: 80,
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            min: min,
            max: max,
            //interval: 2*interval
        }],
        yAxis: [{
            type: 'value',
        }],
        series: [{
            name: 'height',
            type: 'custom',
            renderItem: renderItem,
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            encode: {
                x: [0, 1],
                y: 2,
                tooltip: 2,
                label: 2
            },
            data: data
        }]
    };
    pie3.setOption(option);

});

