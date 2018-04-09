/*
@author Jo
version: 1.0
 
参数options格式
{
	data:[
		{"id":"","text":""}
	],
	right:undefined, 
	datakey:null, 默认解析id,text 如["key","val"]解析key、val
	multiple:true
}

单选赋值: obj.selectVal("值") 或者 obj.jSelect("val","值")  
多选赋值: obj.selectVal(["值","值"...]) 或者 obj.jSelect("val",["值","值"...]) 
取值：去掉第二个参数就是取值
修改选项数据：obj.selectVal("initdata",data,datekey) 不传datakey默认使用上一次的
*/
+function(){
	var MySelect=function(el, options){
		this.options = options;
       	this.$el = $(el);
       	this.data=options.data;//全部数据
       	this.selData=[]; //选中数据
    	this.$el.selId="";
       	this.init();
	};
	MySelect._default={
		datakey:null,//格式化数据的key,value
		multiple:true,//默认多选模式
	};
	MySelect.fn={
		//格式化数据
		formatData:function(data,key,value){
		   var newdata=[];
		   for(var item in data){
		    var newobj={};
		    if(data[item][key]){newobj.id = data[item][key];}else{
		    	console.log("第"+item+"条数据有误,下标为"+key+"的数据为空或者不存在。",data[item]);
		    };
		    
		    if(data[item][value]){ newobj.text= data[item][value];}else{
		    	console.log("第"+item+"条数据有误,下标为"+value+"的数据为空或者不存在。",data[item]);
		    };
		    newdata.push(newobj);
		   }
		   return newdata;
		},
		//在数组中查找指定值的索引
		getInx:function(arr,key,val){ 
			var k,len=arr.length,i=0;
			for(;i<len;i++){
				if(arr[i][key]==val){
					k=i;
					break;
				}
			}
			return k;
		},
		//复制对象
		cloneObj:function (obj) {  
	    	var newObj = {};  
	   		if (obj instanceof Array) {  
	        	newObj = [];  
	    	}  
	    	for (var key in obj) {  
	        	var val = obj[key];  
	        	newObj[key] = typeof val === 'object' ? MySelect.fn.cloneObj(val) : val;  
	    	}  
	    	return newObj;  
		}

	}
	MySelect.prototype={
		init:function(){
			this.initContainer();
			this.initdata();
			this.initEvent();
			this.initSearch();
		},
		initdata:function(data,datakey,menuCbk){
			data ? this.data=data : "";
			datakey ? this.options.datakey=datakey:"";
			var datastr="";
			if(this.options.multiple){
				datastr='<li class="j-sel-all"><a href="#" val="all">全选</a></li>';
			}else{
				datastr='<li class="j-nosel"><a href="#" val="">取消选择</a></li>';
			}

			var _datakey=this.options.datakey;
			if(_datakey && _datakey instanceof Array){
				this.data=MySelect.fn.formatData(this.data,_datakey[0],_datakey[1]);
			}
			var data=this.data;

			for(var i in data){
				datastr+="<li><a href='#' val='"+data[i].id+"'>"+data[i].text+"</a></li>";
			}

			this.$menus.html(datastr);
			this.$menu=this.$menus.find("li").not(".j-sel-all");
	        this.$selAll=this.$menus.find(".j-sel-all");
	        if(this.options.multiple){
	        	this.selData=[];
	        }else{
	        	this.selData={};
	        }
	       this.selData=[];

	       this.initMenuEvent();
		},
		initContainer:function () {
			this.$el.attr("readonly","readonly");
			var htmlstr='<div class="j-select"><i class="j-close">×</i>'+
				'<h5 class="j-sel-title"><span>选择器</span>'+
				'<div class="j-search-bar"><input type="text" class="j-search"><span>搜索</span></div></h5>'+
				'<div class="j-content"><ul class="j-list-horizontal"></ul></div>';

			if(this.options.multiple){
				htmlstr+='<div class="j-sel-foot"><div class="j-selected cf">'+
 				'<h5>已选择<span class="j-choNum">0</span>个</h5>'+
 				'</div><div class="j-sel-ok"><input type="button" class="j-btn-ok" value="确定">'+
 				'</div></div>';
			};

			htmlstr+='</div>';
	        this.$container = $(htmlstr);
	        var $wrap=$("<div class='j-sel-wrap'><span class='j-dropdowm'></span></div>");
	        $wrap.insertAfter(this.$el).append(this.$el).append(this.$container);

	        var eh=this.$el.outerHeight();
	        this.$container.css("top",eh+2).hide();
	        if(this.options.right!="undefined"){
	        	var right=this.options.right;
	        	if(right!="undefined"&&right!=null){
	        		this.$container.css({"left":"auto","right":right});
	        	}
	        }
	        this.$menus=this.$container.find(".j-content").find("ul");
	        this.$btnok=this.$container.find(".j-btn-ok");
	        this.$searchbox=this.$container.find(".j-search-bar");	
	        this.$close=this.$container.find(".j-close");
	        this.$dropdowm=$wrap.find(".j-dropdowm");
	        this.$choNum=this.$container.find(".j-choNum");
    	},
    	getMenuInfo:function($menu){
    		var $ta=$menu.find("a").eq(0),
				text=$ta.html(),
				id=$ta.attr("val");
			return{
				"text":text,
				"id":id
			}
    	},
    	multipleMenuChose:function($menu){ //多选菜单选中指定项
    			var info=this.getMenuInfo($menu),
    				id=info.id,
    				text=info.text;

    			$menu.addClass('selected');
				this.selData.push({"id":id,"text":text});
    	},
    	multipleMenuCancel:function($menu){//取消选择
    		var info=this.getMenuInfo($menu),
				id=info.id,
				text=info.text,
				inx=MySelect.fn.getInx(this.selData,"id",id);
    			$menu.removeClass('selected');
    			if(typeof inx=="number"){
					this.selData.splice(inx,1);	
    			}
    	},
    	initMenuEvent:function(){
    		var root=this;

			root.$menu.click(function(){
				var $th=$(this);

				if(root.options.multiple){
					if($th.hasClass('selected')){
						root.multipleMenuCancel($th);
						//console.log(root.selData);
					}else{
						root.multipleMenuChose($th);
						//console.log(root.selData);
					}
					root.updateFootNum();

				}else{
					$th.addClass('selected').siblings().removeClass('selected');
					var info=root.getMenuInfo($th),
						id=info.id,
						text=info.text;
					root.selData={"id":id,"text":text};
					if(id==""){
						root.selData={};
						$th.removeClass('selected');

					}
					root.$el.val(root.selData.text);
					root.$el.selId=root.selData.id;
		
					root.hide();
				};
			});

    	},
    	addMenuClick:function(cbk){
    		this.$menu.click(function(){
    			cbk();
    		});
    	},    	
    	initEvent:function(){
    		var root=this,mul=this.options.multiple;
    		
    		root.$close.click(function() {
				root.hide();
    		 });

    		if(mul){
    			//全选
    			var all=false;
    			this.$menus.on("click",".j-sel-all" ,function(){
					all=!all;
					//var $t=$(this);
					if(all){
						//$t.html("全不选");
						root.$menu.each(function(){
							root.multipleMenuChose($(this));
						});
						//console.log(root.selData)
					}else{
						//$t.html("全选");
						root.$menu.each(function(){
							root.multipleMenuCancel($(this));

						});
						//console.log(root.selData)
					}
					root.updateFootNum();
	    		});

	    		//确定
	    		root.$btnok.click(function(){
	    			var ids=[],texts=[];
	    			for(var i in root.selData){
	    				ids.push(root.selData[i].id);
	    				texts.push(root.selData[i].text);
	    			}
	    			root.$el.val(texts.join(","));
	    			root.$el.selId=ids.join(",");
	    			root.hide();
	    		});
    		};

    		root.isshow=false;
    		function togglePanel(){
    			if(!root.isshow){
   					root.show();
   					root.isshow=true;
   					$(".j-select").not(root.$container).hide().each(function(){
   						$(this).prev("input").data('jSelect').isshow=false;
   					})
			    }else{
			 		root.hide();
			 		root.isshow=false;
			    }
    		}

    		//点击input框显示隐藏面板	
	        root.$el.on("click",function(){
    			togglePanel()
			});
    		root.$dropdowm.on("click",function(){
    			togglePanel()
			});
    	},

    	show:function(){
    		this.$container.show();
    	},
    	hide:function(){
    		this.$container.hide();
    	},
    	updateFootNum:function(){
    		var num=this.selData.length;
    		this.$choNum.html(num);
    	},
    	//搜索
    	initSearch:function(){
    		var root=this,
    			$op=this.$menus.find("li"),
    			$shInput=this.$searchbox.find(".j-search"),
    			$shBtn=this.$searchbox.find("span").eq(0);

    		$shInput.on('input propertychange', function() {
    			var text=$(this).val();
				root.search($op,text);
			});
    		$shBtn.click(function(){
    			var text=$shInput.val();
				root.search($op,text);
    		});
		},
		search:function($op,text){
			var data=this.data;
			//console.log(data);
			var i=0,len=data.length;
			if(text==""){
				$op.height("auto");
			}else{
				$op.height("0");
				for(;i<len;i++){
					if(data[i].text&&data[i].text.indexOf(text)!=-1){
						$op.eq(i+1).height("auto");	
					}	
				}
	    	}
			
		},
		val:function(){
			var sel=this;
			if(arguments.length==0||(arguments.length==1 && typeof arguments[0]=="undefined")){return sel.$el.selId;}
	    	else if(arguments.length>=1){

			var id=arguments[0];
			var $op=sel.$menus.find("li");

			if((typeof id=="string" || typeof id=="number")&&!sel.options.multiple){ //单选赋值
				$op.removeClass('selected');
				sel.selData={
					"text":"",
					"id":""
				};
					
				if(id!=""){
					var inx=MySelect.fn.getInx(sel.data,"id",id);
					if(typeof inx=="number"){
						sel.selData=MySelect.fn.cloneObj(sel.data[inx]);
						$op.eq(inx+1).addClass('selected').siblings().removeClass('selected');	
						
					}else{
						console.log("所选值不存在")
					}
				}
				
				sel.$el.val(sel.selData.text);
				sel.$el.selId=sel.selData.id;

			}else if(id instanceof Array && sel.options.multiple){//多选赋值
				sel.selData=[];
				$op.removeClass('selected');
				this.updateFootNum();
				for(var i in id){
					var inx=MySelect.fn.getInx(sel.data,"id",id[i]);
					if(typeof inx=="number"){
						var cc=MySelect.fn.cloneObj(sel.data[inx]);
						sel.selData.push(cc);
						$op.eq(inx+1).addClass('selected');
					}
				}

				var ids=[],texts=[];
    			for(var i in sel.selData){
    				ids.push(sel.selData[i].id);
    				texts.push(sel.selData[i].text);
    			}
    			sel.$el.val(texts.join(","));
    			sel.$el.selId=ids.join(",");
			};
			
		};
		
		},

	}


	$.fn.jSelect=function(){
		var value, arg=arguments;
		this.each(function(){
            var $this   = $(this),
                data = $this.data('jSelect'),
                arg0 = arg[0];

            //作为实例化参数
            if(typeof(arg0) == 'object' || !arg0){
                $this.attr("readonly","readonly");
                if(!data){
                	var options = $.extend({}, MySelect._default, arg0, typeof arg0 == 'object' && arg0);
                  	$this.data("jSelect", new MySelect(this, options ) );  
                }

            //作为调用函数
            }else if(typeof(arg0) == 'string'){ 
                if( data[arg0]){
                    var args = Array.prototype.slice.call(arg,1); 
                    value=data[arg0].apply(data,args);
                   
                }else{
                    $.error( 'method ' +  arg0 + ' does not exist on jQuery.jSelect' );  
                }

                    
            }

            
        });
        return typeof value === 'undefined' ? this : value;

	};

	$.fn.selectVal=function(arg){
		var data = $(this).data('jSelect');
		return data.val(arg);
	};
}();