 //设置并获取表格高度
function getTableHeight(obj){
	var ele= obj ? obj : $("#table");
	var wh=window.innerHeight>0? window.innerHeight:window.screen.height;
	var tableh=wh-ele.offset().top-20;
	return tableh;
}

//总计函数
function sumformat(rows,fie) {
    var field =fie? fie : this.field;
    var count = 0;
    for (var i in rows) {
        count += rows[i][field] * 1;
    }
    return formatNum(count);
}

//取平均值函数
function aveformat(rows){
	var field = this.field;
	var count = 0;
	var len=rows.length;
	for (var i in rows) {
		count += rows[i][field]*1;
	}
	var ornum=count/len;
	return formatNum(ornum);  
}

//保留两位小数
function formatNum(num,isAlways){
	if(isAlways){
		return (num*1).toFixed(2);
	}else{
		if(Math.floor(num*1)==num*1){
			return num*1;
		}else{
			return (num*1).toFixed(2);
		}
	}
	
}

function addZero(num){
	return num<9&&((num+"").charAt(0)!="0")? "0"+num : num;
}

//把日期转换为yyyy-dd-mm
function formatStringdate (value){
	if(value.length == 8){
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8);
	} 
	else if(value.length == 6){
		return value.substring(0, 4) + "-" + value.substring(4, 6);
	}
	else if(value.length == 10){
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8) + " " + value.substring(8, 10);
	}
	else if(value.length == 12){
		return value.substring(0, 4) + "-" + value.substring(4, 6) + "-" + value.substring(6, 8) + " " + value.substring(8, 10)+":"+value.substring(10, 12);
	}
	else {
	return value;
	}
}


