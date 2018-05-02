//确定
function save() {

    var businessName = $('#businessName').val();
    var contact = $('#contact').val();
    var telephone = $('#telephone').val();
    var address = $('#address').val();


    if (businessName == null || businessName == "" ||
        contact == null || contact == "" ||
        telephone == null || telephone == "" ||
        address == null || address == "") {

        Ewin.confirm({
            title: "提示",
            message: "请填写完整信息"
        });
        return false;
    }else {


        $.ajax({
            url: rootPath + '/businessManager/Save.html',
            type: "post",
            data: {
                "businessName": businessName,
                'contact': contact,
                'telephone': telephone,
                'address': address
            },
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (isDataOk(data, "保存成功", data.msg)) {
                    cancel();
                }
            }
        });

    }
}

function cancel() {
    window.open(rootPath + "/businessManager/Add.html", "pageFrame");
}

function returnTo() {
    window.open(rootPath + "/businessManager/Page.html", "pageFrame");
}

		
		
		
		