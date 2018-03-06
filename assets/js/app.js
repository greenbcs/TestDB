
//-----------------------全局变量--------------------------------------------//
var CookieName = "PF"; //记录用户的cookie
var DefaultPage = "receive-check-statistics.html"; //默认页面
var PFbeforeunload = new Array();  // 临时存放用户浏览记录的数组
var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled; //检查是否支持全屏
//----------------------------------------------------------------------------/

$.ajax({

    url:'backend/NOTICE.php',
    dataType:'text',
    type:'POST',
    //data:{'SN':a},
    success: function(json) {
        document.getElementById("notice").value=json;
    }

})

//-----------Show user's ID at navigation-------------//
/**$.ajax({
	url:        'backend/userID.php',
	dataType:   'text',
	data:		'',
	type:       'post',
	success:    function(result){
	$("#IDlabel").html(result);
	}
});
**/
//-----------------------------------------------------//

//-----------------根据浏览器，右上角视图切换标签初始化-------------//
$("#am-icon-square-o").hide();//初始状态下隐藏屏幕标签的第一个
if (!fullscreenEnabled) {
	$("#am-icon-arrows").hide();//不支持全屏的话，不显示全屏的两个按钮
	$("#am-icon-arrows-v").hide();
};
//------------------------------------------------------------------//


//******************************************************************//
//																	//
//							响应事件							    //
//																	//
//******************************************************************//

//--------------------------点击导航的响应，存入临时数组-----------//
$("ul[id^='collapse-nav']").on('opened.collapse.amui',function(){
	var id = $(this).attr("id");
	if ( PFbeforeunload.indexOf(id) == -1 ) {
		PFbeforeunload.push(id);
	//	console.log(PFbeforeunload);
	}
})

$("ul[id^='collapse-nav']").on('closed.collapse.amui',function(){
	var id = $(this).attr("id");
	var m = PFbeforeunload.indexOf(id);
	if ( m >=0 ) {
		PFbeforeunload.splice(m,1);
		//console.log(PFbeforeunload);
	}
})

//--------------------------刷新前通过cookie存下关键数据----------------------//
window.onunload=function(){
	var x = "";
	var value = "";
	var ViewClass = $("#dropdown-View").attr("class");
	for ( x in PFbeforeunload ){
		value = value.concat(PFbeforeunload[x]+" ");
	};
	value = value.concat(ViewClass);
	document.cookie = CookieName + "=" + value;
};

//-------------------加载页面时，利用刷新前的cookie数据，恢复页面------------//
window.onload=function(){
	dContentDIV(document.URL);
	var selector = "";
	var CookieContent = document.cookie.replace(/(?:(?:^|.*;\s*)PF\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	if ( CookieContent.indexOf(" ") != -1 )
	{
		var CookieValue = new Array();
		CookieValue = CookieContent.split(" ")
		var n = CookieValue.length;
		for ( var i =0; i < (n-1); i++ ){
			selector = "#" + CookieValue[i];
			$(selector).parent().find("a").get(0).click();
		}
		IconRecovery(CookieValue[n-1]);
	}else
	{
		IconRecovery(CookieContent);
	};
};

//-------------------窗口尺寸变化，或者退出全屏时的响应----------------------//
window.onresize=function(){
	ViewClass = $("#dropdown-View").attr("class");
    //changeFrameHeight();
	//changeFrameHeight1();
	if(!checkFull()){
		switch (ViewClass){
			case "am-icon-arrows":
				$("#am-icon-arrows").show();
				$("#am-icon-arrows-h").hide();
				$("#dropdown-View").removeClass("am-icon-arrows");
				$("#dropdown-View").addClass("am-icon-arrows-h");
				break;
			case "am-icon-arrows-v":
				$("#am-icon-arrows-v").show();
				$("#am-icon-square-o").hide();
				$("#dropdown-View").removeClass("am-icon-arrows-v");
				$("#dropdown-View").addClass("am-icon-square-o");
				break;
		}
		console.log("FS");
	}
};
//-----------------------------------------------------//


//-----------屏蔽F5按键，自定义刷新内容----------------//
/**
document.onkeydown = function (e) {
	if ( e.keyCode == 116 ) {
		e.preventDefault();
		//document.querySelector('#IDlabel').innerHTML = e.keyCode;
		dContentDIV(location.hash);
	}
};
**/
//-----------------------------------------------------//

//---------------URL的#号后变化时，刷新内容DIV---------//
window.onhashchange = function(){
	dContentDIV(location.hash);
};
//-----------------------------------------------------//


//**************************************************************************//
//																			//
//						以下是函数部分										//
//																			//
//**************************************************************************//


//--------------------内容DIV的刷新----------------------------------------//
function dContentDIV(link)
{
    var Sublink = new Array();
    Sublink=link.split("#");
	if ( Sublink[1] != null && Sublink[1] != "") 
	{
		var urls=Sublink[1]+".html";
		$.ajax({
			url:urls, //请求text内容的路径
			type:'post',
			data:'',
			dataType:'html',
			async: false,
			success:function(result){
			$("#iframeContent").html(result);
			}
		});
	}else
	{
		$.ajax({
			url:DefaultPage,
			type:'post',
			data:'',
			dataType:'html',
			async: false,
			success:function(result){
				$("#iframeContent").html(result);
		    }
       });
	};
}
//--------------------------------------------------------------------------//

//--------------------------------------------------------------------------//
// IconRecovery函数用来解决浏览器全屏操作无法用鼠标模拟:                    //
//	Error log :																//
//		Failed to execute 'requestFullscreen' on 'Element':					//
//		API can only be initiated by a user gesture.						//
//--------------------------------------------------------------------------//
function IconRecovery(IconID){
	switch (IconID){
		case "am-icon-arrows":
		case "am-icon-arrows-h":
			selector = "#" + "am-icon-arrows-h";
			$(selector).click();
			break;
	};
}
//--------------------------------------------------------------------------//

//-----------------窗口尺寸变化时，子框架自适应高度和宽度-------------------//
function changeFrameHeight1(){
	var ifm = document.getElementById("mainframe");
	ifm.height = document.documentElement.clientHeight;
	ifm.width = document.documentElement.clientWidth;
	console.log("2222");
}	

function changeFrameHeight(){
	var ifm = document.getElementById("iframeContent");
	ifm.height = document.documentElement.clientHeight;
	ifm.width = document.documentElement.clientWidth;
	console.log("1111");
}
//--------------------------------------------------------------------------//

//-----------------------检测是否全屏状态-----------------------------------//
function checkFull(){
	var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
	//to fix : false || undefined == undefined
	if ( isFull === undefined ) isFull = false;
	return isFull;
}
//--------------------------------------------------------------------------//

//------------------------支持全屏的四种模式切换----------------------------//
function launchFullscreen(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.msRequestFullscreen){
		element.msRequestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullScreen();
	}
}

function exitFullscreen() {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	} else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
	}
}

function switchView(id){
	var ViewClass = $("#dropdown-View").attr("class");
	var selector = "#" + ViewClass;
	$(selector).show();
	selector = "#" + id;
	$(selector).hide();
	$("#dropdown-View").removeClass(ViewClass);
	$("#dropdown-View").addClass(id);
	switch (id)
	{
		case "am-icon-square-o":
		    exitFullscreen();
			$("#admin-offcanvas").show();
			$("#footer").show();
			break;
		case "am-icon-arrows":
			launchFullscreen(document.getElementById("body"));
			$("#admin-offcanvas").hide();
			$("#footer").hide();
			break;
		case "am-icon-arrows-v":
			launchFullscreen(document.getElementById("body"));
			$("#admin-offcanvas").show();
			$("#footer").show();
			break;
		case "am-icon-arrows-h":
			exitFullscreen();
			$("#admin-offcanvas").hide();
			$("#footer").hide();
			break;
	};
}
//--------------------------------------------------------------//


//-------------------不支持全屏的两种模式切换------------------//
/**
$("#admin-fullscreen").on("click", function () {
	$("#Full-View").toggle();
	$("#Individual-View").toggle();
	$("#admin-offcanvas").toggle();
	$("#footer").toggle();
});
**/
//--------------------------------------------------------------//
