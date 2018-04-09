var dimensionClassify = document.getElementById("dimensionClassify");
var dimensionSelected = document.getElementById("dimensionSelected");


function changeDimensionSelected() {
    if(dimensionClassify.selectedIndex == 0){
        showIndex0();
        hideIndex1();
        hideIndex2();
        hideIndex3();
        hideIndex4();
    }else if(dimensionClassify.selectedIndex == 1){
        hideIndex0();
        showIndex1();
        hideIndex2();
        hideIndex3();
        hideIndex4();
     }else if(dimensionClassify.selectedIndex == 2){
        hideIndex0();
        hideIndex1();
        showIndex2();
        hideIndex3();
        hideIndex4();
    }else if(dimensionClassify.selectedIndex == 3){
        hideIndex0();
        hideIndex1();
        hideIndex2();
        showIndex3();
        hideIndex4();
    }else{
        hideIndex0();
        hideIndex1();
        hideIndex2();
        hideIndex3();
        showIndex4();
    }
}


function initDimensionSelected(dimension) {

    dimensionSelected.options.length = 0; // 清除二级下拉框的所有内容
    if(dimension >= 0 && dimension <= 7){
        dimensionSelected.options.add(new Option("填充率", "0", false, dimension == 0 ? true : false)); //默认选中
        dimensionSelected.options.add(new Option("展示率", "1", false, dimension == 1 ? true : false));
        dimensionSelected.options.add(new Option("点击率", "2", false, dimension == 2 ? true : false));
        dimensionSelected.options.add(new Option("播放率", "3", false, dimension == 3 ? true : false));
        dimensionSelected.options.add(new Option("下载率", "4", false, dimension == 4 ? true : false));
        dimensionSelected.options.add(new Option("安装率", "5", false, dimension == 5 ? true : false));
        // dimensionSelected.options.add(new Option("平均活跃展示", "6", false, dimension == 6 ? true : false));
        // dimensionSelected.options.add(new Option("平均活跃请求", "7", false, dimension == 7 ? true : false));
    }else if(dimension >= 8 && dimension <= 16){
        // dimensionSelected.options.add(new Option("活跃数", "8", false, dimension == 8 ? true : false));
        dimensionSelected.options.add(new Option("请求数", "9", false, dimension == 9 ? true : false));
        dimensionSelected.options.add(new Option("发送数", "10", false, dimension == 10 ? true : false));
        dimensionSelected.options.add(new Option("展示数", "11", false, dimension == 11 ? true : false));
        dimensionSelected.options.add(new Option("点击数", "12", false, dimension == 12 ? true : false));
        dimensionSelected.options.add(new Option("开始播放数", "13", false, dimension == 13 ? true : false));
        dimensionSelected.options.add(new Option("结束播放数", "14", false, dimension == 14 ? true : false));
        dimensionSelected.options.add(new Option("落地页面点击数", "15", false, dimension == 16 ? true : false));
    }else if(dimension >= 17 && dimension <= 18){
        dimensionSelected.options.add(new Option("数据差异", "16", false, dimension == 15 ? true : false));
        dimensionSelected.options.add(new Option("环比/同比", "17", false, dimension == 16 ? true : false));
    }else if(dimension >= 19 && dimension <= 21){
        dimensionSelected.options.add(new Option("限量消耗百分比", "18", false, dimension == 19 ? true : false));
        dimensionSelected.options.add(new Option("投放排期提示", "19", false, dimension == 20 ? true : false));
        dimensionSelected.options.add(new Option("结束投放提示", "20", false, dimension == 21 ? true : false));
    }else{
        dimensionSelected.options.add(new Option("Ecpa", "21", false, dimension == 22 ? true : false));
        dimensionSelected.options.add(new Option("Ecpm", "22", false, dimension == 23 ? true : false));
    }

}


function changeAdvertAndStyle(){
}

function changeSdkVersion() {
    var version = $("#version").val();
    if(!!version){
        $("#advertId").val("");
        $("#style").val("");
        $("#style").attr("disabled","true");
        $("#advertId").attr("disabled","true");
    }

}


function hideIndex0() {
    $("#dimensionSelected").children('option[value="0"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="1"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="2"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="3"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="4"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="5"]').wrap('<span>').hide();
    // $("#dimensionSelected").children('option[value="6"]').wrap('<span>').hide();
    // $("#dimensionSelected").children('option[value="7"]').wrap('<span>').hide();
}

function hideIndex1() {
    // $("#dimensionSelected").children('option[value="8"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="9"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="10"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="11"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="12"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="13"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="14"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="15"]').wrap('<span>').hide();
}

function hideIndex2() {
    $("#dimensionSelected").children('option[value="16"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="17"]').wrap('<span>').hide();
}

function hideIndex3() {
    $("#dimensionSelected").children('option[value="18"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="19"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="20"]').wrap('<span>').hide();
}

function hideIndex4() {
    $("#dimensionSelected").children('option[value="21"]').wrap('<span>').hide();
    $("#dimensionSelected").children('option[value="22"]').wrap('<span>').hide();
}

function showIndex0(){

    $("#dimensionSelected").children("span").children('option[value="0"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="1"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="2"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="4"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="5"]').unwrap();
    $('#dimensionSelected option[value="0"]').show();
    $('#dimensionSelected option[value="1"]').show();
    $('#dimensionSelected option[value="2"]').show();
    $('#dimensionSelected option[value="4"]').show();
    $('#dimensionSelected option[value="5"]').show();

    var style = $('#style').val();
    var advertId = $("#advertId").val();
    if(!style && !advertId){
        // $("#dimensionSelected").children("span").children('option[value="6"]').unwrap();
        // $("#dimensionSelected").children("span").children('option[value="7"]').unwrap();
        // $('#dimensionSelected option[value="6"]').show();
        // $('#dimensionSelected option[value="7"]').show();
    }
    if(style.indexOf("视频") > 0 || style == "游戏墙"){
        $("#dimensionSelected").children("span").children('option[value="3"]').unwrap();
        $('#dimensionSelected option[value="3"]').show();
    }
}

function showIndex1(){
    $("#dimensionSelected").children("span").children('option[value="9"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="10"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="11"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="12"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="13"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="14"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="15"]').unwrap();
    $('#dimensionSelected option[value="9"]').show();
    $('#dimensionSelected option[value="10"]').show();
    $('#dimensionSelected option[value="11"]').show();
    $('#dimensionSelected option[value="12"]').show();
    $('#dimensionSelected option[value="13"]').show();
    $('#dimensionSelected option[value="14"]').show();
    $('#dimensionSelected option[value="15"]').show();

    var style = $('#style').val();
    var advertId = $("#advertId").val();
    if(!style && !advertId){
        // $("#dimensionSelected").children("span").children('option[value="8"]').unwrap();
        // $('#dimensionSelected option[value="8"]').show();
    }
    if(style.indexOf("视频") > 0 || style == "游戏墙"){
        $("#dimensionSelected").children("span").children('option[value="13"]').unwrap();
        $("#dimensionSelected").children("span").children('option[value="14"]').unwrap();
        $("#dimensionSelected").children("span").children('option[value="15"]').unwrap();
        $('#dimensionSelected option[value="13"]').show();
        $('#dimensionSelected option[value="14"]').show();
        $('#dimensionSelected option[value="15"]').show();
    }
}

function showIndex2(){
    $("#dimensionSelected").children("span").children('option[value="16"]').unwrap();
    $("#dimensionSelected").children("span").children('option[value="17"]').unwrap();

    $('#dimensionSelected option[value="16"]').show();
    $('#dimensionSelected option[value="17"]').show();
}

function showIndex3(){
    var advertId = $("#advertId").val();
    if(!!advertId){
        $("#dimensionSelected").children("span").children('option[value="18"]').unwrap();
        $("#dimensionSelected").children("span").children('option[value="19"]').unwrap();
        $("#dimensionSelected").children("span").children('option[value="20"]').unwrap();

        $('#dimensionSelected option[value="18"]').show();
        $('#dimensionSelected option[value="19"]').show();
        $('#dimensionSelected option[value="20"]').show();
    }
}

function showIndex4(){
    $("#dimensionSelected").children("span").children('option[value="21"]').unwrap();
    $('#dimensionSelected option[value="21"]').show();
    var style = $('#style').val();
    var advertId = $("#advertId").val();
    if(!style && !advertId){
        $("#dimensionSelected").children("span").children('option[value="21"]').unwrap();
        $('#dimensionSelected option[value="21"]').show();
    }
}

