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
            $("#transportbar").append("<h3>loading...</h3>")
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

            var HamaTransportDate=[];
            var HamaBatchNumber=[];
            var HamaQuanlity=[];
            var NNVTTransportDate=[];
            var NNVTBatchNumber=[];
            var NNVTQuanlity=[];
            var list2=json.list2;
            $.each(list2, function (index, array) { //遍历json数据列
                HamaTransportDate[index]=array['HamaTransportDate'];
                HamaBatchNumber[index]=array['HamaBatchNumber'];
                HamaQuanlity[index]=array['HamaQuanlity'];
            });
            var list3=json.list3;
            $.each(list3, function (index, array) { //遍历json数据列
                NNVTTransportDate[index]=array['NNVTTransportDate'];
                NNVTBatchNumber[index]=array['NNVTBatchNumber'];
                NNVTQuanlity[index]=array['NNVTQuanlity'];
            });

         if(HamaQuanlity.length<NNVTQuanlity.length)
          {
              var BatchNumber=NNVTBatchNumber;
              var Len1=NNVTQuanlity.length-HamaQuanlity.length;
              for (var i=1;i<=Len1;i++)//即便没有=，有容错机制
              {
                  HamaQuanlity.push(0);
              }
          }else if(HamaQuanlity.length>NNVTQuanlity.length)
         {
             var BatchNumber=HamaBatchNumber;
             var Len1=HamaQuanlity.length-NNVTQuanlity.length;
             for (var i=1;i<=Len1;i++)
             {
                 NNVTQuanlity.push(0);
             }
         }else{
             var BatchNumber=HamaBatchNumber;
         }

            var pie3 = echarts.init(document.getElementById("pieWarehouing"));
            var data1 = [{
                value: warehousingnnvttotal,
                name: 'NNVT'
            }, {
                value: warehousinghamamatsutotal,
                name: 'Hamamatsu'
            }];
            option1 = {
                backgroundColor: '#fff',
                title: {
                    text: 'Warehousing',
                    subtext: 'Total:'+totalwarehousing.toString(),
                    x: 'center',
                    y: 'center',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 14
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
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
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['30%', '65%'],
                    color: ['#86D560', '#AF89D6'],//, '#59ADF3', '#FF999A', '#FFCC67'

                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',

                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data1
                }, {
                    type: 'pie',
                    radius: ['65%', '85%'],
                    itemStyle: {
                        normal: {
                            color: '#F2F2F2'
                        },
                        emphasis: {
                            color: '#ADADAD'
                        }
                    },
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{c}',
                            textStyle: {
                                color: '#777777',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    data: data1
                }]
            };
            pie3.setOption(option1);

            var pie4 = echarts.init(document.getElementById("pieDelivery"));

            var data2 = [{
                value: deliverynnvttotal,
                name: 'NNVT'
            }, {
                value: deliveryhamamatsutotal,
                name: 'Hamamatsu'
            }];
            option2 = {
                backgroundColor: '#fff',
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
                    show: true,
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
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
                series: [{
                    type: 'pie',
                    selectedMode: 'single',
                    radius: ['27%', '65%'],
                    color: ['#86D560', '#AF89D6'],//, '#59ADF3', '#FF999A', '#FFCC67'

                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{d}%',

                            textStyle: {
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: data2
                }, {
                    type: 'pie',
                    radius: ['65%', '85%'],
                    itemStyle: {
                        normal: {
                            color: '#F2F2F2'
                        },
                        emphasis: {
                            color: '#ADADAD'
                        }
                    },
                    label: {
                        normal: {
                            position: 'inner',
                            formatter: '{c}',
                            textStyle: {
                                color: '#777777',
                                fontWeight: 'bold',
                                fontSize: 14
                            }
                        }
                    },
                    data: data2
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
                       // min: 0,
                       // max: 500,
                       // interval: 100,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: 'Speed',
                       // min: 0,
                       // max: 10,
                        //interval: 2,
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
                                position: 'top'
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
                                position: 'top'
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

            var BarTransport = echarts.init(document.getElementById("transportbar"));
            option5 = {
                title: {
                    text: 'Transport Statistics '+'(Total:'+totaldelivery.toString()+')',
                    x: "left",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
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
                    //orient: 'vertical',
                    //right: '0%',
                    //top: '10%',
                    left: 'center',
                    width: '50%',
                    itemWidth: 14,
                    itemHeight: 14,
                    itemBorderRadius: 8,
                    data: ['Hamamatsu', 'NNVT'],
                    // align: 'right',
                    //right: 10
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    name: 'Batch Number',
                    nameLocation:'middle',
                    nameGap:20,
                    //nameTextStyle:'bottom',
                    data:BatchNumber
                }],
                yAxis: [{
                    type: 'value',
                    name: 'Quantity',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
                series: [{
                    name: 'Hamamatsu',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                   // itemStyle: {
                   //     normal: {
                   //         color: '#86D560'//color: ['#86D560', '#AF89D6']
                   //     }
                   // },
                    data: HamaQuanlity
                }, {
                    name: 'NNVT',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                   // itemStyle: {
                    //    normal: {

                    //        color: '#AF89D6'
                   //     }
                  //  },
                    data: NNVTQuanlity
                }]
            };
            BarTransport.setOption(option5);

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
