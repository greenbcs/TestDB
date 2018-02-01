/*----------------------饼状图-----------------------*/
//环形图
(function(){
	
var pie1 = echarts.init(document.getElementById("pie1"));

option = {
	
	title : {
		text: "simple circular graph",
		x: 'center'
	},
	
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['A','B','C','D','E']
    },
    series: [
        {
            name:'Items',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:424, name:'A'},
                {value:423, name:'B'},
                {value:432, name:'C'},
                {value:234, name:'D'},
                {value:3008, name:'E'}
            ]
        }
    ]
};

pie1.setOption(option);
})();


//嵌套环形图
(function(){
	
var pie2 = echarts.init(document.getElementById("pie2"));

option = {
	
	title : {
		text: "Circule Graph",
		x: 'center'
	},
	
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data:['A','B','C','D','E','F','G','H','I','J']
    },
    series: [
        {
            name:'Source',
            type:'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
                normal: {
                    position: 'inner'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:300, name:'A', selected:true},
                {value:20, name:'B'},
                {value:800, name:'C'}
            ]
        },
        {
            name:'Source',
            type:'pie',
            radius: ['40%', '55%'],

            data:[
                {value:335, name:'D'},
                {value:310, name:'E'},
                {value:234, name:'F'},
                {value:135, name:'G'},
                {value:1048, name:'H'},
                {value:251, name:'I'},
                {value:147, name:'J'},
                {value:102, name:'K'}
            ]
        }
    ]
};
pie2.setOption(option);
})();


//饼状图
(function(){
	
var pie3 = echarts.init(document.getElementById("pie3"));

option = {
    title : {
        text: '某站点用户访问来源',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

pie3.setOption(option);
})();


//南丁格尔玫瑰图
(function(){
	
var pie4 = echarts.init(document.getElementById("pie4"));

option = {
    title : {
        text: '南丁格尔玫瑰图',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
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
    calculable : true,
    series : [
        {
            name:'半径模式',
            type:'pie',
            radius : [20, 110],
            center : ['25%', '50%'],
            roseType : 'radius',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            lableLine: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        },
        {
            name:'面积模式',
            type:'pie',
            radius : [30, 110],
            center : ['75%', '50%'],
            roseType : 'area',
            data:[
                {value:10, name:'rose1'},
                {value:5, name:'rose2'},
                {value:15, name:'rose3'},
                {value:25, name:'rose4'},
                {value:20, name:'rose5'},
                {value:35, name:'rose6'},
                {value:30, name:'rose7'},
                {value:40, name:'rose8'}
            ]
        }
    ]
};

pie4.setOption(option);
})();