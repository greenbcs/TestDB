//饼状图
(function(){
    $.ajax({
        type: 'POST',
        url: 'backend/hamamatsustatistics.php',
        dataType: "json",
        beforeSend: function () {
            $("#histogramSK ").append("<h3>loading...</h3>");
            $("#histogramSP ").append("<h3>loading...</h3>");
            $("#histogramIDB ").append("<h3>loading...</h3>");
            $("#histogramSKB").append("<h3>loading...</h3>");
            $("#histogramEbb ").append("<h3>loading...</h3>");
            $("#histogramDC ").append("<h3>loading...</h3>");
            $("#histogramTr ").append("<h3>loading...</h3>");
            $("#histogramTf").append("<h3>loading...</h3>");
            $("#histogramPP ").append("<h3>loading...</h3>");
            $("#histogramAP ").append("<h3>loading...</h3>");
            $("#histogramQE ").append("<h3>loading...</h3>");
            $("#histogramDE").append("<h3>loading...</h3>");
        },
        success: function (json) {
            $("#histogramSK").empty();
            $("#histogramSP").empty();
            $("#histogramIDB").empty();
            $("#histogramSKB").empty();
            $("#histogramEbb").empty();
            $("#histogramDC").empty();
            $("#histogramTr").empty();
            $("#histogramTf").empty();
            $("#histogramPP").empty();
            $("#histogramAP").empty();
            $("#histogramQE").empty();
            $("#histogramDE").empty();
            var mark = json;
            if (mark == 1){
                //$.getScript("backend/data/hamamatsuarray.js");  //加载js文件
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
                        //alert(Math.max.apply(null,SK));
                    }

                    var figureSK = echarts.init(document.getElementById("histogramSK"));
                    var nameSK='SK Histogram'+' (Total:'+(SK.length).toString()+', unit:μA/lm)';
                    plotfigure(figureSK,SK,nameSK);

                    var figureSP = echarts.init(document.getElementById("histogramSP"));
                    var nameSP='SP Histogram'+' (Total:'+(SP.length).toString()+', unit:A/lm)';
                    plotfigure(figureSP,SP,nameSP);

                    var figureIDB = echarts.init(document.getElementById("histogramIDB"));
                    var nameIDB='IDB Histogram'+' (Total:'+(IDB.length).toString()+', unit:nA)';
                    plotfigure(figureIDB,IDB,nameIDB);

                    var figureSKB = echarts.init(document.getElementById("histogramSKB"));
                    var nameSKB='SKB Histogram'+' (Total:'+(SKB.length).toString()+', unit:(null))';
                    plotfigure(figureSKB,SKB,nameSKB);

                    var figureEbb = echarts.init(document.getElementById("histogramEbb"));
                    var nameEbb='Ebb Histogram'+' (Total:'+(Ebb.length).toString()+', unit:V)';
                    plotfigure(figureEbb,Ebb,nameEbb);

                    var figureDC = echarts.init(document.getElementById("histogramDC"));
                    var nameDC='DC Histogram'+' (Total:'+(DC.length).toString()+', unit:s^-1)';
                    plotfigure(figureDC,DC,nameDC);

                    var figureTr = echarts.init(document.getElementById("histogramTr"));
                    var nameTr='Tr Histogram'+' (Total:'+(Tr.length).toString()+', unit:ns)';
                    plotfigure(figureTr,Tr,nameTr);

                    var figureTf = echarts.init(document.getElementById("histogramTf"));
                    var nameTf='Tf Histogram'+' (Total:'+(Tf.length).toString()+', unit:ns)';
                    plotfigure(figureTf,Tf,nameTf);

                    var figurePP = echarts.init(document.getElementById("histogramPP"));
                    var namePP='PP Histogram'+' (Total:'+(PP.length).toString()+', unit:%)';
                    plotfigure(figurePP,PP,namePP);

                    var figureAP = echarts.init(document.getElementById("histogramAP"));
                    var nameAP='AP Histogram'+' (Total:'+(AP.length).toString()+', unit:%)';
                    plotfigure(figureAP,AP,nameAP);

                    var figureQE = echarts.init(document.getElementById("histogramQE"));
                    var nameQE='QE Histogram'+' (Total:'+(QE.length).toString()+', unit:%)';
                    plotfigure(figureQE,QE,nameQE);

                    var figureDE = echarts.init(document.getElementById("histogramDE"));
                    var nameDE='DE Histogram'+' (Total:'+(DE.length).toString()+', unit:(null))';
                    plotfigure(figureDE,DE,nameDE);

                });
        }
    },
        // complete: function () { //生成分页条
        //alert("Bar load failed!");
        //     getPageBar();
        // },
        error: function () {
            alert("Data load failed!");
        }
    });

})();

function histogram(data, step) {
    var histo = {},
        x,
        i,
        arr = [];
      step=(Math.max.apply(null,data)-Math.min.apply(null,data))/step;
// Group down
    for (i = 0; i < data.length; i++) {
        x = Math.floor(data[i] / step) * step;
        if (!histo[x]) {
            histo[x] = 0;
        }
        histo[x]++;
    }

// Make the histo group into an array
    for (x in histo) {
        if (histo.hasOwnProperty((x))) {
            arr.push([parseFloat(x), histo[x]]);
        }
    }

// Finally, sort the array
    arr.sort(function (a, b) {
        return a[0] - b[0];
    });

    return arr;
}

function plotfigure(handles,data,name){
    var binnum=50;
    var bins = histogram(data, binnum);
    var option = {
        title: {
            text: name,
            x: "left",
        },
        color: ['rgb(25, 183, 207)'],
        grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'value',
            scale: true, //这个一定要设，不然barWidth和bins对应不上
            //interval:(Math.max.apply(null,data)-Math.min.apply(null,data))/binnum
        }],
        yAxis: [{
            type: 'value',
            name: 'Quantity',
        }],
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                magicType: {show: true, type: ['line', 'bar']},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.value[1];
            }
        },
        series: [{
            name: 'height',
            //type:'bar',
            //binWidth:'25%',
            type: 'line',
            step:'middle',
            z: 10,
            data: bins
        }]
    };
    handles.setOption(option);
}