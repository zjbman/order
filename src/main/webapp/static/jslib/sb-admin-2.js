//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size

	$('#side-menu').metisMenu();
	function setPageHeight(){
		 var topOffset =90;
	        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
	        if (width < 768) {
	            $('div.navbar-collapse').addClass('collapse');
	            topOffset = 115; // 2-row-menu
	        } else {
	            $('div.navbar-collapse').removeClass('collapse');
	        }

	        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
	        height = height - topOffset;
	        if (height < 1) height = 1;
	        if (height > topOffset) {
	            $("#page-wrapper").css("height", (height) + "px");
	        }
	}
    $(window).bind("load resize",setPageHeight);
    
    setPageHeight();

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
    var inx=-1;
    $("#side-menu li>a").click(function(){
    	inx= $("#side-menu li>a").index($(this));
    	$(this).css('background','#09a7be');
    	$("#side-menu li>a").not(":eq("+inx+")").css('background','none');
    });
    $("#side-menu li>a").mouseover(function(){
    	var inxon= $("#side-menu li>a").index($(this));
    	$(this).css('background','#09a7be');
    	$("#side-menu li>a").not(":eq("+inxon+")").css('background','none');
    	console.log(inx)
    	if(inx!=-1){
    		$("#side-menu li>a").eq(inx).css('background','#09a7be');
    	}  
    }).mouseout(function(){
    	var inxout=$("#side-menu li>a").index($(this));
    	if(inxout==inx) return;
    	$(this).css('background','none');
    });
   
   
    

