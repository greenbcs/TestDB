//饼状图
(function(){
    $.ajax({
        type: 'POST',
        url: 'backend/receivecheckmapping.php',
        dataType: 'json',
        beforeSend: function () {
            $("#pieWarehouing ").append("<h3>loading...</h3>")
            $("#pieDelivery ").append("<h3>loading...</h3>")
            $("#columnarofwarehousing ").append("<h3>loading...</h3>")
            $("#receivestatistics").append("<h3>loading...</h3>")
        },
        success: function (json) {
            $("#pieWarehouing").empty();
             var deliverynnvttotal=json.deliverynnvttotal;
             var deliveryhamamatsutotal=json.deliveryhamamatsutotal;
             var warehousingnnvttotal=json.warehousingnnvttotal;
             var warehousinghamamatsutotal=json.warehousinghamamatsutotal;
             var totalwarehousing=json.totalwarehousing;
             var totaldelivery=json.totaldelivery
             var list = json.list;
             var times=[];
             var HamamatsuTotal=[];
             var NNVTTotal=[];
             var warehousingspeed=[];
            $.each(list, function (index, array) { //遍历json数据列
                times[index]=array['times'];
                HamamatsuTotal[index]=array['HamamatsuTotal'];
                NNVTTotal[index]=array['NNVTTotal'];
                warehousingspeed[index]=array['warehousingspeed'];
            });
            var list1=json.list1;
            var months=[];
            var monthstotalpmt=[];
            var monthsHamamatsuTotal=[];
            var monthsNNVTTotal=[];
            $.each(list1, function (index, array) { //遍历json数据列
                months[index]=array['months'];
                monthstotalpmt[index]=array['monthstotalpmt'];
                monthsHamamatsuTotal[index]=array['monthsHamamatsuTotal'];
                monthsNNVTTotal[index]=array['monthsNNVTTotal'];
            });

            var pie3 = echarts.init(document.getElementById("pieWarehouing"));
            option1 = {
                title: {
                    text: 'Warehousing',
                    subtext: 'Total:'+(totalwarehousing).toString(),//字幕
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"

            },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '0%',
                    bottom: '0%',
                    data: ['NNVT', 'Hamamatsu'],
                    itemWidth: 20,
                    itemHeight: 10
                },
                series: [{
                    name: 'Warehousing Details',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['35%', '85%'],
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{b}\n{c}\n({d}%)',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: warehousingnnvttotal,
                        name: 'NNVT'
                    }, {
                        value: warehousinghamamatsutotal,
                        name: 'Hamamatsu'
                    }]
                }]
            };

            pie3.setOption(option1);

            var pie4 = echarts.init(document.getElementById("pieDelivery"));
            option2 = {
                title: {
                    text: 'Delivery',
                    subtext: 'Total:'+totaldelivery.toString(),
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"

                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                legend: {
                    orient: 'vertical',
                    right: '0%',
                    bottom: '0%',
                    data: ['NNVT', 'Hamamatsu'],
                    itemWidth: 20,
                    itemHeight: 10
                },
                series: [{
                    name: 'Delivery Details',
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['35%', '85%'],
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{b}\n{c}\n({d}%)',
                            textStyle: {
                                color: '#fff',
                                fontSize: 10
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [{
                        value: deliverynnvttotal,
                        name: 'NNVT'
                    }, {
                        value: deliveryhamamatsutotal,
                        name: 'Hamamatsu'
                    }]
                }]
            };

            pie4.setOption(option2);

            var columnar2 = echarts.init(document.getElementById("columnarofwarehousing"));

            option3 = {
                title : {
                    text: "Monthly report of Details ",
                    subtext: 'Total:'+totalwarehousing.toString(),
                    x: "left",
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                angleAxis: {
                    type: 'category',
                    data: months,
                    z: 10
                },
                legend: {
                    orient: 'vertical',
                    right: '0%',
                    bottom: '0%',
                    data: ['NNVT', 'Hamamatsu'],
                    itemWidth: 20,
                    itemHeight: 10
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}"
                },
                radiusAxis: {
                },
                polar: {
                },
                series: [

                    {
                    type: 'bar',
                    data: monthsNNVTTotal,
                    coordinateSystem: 'polar',
                    name: 'NNVT',
                    stack: 'a'
                }, {
                    type: 'bar',
                    data: monthsHamamatsuTotal,
                    coordinateSystem: 'polar',
                    name: 'Hamamatsu',
                    stack: 'a'
                }],

            };

            columnar2.setOption(option3);


            //折柱混合


            var columnar4 = echarts.init(document.getElementById("receivestatistics"));
            option4 = {

                title : {
                    text: "Warehousing",
                    x: "left"
                },

                tooltip: {
                    trigger: 'axis'
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataZoom : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                legend: {
                    data:['NNVT','Hamamatsu','Speed of Warehousing']
                },

                xAxis: [
                    {
                        type: 'category',
                        data: times
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: 'Quantity',
                        min: 0,
                        max: 500,
                        interval: 100,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Speed',
                        min: 0,
                        max: 10,
                        interval: 2,
                        axisLabel: {
                            formatter: '{value} PMTs/mins'
                        }
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        start: 45,
                        end:100
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 45,
                        end: 100
                    },
                ],
                series: [
                    {
                        name:'NNVT',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop'
                            }
                        },
                        data:NNVTTotal
                    },
                    {
                        name:'Hamamatsu',
                        type:'bar',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideTop'
                            }
                        },
                        data: HamamatsuTotal
                    },
                    {
                        name:'Speed of Warehousing',
                        type:'line',
                        yAxisIndex: 1,
                        data: warehousingspeed
                    }
                ]
            };

            columnar4.setOption(option4);

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
