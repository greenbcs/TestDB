
$.ajax({

    url:'backend/NOTICE.php',
    dataType:'text',
    type:'POST',
    //data:{'SN':a},
    success: function(json) {
        document.getElementById("notice").value=json;
    }

})

function myAjax(urls)
{
	    $.ajax({
	        url:urls, //请求text内容的路径
	        type:'post',
	        data:'',
	        dataType:'html',
	        async: false,
	        success:function(result){
	        $("#iframeContent").html(result);//div是你要替换内容的div
	        }
		});
}
function changeFrameHeight(){
    var ifm= document.getElementById("myiframe");
    ifm.height=document.documentElement.clientHeight;

}

window.onresize=function(){
    changeFrameHeight();

}



$(function() {

   var $fullText = $('.admin-fullText');
    $('#admin-fullscreen').on('click', function() {
       $.AMUI.fullscreen.toggle();
   });

    $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
       $.AMUI.fullscreen.isFullscreen ? $fullText.text('Ecs Screen') : $fullText.text('Full Screen');
    });

    $.get("Introduction-JUNO.html",function(data){
        $("#iframeContent").html(data);//初始化加载界面
    });

})

/**
$(document).ready(function(){

    $(function(){
        $('.admin-sidebar-list li').click(function() {
            // 找出 li 中的超連結 href(#id)
            var $this = $(this),
                _clickTab = $this.find('a').attr('href'); // 找到連結a中的href標籤值
            //alert(_clickTab);
            if(_clickTab.indexOf(".html") >= 0 ) {
                newCookieFunc(_clickTab);
                if("-1"==_clickTab.search("http://")){ //不為http://執行下列程式
                    $.get(_clickTab,function(data){
                        $("#iframeContent").html(data);
                    });
                    return false
                }
            }else{
                $.get("404.html",function(data){
                    $("#iframeContent").html(data);
                });
            }

        })

        var ClickTAB=getCookieFunc();
        //alert(ClickTAB);
        if("-1"==ClickTAB.search("http://")){ //不為http://執行下列程式
            $.get(ClickTAB,function(data){
                $("#iframeContent").html(data);
            });
            return false
        }

        /**
         $("#iframeContent").load("Introduction-JUNO.html");
         $('.admin-sidebar-list li').click(function() {
            _clickLink= $(this).find('a').attr('href'); // 找到链接a中的targer的值
            $("#iframeContent").load(_clickLink);
        });

         **/
/**
    })

});

$(document).ready(function(){

    $(function(){
        $('.admin-header-list li').click(function() {
            // 找出 li 中的超連結 href(#id)
            var $this = $(this),
                _clickTab = $this.find('a').attr('href'); // 找到連結a中的href標籤值
            //alert(_clickTab);
            if(_clickTab.indexOf(".html") >= 0 ) {
                newCookieFunc(_clickTab);
                if("-1"==_clickTab.search("http://")){ //不為http://執行下列程式
                    $.get(_clickTab,function(data){
                        $("#iframeContent").html(data);
                    });
                    return false
                }
            }else{
                $.get("404.html",function(data){
                    $("#iframeContent").html(data);
                });
            }

        })

        var ClickTAB=getCookieFunc();
        //alert(ClickTAB);
        if("-1"==ClickTAB.search("http://")){ //不為http://執行下列程式
            $.get(ClickTAB,function(data){
                $("#iframeContent").html(data);
            });
            return false
        }

        /**
         $("#iframeContent").load("Introduction-JUNO.html");
         $('.admin-sidebar-list li').click(function() {
            _clickLink= $(this).find('a').attr('href'); // 找到链接a中的targer的值
            $("#iframeContent").load(_clickLink);
        });

         **/

/**    })

});


function newCookieFunc(data){
    $.cookie('cookielink',data,{expires:1,path: '/'});
    //$.cookie('cookieName',"linzhiqiang",{expires:2,path: '/'});
    //alert("新建cookie成功，值分别为：cookieId：201211011  cookieName：linzhiqiang");
};
function getCookieFunc(){
    var cookielink=$.cookie('cookielink');
    //var cookieName=$.cookie('cookieName');
    //alert("cookie的值分别为：cookieId："+cookieId+"  cookieName："+cookieName );
    return cookielink;
};

**/




