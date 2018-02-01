//饼状图
(function(){
    $.ajax({
        type: 'POST',
        url: 'backend/nnvtstatistics.php',
        dataType: "json",
        beforeSend: function () {
            $("#histogramNQE ").append("<h3>loading...</h3>");
            $("#histogramHV ").append("<h3>loading...</h3>");
            $("#histogramG ").append("<h3>loading...</h3>");
            $("#histogramPvsV").append("<h3>loading...</h3>");
            $("#histogramR ").append("<h3>loading...</h3>");
            $("#histogramDE ").append("<h3>loading...</h3>");
            $("#histogramDR ").append("<h3>loading...</h3>");
            $("#histogramTTS").append("<h3>loading...</h3>");
            $("#histogramPP ").append("<h3>loading...</h3>");
            $("#histogramAP ").append("<h3>loading...</h3>");
            $("#histogramNL ").append("<h3>loading...</h3>");
            $("#histogramRT").append("<h3>loading...</h3>");
            $("#histogramFT").append("<h3>loading...</h3>");
        },
        success: function (json) {
            $("#histogramNQE").empty();
            $("#histogramHV").empty();
            $("#histogramG").empty();
            $("#histogramPvsV").empty();
            $("#histogramR").empty();
            $("#histogramDE").empty();
            $("#histogramDR").empty();
            $("#histogramTTS").empty();
            $("#histogramPP").empty();
            $("#histogramAP").empty();
            $("#histogramNL").empty();
            $("#histogramRT").empty();
            $("#histogramFT").empty();
            var mark = json;
            if (mark == 1){
                //$.getScript("backend/data/hamamatsuarray.js");  //加载js文件
                $.getScript("backend/data/nnvtarray.js",function(){  //加载test.js,成功后，并执行回调函数
                    var mark=array.mark;
                    var list = array.list;
                    var NO=[];
                    var NQE = [];
                    var HV = [];
                    var G = [];
                    var PvsV = [];
                    var R = [];
                    var DE = [];
                    var DR = [];
                    var TTS = [];
                    var PP = [];
                    var AP = [];
                    var NL = [];
                    var RT = [];
                    var FT = [];
                    $.each(list, function (index, array) { //遍历json数据列
                        NO[index] = array['NO'];
                        NQE[index] = array['NQE'];
                        HV[index] = array['HV'];
                        G[index] = array['G'];
                        PvsV[index] = array['PvsV'];
                        R[index] = array['R'];
                        DE[index] = array['DE'];
                        DR[index] = array['DR'];
                        TTS[index] = array['TTS'];
                        PP[index] = array['PP'];
                        AP[index] = array['AP'];
                        NL[index] = array['NL'];
                        RT[index] = array['RT'];
                        FT[index] = array['FT'];
                    });

                    var figureNQE = echarts.init(document.getElementById("histogramNQE"));
                    var nameNQE='NQE Histogram'+' (Total:'+(NQE.length).toString()+', unit:%)';
                    plotfigure(figureNQE,NQE,nameNQE);

                    var figureHV = echarts.init(document.getElementById("histogramHV"));
                    var nameHV='HV Histogram'+' (Total:'+(HV.length).toString()+', unit:V)';
                    plotfigure(figureHV,HV,nameHV);

                    var figureG = echarts.init(document.getElementById("histogramG"));
                    var nameG='G Histogram'+' (Total:'+(G.length).toString()+', unit:(nuknown))';
                    plotfigure(figureG,G,nameG);

                    var figurePvsV = echarts.init(document.getElementById("histogramPvsV"));
                    var namePvsV='PvsV Histogram'+' (Total:'+(PvsV.length).toString()+', unit:(null))';
                    plotfigure(figurePvsV,PvsV,namePvsV);

                    var figureR = echarts.init(document.getElementById("histogramR"));
                    var nameR='R Histogram'+' (Total:'+(R.length).toString()+', unit:(nuknown))';
                    plotfigure(figureR,R,nameR);

                    var figureDE = echarts.init(document.getElementById("histogramDE"));
                    var nameDE='DE Histogram'+' (Total:'+(DE.length).toString()+', unit:%)';
                    plotfigure(figureDE,DE,nameDE);

                    var figureDR = echarts.init(document.getElementById("histogramDR"));
                    var nameDR='DR Histogram'+' (Total:'+(DR.length).toString()+', unit:(nuknown))';
                    plotfigure(figureDR,DR,nameDR);

                    var figureTTS = echarts.init(document.getElementById("histogramTTS"));
                    var nameTTS='TTS Histogram'+' (Total:'+(TTS.length).toString()+', unit:(nuknown))';
                    plotfigure(figureTTS,TTS,nameTTS);

                    var figurePP = echarts.init(document.getElementById("histogramPP"));
                    var namePP='PP Histogram'+' (Total:'+(PP.length).toString()+', unit:%)';
                    plotfigure(figurePP,PP,namePP);

                    var figureAP = echarts.init(document.getElementById("histogramAP"));
                    var nameAP='AP Histogram'+' (Total:'+(AP.length).toString()+', unit:%)';
                    plotfigure(figureAP,AP,nameAP);

                    var figureNL = echarts.init(document.getElementById("histogramNL"));
                    var nameNL='NL Histogram'+' (Total:'+(NL.length).toString()+', unit:(nuknown))';
                    plotfigure(figureNL,NL,nameNL);

                    var figureRT = echarts.init(document.getElementById("histogramRT"));
                    var nameRT='RT Histogram'+' (Total:'+(RT.length).toString()+', unit:ns)';
                    plotfigure(figureRT,RT,nameRT);

                    var figureFT = echarts.init(document.getElementById("histogramFT"));
                    var nameFT='FT Histogram'+' (Total:'+(FT.length).toString()+', unit:ns)';
                    plotfigure(figureFT,FT,nameFT);


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