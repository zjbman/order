//配置项
var menuArr=[
       {
    	   "menu":"总体",
    	   "inx":0,
    	   "url":rootPath+'/rpt/total/statistic/List.html',
    	   "items1":[
	            {"id":"activeusercount","text":"活跃数"},  
	            {"id":"showcount","text":"展示数"},
	            {"id":"income","text":"收入"},
	            {"id":"ecpq","text":"ecpa"},
	            {"id":"ecpm","text":"ecpm"},
	            {"id":"showactive","text":"平均活跃展示"}
	        ]
       	},
       	{
    		"menu":"分应用",
    		"inx":1,
    		"url":rootPath+'/rpt/total/statistic/ApptList.html',
    		"items1":[
    		         {"id":"activeusercount","text":"活跃数"},  
    		         {"id":"requestcount","text":"请求数"},
    		         {"id":"showcount","text":"展示数"},
    		         {"id":"income","text":"收入"},
    		         {"id":"ecpq","text":"ecpa"},
    		         {"id":"avg_aq","text":"平均活跃请求"},
    		         {"id":"showactive","text":"平均活跃展示"}
    		         
    		 ],
    		 "items2":[
    		         {"id":"income","text":"收入"},
      		         {"id":"requestcount","text":"请求数"},
      		         {"id":"sendcount","text":"发送数"},
      		         {"id":"showcount","text":"展示数"},
      		         {"id":"ecpm","text":"ecpm"},
      		         {"id":"fillrate","text":"填充率"},
      		         {"id":"activeshow","text":"展示率"}  
      		 ],
    	},
    	{
    		"menu":"分市场",
    		"inx":2,
    		"url":rootPath+'/rpt/total/statistic/MarketList.html',
    		"items1":[
    		     	{"id":"activeusercount","text":"活跃数"},  
    		    	{"id":"requestcount","text":"请求数"},
    		    	{"id":"showcount","text":"展示数"},
    		    	{"id":"income","text":"收入"},
    		    	{"id":"ecpq","text":"ecpa"},
			    	{"id":"avg_aq","text":"平均活跃请求"},
			        {"id":"showactive","text":"平均活跃展示"}
    		],
    		"items2":[
    		        {"id":"income","text":"收入"},
    		        {"id":"requestcount","text":"请求数"},
    		        {"id":"sendcount","text":"发送数"},
    		        {"id":"showcount","text":"展示数"},
    		        {"id":"ecpm","text":"ecpm"},
    		        {"id":"fillrate","text":"填充率"},
    		        {"id":"activeshow","text":"展示率"}  
      		],
    		
    	},
     	{
    		"menu":"分广告",
    		"inx":3,
    		"url":rootPath+'/rpt/total/statistic/AdvertList.html',
    		"items1":[
				{"id":"requestcount","text":"请求数"},
   		        {"id":"sendcount","text":"发送数"},
				{"id":"showcount","text":"展示数"},
				{"id":"income","text":"收入"},
				{"id":"ecpm","text":"ecpm"},
   		        {"id":"clickcount","text":"点击数"},
			    {"id":"fillrate","text":"填充率"},
    		    {"id":"activeshow","text":"展示率"},
    		    {"id":"clickrate","text":"点击率"}
    		 ],
    		 "items2":[
       		        {"id":"income","text":"收入"},
       		        {"id":"requestcount","text":"请求数"},
       		        {"id":"sendcount","text":"发送数"},
       		        {"id":"showcount","text":"展示数"},
       		        {"id":"clickcount","text":"点击数"},
       		        {"id":"fillrate","text":"填充率"},
       		        {"id":"activeshow","text":"展示率"},
       		        {"id":"clickrate","text":"点击率"}
         		],
    	},
    	{
    		"menu":"分样式",
    		"inx":4,
    		"url":rootPath+'/rpt/total/statistic/AdstyletList.html',
    		"items1":[
    		    {"id":"income","text":"收入"},
				{"id":"requestcount","text":"请求数"},
				{"id":"sendcount","text":"发送数"},
				{"id":"showcount","text":"展示数"},
				{"id":"clickcount","text":"点击数"},
				{"id":"ecpm","text":"ecpm"},	 
				{"id":"fillrate","text":"填充率"},
				{"id":"activeshow","text":"展示率"},
				{"id":"clickrate","text":"点击率"}  
		    ]
    		
    	}
];

//非累加 需要特殊计算的key值
var specialKey=["ecpq","ecpm","activeshow","showactive","avg_aq","fillrate","clickrate"];

var inxs=[0];
//图标公用默认配置项
var cop= {
		chart:{zoomType: 'x' },//变焦类型
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
	    //鼠标移到数据点事件
		tooltip: {
		    shared: true,
		    crosshairs: [{ width: 1,color: '#63B8FF'}],
	         formatter : function (){ // 提示框格式化字符串	    
	        	// console.log("日期aaaa"+datetimecon);
                 var s = '';
	     		 var indexes = datetimecon.indexOf(this.x); 
	     		 var date = "";
	     		 var temp = new Array();
	     		 if(indexes>=0){
	     		 if(datas1.datetime[indexes]==this.x){
	     			 date = datas2.datetime[indexes];
	     			if(typeof(date)!='undefined'){
	     				temp.push(date);
	     			 }
	     		 }
	     		 else{
	     			 date = datas1.datetime[indexes];
	     			 if(typeof(date)!='undefined'){
	     				temp.push(date);
	     			 }
	     		 }
	     		 temp.push(this.x);
                 var a  = 0;
                 if(temp.length>1){
                 $.each(this.points,function(){
                     s += '<br />' + this.series.name + '('+temp[a]+"):" + this.y;
                     a= a+1;
                 });
                 }
                 else{
                	 $.each(this.points,function(){
                	 s += '<br />' + this.series.name + '('+temp[0]+"):" + this.y;
                	  });
                 }
                 return s;
	     		 }
	     		 
	     		 $.each(this.points,function(){
	                s += '<br />' + this.series.name+":" + this.y;
	                 });
	     		 return s;
             },
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
		          // console.log(series[index])
		            
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
		            	//console.log(mininx,maxinx)
		            	//时间对比单y轴的时候 要把最小的放在最后，不然Y轴会跳到右边
		            	series[maxinx].yAxis.opposite=true;
		            	series[mininx].yAxis.opposite=false;		            	
		            }
		            
		            if(inxs.length==1){
		            	series[inxs[0]].yAxis.opposite=false;	
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
	{field:'activeusercount',title:'活跃用户',sortable:true,footerFormatter: sumformat},
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat}, 
    {field:'ecpm',title:'Ecpm',sortable:true,formatter:formatNum,
    	footerFormatter: function (rows) {
    		return formatNum(sumformat(rows,'income')/sumformat(rows,'showcount')*1000*1,true);}
    },
    {field:'ecpq',title:'ecpa',sortable:true,formatter:formatNum,
    	footerFormatter: function (rows) {
    		return formatNum(sumformat(rows,'income')/sumformat(rows,'activeusercount')*1000*1,true);}
    },
    {field:'activeshow',title:'平均活跃展示',sortable:true,formatter:formatNum,
    	footerFormatter: function (rows) {
    		return formatNum(sumformat(rows,'showcount')/sumformat(rows,'activeusercount')*1,true);
    	}
    }
];

//应用表格
var colApp1=[
    {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'appname',title:'应用',sortable:true,},
    {field:'activeusercount',title:'活跃数',sortable:true,footerFormatter:sumformat},
    {field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},   
    {field:'ecpq',title:'Ecpa',sortable:true,formatter:formatNum,footerFormatter:sumformat},
    {field:'avg_aq',title:'平均活跃请求',sortable:true,formatter:formatNum},
    {field:'showactive',title:'平均活跃展示',sortable:true,formatter:formatNum},
];
var colApp2=[
	 {field:'datetime',title:'日期',sortable:true,footerFormatter: function (rows) {return "总计";}},
	 {field:'appname',title:'应用',sortable:true,},
	 {field:'adstyle',title:'广告样式',sortable:true,formatter: function(value,row,index){
	     if(value==1){return "插屏";}
	     if(value==2){return "banner";}
	     if(value==3){return "全屏";}
	     if(value==4){return "开屏";}
	     if(value==5){return "视频";}
	  	 if(value==6){return "开屏视频";} 
	   	 if(value==7){return "动画中心视频";} 
	   	 if(value==8){return "游戏墙";} 
	   	 if(value==9)
		{
			return "做梦视频";
		  }
	     },
	     },
	 {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},
	 {field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
	 {field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
	 {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
	 {field:'ecpm',title:'Ecpm',sortable:true,formatter:formatNum,footerFormatter:sumformat},
	 {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
	        return (value*100).toFixed(2)+"%";}},
	 {field:'activeshow',title:'展示率',sortable:true,formatter: function(value,row,index){
	    return (value*100).toFixed(2)+"%";}}
	 ];

//市场表格
var colMarket1=[
    {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'marketname',title:'渠道',sortable:true},
    {field:'activeusercount',title:'活跃数',sortable:true,footerFormatter:sumformat},
    {field:'requestcount',title:'请求数',sortable:true,
    	footerFormatter:sumformat
    },
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},   
    {field:'ecpq',title:'Ecpa',sortable:true,formatter:formatNum,footerFormatter:sumformat},
 	{field:'avg_aq',title:'平均活跃请求',sortable:true,formatter:formatNum},
    {field:'showactive',title:'平均活跃展示',sortable:true,formatter:formatNum},
 ];
var colMarket2=[
    {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'marketname',title:'渠道',sortable:true},
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
    	footerFormatter:sumformat
    },
    {field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},   
    {field:'ecpm',title:'Ecpm',sortable:true,formatter:formatNum,footerFormatter:sumformat},
    {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}},
    {field:'activeshow',title:'展示率',sortable:true,formatter: function(value,row,index){
    return (value*100).toFixed(2)+"%";}}
 ];

//广告报表
var colAdvert1=[
     {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'advertname',title:'广告',sortable:true},
    {field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
    {field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'clickcount',title:'点击数',sortable:true,
    	footerFormatter: function (rows) {return sumformat(rows,'clickcount');}
    },
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},   
    {field:'ecpm',title:'Ecpm',sortable:true,formatter:formatNum,footerFormatter:sumformat},
	{field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
		return (value*100).toFixed(2)+"%";}},
    {field:'activeshow',title:'展示率',sortable:true,formatter: function(value,row,index){
    	return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
    	return (value*100).toFixed(2)+"%";}}
];
var colAdvert2=[
    {field:'datetime',title:'日期',sortable:true,formatter: function(value,row,index){{
    	 return formatStringdate(value);}
    },footerFormatter: function (rows) {return "总计";}},
    {field:'advertname',title:'广告',sortable:true},
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
    {field:'income',title:'收入',sortable:true,formatter:formatNum,footerFormatter:sumformat},   
    {field:'ecpm',title:'Ecpm',sortable:true,formatter:formatNum,footerFormatter:sumformat},
    {field:'requestcount',title:'请求数',sortable:true,footerFormatter:sumformat},
    {field:'sendcount',title:'发送数',sortable:true,footerFormatter:sumformat},
    {field:'showcount',title:'展示数',sortable:true,footerFormatter:sumformat},
    {field:'clickcount',title:'点击数',sortable:true,
    	footerFormatter: function (rows) {return sumformat(rows,'clickcount');}
    },
   {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
	    return (value*100).toFixed(2)+"%";}},
    {field:'activeshow',title:'展示率',sortable:true,formatter: function(value,row,index){
    	return (value*100).toFixed(2)+"%";}},
    {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
    	return (value*100).toFixed(2)+"%";}},
];
//样式表格
var colAdstyle=[
    {field:'datetime',title:'时间',sortable:true,footerFormatter: function (rows) {return "总计";}},
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
     {field:'income',title:'收入',sortable:true,formatter: function(value,row,index){
       return (value*1).toFixed(2);},footerFormatter: function (rows) {return sumformat(rows,'income');}
     },   
     {field:'ecpm',title:'Ecpm',sortable:true,formatter: function(value,row,index){
       return (value*1).toFixed(2);},footerFormatter: function (rows) {return sumformat(rows,'ecpm'); }},
     {field:'fillrate',title:'填充率',sortable:true,formatter: function(value,row,index){
    	 return (value*100).toFixed(2)+"%";}},
     {field:'activeshow',title:'展示率',sortable:true,formatter: function(value,row,index){
    	 return (value*100).toFixed(2)+"%";}},
     {field:'clickrate',title:'点击率',sortable:true,formatter: function(value,row,index){
        return (value*100).toFixed(2)+"%";}}
];

//功能函数
//返回日期框中的起始时间 yyyy/mm/dd-yyyy/mm/dd转为yyyymmdd
function getSelDate(ele,did){
	var _did=did?did:"";
	var date=$(ele).val().replace(/\s/g,"").split("-");
    var startdate=date[0].split("/").join(_did);
    var enddate=date[1].split("/").join(_did);
    return{
    	"start":startdate,
    	"end":enddate
    }
}
//将yyyymmdd转换为毫秒数
function exchangeDate(date){
	var dateTime=new Date(date.substring(0,4),date.substring(4,6)*1-1,date.substring(6,8)).getTime();
	return dateTime;
}
//yyyymmdd → mm-dd周几
function getWeek(date){
		var year=date.substring(0,4),
			month=date.substring(4,6),
			day=date.substring(6,8);
      var newdate = new Date(year,month-1,day);
     // console.log(newdate,newdate.getDay())
    return month+"-"+day+"周" + "日一二三四五六".charAt(newdate.getDay());
};

function cloneObj(obj) {  
	var newObj = {};  
		if (obj instanceof Array) {  
    	newObj = [];  
	}  
	for (var key in obj) {  
    	var val = obj[key];  
    	newObj[key] = typeof val === 'object' ? cloneObj(val) : val;  
	}  
	return newObj;  
}

//返回添加数据
function getAddData(adddate){
	return {
			activeshow:0,
			activeusercount:0,adstyle:null,adtype:null,advertid:null,advertiserid:null,advertisername:null,
			advertname:null,appid:null,appkey:null,appmsg:null,appname:null,
			areaname:null,
			clickcount:0,
			clickrate:0,
			closecount:0,
			datetime:adddate,
			ditchname:null,
			downloadbegincount:0,
			downloadendcount:0,
			ecpm:0,
			ecpq:0,
			fillrate:0,
			income:0,
			installcount:0,
			loadpageclick:0,
			marketname:null,
			requestcount:0,
			sdkversion:null,
			sendcount:0,
			showcount:0,
			toendcount:0,
			toplaycount:0,
			totalincome:0,
			vedioincome:0
		};
}

