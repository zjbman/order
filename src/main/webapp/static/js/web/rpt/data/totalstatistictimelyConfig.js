//配置项
var menuArr=[
       {
    	   "menu":"总体",
    	   "inx":0,
    	   //"urlMinute":rootPath+'/rpt/m_data/m_totalstatistic/TotalList.html',
    	   "urlHour":rootPath+'/rpt/h_data/h_totalstatistic/TotalList.html',
    	   "items1":[
	            {"id":"activeusercount","text":"活跃数"}, 
	            {"id":"requestcount","text":"请求数"},
	            {"id":"sendcount","text":"发送数"},
	            {"id":"showcount","text":"展示数"},
	            {"id":"clickcount","text":"点击数"},
	            {"id":"avg_aq","text":"平均活跃请求"},
	            {"id":"activeshow","text":"平均活跃展示"}
	        ]
       	},
       	{
    		"menu":"分应用",
    		"inx":1,
		    //"urlMinute":rootPath+'/rpt/m_data/m_appstatistic/AppList.html',
    	    "urlHour":rootPath+"/rpt/h_data/h_appstatistic/AppList.html",
    		"items1":[
    		         {"id":"activeusercount","text":"活跃数"},  
    		         {"id":"requestcount","text":"请求数"},
    		         {"id":"sendcount","text":"发送数"},
    		         {"id":"showcount","text":"展示数"},
    		         {"id":"clickcount","text":"点击数"},
    		         {"id":"avg_aq","text":"平均活跃请求"},
    		         {"id":"activeshow","text":"平均活跃展示"}
    		 ],
    		 "items2":[
      		         {"id":"requestcount","text":"请求数"},
      		         {"id":"sendcount","text":"发送数"},
      		         {"id":"showcount","text":"展示数"},
      		         {"id":"clickcount","text":"点击数"},
	      		     {"id":"fillrate","text":"填充率"},
	   				 {"id":"displayrate","text":"展示率"},      
	   				 {"id":"clickrate","text":"点击率"} 
      		        
      		 ],
    	},
    	{
    		"menu":"分市场",
    		"inx":2,
    		//"urlMinute":rootPath+'/rpt/m_data/m_marketstatistic/MarketList.html',
    	    "urlHour":rootPath+"/rpt/h_data/h_marketstatistic/MarketDetailList.html",
    		"items1":[
    		     	{"id":"activeusercount","text":"活跃数"},  
    		    	{"id":"requestcount","text":"请求数"},
    		    	{"id":"showcount","text":"展示数"},
    		    	{"id":"income","text":"收入"},
    		    	{"id":"ecpq","text":"ecpa"},
    		    	{"id":"fillrate","text":"填充率"},
			    	{"id":"avg_aq","text":"平均活跃请求"},
			        {"id":"activeshow","text":"平均活跃展示"}
    		],
    		"items2":[
    		        {"id":"requestcount","text":"请求数"},
    		        {"id":"sendcount","text":"发送数"},
    		        {"id":"showcount","text":"展示数"},
    		        {"id":"clickcount","text":"点击数"},
    		        {"id":"fillrate","text":"填充率"},
    		        {"id":"displayrate","text":"展示率"},      
    		        {"id":"clickrate","text":"点击率"} 
      		]
    	},
     	{
    		"menu":"分广告",
    		"inx":3,
    		//"urlMinute":rootPath+'/rpt/m_data/m_advertstatistic/AdvertList.html',
    	    "urlHour":rootPath+"/rpt/h_data/h_advertstatistic/AdvertList.html",
    		"items1":[
				{"id":"requestcount","text":"请求数"},
				{"id":"sendcount","text":"发送数"},
				{"id":"showcount","text":"展示数"},
				{"id":"clickcount","text":"点击数"},
				{"id":"fillrate","text":"填充率"},
				{"id":"displayrate","text":"展示率"},      
				{"id":"clickrate","text":"点击率"} 
    		 ]
    	},
    	{
    		"menu":"分样式",
    		"inx":4,
    		//"urlMinute":rootPath+'/rpt/m_data/m_appstatistic/AdstyleDetailList.html',
    	    "urlHour":rootPath+"/rpt/h_data/h_appstatistic/AdstyleDetailList.html",
    	    "items1":[
				{"id":"requestcount","text":"请求数"},
				{"id":"sendcount","text":"发送数"},
				{"id":"showcount","text":"展示数"},
				{"id":"clickcount","text":"点击数"},
				{"id":"fillrate","text":"填充率"},
				{"id":"displayrate","text":"展示率"},      
				{"id":"clickrate","text":"点击率"} 
    		 ]
    		
    	}
];

//非累加 需要特殊计算的key值
var specialKey=["ecpq","ecpm","displayrate","activeshow","avg_aq","fillrate","clickrate"];

var inxs=[0];
//图标公用默认配置项
var cop= {
		chart:{
		  zoomType: 'x' //变焦类型
		    },
	ignoreHiddenSeries:true,
	yAxis: {title: {text: ''}},
	credits: {enabled: false},//不显示LOGO 
    legend: {
    	itemStyle : {'fontSize' : '13px'},
        layout: 'horizontal',
        align: 'center',
        verticalAlign: "bottom",
        cursor: 'pointer'
    },
    tooltip: {
        shared: true,
        crosshairs: [{
            width: 1,
            color: '#63B8FF'
        }]
    },
    plotOptions: {
    	line:{
          //  dataLabels: {enabled: true}, // 开启数据标签
            enableMouseTracking: true
        },// 关闭鼠标跟踪，对应的提示框、点击事件会失效
        series: {
        	events: {
        		legendItemClick: function(e) {
        			var index = this.index;
		            var series = this.chart.series;//图表的数据
		            console.log(series[index])
		            
		            if(series[index].visible==false){
		                inxs.push(index);
	                	if(inxs.length>=3){
	                     	var i0=inxs[0];
	                     	series[i0].hide();
	                     	inxs.splice(0,1);
	                     }
	                }else{
	                	for(i in inxs){
	                		if(inxs[i]==index){
	                			inxs.splice(i,1);
	                			break;
	                		}
	                	}
	                }
		           // console.log("inxs",inxs)
		            if(inxs.length>=2){
		            	var mininx=inxs[0],maxinx=inxs[1];	
		            	if( maxinx< mininx){
		            		mininx=inxs[1];
		            		maxinx=inxs[0];
		            	}
		            	console.log(mininx,maxinx)
		            	}
		            }
            	}
            }
    },
    yAxis: [
    	 {title: {text:null,},lineWidth: 1},
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0}, 
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0},
    	 {title: {text:null,},lineWidth: 0}
    ],

};

//整体表格
var colAll=[
	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'activeusercount',title:'活跃数',sortable:true,footerFormatter: sumformat},
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'avg_aq',title:'平均活跃请求',sortable:true,formatter:formatNum},
    {field:'activeshow',title:'平均活跃展示',sortable:true,formatter:formatNum}
];

//应用表格
var colApp1=[
	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'appname',title:'应用',sortable:true,},
	{field:'activeusercount',title:'活跃数',sortable:true,footerFormatter: sumformat},
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'avg_aq',title:'平均活跃请求',sortable:true,formatter:formatNum},
    {field:'activeshow',title:'平均活跃展示',sortable:true,formatter:formatNum}
    	];
var	colApp2=[
	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'appname',title:'应用',sortable:true,},
    {field:'adstyle',title:'广告样式',sortable:true,
    	formatter: function(value,row,index){
	        if(value==1){ return "插屏"; }
	        if(value==2){ return "banner";}
	        if(value==3){ return "全屏";}
	        if(value==4){ return "开屏";}
	        if(value==5){ return "视频";}
	     	if(value==6){ return "开屏视频";} 
		   	if(value==7){ return "动画中心视频";} 
		   	if(value==8){ return "游戏墙";} 
		   	if(value==9){ return "做梦视频";}}
    },
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},    
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'displayrate',title:'展示率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}}
];

//市场表格
var colMarket1=[
   	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'marketname',title:'市场',sortable:true,},
	{field:'activeusercount',title:'活跃数',sortable:true,footerFormatter: sumformat},
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'avg_aq',title:'平均活跃请求',sortable:true,formatter:formatNum},
    {field:'activeshow',title:'平均活跃展示',sortable:true,formatter:formatNum}
    	];
var colMarket2=[
   	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'marketname',title:'市场',sortable:true,},
	{field:'adstyle',title:'广告样式',sortable:true,
    	formatter: function(value,row,index){
	        if(value==1){ return "插屏"; }
	        if(value==2){ return "banner";}
	        if(value==3){ return "全屏";}
	        if(value==4){ return "开屏";}
	        if(value==5){ return "视频";}
	     	if(value==6){ return "开屏视频";} 
		   	if(value==7){ return "动画中心视频";} 
		   	if(value==8){ return "游戏墙";} 
		   	if(value==9){ return "做梦视频";}}
    },
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'displayrate',title:'展示率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}}
];

//广告报表
var colAdvert1=[
  	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'advertname',title:'广告',sortable:true,},
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
    {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'displayrate',title:'展示率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}}];
var colAdvert2=[
  	{field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
	{field:'advertname',title:'广告',sortable:true,},
	{field:'adstyle',title:'广告样式',width:'5%',sortable:true,
    	formatter: function(value,row,index){
	        if(value==1){ return "插屏"; }
	        if(value==2){ return "banner";}
	        if(value==3){ return "全屏";}
	        if(value==4){ return "开屏";}
	        if(value==5){ return "视频";}
	     	if(value==6){ return "开屏视频";} 
		   	if(value==7){ return "动画中心视频";} 
		   	if(value==8){ return "游戏墙";} 
		   	if(value==9){ return "做梦视频";}}
    },
	{field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	{field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	{field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	{field:'clickcount',title:'点击数',sortable:true,footerFormatter:sumformat},
	{field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'displayrate',title:'展示率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}}
];

//样式
var colAdstyle=[
    {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'adstyle',title:'广告样式',width:'5%',sortable:true,
    	formatter: function(value,row,index){
	        if(value==1){ return "插屏"; }
	        if(value==2){ return "banner";}
	        if(value==3){ return "全屏";}
	        if(value==4){ return "开屏";}
	        if(value==5){ return "视频";}
	     	if(value==6){ return "开屏视频";} 
		   	if(value==7){ return "动画中心视频";} 
		   	if(value==8){ return "游戏墙";} 
		   	if(value==9){ return "做梦视频";}}
    },
    {field:'requestcount',title:'请求数',sortable:true,
     footerFormatter: function (rows){return sumformat(rows,'requestcount');}
    },
    {field:'sendcount',title:'发送数',sortable:true,
      footerFormatter: function (rows){return sumformat(rows,'sendcount');}
     },
     {field:'showcount',title:'展示数',sortable:true,
    	footerFormatter: function (rows) {return sumformat(rows,'showcount');
        }},
     {field:'clickcount',title:'点击数',sortable:true,footerFormatter: function (rows) {return sumformat(rows,'clickcount');
      }},
      {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
          return (value*100).toFixed(2)+"%";}},
      {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
          return (value*100).toFixed(2)+"%";}},
      {field:'displayrate',title:'展示率',sortable:true,formatter: function(value,row,index){
          return (value*100).toFixed(2)+"%";}}
];

//功能函数

//将yyyy-mm-dd hh:mm:ss格式的字符串时间转换为毫秒数
function stringToTime(date,gap1,gap2,gap3){
	var _gap1= gap1 ? gap1 : "-",
		_gap2= gap2 ? gap2 : " ",	
		_gap3= gap3 ? gap3 : ":",
	    dateArry=date.split(_gap2),
		ymd=dateArry[0],
		ymdArr=ymd.split(_gap1),
		hms= dateArry[1]? dateArry[1] : "0"+_gap3+"0"+_gap3+"0";
		hmsArr=hms.split(_gap3),
		len=hmsArr.length;
		if(len<3){
			for(var i=0;i<(3-len);i++){
				hmsArr[len+i]=0;
			}
			
		}
		var dateTime=new Date(ymdArr[0],ymdArr[1],ymdArr[2],hmsArr[0],hmsArr[1],hmsArr[2]).getTime();
	
	return dateTime;
}

//将yyyymmddhh转换为毫秒数
function exchangeDate(date){

	var dateTime=new Date(date.substring(0,4),date.substring(4,6)*1-1,date.substring(6,8),date.substring(8,10)).getTime();
	return dateTime;
}

//将yyyymmddhhmm转换为 hh:mm
function formatNumDate(date){
	date=date+"";
	if(date.length==10){date=date+"00";};
	var dateTime=date.substring(8,10)+":"+date.substring(10);
	return dateTime;
}


