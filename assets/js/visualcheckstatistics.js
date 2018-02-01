/**
 * Created by wangjun on 17/9/28.
 */
(function(){
    $.ajax({
        type: 'POST',
        url: 'backend/visualcheckmapping.php',
        dataType: 'json',
        beforeSend: function () {
            $("#pie3ring1").append("<h3>loading...</h3>")
            $("#pie3ring2").append("<h3>loading...</h3>")
            $("#barlinespeed").append("<h3>loading...</h3>")
            $("#VSstatistics").append("<h3>loading...</h3>")
            $("#bar1").append("<h3>loading...</h3>")
            $("#bar2").append("<h3>loading...</h3>")
        },
        success: function (json) {
            $("#pie3ring1").empty();
            $("#pie3ring2").empty();
            $("#barlinespeed").empty();
            $("#VSstatistics").empty();
            $("#bar1").empty();
            $("#bar2").empty();
            var mark = json;
            if (mark == 1){
                $.getScript("backend/data/visualcheckarray.js",function(){
                    var list1 = array.list1;
                    var list2 = array.list2;
                    var INDtotal=array.INDtotal;
                    var Qutotal=array.Qutotal;
                    var Disqutotal=array.Disqutotal;
                    var INnnvttotal=array.INnnvttotal;
                    var Qunnvttotal=array.Qunnvttotal;
                    var Disqunnvttotal=array.Disqunnvttotal;
                    var INhamamastutotal=array.INhamamastutotal;
                    var Quhamamastutotal=array.Quhamamastutotal;
                    var Disquhamamastutotal=array.Disquhamamastutotal;
                    var days=[];
                    var daytotalpmt=[];
                    var DHITotal=[];
                    var DHQTotal=[];
                    var DHDTotal=[];
                    var DNITotal=[];
                    var DNQTotal=[];
                    var DNDTotal=[];
                    var months=[];
                    var monthstotalpmt=[];
                    var MItotal=[];
                    var MQtotal=[];
                    var MDtotal=[];
                    var VSspeed=[];
                    $.each(list1, function (index, array) { //遍历json数据列

                        days[index] = array['days'];
                        daytotalpmt[index] = array['daytotalpmt'];
                        DHITotal[index] = array['DHITotal'];
                        DHQTotal[index] = array['DHQTotal'];
                        DHDTotal[index] = array['DHDTotal'];
                        DNITotal[index] = array['DNITotal'];
                        DNQTotal[index] = array['DNQTotal'];
                        DNDTotal[index] = array['DNDTotal'];
                    });
                    $.each(list2, function (index, array) { //遍历json数据列

                        months[index] = array['months'];
                        monthstotalpmt[index] = array['monthstotalpmt'];
                        MItotal[index] = array['MItotal'];
                        MQtotal[index] = array['MQtotal'];
                        MDtotal[index] = array['MDtotal'];
                        VSspeed[index] = array['VSspeed'];
                    });

                    var list3=array.list3;
                    var list4=array.list4;
                    var Bubble_effective=[];
                    var Scratch_a=[];
                    var Scratch_b=[];
                    var Black_impurity_effective=[];
                    var White_impurity_effective=[];
                    var Other_a=[];
                    var Other_b=[];
                    var Open_bubble_a=[];
                    var Open_bubble_b=[];
                    var Uneven_a=[]
                    var Uneven_b=[];
                    $.each(list3, function (index, array) { //遍历json数据列

                        Bubble_effective[index] = array['Bubble_effective'];
                        Scratch_a[index] = array['Scratch_a'];
                        Scratch_b[index] = array['Scratch_b'];
                        Black_impurity_effective[index] = array['Black_impurity_effective'];
                        White_impurity_effective[index] = array['White_impurity_effective'];
                        Other_a[index] = array['Other_a'];
                        Other_b[index] = array['Other_b'];
                        Open_bubble_a[index] = array['Open_bubble_a'];
                        Open_bubble_b[index] = array['Open_bubble_b'];
                        Uneven_a[index] = array['Uneven_a'];
                        Uneven_b[index] = array['Uneven_b'];
                    });
                    Bubble_effective=strtonumarray(Bubble_effective);
                    Scratch_a=strtonumarray(Scratch_a);
                    Scratch_b=strtonumarray(Scratch_b);
                    Other_a=strtonumarray(Other_a);
                    Other_b=strtonumarray(Other_b);
                    Uneven_a=strtonumarray(Uneven_a);
                    Uneven_b=strtonumarray(Uneven_b);
                    Open_bubble_a=strtonumarray(Open_bubble_a);
                    Open_bubble_b=strtonumarray(Open_bubble_b);
                    Black_impurity_effective=strtonumarray(Black_impurity_effective);
                    White_impurity_effective=strtonumarray(White_impurity_effective);
                    var lx=[0,1,1.1,2.1,3.5,5.1,10,100];
                    var rx=[1,1.1,2.1,3.5,5.1,100,10000];
                    var numupbubble=[];
                    var numdownbubble=[];
                    var numother=[];
                    var numuneven=[];
                    var numopenbubble=[];
                    var numBIE=[];
                    var numWIE=[];
                    var numscratch=[];
                    for(var i=0;i<8;i++){
                        numupbubble[i]=Psplitarray(Bubble_effective,lx[i],rx[i]);
                        numdownbubble[i]=Nsplitarray(Bubble_effective,lx[i],rx[i]);
                        numother[i]=abssplitarray(Other_a,Other_b,lx[i],rx[i]);
                        numuneven[i]=abssplitarray(Uneven_a,Uneven_b,lx[i],rx[i]);
                        numopenbubble[i]=abssplitarray(Open_bubble_a,Open_bubble_b,lx[i],rx[i]);
                        numBIE[i]=abssplitarray(Black_impurity_effective,Black_impurity_effective,lx[i],rx[i]);
                        numWIE[i]=abssplitarray(White_impurity_effective,White_impurity_effective,lx[i],rx[i]);
                        numscratch[i]=maxabssplitarray(Scratch_a,Scratch_b,lx[i],rx[i]);
                    }


                    var Diameter=[];
                    var Dislocation_flange=[];
                    var Gap_flange=[];
                    var Crack=[];
                    var upBubble35_quality=[];
                    var upBubble135_quality=[];
                    var downBubble5_quality=[];
                    var downBubble25_quality=[];
                    var Scratch50_quality=[];
                    var Scratch1050_quality=[];
                    var Uneven_quality=[];
                    var Black3_qulity=[];
                    var Black13_qulity=[];
                    var White3_quality=[];
                    var upBubble135_Black13_quality=[];
                    var Other_quality=[];
                    var Open_bubble_quality=[];

                    $.each(list4, function (index, array) { //遍历json数据列
                        upBubble35_quality[index]=array['upBubble35_quality'];
                        upBubble135_quality[index]=array['upBubble135_quality'];
                        downBubble5_quality[index]=array['downBubble5_quality'];
                        downBubble25_quality[index]=array['downBubble25_quality'];
                        Scratch50_quality[index]=array['Scratch50_quality'];
                        Scratch1050_quality[index]=array['Scratch1050_quality'];
                        Uneven_quality[index]=array['Uneven_quality'];
                        Other_quality[index]=array['Other_quality'];
                        Black3_qulity[index]=array['Black3_qulity'];
                        Black13_qulity[index]=array['Black13_qulity'];
                        Open_bubble_quality[index]=array['Open_bubble_quality'];
                        Crack[index]=array['Crack'];
                        upBubble135_Black13_quality[index]=array['upBubble135_Black13_quality'];
                        White3_quality[index]=array['White3_quality'];

                    });

                    var dis_crack=[];
                    var dis_upbubble35=[];
                    var dis_upbubble135=[];
                    var dis_downbubble5=[];
                    var dis_downbubble25=[];
                    var dis_Scratch50=[];
                    var dis_Scratch1050=[];
                    var dis_Black3=[];
                    var dis_Black13=[];
                    var dis_White3=[];
                    var dis_upBubble135_Black13=[];
                    var dis_Open_bubble=[];

                    dis_crack=countnum(Crack,0);
                    dis_Open_bubble=countnum(Open_bubble_quality,0);
                    dis_White3=countnum(White3_quality,0);
                    dis_upBubble135_Black13=countnum(upBubble135_Black13_quality,7);


                    dis_upbubble35=countnum(upBubble35_quality,0);
                    dis_upbubble135=countnum(upBubble135_quality,5);
                    var dis_upbubble35and135=countnum2(upBubble35_quality,upBubble135_quality,0,5);

                    dis_downbubble5=countnum(downBubble5_quality,0);
                    dis_downbubble25=countnum(downBubble25_quality,10);
                    var dis_downbubble5and25=countnum2(downBubble5_quality,downBubble25_quality,0,10);
                    //alert(dis_upbubble35);alert(dis_upbubble135);alert(dis_upbubble35and135);

                    dis_Scratch50=countnum(Scratch50_quality,0);
                    dis_Scratch1050=countnum(Scratch1050_quality,5);
                    var dis_Scratch50and1050=countnum2(Scratch50_quality,Scratch1050_quality,0,5);

                    dis_Black3=countnum(Black3_qulity,0);
                    dis_Black13=countnum(Black13_qulity,5);
                    var dis_Black3and13=countnum2(Black3_qulity,Black13_qulity,0,5);
                    //crack,bubble up ,bubble down, scratch, black,white,dis_upBubble135_Black13,dis_Open_bubble,sum bubble
                    var small=[0,dis_upbubble135,dis_downbubble25,dis_Scratch1050,dis_Black13,0,0,0,dis_upbubble135];
                    var big=[dis_crack,dis_upbubble35,dis_downbubble5,dis_Scratch50,dis_Black3,dis_White3,dis_upBubble135_Black13,dis_Open_bubble,dis_crack+dis_upbubble35];
                    var either=[0+dis_crack,dis_upbubble35and135,dis_downbubble5and25,dis_Scratch50and1050,dis_Black3and13,0+dis_White3,0+dis_upBubble135_Black13,0+dis_Open_bubble,dis_upbubble35and135+dis_downbubble5and25];



                    var p3r1 = echarts.init(document.getElementById("pie3ring1"));
                    var data1 = [{
                        value: Qutotal,
                        name: 'Qualification'
                    }, {
                        value: Disqutotal,
                        name: 'Disqualification'
                    }, {
                        value: INDtotal,
                        name: 'Indetermination'
                    }];
                    var data2 = [{
                        value: Qunnvttotal,
                        name: 'Qualification'
                    }, {
                        value: Disqunnvttotal,
                        name: 'Disqualification'
                    }, {
                        value: INnnvttotal,
                        name: 'Indetermination'
                    }];
                    var data3 = [{
                        value: Quhamamastutotal,
                        name: 'Qualification'
                    }, {
                        value: Disquhamamastutotal,
                        name: 'Disqualification'
                    }, {
                        value: INhamamastutotal,
                        name: 'Indetermination'
                    }];
                    var option1 = {
                        title: {
                            text: 'Visual Check Statistics 1',
                            subtext:'Total:'+(INDtotal+Qutotal+Disqutotal).toString()
                        },
                        backgroundColor: 'rgba(255,255,255,0)',
                        tooltip : {
                            show: true,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                dataView: {readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}

                            }
                        },
                        legend: {
                            orient: 'vertical',
                            right: '0%',
                            bottom: '0%',
                            data: ['Qualification', 'Disqualification', 'Indetermination']
                        },
                        series: [{
                            name: "Total",
                            type: 'pie',
                            selectedMode: 'single',
                            radius: ['75%', '95%'],
                            color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{c}\n({d}%)',
                                    textStyle: {
                                        color: '#030303',
                                        fontSize: 10
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: data1
                        },{
                            name: "NNVT",
                            type: 'pie',
                            selectedMode: 'single',
                            radius: ['45%', '65%'],
                            color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{c}\n({d}%)',
                                    textStyle: {
                                        color: '#030303',
                                        fontSize: 10
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: data2
                        },{
                            name: "Hamamatsu",
                            type: 'pie',
                            selectedMode: 'single',
                            radius: ['15%', '35%'],
                            color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],

                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{c}\n({d}%)',
                                    textStyle: {
                                        color: '#030303',
                                        fontSize: 10
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: data3
                        }]
                    };

                    p3r1.setOption(option1);



                    var p3r2 = echarts.init(document.getElementById("pie3ring2"));
                    dataStyle = {
                        normal: {
                            label: {show:true},
                            labelLine: {show:true,
                                length: 100,
                                smooth: 0.5
                            },
                            shadowBlur: 40,
                            shadowColor: 'rgba(40, 40, 40, 0.5)',
                        }
                    };
                    placeHolderStyle = {
                        normal : {
                            color: 'rgba(0,0,0,0)',
                            label: {show:false},
                            labelLine: {show:false}
                        },
                        emphasis : {
                            show: false,
                            color: 'rgba(0,0,0,0)'
                        }
                    };
                    option2 = {

                        title:{
                            text: 'Visual Check Statistics 2',
                            subtext:'Total:'+(INDtotal+Qutotal+Disqutotal).toString()
                        },

                        color: ['#AF89D6', '#59ADF3', '#FF999A', '#FFCC67','#FCC667','#CC5962'],
                        tooltip : {
                            show: true,
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            right: '0%',
                            bottom: '0%',
                            data:['Qualification', 'Disqualification', 'Indetermination']

                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark : {show: true},
                                dataView: {readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        series : [{
                            name: "Qualification",
                            type : "pie",
                            clockWise: false,
                            radius: ['80%', '95%'],
                            itemStyle: dataStyle,
                            hoverAnimation: false,
                            label: {
                                normal: {
                                    position: 'inner',
                                    formatter: '{c}\n({d}%)',
                                    textStyle: {
                                        color: '#030303',
                                        fontSize: 10
                                    }
                                }
                            },

                            data:[{
                                value :Qunnvttotal,
                                name : "NNVT"
                            },{
                                value: Quhamamastutotal,
                                name: "Hamamatsu",
                                itemStyle: placeHolderStyle
                            }]
                        },
                            {
                                name:'Qualification',
                                type:'pie',
                                clockWise:false,
                                radius : ['65%', '80%'],
                                itemStyle : dataStyle,
                                hoverAnimation: false,
                                label: {
                                    normal: {
                                        position: 'inner',
                                        formatter: '{c}\n({d}%)',
                                        textStyle: {
                                            color: '#030303',
                                            fontSize: 10
                                        }
                                    }
                                },
                                data:[{
                                    value :Qunnvttotal,
                                    name : "NNVT",
                                    itemStyle: placeHolderStyle
                                },{
                                    value: Quhamamastutotal,
                                    name: "Hamamatsu",
                                }]
                            },
                            {
                                name:'Disqualification',
                                type:'pie',
                                clockWise:false,
                                radius : ['50%','65%'],
                                itemStyle : dataStyle,
                                hoverAnimation: false,
                                label: {
                                    normal: {
                                        position: 'inner',
                                        formatter: '{c}\n({d}%)',
                                        textStyle: {
                                            color: '#030303',
                                            fontSize: 10
                                        }
                                    }
                                },
                                data:[
                                    {
                                        value:Disqunnvttotal,
                                        name:"NNVT"
                                    },
                                    {
                                        value:Disquhamamastutotal,
                                        name:"Hamamatsu",
                                        itemStyle : placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name:'Disqualification',
                                type:'pie',
                                clockWise:false,
                                hoverAnimation: false,
                                radius : ['35%','50%'],
                                itemStyle : dataStyle,
                                label: {
                                    normal: {
                                        position: 'inner',
                                        formatter: '{c}\n({d}%)',
                                        textStyle: {
                                            color: '#030303',
                                            fontSize: 10
                                        }
                                    }
                                },
                                data:[
                                    {
                                        value:Disqunnvttotal,
                                        name:"NNVT",
                                        itemStyle: placeHolderStyle
                                    },
                                    {
                                        value:Disquhamamastutotal,
                                        name:"Hamamatsu",
                                    }
                                ]
                            },
                            {
                                name:'Indetermination',
                                type:'pie',
                                clockWise:false,
                                hoverAnimation: false,
                                radius : ['20%','35%'],
                                itemStyle : dataStyle,
                                label: {
                                    normal: {
                                        position: 'inner',
                                        formatter: '{c}\n({d}%)',
                                        textStyle: {
                                            color: '#030303',
                                            fontSize: 10
                                        }
                                    }
                                },
                                data:[
                                    {
                                        value:INnnvttotal,
                                        name:'NNVT'
                                    },
                                    {
                                        value:INhamamastutotal,
                                        name:'Hamamatsu',
                                        itemStyle : placeHolderStyle
                                    }
                                ]
                            },
                            {
                                name:'Indetermination',
                                type:'pie',
                                clockWise: false,
                                hoverAnimation: false,
                                radius : ['5%','20%'],
                                itemStyle : dataStyle,
                                label: {
                                    normal: {
                                        position: 'inner',
                                        formatter: '{c}\n({d}%)',
                                        textStyle: {
                                            color: '#030303',
                                            fontSize: 10
                                        }
                                    }
                                },
                                data:[
                                    {
                                        value:INnnvttotal,
                                        name:'NNVT',
                                        itemStyle: placeHolderStyle
                                    },
                                    {
                                        value:INhamamastutotal,
                                        name:'Hamamatsu',
                                    }
                                ]
                            },

                        ]
                    };


                    p3r2.setOption(option2);

                    var barline = echarts.init(document.getElementById("barlinespeed"));
                    option3 = {

                        title : {
                            text: "Monthly Visual Check Report",
                            x: "left",
                            subtext:'Total:'+(INDtotal+Qutotal+Disqutotal).toString()
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
                           // orient: 'vertical',
                            //right: '0%',
                           // bottom: '0%',
                            data:['Qualification','Disqualification','Indetermination','Speed of Visual Check']
                        },

                        xAxis: [
                            {
                                type: 'category',
                                data: months
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: 'Quantity',
                                min: 0,
                                max: 240,
                                interval: 60,
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            },
                            {
                                type: 'value',
                                name: 'Speed',
                                min: 0,
                                max: 24,
                                interval: 6,
                                axisLabel: {
                                    formatter: '{value} PMTs/day'
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
                                name:'Qualification',
                                type:'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideTop'
                                    }
                                },
                                data:MQtotal
                            },
                            {
                                name:'Disqualification',
                                type:'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideTop'
                                    }
                                },
                                data: MDtotal
                            },
                            {
                                name:'Indetermination',
                                type:'bar',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideTop'
                                    }
                                },
                                data: MItotal
                            },
                            {
                                name:'Speed of Visual Check',
                                type:'line',
                                yAxisIndex: 1,
                                data: VSspeed
                            }
                        ]
                    };


                    barline.setOption(option3);

                    var bartype = echarts.init(document.getElementById("VSstatistics"));

                    var bcBySeriesIndex = ['NNVT', 'NNVT', 'NNVT', 'Hamamatsu', 'Hamamatsu', 'Hamamatsu'];

                    option4 = {
                        title : {
                            text: "Daily Visual Check Report",
                            x: "left"
                        },

                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                magicType: {
                                    'show': true,
                                    'type': ['line', 'bar', 'stack', 'tiled']
                                },
                                dataZoom : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}

                            }
                        },

                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var html = [];

                                var category = {};
                                echarts.util.each(params, function (param) {
                                    var catName = param.seriesName;
                                    var bc = bcBySeriesIndex[param.seriesIndex];
                                    if (!category[catName]) {
                                        category[catName] = {};
                                    }
                                    category[catName][bc] = param.value;
                                });
                                console.log(category);
                                echarts.util.each(category, function (cate, key) {
                                    html.push(
                                        '<tr>',
                                        '<td>', key, '</td>',
                                        '<td>', cate.NNVT, '</td>',
                                        '<td>', cate.Hamamatsu, '</td>',
                                        '</tr>'
                                    );
                                })

                                return '<table border=1><tbody>'
                                    + '<tr><td></td><td>NNVT</td><td>Hamamatsu</td></tr>'
                                    + html.join('')
                                    + '</tbody></table>';
                            }
                        },
                        legend: {
                            data: [
                                'Qualification', 'Disqualification', 'Indetermination'
                            ]
                        },
                        grid: {
                            name: 'Quantity',
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : days
                            }
                        ],
                        yAxis : [
                            {
                                type: 'value',
                                name: 'Quantity',
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
                        series : [
                            {
                                name:'Qualification',
                                type:'bar',
                                barWidth : 20,
                                stack: 'NNVT',
                                data:DNQTotal
                            },
                            {
                                name:'Disqualification',
                                type:'bar',
                                stack: 'NNVT',
                                data:DNDTotal
                            },
                            {
                                name:'Indetermination',
                                type:'bar',
                                stack: 'NNVT',
                                data:DNITotal,
                            },
                            {
                                name:'Qualification',
                                type:'bar',
                                barWidth : 20,
                                stack: 'Hamamatsu',
                                data:DHQTotal
                            },
                            {
                                name:'Disqualification',
                                type:'bar',
                                stack: 'Hamamatsu',
                                data:DHDTotal
                            },
                            {
                                name:'Indetermination',
                                type:'bar',
                                stack: 'Hamamatsu',
                                data:DHITotal,
                            }
                        ]
                    };

                    bartype.setOption(option4);

                    var bar1 = echarts.init(document.getElementById("bar1"));
                    option5 = {
                        title: {
                            text: 'Defect distribution'
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
                            data: ['Bubble_up', 'Bubble_down', 'Scratch', 'Black impurity','White impurity','Uneven','Others','Open Bubble'],
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
                            name: 'size of defects',
                            nameLocation:'middle',
                            nameGap:20,
                            //nameTextStyle:'bottom',
                            data: ['[0,1)', '[1,1.1)', '[1.1,2.1)', '[2.1,3.5)', '[3.5,5.1)','[5.1,10)','[10,100)','>=100']
                        }],
                        yAxis: [{
                            type: 'value',
                            name: 'Quantity',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }],
                        series: [{
                            name: 'Bubble_up',
                            type: 'bar',
                            data: numupbubble
                        }, {
                            name: 'Bubble_down',
                            type: 'bar',
                            data: numdownbubble
                        }, {
                            name: 'Scratch',
                            type: 'bar',
                            data: numscratch
                        }, {
                            name: 'Black impurity',
                            type: 'bar',
                            data: numBIE
                        }, {
                            name: 'White impurity',
                            type: 'bar',
                            data: numWIE
                        }, {
                            name: 'Uneven',
                            type: 'bar',
                            data: numuneven
                        }, {
                            name: 'Others',
                            type: 'bar',
                            data: numother
                        }, {
                            name: 'Open Bubble',
                            type: 'bar',
                            data: numopenbubble
                        }]
                    };

                    bar1.setOption(option5);

                    var bar2 = echarts.init(document.getElementById("bar2"));
                    option6 = {
                        title: {
                            text: 'Qualification quanlity of PMT'
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
                            data: ['small', 'big', 'either'],
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
                            name: 'Defects',
                            nameLocation:'middle',
                            nameGap:20,
                            //nameTextStyle:'bottom',
                            data: ['Crack', 'Bubble up', 'Bubble down','Scratch', 'Black impurity','White impurity','Bubble up + Black impurity <=7','Open Bubble','sum(Bubble)']
                        }],
                        yAxis: [{
                            type: 'value',
                            name: 'Quantity',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        }],
                        series: [{
                            name: 'small',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: small
                        }, {
                            name: 'big',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: big
                        }, {
                            name: 'either',
                            type: 'bar',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            data: either
                        }]
                    };

                    bar2.setOption(option6);




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
function strtonumarray(data1){
    var AAA=data1.toString();//字符数组转字符串
    var BBB=AAA.split(',');//逗号隔开
    for(var i = 0 ;i<BBB.length;i++)
    {
        if(BBB[i] == "" || typeof(BBB[i]) == "undefined")
        {
            BBB.splice(i,1);
            i= i-1;

        }
    }
    return BBB;

}
function Psplitarray(data2,leftx,rightx){
    var CCC=[];var j=0;
    for (var i=0;i<data2.length;i++){
        if(data2[i]<rightx&data2[i]>=leftx){
            CCC[j]=data2[i];
            j=j+1;
        }
    }
    var arraylength=CCC.length;
    return arraylength;


}
function Nsplitarray(data2,leftx,rightx){
    var CCC=[];var j=0;
    for (var i=0;i<data2.length;i++){
        if(-data2[i]<rightx&-data2[i]>=leftx){
            CCC[j]=-data2[i];
            j=j+1;
        }
    }
    var arraylength=CCC.length;
    return arraylength;
}

function abssplitarray(data1,data2,leftx,rightx){
    var CCC=[];var j=0;
    for (var i=0;i<data1.length;i++){
        if((Math.abs(data1[i])+Math.abs(data2[i]))/2<rightx&(Math.abs(data1[i])+Math.abs(data2[i]))/2>=leftx){
            CCC[j]=(Math.abs(data1[i])+Math.abs(data2[i]))/2;
            j=j+1;
        }
    }
    var arraylength=CCC.length;
    return arraylength;



}

function maxabssplitarray(data1,data2,leftx,rightx){
    var CCC=[];var j=0;
    var CC=[];
    for (var i=0;i<data1.length;i++){
        CC[i]=Math.max(Math.abs(data1[i]),Math.abs(data2[i]));
    }
    for (var i=0;i<data1.length;i++){
        if(CC[i]<rightx&CC[i]>=leftx){
            CCC[j]=CC[i];
            j=j+1;
        }
    }
    var arraylength=CCC.length;
    return arraylength;



}

function countnum(data,limit){
    var k=0;
    for(var i=0;i<data.length;i++){
        if(data[i]>limit){
            k=k+1;
        }

    }

    return k;
}

function countnum2(data1,data2,limit1,limit2){
    var k=0;
    for(var i=0;i<data1.length;i++){
        if(data1[i]>limit1|data2[i]>limit2){
            k=k+1;
        }

    }

    return k;
}