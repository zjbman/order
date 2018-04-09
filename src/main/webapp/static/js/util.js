var yesOrno = [{ "value": true, "text": "是" },{ "value": false, "text": "否" }];//是否下拉框
var feetype = [{ "value": 1, "text": "CPA" },{ "value": 2, "text": "CPS" },{ "value": 3, "text": "CPD" },{ "value": 4, "text": "CPC" },{ "value": 5, "text": "CPM" },{ "value": 6, "text": "CPT" }];//广告合作类型
var advertisertype = [{ "value": 1, "text": "竞价平台" },{ "value": 2, "text": "一般网盟" },{ "value": 3, "text": "自主投放" }];//广告主类型
var balancedate = [{ "value": 1, "text": "周结" },{ "value": 2, "text": "双周结" },{ "value": 3, "text": "月结" },{ "value": 4, "text": "其他" }];//结算周期
var adstyle = [{ "value": 1, "text": "插屏" },{ "value": 2, "text": "banner" },{ "value": 3, "text": "全屏" },{ "value": 4, "text": "开屏" }
    ,{ "value": 5, "text": "视频" } ,{ "value": 6, "text": "开屏视频" },{ "value": 7, "text": "动画中心视频" },{ "value": 8, "text": "游戏墙" },{ "value": 9, "text": "做梦视频" }
    ,{ "value": 11, "text": "拉起广告" },{ "value": 12, "text": "原生广告" }];//广告样式
var adtype = [{ "value": 1, "text": "下载" },{ "value": 2, "text": "跳转" }];//广告主类型
var operationpattern = [{ "value": 1, "text": "正式" },{ "value": 2, "text": "测试" }];//运营模式
var apptype = [{ "value": 1, "text": "会说话系列" },{ "value": 2, "text": "休闲跑酷" },{ "value": 3, "text": "休闲射击" },{ "value": 4, "text": "儿童益智" },{ "value": 5, "text": "其他" }];//运营模式
//var adstate=[{ "value": 1, "text": "停止投放" },{ "value": 2, "text": "投放中" },{ "value": 3, "text": "排期中" },{ "value": 4, "text": "待投放" }];//广告状态
var onlinetype=[{ "value": 1, "text": "未上线" },{ "value": 2, "text": "已上线" },{ "value": 3, "text": "停止" }];//市场包上线状态
var apponlinetype=[{ "value": 1, "text": "未上线" },{ "value": 2, "text": "已上线" }];//应用上线状态
var adstate=[{ "value": false, "text": "停止投放" },{ "value": true, "text": "继续投放" }];//广告状态
var adswitch=[{ "value": false, "text": "关" },{ "value": true, "text": "开" }];

var adpayment=[{ "value": "1", "text": "channelPay" },{ "value": "0", "text": "miguPay" }];

var sdkUpdateType=[{ "value": "1", "text": "猫的SDK" },{ "value": "2", "text": "外放的SDK" }
					,{ "value": "3", "text": "统计sdk" },{ "value": "4", "text": "其他" }];

var relatedAction=[{"value": 1, "text": "切量"},{"value": 2, "text": "开投"},{"value": 3, "text": "停投"},{"value": 4, "text": "排名"},{"value": 5, "text": "渠道广告"}];//关联行为
var frequency= [{"value":5,"text":"5分钟"},{"value":10,"text":"10分钟"},{"value":20,"text":"20分钟"},{"value":30,"text":"30分钟"},{"value":60,"text":"60分钟"}];//监控频率
var timeselect=[{ "value": "00", "text": "00" },
                { "value": "01", "text": "01" },
                { "value": "02", "text": "02" },
                { "value": "03", "text": "03" },
                { "value": "04", "text": "04" },
                { "value": "05", "text": "05" },
                { "value": "06", "text": "06" },
                { "value": "07", "text": "07" },
                { "value": "08", "text": "08" },
                { "value": "09", "text": "09" },
                { "value": "10", "text": "10" },
                { "value": "11", "text": "11" },
                { "value": "12", "text": "12" },
                { "value": "13", "text": "13" },
                { "value": "14,", "text": "14" },
                { "value": "15,", "text": "15" },
                { "value": "16,", "text": "16" },
                { "value": "17", "text": "17" },
                { "value": "18", "text": "18" },
                { "value": "19", "text": "19" },
                { "value": "20", "text": "20" },
                { "value": "21", "text": "21" },
                { "value": "22", "text": "22" },
                { "value": "23", "text": "23" },];


var province=[{ "value":"北京", "text": "北京" },
    { "value": "天津", "text": "天津" },
    { "value": "上海", "text": "上海" },
    { "value": "重庆", "text": "重庆" },
    { "value": "河北", "text": "河北" },
    { "value": "山西", "text": "山西" },
    { "value": "辽宁", "text": "辽宁" },
    { "value": "吉林", "text": "吉林" },
    { "value": "黑龙江", "text": "黑龙江" },
    { "value": "江苏", "text": "江苏" },
    { "value": "浙江", "text": "浙江" },
    { "value": "安徽", "text": "安徽" },
    { "value": "福建", "text": "福建"},
    { "value": "江西", "text": "江西" },
    { "value": "山东", "text": "山东" },
    { "value": "河南", "text": "河南" },
    { "value": "湖北", "text": "湖北" },
    { "value": "湖南", "text": "湖南" },
    { "value": "广东", "text": "广东" },
    { "value": "海南", "text": "海南" },
    { "value": "四川", "text": "四川" },
    { "value": "贵州", "text": "贵州" },
    { "value": "云南", "text": "云南" },
    { "value": "陕西", "text": "陕西" },
    { "value": "甘肃", "text": "甘肃" },
    { "value": "青海", "text": "青海" },
    { "value": "内蒙古", "text": "内蒙古" },
    { "value": "广西", "text": "广西" },
    { "value": "西藏", "text": "西藏" },
    { "value": "宁夏", "text": "宁夏" },
    { "value": "新疆", "text": "新疆" },
    { "value": "澳门", "text": "澳门" },
    { "value": "台湾", "text": "台湾" },
    { "value": "香港", "text": "香港" }];





