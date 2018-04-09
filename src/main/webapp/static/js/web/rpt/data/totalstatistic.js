//全局变量
var inx=0,        //当前菜单的索引值
	isTime=false, //时间对比开关，初始关闭
	datas1=[], //包含分类指标的数据
	datas2=[],
	datetimecon=[],
	op={};
	
//涉及到的查询元素
var $selCommonBox=$("#selectBox"),
	$selStyleBox=$("#selTypeBox"),
	$itemBox=$(".itembox"),
	$dateBox=$("#singleDate"),
	$dateBox2=$("#dbDate"),
	$selCommon=$("#selectInput"), //公用下拉框
	$selStyle=$("#selTypeInput"), //样式下拉框
	$item=$("#item"),             //指标下拉框
	$date=$("#date"),             //单段时间选择框
	$date1=$("#date1"),           //双段时间选择框一
	$date2=$("#date2");           //双段时间选择框二

//获取公用下拉框的数据
var appSelData=getQueryData(rootPath+"/app/Select.html",{});
var marketSelData=getQueryData(rootPath+"/market/Select.html",{});
var advertSelData=getQueryData(rootPath+"/advert/Select.html",{});


//初始绑定控件
$selCommon.jSelect({
	  data:[],
	  datakey:["id","username"]
});
$selStyle.jSelect({
	  data:adstyle,
	  datakey:["value","text"]
});
$item.jSelect({
	  data:[],
	  multiple:false,
	  right:0
});
$date.daterangepicker({
	locale:{
        format:"YYYY/MM/DD"
    },
    startDate:moment().subtract(7, 'days'),
    endDate:moment().subtract(1, 'days'),
    showCustomRangeLabel:true,
    ranges: {
       '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
       '7日': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
       '14日': [moment().subtract(14, 'days'),moment().subtract(1, 'days')],
       '30日': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
    }
});
$date1.daterangepicker({
	locale:{
        format:"YYYY/MM/DD"
    },
    startDate:moment().subtract(2, 'days'),
    endDate:moment().subtract(2, 'days')
});
$date2.daterangepicker({
	locale:{
        format:"YYYY/MM/DD"
    },
    startDate:moment().subtract(1, 'days'),
    endDate:moment().subtract(1, 'days')
});

//页面初始化
clickMenu("#disAll");

//双段时间的 昨日同期、本周同期、本月同期 快捷选择功能
var $datapicker1=$("#date1").data('daterangepicker'),
	$datapicker2=$("#date2").data('daterangepicker');
$("#dayTerm").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	var day1=moment().subtract(2, 'days'),
		day2=moment().subtract(1, 'days');
	$datapicker1.setStartDate(day1);
	$datapicker1.setEndDate(day1);	
	$datapicker2.setStartDate(day2);
	$datapicker2.setEndDate(day2);	
});
$("#weekTerm").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$datapicker1.setStartDate(moment().subtract(1, 'week').startOf('week'));
	$datapicker1.setEndDate(moment().subtract(1, 'week').endOf('week'));
	$datapicker2.setStartDate(moment().startOf('week'));
	$datapicker2.setEndDate(moment().endOf('week'));	
});
$("#monthTerm").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
	$datapicker1.setStartDate(moment().subtract(1, 'month').startOf('month'));
	$datapicker1.setEndDate(moment().subtract(1, 'month').endOf('month'));
	$datapicker2.setStartDate(moment().startOf('month'));
	$datapicker2.setEndDate(moment().endOf('month'));	
});


function setPercent(target,val){
	$(target).html(val+"%");
	if(val<0){
		$(target).css("color","green");
	}else{
		$(target).css("color","red");
	}
}
//昨天展示
var startdate1 = moment().subtract(2, 'days').format("YYYYMMDD"); //前天
var enddate1 = moment().subtract(1, 'days').format("YYYYMMDD"); //昨天
console.log(startdate1,enddate1)
var data1=getDateData(startdate1,enddate1);
if(data1.rows.length!=0){
	$('#activeusercount').html(data1.rows[0].activeusercount);
	$('#showcount').html(data1.rows[0].showcount);
	$('#activeshow').html(formatNum(data1.rows[0].activeshow*1));
  		
	if(data1.rows[1]){
		var auR=formatNum((data1.rows[0].activeusercount-data1.rows[1].activeusercount)/data1.rows[1].activeusercount*100)*1;
		var scR=formatNum((data1.rows[0].showcount-data1.rows[1].showcount)/data1.rows[1].showcount*100)*1;
		var atR=formatNum((data1.rows[0].activeshow-data1.rows[1].activeshow)/data1.rows[1].activeshow*100)*1;
		
		setPercent('#auPercen',auR);
		setPercent('#scPercen',scR);
		setPercent('#atPercen',atR);
	}
}

//近7天总收入
var startdate2 =moment().subtract(7, 'days').format("YYYYMMDD"); 
var enddate2 = moment().subtract(1, 'days').format("YYYYMMDD"); 
var data2=getDateData(startdate2,enddate2);
console.log(startdate2,enddate2)
if(data2.rows.length!=0){
	var income=0;//收入
	for( var i = 0; i < data2.rows.length; i++){
		income +=data2.rows[i].income*1;
	}
	$('#totalincome').html(formatNum(income*1));
}

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

function addmenuclk(){
	if(isTime){
		$item.jSelect("addMenuClick",function(){
			var it=$item.jSelect("val");
			if(it){
				 op.series[0].data=datas1[it];
				 op.series[1].data=datas2[it];
			}
			Highcharts.chart('container',op);
		});
	}
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
//返回start和end日期之间的数据
function getDateData(start,end){
	var prm={'startdate':start,'enddate':end};
	return getQueryData(rootPath+'/rpt/total/statistic/List.html',prm);
}

//求和日期相等的数据并分类返回
function sameDateDataSum(data,mkeys){
	var count={},sum={},
		_specialKey=[], //当前数据中的特殊key
		keys=[],  //非特殊key
		deData=cloneObj(data.rows).reverse(),
		ddData=cloneObj(data.rows).reverse();
		
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
					sum[key]=getWeek(deData[0][key]);
				}else{
					sum[key]=deData[0][key];
				}
			};
		}
	}
	if(len==0) return count;
	
	var oneDay=24*3600*1000;
	var lastGap=0;
	for(var y=0;y<len-1;y++){
		var edate1=exchangeDate(ddData[y].datetime);
		var edate2=exchangeDate(ddData[y+1].datetime);
		var gap=parseInt((edate2-edate1)/oneDay); //前后数据间隔天数
		if(gap>=2){
			for(var g=0;g<(gap-1);g++){
				var addDatee=new Date(edate2*1-(g+1)*oneDay);
				var addDate=addDatee.getFullYear()+""+addZero((addDatee.getMonth()+1))+""+addZero(addDatee.getDate());
				deData.splice(y+1+lastGap,0,getAddData(addDate));
			}
			lastGap+=(gap-1);
		}
		
	}
	len=deData.length;
	
	//console.log(deData);
	
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
					var add= key=="datetime"? sum[key]: formatNum(sum[key])*1;
					count[key].push(add);
				}
			}	
		
		}else{
			for(var k in keys){
				var key=keys[k];
				var add= key=="datetime"? sum[key]: formatNum(sum[key])*1;
				count[key].push(add);
				if(i+1<len){
					if(key=="datetime"){
						sum[key]=getWeek(deData[i+1][key]);
					}else{
						sum[key]=deData[i+1][key];
					}
				}
			}
			if(i+1<len){temp=deData[i+1].datetime;}
		}
	}
	
	var keyc,income=count.income&&count.income.length>0?count.income:[],
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
		if(keyc=="showactive"){ //平均活跃展示
			setCalculate(showcount,activeusercount,1);
		}
		if(keyc=="avg_aq"){ //平均活跃请求
			setCalculate(requestcount,activeusercount,1);
		}
		if(keyc=="fillrate"){ //填充率
			setCalculate(sendcount,requestcount,100);
		}
		if(keyc=="activeshow"){//展示率
			setCalculate(showcount,sendcount,100);
		}
		if(keyc=="clickrate"){//点击率
			setCalculate(clickcount,showcount,100);
		}
	}
	console.log("指标数据",count)
	
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
	
	var items= adstyle!=""&&inx!=0&&inx!=4&&isTime ? menuArr[inx].items2:menuArr[inx].items1,
		keys=getKeys(items);

	keys.push("datetime");
	
	datas1=sameDateDataSum(option.data1,keys),len1=option.data1.rows.length;
	
	if(option.data2){
		datas2=sameDateDataSum(option.data2,keys),len2=option.data2.rows.length;
		$item.jSelect("initdata",items).jSelect("val",items[0].id);
		var item=$item.selectVal();
		var datetime = datas1.datetime.length>datas2.datetime.length ? datas1.datetime : datas2.datetime;
		datetimecon=datetime;
		console.log("data1::"+datas1.datetime);
		console.log("data2::"+datas2.datetime);
		var date1=getSelDate('#date1',"/");
	    var startdate1=date1.start;
	    var enddate1=date1.end;
	    
	    var date2=getSelDate('#date2',"/");
	    var startdate2=date2.start;
	    var enddate2=date2.end;
		
		op=$.extend({},cop,{
			   title: {text:option.title},
			   xAxis: {categories :datetime},
			   series:[
			        { name:startdate1.substring(5,10)+"-"+enddate1.substring(5,10),
					 data: datas1[item],
					 visible: true,
				     },
			        { name:startdate2.substring(5,10)+"-"+enddate2.substring(5,10),
					 data: datas2[item],
					 visible: true,
			    }],
			    yAxis: [
			       	 {title: {text:null,},lineWidth: 1},
			       ]
		   });
		
			Highcharts.chart('container',op);
		 
	}else{
		var series=[],yAxis=[];
		for(i in items){
			var item=items[i];
			series.push({
				"name":item.text,
				"data":datas1[item.id],
				"visible":false,
				"yAxis":i*1
			});
	
			yAxis.push({title: {text:null,},lineWidth: 0});
		}
		series[0].visible=true;
		yAxis[0].lineWidth=1;
		var datetime=datas1.datetime;
	
		var opp=$.extend({},cop,{
		   title: {text:option.title},
		   xAxis: {categories:datetime},
		   series:series,
		   yAxis:yAxis
	   });
		Highcharts.chart('container',opp);
	}

}
//切换查询框菜单状态
function toggleQueryOption(){	
	$selCommonBox.hide();
	$selStyleBox.hide();
	$itemBox.hide();
	$dateBox.hide();
	$dateBox2.hide();

	if(inx!=0 && inx!=4){
		$selCommonBox.show();
		isTime ? $selStyleBox.show():"";
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
	
	if(isTime){
		$("#bytime").html("取消对比").addClass("ing");
		$dateBox2.show();
		$itemBox.show();
		$("#dayTerm").click();
	}else{
		$("#bytime").html("按时间对比").removeClass("ing");
		$dateBox.show();
		var day1=moment().subtract(7,'days'),
			day2=moment().subtract(1,'days');
		$date.data('daterangepicker').setStartDate(day1);
		$date.data('daterangepicker').setEndDate(day2);
	}

}


//展示数据
function disData(){
	var url=menuArr[inx].url;
	var common=$("#selectInput").jSelect("val");
	var adstyle=$("#selTypeInput").jSelect("val");

	var menu=menuArr[inx].menu;
	var data={rows:[]};
	var col=[];
	
	if(inx==0){col=colAll;}
	else if(inx==4){col=colAdstyle;}

	if(!isTime){
		if(inx==1){col=colApp1;}
		else if(inx==2){col=colMarket1;}
		else if(inx==3){col=colAdvert1;}
		
		var date=getSelDate('#date');
	    var startdate=date.start;
	    var enddate=date.end;
	    console.log("时间",startdate,enddate)
	    
	    var prm={
				"startdate": startdate,
			    "enddate":enddate,
			    "common":common,
			    "adstyle":adstyle
		};
	    var qdata=getQueryData(url,prm);
	    qdata ? data=qdata : "";
	    console.log("不对比数据",data);
	 
	    disChart({
		   	data1:data,
			title:menu+"报表",
	    });
	}else{
		var noStyle= adstyle=="";
		if(inx==1){col=noStyle?colApp1:colApp2;}
		else if(inx==2){col=noStyle?colMarket1:colMarket2;}
		else if(inx==3){col=noStyle?colAdvert1:colAdvert2;}
		
		var date1=getSelDate('#date1');
	    var startdate1=date1.start;
	    var enddate1=date1.end;
	    
	    var date2=getSelDate('#date2');
	    var startdate2=date2.start;
	    var enddate2=date2.end;
    
	    console.log("时间",startdate1,enddate1,startdate2,enddate2)
	    
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
	  
		console.log("对比数据1",data1);
		console.log("对比数据2",data2);
		//判断data1和data2是否是数组
		if(data1 instanceof Array && data2 instanceof Array){
			data=data1.concat(data2);//连接两个数组
		}else if(data1 instanceof Object && data2 instanceof Object){
			
			if(data1.code==12||data2.code==12)
			{
				data.code=12;
			}else if (data1.d || data2.d){
				data.d=data1.d.contact(data2.d);
			
			} else {
				
			
				var data11=cloneObj(data1),
					len1=data11.rows.length;
				if(len1>0){
					if(data11.rows[0].datetime!=enddate1){
						data11.rows.splice(0,0,getAddData(enddate1));
					}
					if(data11.rows[len1-1].datetime!=startdate1){
						data11.rows.push(getAddData(startdate1));
					}
				}
				
				var data22=cloneObj(data2),
					len2=data22.rows.length;
				if(len2>0){
					if(data22.rows[0].datetime!=enddate2){
						data22.rows.splice(0,0,getAddData(enddate2));
					}
					if(data22.rows[len2-1].datetime!=startdate2){
						data22.rows.push(getAddData(startdate2));
					}
				}
				
				
				data.rows=data1.rows.concat(data2.rows);
				disChart({
				   	data1:data11,
				   	data2:data22,
					title:menu+"数据对比"
				});	
			}
		}
	
	}
	
	$('.bootstrap-table').remove();
	$("#tablebox").append("<table id='table'></table>");
	 //console.log(data)

	var wh=window.innerHeight>0? window.innerHeight:window.screen.height;
	var dl=data.rows.length;
	var h=(dl*37+90)<wh ? (dl*37+90):(wh-100);

	//console.log(dl*37-80,wh,h);
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




