//全局变量
var inx=0,      //当前菜单的索引值
	datas1=[],  //包含分类指标的数据
	datas2=[],
	op={},
	realHour=3;//实时查询的时间 表示几个小时前

//时间段毫秒数
var mm5minute=300000,
	mm10minute=600000,
	mm1hour=3600000;

//涉及到的查询元素
var $selCommonBox=$("#selectBox"),
	$selStyleBox=$("#selTypeBox"),
	$itemBox=$(".itembox"),
	$selCommon=$("#selectInput"), //公用下拉框
	$selStyle=$("#selTypeInput"), //样式下拉框
	$item=$("#item");             //指标下拉框

//获取公用下拉框的数据
var appSelData=getQueryData(rootPath+"/app/Select.html",{});
var marketSelData=getQueryData(rootPath+"/market/Select.html",{});
var advertSelData=getQueryData(rootPath+"/advert/Select.html",{});

//初始绑定控件
$selCommon.jSelect({
	  data:[],
	  datakey:["id","username"],
});
$selStyle.jSelect({
	  data:adstyle,
	  datakey:["value","text"],
});
$item.jSelect({
	  data:[],
	  multiple:false,
	  right:0
});

//页面初始化
clickMenu("#disAll");

//近3小时，近6小时，12小时
$("#hour3").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	realHour=3;
});
$("#hour6").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	realHour=6;
});
$("#hour12").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	realHour=12;
});
$("#today").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	realHour=0;
});

function setPercent(target,val){
	$(target).html(val);
	if(val<0){
		$(target).css("color","green");
	}else{
		$(target).css("color","red");
	}
}
//整体数据对比部分
//获取数据并格式化数据 
	var nowRealDate1=getRealTime(1,0).startDate,
		nowRealDate2=getRealTime(2,0).startDate,
		nowRealData1=getDateData(nowRealDate2,nowRealDate1),
		nowRealData2= nowRealData1&&nowRealData1.rows?nowRealData1.rows:[],
		nowRealData=[
		   {activeusercount:0,requestcount:0,showcount:0,activeshow:0 },
		   {activeusercount:0,requestcount:0,showcount:0,activeshow:0 }
		];
	var nowAllDate=getRealTime(0,0).startDate;
	var nowAllData1=getDateData(nowAllDate,nowRealDate1);
	var nowAllData2=nowAllData1&&nowAllData1.rows&&nowAllData1.rows.length>0?nowAllData1.rows
		:[
			{activeusercount:0,requestcount:0,showcount:0,activeshow:0 }
	    ];
	
	
for(i in nowRealData2){
	var data0=nowRealData2[i];
	if(data0.datetime==nowRealDate2){
		nowRealData[0]=data0;
	}else if(data0.datetime==nowRealDate1){
		nowRealData[1]=data0;
	}
}

function sumAllData(){
	var activeusercount=0,requestcount=0,showcount=0,activeshow=0;
	
	for(i in nowAllData2){
		var k=nowAllData2[i];
		activeusercount+=nowAllData2[i].activeusercount;
		requestcount+=nowAllData2[i].requestcount;
		showcount+=nowAllData2[i].showcount;
	}
	return {
			activeusercount:activeusercount,
			requestcount:requestcount,
			showcount:showcount,
			activeshow:showcount/activeusercount
	};
	
}
var nowAllData=sumAllData();

for(i in nowAllData2){
	var k=nowAllData2[i];
	
}
$("#nowTime").html(formatNumDate(nowRealDate1));

//活跃用户数
$('#activeusercount').html(nowAllData.activeusercount);
var activeUserAdd=nowRealData[1].activeusercount*1;
setPercent("#auAdd",activeUserAdd);
//请求数
$("#requestcount").html(nowAllData.requestcount);
var reqAdd=nowRealData[1].requestcount*1;
setPercent("#reqAdd",reqAdd);
//展示数
$("#showcount").html(nowAllData.showcount);
var shAdd=nowRealData[1].showcount*1;
setPercent("#shAdd",shAdd);
//平均活跃展示
$("#activeshow").html(formatNum(nowAllData.activeshow));

var atsAdd=formatNum(nowRealData[1].activeshow);
setPercent("#atsAdd",atsAdd);

//点击事件
//总体
$("#disAll").click(function(){
	inx=0;
	clickMenu(this);
});	
//分应用
$("#disApp").click(function(){
	inx=1;
	clickMenu(this);
});
//分市场
$("#disMarket").click(function(){
	inx=2;
	clickMenu(this);
});
//分广告
$("#disAd").click(function(){
	inx=3;
	clickMenu(this);
});	
//分样式
$("#disType").click(function(){
	inx=4;
	clickMenu(this);
});
//点击切换是否按时间对比
$("#bytime").click(function(){
	isTime=!isTime;
	toggleQueryOption();
	disData();
	addmenuclk();
});


function getRealTime(n,day){
	var startDate =moment().subtract(day, 'days').subtract(n, 'hours').startOf("hours").format("YYYYMMDDHH"); 
	var endDate = moment().subtract(day, 'days').subtract(1, 'hours').startOf("hours").format("YYYYMMDDHH"); 
	if(n==0){ //表示整天
		startDate =moment().subtract(day, 'days').startOf("days").format("YYYYMMDDHH"); 
		endDate = moment().subtract(day-1, 'days').startOf("days").subtract(1, 'hours').format("YYYYMMDDHH");
	}
	console.log(startDate,endDate)
	return{
		startDate:startDate,
		endDate:endDate
	}
}


function addmenuclk(){
	$item.jSelect("addMenuClick",function(){
		var it=$item.jSelect("val");
		if(it){
			 op.series[0].data=datas1[it];
			 op.series[1].data=datas2[it];
		}
		Highcharts.chart('container',op);
	});
}

function query(){
	disData();
	addmenuclk();
}

//返回查询数据
function getQueryData(url,prm){
	var mydata=null;
	$.ajax({
			url:url,
			method: 'post', 
			async:false,
			data:prm,
	        dataType: "json",
	        success : function(data){
	        	mydata=data;
	        }
        	  
	});
	return mydata;
}
//返回start和end日期之间的分钟数据
function getDateData(start,end){
	var prm={'startdate':start,'enddate':end};
	return getQueryData(menuArr[0]["urlHour"],prm);
}

//求和日期相等的数据并分类返回
function sameDateDataSum(data,mkeys){
	var count={},sum={},deData=[],ddData=[],
		_specialKey=[], //当前数据中的特殊key
		keys=[];//非特殊key
	
	if(!data.rows){return;}
	
	for(i in data.rows){
		var ss=data.rows[i];
		deData.push(ss);
		ddData.push(ss);
	}
	deData=deData.reverse();
	ddData=ddData.reverse();
	var len=ddData.length;
	
	for( i in mkeys){
		var key=mkeys[i];
		count[key]=[];
		var isSpkey=false;
		for(k in specialKey){
			if(key==specialKey[k]){
				isSpkey=true;
				_specialKey.push(key);
			}
		}
		if(!isSpkey){
			keys.push(key);
			if(len>0){
				if(key=="datetime"){
					sum[key]=formatNumDate(deData[0][key]);
				}else{
					sum[key]=deData[0][key];
				}
			};
		}
	}
	if(len==0) return count;
		
	var lastGap=0,
		gapTime=mm1hour;
	
	for(var y=0;y<len-1;y++){
		var edate1=exchangeDate(ddData[y].datetime);
		var edate2=exchangeDate(ddData[y+1].datetime);
		var gap=parseInt((edate2-edate1)/gapTime); //前后数据间隔
		if(gap>=2){
			for(var g=0;g<(gap-1);g++){
				var addDatee=new Date(edate2*1-(g+1)*gapTime);
				var addDate=addDatee.getFullYear()+""+addZero((addDatee.getMonth()+1))+""+addZero(addDatee.getDate())
				    +""+addZero(addDatee.getHours());
				deData.splice(y+1+lastGap,0,{
						activeshow:0,
						activeusercount:0,adstyle:null,adtype:null,advertid:null,advertiserid:null,advertisername:null,
						advertname:null,appid:null,appkey:null,appmsg:null,appname:null,
						areaname:null,
						clickcount:0,
						clickrate:0,
						closecount:0,
						datetime:addDate,
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
				});
				
			}
			lastGap+=(gap-1);
		}
		
	}
	len=deData.length;
	
	console.log(deData);
	
	var temp=deData[0].datetime;
	for( var i = 0; i < len; i++){
		var dar = (i+1)<len ? deData[i+1]:null; //下一条数据
		if(dar!=null&&dar.datetime==temp){
			for(var k in keys){
				var key=keys[k];
				if(key!="datetime"){
					sum[key]+=dar[key]*1;
				}
				if(i==len-1){
					count[key].push(sum[key]);
				}
			}	
		
		}else{
			for(var k in keys){
				var key=keys[k];
				count[key].push(sum[key]);
				if(i+1<len){
					if(key=="datetime"){
						sum[key]=formatNumDate(deData[i+1][key]);
					}else{
						sum[key]=deData[i+1][key];
					}
				}
			}
			if(i+1<len){temp=deData[i+1].datetime;}
		}
	}
	
	var keyc,income=count.income,
		showcount= count.showcount&&count.showcount.length>0?count.showcount:[],
		sendcount=count.sendcount&&count.sendcount.length>0?count.sendcount:[],
		activeusercount=count.activeusercount&&count.activeusercount.length>0?count.activeusercount:[],
		requestcount=count.requestcount&&count.requestcount.length>0?count.requestcount:[],
		clickcount=count.clickcount&&count.clickcount.length>0?count.clickcount:[];
	function setCalculate(fenzi,fenmu,r){
		for(var i = 0;i<fenmu.length;i++){
			if(fenmu[i]!=0){
				count[keyc].push(formatNum(fenzi[i]/fenmu[i]*r)*1);
			}else{
				count[keyc].push(0);
			}
		}
	}			
				
	for(k in _specialKey){
		keyc=_specialKey[k];
		if(keyc=="ecpq"){
			setCalculate(income,activeusercount,1000);
		}
		if(keyc=="ecpm"){
			setCalculate(income,showcount,1000);
		}
		if(keyc=="activeshow"){ //平均活跃展示
			setCalculate(showcount,activeusercount,1);
		}
		if(keyc=="avg_aq"){ //平均活跃请求
			setCalculate(requestcount,activeusercount,1);
		}
		if(keyc=="fillrate"){ //填充率
			setCalculate(sendcount,requestcount,100);
		}
		if(keyc=="displayrate"){//展示率
			setCalculate(showcount,sendcount,100);
		}
		if(keyc=="clickrate"){//点击率
			setCalculate(clickcount,showcount,100);
		}
	}
	console.log(count);
	
	return count;
}
//获取相应指标的id值
function getKeys(items){
	var keys=[];
	for(i in items){
		var id=items[i].id;
		keys.push(id);
	}
	return keys;
}

/*
展示图表
option{
	data1:数据一  带rows项的object,
	data2:数据二 有数据二则表示对比,
	title:图表标题,
}
*/

function disChart(option){
	inxs=[0];
	var adstyle=$("#selTypeInput").jSelect("val");
	var items= adstyle!=""&&(inx==1||inx==2) ? menuArr[inx].items2:menuArr[inx].items1,
		keys=getKeys(items);
	keys.push("datetime");
	
	datas1=sameDateDataSum(option.data1,keys),len1=option.data1.rows.length;
	datas2=sameDateDataSum(option.data2,keys),len2=option.data2.rows.length;
	
	var item=$item.jSelect("initdata",items).jSelect("val",items[0].id).selectVal();
	var datetime= datas1.datetime.length>datas2.datetime.length ? datas1.datetime : datas2.datetime;

		op=$.extend({},cop,{
			   title: {text:option.title},
			   xAxis: {categories :datetime},
			   series:[
			        { name:"今日",
					 data: datas1[item],
					 visible: true,
					
				     },
			        { name:"昨日",
					 data: datas2[item],
					 visible: true,
						   
			    }],
			    yAxis: [
			       	 {title: {text:null,},lineWidth: 1},
			       	 {options:false}		       	
			       ]
		   });
		
			Highcharts.chart('container',op);
		 
	

}
//切换查询框菜单状态
function toggleQueryOption(){	
	$selCommonBox.hide();
	$selStyleBox.hide();
	
	if(inx!=0 && inx!=4){
		$selCommonBox.show();
		$selStyleBox.show();
	}else if(inx==4){
		$selStyleBox.show();
	}
	
	//重置下拉框 
	$selCommon.jSelect("val",[""]); 
	$selStyle.jSelect("val",[""]); 
	if(inx==1){
		$("#typeTitle").html("应用");
		$selCommon.jSelect("initdata",appSelData,["id","name"]);
	}
	else if(inx==2){
		$("#typeTitle").html("市场");
		$selCommon.jSelect("initdata",marketSelData,["id","name"]);
	}
	else if(inx==3){
		$("#typeTitle").html("广告");
		$selCommon.jSelect("initdata",advertSelData,["id","name"]);
	}
	var adstyle=$("#selTypeInput").jSelect("val");
	
	
	$("#hour3").click();
}

//展示数据
function disData(){
	var url=menuArr[inx].urlHour;
	var common=$("#selectInput").jSelect("val");
	var adstyle=$("#selTypeInput").jSelect("val");

	var menu=menuArr[inx].menu;
	var data={rows:[]};
	var col=[];
	
	if(inx==0){col=colAll;}
	else if(inx==4){col=colAdstyle;}
	
	if(adstyle==""){

		if(inx==1){col=colApp1;}
		else if(inx==2){col=colMarket1;}
		else if(inx==3){col=colAdvert1;}
		
	}else{
		if(inx==1){col=colApp2;}
		else if(inx==2){col=colMarket2;}
		else if(inx==3){col=colAdvert2;}
	}
	
	var date1=getRealTime(realHour,0); //今日时间
	var date2=getRealTime(realHour,1); //昨日时间
	console.log(date1,date2);

    var startdate1=date1.startDate;
    var enddate1=date1.endDate;
    var startdate2=date2.startDate;
    var enddate2=date2.endDate;
  
    var prm1={
			"startdate": startdate1,
		    "enddate":enddate1,
		    "common":common,
		    "adstyle":adstyle
	};
    var prm2={
			"startdate": startdate2,
		    "enddate":enddate2,
		    "common":common,
		    "adstyle":adstyle
	};
	    
    var qdata1=getQueryData(url,prm1),
    	qdata2=getQueryData(url,prm2),
    	data1= qdata1 ? qdata1 :{rows:[]},
    	data2= qdata2 ? qdata2 :{rows:[]};
	  
	console.log("今日",qdata1);
	console.log("昨日",qdata2);
		if(data1.code==12||data2.code==12)
		{
			data.code=12;
		}else if (data1.d || data2.d){
			data.d=data1.d.contact(data2.d);
		
		} else {
			data.rows=data1.rows.concat(data2.rows);
			function addDate(adddate){
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
			var len1=data1.rows.length;
			if(len1>0){
				if(data1.rows[0].datetime!=enddate1){
					data1.rows.splice(0,0,addDate(enddate1));
				}
				if(data1.rows[len1-1].datetime!=startdate1){
					data1.rows.push(addDate(startdate1));
				}
			}
			
			var len2=data2.rows.length;
			if(len2>0){
				if(data2.rows[0].datetime!=enddate2){
					data2.rows.splice(0,0,addDate(enddate2));
				}
				if(data2.rows[len2-1].datetime!=startdate2){
					data2.rows.push(addDate(startdate2));
				}
			}
			
			
			disChart({
			   	data1:data1,
			   	data2:data2,
				title:menu+"实时数据对比"
			});	
		}
	
	
	$('.bootstrap-table').remove();
	$("#tablebox").append("<table id='table'></table>");

	var wh=window.innerHeight>0? window.innerHeight:window.screen.height;
	var dl=data.rows.length;
	var h=(dl*37+90)<wh ? (dl*37+90):(wh-100);

	$('#table').bootstrapTable({   
		data:data.rows,
        dataType: "json",
		height:h,
		striped:true,//出现斑马线
	    checkboxHeader:false,
	    singleSelect:true,
	    showFooter: true,
	    pagination:false,
	    columns:col
	});
}

function clickMenu(th){
	$(th).addClass("on").siblings().removeClass("on");
	
	toggleQueryOption();
	disData();	
	addmenuclk();
}




