var apkKey = '';
var apkPN = '';
var apkVId = '';
var apkVN = '';
var apkSize = '';
var bannerKey = '';
var qcreenKey = '';
var screenKey = '';
var vdokKey = '';
var vedioKey = '';

var videoKey = '';
var landingpageKey = '';
var animationimageKey = '';
var animationKey = '';
var gamewallimageKey = '';
var gamewallKey = '';
var dreamimageKey = '';
var dreamKey = '';


$("#adtype1").jSelect({
	 data:adtype,
	 datakey:["value","text"],
	 multiple:false
});
$("#feetype1").jSelect({
	data:feetype,
	 datakey:["value","text"],
	 multiple:false
}); 
$("#operationpattern1").jSelect({
	data:operationpattern,
	datakey:["value","text"],
	 multiple:false
});
$.ajax({
	url: rootPath+"/advertiser/Select.html",
    dataType: 'json',
    async:false,
    success : function(data){
    	$("#advertiserid1").jSelect({
    		 data:data,
 			 datakey:["id","name"],
 			 multiple:false
    	});
    	 
      }
});

var opfile = {
	    uploadUrl: rootPath + "/advert/SaveFile.html", //上传的地址
	    language: 'zh', //设置语言
	    enctype: 'multipart/form-data',
	    overwriteInitial: false, //不覆盖已存在的图片  
	    allowedFileExtensions: ['jpg', 'png', 'gif','mp4','avi','flv'], //限定上传文件类型
	    browseClass: "btn btn-primary", //按钮样式  
	    showUpload: true,
	    uploadAsync: false,//是否异步上传
	    uploadExtraData: function () {
	        return {adName: $("#name").val()};
	    },
	    slugCallback: function (filename) {
	        return filename.replace('(', '_').replace(']', '_');
	    },
	    dropZoneEnabled: false//是否显示拖拽区域	
	};
function setFile(target, callBack, ispre, url) {
    var op = opfile;
    if (ispre) {
        op = $.extend({}, opfile, {
            initialPreviewAsData: true,
            initialPreviewFileType:'image',
            initialPreview: url
        });
    }
    $(target).fileinput(op).on("filebatchuploadsuccess", function (event, data) {
        if (data.response) {
            var obj = JSON.parse(data.response);
            callBack(obj);
        }
    });
}

function setApk() {
    var op = $.extend({}, opfile, {
    	showPreview:false,
        allowedFileExtensions: ['apk', 'IPA']
    });
    $('#apkfile').fileinput(op).on("filebatchuploadsuccess", function (event, data) {

        if (data.response) {
            var obj = JSON.parse(data.response);
            apkKey = obj.apkKey;
            apkPN = obj.apkPN;
            apkVId = obj.apkVId;
            apkVN = obj.apkVN;
            apkSize = obj.apkSize;
            document.getElementById("apkname").value = apkPN;
            document.getElementById("path").value = apkKey;
            document.getElementById("apksize").value = apkSize;
            document.getElementById("apkversion").value = apkVId;
            document.getElementById("apkversionName").value = apkVN;
        }
    });
}


if (id == "") {
	
    setFile("#bannerfile", function (obj) {
        bannerKey = obj.bannerKey;
    });
    setFile("#screenCfile", function (obj) {
        screenKey = obj.screenKey;
    });
    setFile("#qcreenCfile", function (obj) {
        qcreenKey = obj.qcreenKey;
    });
    setFile("#vdokfile", function (obj) {
    	vdokKey = obj.vdokKey;
    });
    setFile("#vediofile", function (obj) {
    	vedioKey = obj.vedioKey;
    });
    setFile("#videourlfile", function (obj) {
    	videoKey = obj.videoKey;
    });
    setFile("#landingpageurlfile", function (obj) {
    	landingpageKey = obj.landingpageKey;
    });
    setFile("#animationimagefile", function (obj) {
    	animationimageKey = obj.animationimageKey;
    });
    setFile("#animationfile", function (obj) {
    	animationKey = obj.animationKey;
    });
    setFile("#gamewallimagefile", function (obj) {
    	gamewallimageKey = obj.gamewallimageKey;
    });
    setFile("#gamewallfile", function (obj) {
    	gamewallKey = obj.gamewallKey;
    });
    setFile("#dreamimagefile", function (obj) {
    	dreamimageKey = obj.dreamimageKey;
    });
    setFile("#dreamfile", function (obj) {
    	dreamKey = obj.dreamKey;
    });
    setApk();
}
else {
    setApk();

    var data;
    $.ajax({
        url: rootPath + '/advert/Find.html',
        type: "post",
        async: false,
        data: {"id": id},
        dataType: "json",
        success: function (res) {
            if (res.code == 12) {
                Ewin.confirm({
                    title: "fail",
                    message: '无权限访问!  ' + data.errorMessage
                });
                data = false;
            } else {
                data = res;
            }
        },
        error: function (e) {
            alert("获取数据错误" + e);
            data = false;
        }
    });

    if (data) {
    	$('#id').val(id);
    	$('#name').val(data[0].name);
   	    $('#cpcUrl').val(data[0].cpcurl);
   	    $('#apkDownloadUrl').val(data[0].apkDownloadUrl);
   	    $('#remark').val(data[0].remark);
   	    $('#adMark').val(data[0].adMark);
   	    $('#operationpattern1').selectVal(data[0].operationpattern);
   	    $('#adtype1').selectVal(data[0].adtype);
   	    $('#advertiserid1').selectVal(data[0].advertiserid);
   	    $('#apkname').val(data[0].apkname);
   	    document.getElementById("path").innerHTML=data[0].apkurl;
   	    document.getElementById("apksize").innerHTML=data[0].apksize;
   	    document.getElementById("apkversion").innerHTML=data[0].apkversion;
   	    document.getElementById("apkversionName").innerHTML=data[0].apkversionName;


        if (data[0].videourl != "" && data[0].videourl != null) {
            var url = [];
            var picture = data[0].videourl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#videourlfile", function (obj) {
            	videoKey = obj.videoKey;
            }, true, url);

        } else {
            setFile("#videourlfile", function (obj) {
            	videoKey = obj.videoKey;
            });
        }
        
        if (data[0].landingpageurl != "" && data[0].landingpageurl != null) {
            var url = [];
            var picture = data[0].landingpageurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#landingpageurlfile", function (obj) {
            	landingpageKey = obj.landingpageKey;
            }, true, url);

        } else {
            setFile("#landingpageurlfile", function (obj) {
            	landingpageKey = obj.landingpageKey;
            });
        } 
        
        if (data[0].animationimage != "" && data[0].animationimage != null) {
            var url = [];
            var picture = data[0].animationimage.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#animationimagefile", function (obj) {
            	animationimageKey = obj.animationimageKey;
            }, true, url);

        } else {
            setFile("#animationimagefile", function (obj) {
            	animationimageKey = obj.animationimageKey;
            });
        } 
        
        if (data[0].animationurl != "" && data[0].animationurl != null) {
            var url = [];
            var picture = data[0].animationurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#animationfile", function (obj) {
            	animationKey = obj.animationKey;
            }, true, url);

        } else {
            setFile("#animationfile", function (obj) {
            	animationKey = obj.animationKey;
            });
        }
        
        if (data[0].gamewallimage != "" && data[0].gamewallimage != null) {
            var url = [];
            var picture = data[0].gamewallimage.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#gamewallimagefile", function (obj) {
            	gamewallimageKey = obj.gamewallimageKey;
            }, true, url);

        } else {
            setFile("#gamewallimagefile", function (obj) {
            	gamewallimageKey = obj.gamewallimageKey;
            });
        }
        
        if (data[0].gamewallurl != "" && data[0].gamewallurl != null) {
            var url = [];
            var picture = data[0].gamewallurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#gamewallfile", function (obj) {
            	gamewallKey = obj.gamewallKey;
            }, true, url);

        } else {
            setFile("#gamewallfile", function (obj) {
            	gamewallKey = obj.gamewallKey;
            });
        }
        
        if (data[0].dreamimage != "" && data[0].dreamimage != null) {
            var url = [];
            var picture = data[0].dreamimage.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#dreamimagefile", function (obj) {
            	dreamimageKey = obj.dreamimageKey;
            }, true, url);

        } else {
            setFile("#dreamimagefile", function (obj) {
            	dreamimageKey = obj.dreamimageKey;
            });
        }
        
        if (data[0].dreamurl != "" && data[0].dreamurl != null) {
            var url = [];
            var picture = data[0].dreamurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#dreamfile", function (obj) {
            	dreamKey = obj.dreamKey;
            }, true, url);

        } else {
            setFile("#dreamfile", function (obj) {
            	dreamKey = obj.dreamKey;
            });
        }
        
        if (data[0].vdokurl != "" && data[0].vdokurl != null) {
            var url = [];
            var picture = data[0].vdokurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#vdokfile", function (obj) {
            	vdokKey = obj.vdokKey;
            }, true, url);

        } else {
            setFile("#vdokfile", function (obj) {
            	vdokKey = obj.vdokKey;
            });
        }
 
        if (data[0].vediourl != "" && data[0].vediourl != null) {
            var url = [];
            var picture = data[0].vediourl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#vediofile", function (obj) {
            	vedioKey = obj.vedioKey;
            }, true, url);

        } else {
            setFile("#vediofile", function (obj) {
            	vedioKey = obj.vedioKey;
            });
        }       
        
        if (data[0].cscreenurl != "" && data[0].cscreenurl != null) {
            var url = [];
            var picture = data[0].cscreenurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#screenCfile", function (obj) {
                screenKey = obj.screenKey;
            }, true, url);
        } else {
            setFile("#screenCfile", function (obj) {
                screenKey = obj.screenKey;
            });
        }

        if (data[0].qscreenurl != "" && data[0].qscreenurl != null) {
            var url = [];
            var picture = data[0].qscreenurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#qcreenCfile", function (obj) {
                qcreenKey = obj.qcreenKey;
            }, true, url);
        } else {
            setFile("#qcreenCfile", function (obj) {
                qcreenKey = obj.qcreenKey;
            });
        }

        if (data[0].bannerurl != "" && data[0].bannerurl != null) {
            var url = [];
            var picture = data[0].bannerurl.split(',');
            for (var i = 0; i < picture.length; i++) {
                if (picture[i] != '' && picture[i] != null) {
                    var curl = data[0].ossUrl + picture[i];
                    url.push(curl);
                }
            }
            setFile("#bannerfile", function (obj) {
                bannerKey = obj.bannerKey;
            }, true, url);
        } else {
            setFile("#bannerfile", function (obj) {
                bannerKey = obj.bannerKey;
            });
        }
    }
}

//保存
function save() {

	    var advertiserid = $('#advertiserid1').selectVal();
	    if (advertiserid == null || advertiserid == "") {
	        Ewin.confirm({
	            title: 'fail',
	            message: "广告主不能为空"
	        });
	        return false;
	    }
	    $("#advertiserid").val($("#advertiserid1").selectVal());
	    $("#adtype").val($("#adtype1").selectVal());
	    $("#operationpattern").val($("#operationpattern1").selectVal());
	    $("#apkurl").val(apkKey);
	    $("#apksize").val(apkSize);
	    $("#apkversion").val(apkVId);
	    $("#apkversionName").val(apkVN);
	    $("#bannerurl").val(bannerKey);
	    $("#cscreenurl").val(screenKey);
	    $("#qscreenurl").val(qcreenKey);
	    $("#vdokurl").val(vdokKey);
	    $("#vediourl").val(vedioKey);
	    $("#landingpageurl").val(landingpageKey);
	    $("#animationimage").val(animationimageKey);
	    $("#animationurl").val(animationKey);
	    $("#gamewallimage").val(gamewallimageKey);
	    $("#gamewallurl").val(gamewallKey);
	    $("#dreamimage").val(dreamimageKey);
	    $("#dreamurl").val(dreamKey);
	    
	    document.getElementById("formMain").action = rootPath + "/advert/Save.html";
	    document.getElementById("formMain").submit();

	}