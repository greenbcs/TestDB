/**
 * Created by yry on 2016/12/25.
 */
//var host = 'http://120.25.234.234:8890/api/v1/';
/*Role Definition
* 管理员: role_admin
* 仓库：role_warehouse_keeper
* 测试：role_test_controller
* 安装:role_installer
* 游客：role_visitor
* */
var host = 'http://119.23.229.99:8890/api/v1/';
//var host = 'http://192.168.2.161:8890/api/v1/';
var langCN = {
    username : '用户名',
    password : '密码',
    v_code : '验证码',
    login : '登录',
    register : '注册',
    email : '电子邮箱',
    unit : '单位名称',
    i_code : '邀请码'
}

var langEN = {
    username : 'User Name',
    password : 'Password',
    v_code : 'Verification Code',
    login : 'Login',
    register : 'Register',
    email : 'E-mail',
    unit : 'Unit',
    i_code : 'Invitation Code'
}

var roleConfig = [
    {
        rolename:'管理员',
        role:'role_admin'
    },
    {
        rolename:'仓库管理员',
        role:'role_warehouse_keeper'
    },
    {
        rolename:'测试管理员',
        role:'role_test_controller'
    },
    {
        rolename:'安装管理员',
        role:'role_installer'
    },
    {
        rolename:'游客',
        role:'role_visitor'
    }
];

var breadConfig1 = [
    {
        cn : '您好',
        en : 'Hi',
        tag : 'hello'
    },
    {
        cn : '首页',
        en : 'Home',
        tag : 'home'
    },
    {
        cn : 'PMT信息浏览',
        en : 'PMT Info Browse',
        tag : 'browse'
    },
    {
        cn : '数据导入',
        en : 'Data Import',
        tag : 'data_import'
    },
    {
        cn : '入库记录',
        en : 'Warehousing Record',
        tag : 'warehouse'
    },
    {
        cn : '安装记录',
        en : 'Installation Record',
        tag : 'install'
    },
    {
        cn : '测试记录',
        en : 'Test Record',
        tag : 'test'
    },
    {
        cn : '滨松参数',
        en : 'Hamamtsu Params',
        tag : 'hp'
    },
    {
        cn : '北方夜视参数',
        en : 'NNVT Params',
        tag : 'np'
    },
    {
        cn : 'PMT参数数据',
        en : 'PMT Parameters',
        tag : 'pmt_param'
    },
    {
        cn : 'PMT信息录入',
        en : 'PMT Info Input',
        tag : 'input'
    },
    {
        cn : 'PMT仓库信息录入',
        en : 'Warehousing Input',
        tag : 'warehouse_input'
    },
    {
        cn : 'PMT安装信息录入',
        en : 'Installation Input',
        tag : 'install_input'
    },
    {
        cn : 'PMT测试信息录入',
        en : 'Test Input',
        tag : 'test_input'
    },
    {
        cn : '人员管理',
        en : 'Users Management',
        tag : 'management'
    },
    {
        cn : '数据导出',
        en : 'Data Export',
        tag : 'download'
    },
    {
        cn : '数据字典',
        en : 'Data Dictionary',
        tag : 'dictionary'
    },
    {
        cn : '数据库日志',
        en : 'Testing DB Elog',
        tag : 'message'
    },
    {
        cn : '绘图',
        en : 'Mapping',
        tag : 'mapping'
    },
    {
        cn : '系统日志',
        en : 'System Log',
        tag : 'log'
    },
    {
        cn : '公告',
        en : 'Notice',
        tag : 'notice'
    },
    {
        cn : '转接链接',
        en : 'Link to',
        tag : 'link'
    },
    {
        cn : '个人中心',
        en : 'User Profiles',
        tag : 'profile'
    },
    {
        cn : '退出',
        en : 'Logout',
        tag : 'logout'
    },
    {
        cn : 'English',
        en : '中文',
        tag : 'language'
    },
    {
        cn : '2014-2020 JUNO Collaboration版权所有',
        en : '2014-2020 Copyright By JUNO Collaboration',
        tag : 'footer1'
    },
    {
        cn : '联系我们',
        en : 'Contact Us',
        tag : 'footer2'
    },
    {
        cn : '通讯地址',
        en : 'Address',
        tag : 'footer3'
    },
    {
        cn : '广州市新港西路135号',
        en : '135th West Xingang Road, Guangzhou',
        tag : 'footer4'
    }
]

var warehouseInput = [
    {
        id:1,
        cn:'入库环节',
        en:'Importing',
        extraFlag:'',//滨松bs 北方夜视bf
        items:[{id:'出厂编号',tag:'sn',en:'Serial Number'},{id:'类别',tag:'type',en:'Type'},{id:'制造商',tag:'mf',en:'Manufacture'},{id:'生产时间',tag:'pt',en:'Product Time'},{id:'入库时间',tag:'wit',en:'Warehousing Time'},{id:'入库记录员',tag:'wir',en:'Warehousing Recorder'},{id:'存放位置',tag:'dp',en:'Deposit Position'},{id:'入库备注',tag:'win',en:'Warehousing Note'}],
        itemBS:[{id:'Cathode Luminous Sensitivity',tag:'skh'},{id:'Anode Luminous Sensitivity',tag:'sph'},{id:'Anode Dark Current',tag:'idbh'},{id:'Cathode Blue Sensitivity Index',tag:'skbh'},{id:'Supply Voltage',tag:'ebbh'},{id:'Dark Pulse Counts at Ebb',tag:'dch'},{id:'Rise Time',tag:'trh'},{id:'Fall Time',tag:'tfh'},{id:'Pre Pluses at Ebb',tag:'pph'},{id:'After Pluses at Ebb',tag:'aph'},{id:'Quantum efficiency',tag:'qeh'},{id:'Output Counts',tag:'deh'}],
        itemBF:[{id:'Quantum efficiency',tag:'qen'},{id:'Detection efficiency',tag:'den'},{id:'Working voltage',tag:'vn'},{id:'Gain',tag:'gn'},{id:'Peek to valley ratio',tag:'pvn'},{id:'Dark rate',tag:'drn'},{id:'Rise time',tag:'rtn'},{id:'Fall time',tag:'ftn'},{id:'Transit time spread',tag:'ttsn'},{id:'Pre-pluse',tag:'ppn'},{id:'after-pluse',tag:'apn'},{id:'Non-linearity',tag:'nln'},{id:'Non-uniformity of Quantum efficiency',tag:'nuqen'},{id:'Collection efficiency',tag:'cen'}]
    },
    // {
    //     id:2,
    //     cn:'封装环节',
    //     en:'Potting',
    //     extraFlag:'',
    //     items:[{id:'出厂编号',tag:'psn',en:'Serial Number'},{id:'电子学ID',tag:'eid',en:'Electrical Number'},{id:'封装时间',tag:'pct',en:'Package Time'},{id:'封装人员',tag:'pcr',en:'Package Recorder'},{id:'封装记录员',tag:'pcl',en:'Package List'},{id:'封装备注',tag:'pcn',en:'Package Note'}]
    // },
    {
        id:2,
        cn:'货架视图',
        en:'Shelf View',
        extraFlag:'',
        items:[]
    },
    {
        id:3,
        cn:'出库环节',
        en:'Exporting',
        extraFlag:'',
        items:[{id:'出厂编号',tag:'esn',en:'Serial Number'},{id:'出库时间',tag:'wot',en:'Warehouse-Out Time'},{id:'出库记录员',tag:'wor',en:'Warehouse-Out Recorder'},{id:'出库备注',tag:'won',en:'Warehouse-Out Note'}]
    }
]

var testInput = [
    {
        id:'1',
        cn:'扫描系统测试',
        en:'Acceptance Tests',
        items:[{id:'出厂编号',tag:'tsn',en:'Serial Number'},{id:'测试记录员',tag:'tr',en:'Test Recorder'},{id:'测试人员',tag:'tl',en:'Tester List'},{id:'测试时间',tag:'tt',en:'Test Time'},{id:'Detection Efficiency',tag:'de',en:'Detection Efficiency(%)'},{id:'D-E non-uniformity',tag:'denu',en:'D-E non-uniformity(%)'},{id:'Achievable Gain',tag:'ag',en:'Achievable Gain'},{id:'HV',tag:'hv',en:'HV(V)'},{id:'P/V',tag:'pv',en:'P/V'},{id:'TTS',tag:'tts',en:'TTS(ns)'},{id:'Rise Time',tag:'rt',en:'Rise Time(ns)'},{id:'Fall Time',tag:'ft',en:'Fall Time(ns)'},{id:'Dark Rate',tag:'dr',en:'Dark Rate(kHz)'},{id:'Pre-Pluse fraction',tag:'ppf',en:'Pre-Pluse fraction(%)'},{id:'After-Pluse fraction',tag:'apf',en:'After-Pluse fraction(%)'},{id:'Non-linearity',tag:'nl',en:'Non-linearity(%)'},{id:'Wavelength Sensitivity',tag:'ws',en:'Wavelength Sensitivity(nm)'},{id:'Sensitivity to Earth Magnetic Field',tag:'semf',en:'Sensitivity to Earth Magnetic Field'},{id:'Stability',tag:'stab',en:'Stability'},{id:'Radioactive Level',tag:'rl',en:'Radioactive Level'},{id:'Apparent Mass',tag:'am',en:'Apparent Mass'},{id:'Dimension',tag:'dime',en:'Dimension(mm)'},{id:'测试备注',tag:'tn',en:'Test Note'}]
    },
    {
        id:'2',
        cn:'集装箱测试1',
        en:'Integration Tests',
        items:[{id:'出厂编号',tag:'tsn',en:'Serial Number'},{id:'测试记录员',tag:'tr',en:'Test Recorder'},{id:'测试人员',tag:'tl',en:'Tester List'},{id:'测试时间',tag:'tt',en:'Test Time'},{id:'Detection Efficiency',tag:'de',en:'Detection Efficiency(%)'},{id:'D-E non-uniformity',tag:'denu',en:'D-E non-uniformity(%)'},{id:'Achievable Gain',tag:'ag',en:'Achievable Gain'},{id:'HV',tag:'hv',en:'HV(V)'},{id:'P/V',tag:'pv',en:'P/V'},{id:'TTS',tag:'tts',en:'TTS(ns)'},{id:'Rise Time',tag:'rt',en:'Rise Time(ns)'},{id:'Fall Time',tag:'ft',en:'Fall Time(ns)'},{id:'Dark Rate',tag:'dr',en:'Dark Rate(kHz)'},{id:'Pre-Pluse fraction',tag:'ppf',en:'Pre-Pluse fraction(%)'},{id:'After-Pluse fraction',tag:'apf',en:'After-Pluse fraction(%)'},{id:'Non-linearity',tag:'nl',en:'Non-linearity(%)'},{id:'Wavelength Sensitivity',tag:'ws',en:'Wavelength Sensitivity(nm)'},{id:'Sensitivity to Earth Magnetic Field',tag:'semf',en:'Sensitivity to Earth Magnetic Field'},{id:'Stability',tag:'stab',en:'Stability'},{id:'Radioactive Level',tag:'rl',en:'Radioactive Level'},{id:'Apparent Mass',tag:'am',en:'Apparent Mass'},{id:'Dimension',tag:'dime',en:'Dimension(mm)'},{id:'测试备注',tag:'tn',en:'Test Note'}]
    },
    {
        id:'3',
        cn:'封装环节',
        en:'Potting',
        items:[{id:'出厂编号',tag:'psn',en:'Serial Number'},{id:'电子学ID',tag:'eid',en:'Electrical Number'},{id:'封装时间',tag:'pct',en:'Package Time'},{id:'封装人员',tag:'pcr',en:'Package Recorder'},{id:'封装记录员',tag:'pcl',en:'Package List'},{id:'封装备注',tag:'pcn',en:'Package Note'}]
    },
    {
        id:'4',
        cn:'集装箱测试系统2',
        en:'Testing after potting',
        items:[{id:'出厂编号',tag:'tsn',en:'Serial Number'},{id:'测试记录员',tag:'tr',en:'Test Recorder'},{id:'测试人员',tag:'tl',en:'Tester List'},{id:'测试时间',tag:'tt',en:'Test Time'},{id:'Detection Efficiency',tag:'de',en:'Detection Efficiency(%)'},{id:'D-E non-uniformity',tag:'denu',en:'D-E non-uniformity(%)'},{id:'Achievable Gain',tag:'ag',en:'Achievable Gain'},{id:'HV',tag:'hv',en:'HV(V)'},{id:'P/V',tag:'pv',en:'P/V'},{id:'TTS',tag:'tts',en:'TTS(ns)'},{id:'Rise Time',tag:'rt',en:'Rise Time(ns)'},{id:'Fall Time',tag:'ft',en:'Fall Time(ns)'},{id:'Dark Rate',tag:'dr',en:'Dark Rate(kHz)'},{id:'Pre-Pluse fraction',tag:'ppf',en:'Pre-Pluse fraction(%)'},{id:'After-Pluse fraction',tag:'apf',en:'After-Pluse fraction(%)'},{id:'Non-linearity',tag:'nl',en:'Non-linearity(%)'},{id:'Wavelength Sensitivity',tag:'ws',en:'Wavelength Sensitivity(nm)'},{id:'Sensitivity to Earth Magnetic Field',tag:'semf',en:'Sensitivity to Earth Magnetic Field'},{id:'Stability',tag:'stab',en:'Stability'},{id:'Radioactive Level',tag:'rl',en:'Radioactive Level'},{id:'Apparent Mass',tag:'am',en:'Apparent Mass'},{id:'Dimension',tag:'dime',en:'Dimension(mm)'},{id:'测试备注',tag:'tn',en:'Test Note'}]
    },
    {
        id:'5',
        cn:'制作二维码',
        en:'Making QR code',
        items:[{id:'出厂编号',tag:'qsn',en:'Serial Number'},{id:'制作时间',tag:'qgt',en:'Generate Time'},{id:'制作员',tag:'qgr',en:'Generator'},{id:'制作备注',tag:'qgn',en:'Generate Note'}]
    }
    // {
    //     cn:'手动输入',
    //     en:'Manual Input',
    //     items:[{id:'出厂编号',tag:'tsn',en:'Serial Number'},{id:'测试记录员',tag:'tr',en:'Test Recorder'},{id:'测试人员',tag:'tl',en:'Tester List'},{id:'Detection Efficiency',tag:'de',en:'Detection Efficiency'},{id:'D-E non-uniformity',tag:'denu',en:'D-E non-uniformity'},{id:'Achievable Gain',tag:'ag',en:'Achievable Gain'},{id:'HV',tag:'hv',en:'HV'},{id:'P/V',tag:'pv',en:'P/V'},{id:'TTS',tag:'tts',en:'TTS'},{id:'Rise Time',tag:'rt',en:'Rise Time'},{id:'Fall Time',tag:'ft',en:'Fall Time'},{id:'Dark Rate',tag:'dr',en:'Dark Rate'},{id:'Pre-Pluse fraction',tag:'ppf',en:'Pre-Pluse fraction'},{id:'After-Pluse fraction',tag:'apf',en:'After-Pluse fraction'},{id:'Non-linearity',tag:'nl',en:'Non-linearity'},{id:'Wavelength Sensitivity',tag:'ws',en:'Wavelength Sensitivity'},{id:'Sensitivity to Earth Magnetic Field',tag:'semf',en:'Sensitivity to Earth Magnetic Field'},{id:'Stability',tag:'stab',en:'Stability'},{id:'Radioactive Level',tag:'rl',en:'Radioactive Level'},{id:'Apparent Mass',tag:'am',en:'Apparent Mass'},{id:'Dimension',tag:'dime',en:'Dimension'}]
    // }
]

var installInput = [{
    cn:'安装环节',
    en:'Installation',
    items:[{id:'出厂编号',tag:'isn',en:'Serial Number'},{id:'安装时间',tag:'int',en:'Installation Time'},{id:'安装人员',tag:'inl',en:'Installation Person List'},{id:'安装记录员',tag:'inr',en:'Installation Recorder'},{id:'R',tag:'ring',en:'Ring'},{id:'C',tag:'column',en:'Column'},{id:'M',tag:'module',en:'Module'},{id:'P',tag:'pmt',en:'Pmt'},{id:'安装备注',tag:'inn',en:'Installation Note'}]
}]

var dataDictionary = [
    {
      tag:'A',
      id:'collapse-panel-a',
      items:[
          {
              no:'1',
              en:'Anode Luminous Sensitivity',
              abbr:'SpH',
              cn:'-'
          },
          {
              no:'2',
              en:'Anode Dark Current',
              abbr:'IdbH',
              cn:'-'
          },
          {
              no:'3',
              en:'After Pulses at Ebb',
              abbr:'aph',
              cn:'-'
          },
          {
              no:'4',
              en:'After-Pulse',
              abbr:'APN',
              cn:'-'
          },
          {
              no:'5',
              en:'After-Pulse fraction',
              abbr:'APF',
              cn:'-'
          },
          {
              no:'6',
              en:'Achievable Gain',
              abbr:'AG',
              cn:'-'
          },
          {
              no:'7',
              en:'Apparent Mass',
              abbr:'AM',
              cn:'-'
          }
      ]
    },
    {
        tag:'C',
        id:'collapse-panel-c',
        items:[
            {
                no:'8',
                en:'Cathode Luminous Sensitivity',
                abbr:'skh',
                cn:'-'
            },
            {
                no:'9',
                en:'Cathode Blue Sensitivity Index',
                abbr:'skbh',
                cn:'-'
            },
            {
                no:'10',
                en:'Collection efficiency',
                abbr:'CEN',
                cn:'-'
            }
        ]
    },{
        tag:'D',
        id:'collapse-panel-d',
        items:[
            {
                no:'11',
                en:'Dark Pulse Counts at Ebb',
                abbr:'dch',
                cn:'-'
            },
            {
                no:'12',
                en:'Detection efficiency',
                abbr:'DEN',
                cn:'-'
            },
            {
                no:'13',
                en:'Dark rate',
                abbr:'DRN',
                cn:'-'
            },
            {
                no:'14',
                en:'Detection Efficiency non-uniformity',
                abbr:'DENU',
                cn:'-'
            },
            {
                no:'15',
                en:'Dimension',
                abbr:'Dime',
                cn:'-'
            }
        ]
    },{
        tag:'F',
        id:'collapse-panel-f',
        items:[
            {
                no:'16',
                en:'Fall time',
                abbr:'FTN',
                cn:'-'
            }
        ]
    },{
        tag:'G',
        id:'collapse-panel-g',
        items:[
            {
                no:'17',
                en:'Gain',
                abbr:'GN',
                cn:'-'
            }
        ]
    },{
        tag:'H',
        id:'collapse-panel-h',
        items:[
            {
                no:'18',
                en:'HV',
                abbr:'HV',
                cn:'-'
            }
        ]
    },{
        tag:'N',
        id:'collapse-panel-n',
        items:[
            {
                no:'19',
                en:'Non-linearity',
                abbr:'NLN',
                cn:'-'
            },
            {
                no:'20',
                en:'Non-uniformity of Quantum efficiency',
                abbr:'NUQEN',
                cn:'-'
            }
        ]
    },{
        tag:'P',
        id:'collapse-panel-p',
        items:[
            {
                no:'21',
                en:'Pre Pluses at Ebb',
                abbr:'pph',
                cn:'-'
            },
            {
                no:'22',
                en:'Peak to valley ratio',
                abbr:'P/VN',
                cn:'-'
            },
            {
                no:'23',
                en:'Pre-pluse',
                abbr:'PPN',
                cn:'-'
            },
            {
                no:'24',
                en:'Pre-pluse fraction',
                abbr:'PPF',
                cn:'-'
            }
        ]
    },{
        tag:'Q',
        id:'collapse-panel-q',
        items:[
            {
                no:'25',
                en:'Quantum efficiency',
                abbr:'QEN',
                cn:'-'
            }
        ]
    },{
        tag:'R',
        id:'collapse-panel-r',
        items:[
            {
                no:'26',
                en:'Rise time',
                abbr:'RTN',
                cn:'-'
            },
            {
                no:'27',
                en:'Radioactive Level',
                abbr:'RL',
                cn:'-'
            }
        ]
    },{
        tag:'S',
        id:'collapse-panel-s',
        items:[
            {
                no:'28',
                en:'Supply Voltage',
                abbr:'ebbh',
                cn:'-'
            },
            {
                no:'29',
                en:'Sensitivity to Earth Magnetic Field',
                abbr:'SEMF',
                cn:'-'
            },
            {
                no:'30',
                en:'Stability',
                abbr:'Stab',
                cn:'-'
            }
        ]
    },{
        tag:'T',
        id:'collapse-panel-t',
        items:[
            {
                no:'31',
                en:'Transit time spread',
                abbr:'TTSN',
                cn:'-'
            },
            {
                no:'32',
                en:'TTS',
                abbr:'TTS',
                cn:'-'
            }
        ]
    },{
        tag:'W',
        id:'collapse-panel-w',
        items:[
            {
                no:'33',
                en:'Wavelength Sensitivity',
                abbr:'WS',
                cn:'-'
            }
        ]
    }
]

