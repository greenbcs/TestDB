//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var un= document.getElementById("UN").value;
    $.ajax({
        type: 'POST',
        url: 'backend/pagedictionary.php',
        data: {'pageNum': page - 1,"UN":un,'FG':fg},
        dataType: 'json',
        beforeSend: function () {
            $("#tablelist ").append("<h3>loading...</h3>");
        },
        success: function (json) {
            $("#tablelist").empty();
            total = json.total; //总记录数
            pageSize = json.pageSize; //每页显示条数
            curPage = page; //当前页
            totalPage = json.totalPage; //总页数
            var table_html = "";
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">Logogram</th><th width=\"60\">English</th><th width=\"60\">Chinese/中文</th><th width=\"60\">Paraphrase</th><th width=\"60\">Operation Choose</th></tr>";
            var list = json.list;
            var title_sub = 1;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  elsethis

                table_html += "<tr><td>" + title_sub + "</td><td>" + array['Logogram'] + "</td><td>" + array['English'] + "</td><td>" + array['Chinese'] + "</td><td>" + array['Paraphrase'] + "</td><td><a class=\"am-icon-edit\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"getRowValue(this)\";>  Modify  </a></td><tr>";
                 title_sub = title_sub+1;
            });
            table_html += "</table>";
            $("#tablelist").append(table_html);
        },
        complete: function () { //生成分页条
            //alert("Bar load failed!");
            getPageBar();
        },
        error: function () {
            alert("Data load failed!");
        }
    });

}

function getPageBar(){
    //页码大于最大页数
    if(curPage>totalPage) curPage=totalPage;
    //页码小于1
    if(curPage<1) curPage=1;
    pageStr = "<span class=\"button_span_page gray\">Totals:"+total+"Records "+curPage+"/"+totalPage+"</span>";

    //如果是第一页
    if(curPage==1){
        pageStr += "<span class=\"button_span blue\">    First Page    </span><span class=\"button_span blue\">    Last Page    </span>";
    }else{
        pageStr += "<span class=\"button_span green\"><a href='javascript:void(0)' rel='1'>    First Page    </a></span><span class=\"button_span green\"><a href='javascript:void(0)' rel='"+(curPage-1)+"'>    Last Page    </a></span>";
    }

    //如果是最后页
    if(curPage>=totalPage){
        pageStr += "<span class=\"button_span blue\">    Next Page    </span><span class=\"button_span blue\">    End Page    </span>";
    }else{
        pageStr += "<span class=\"button_span green\"><a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'>    Next Page    </a>&nbsp;</span><span class=\"button_span green\"><a href='javascript:void(0)' rel='"+totalPage+"'>    End Page    </a></span>";
    }

    $("#pagecount").html(pageStr);
}

$(function(){
    fg=1;
    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });
});

function DescendOrder()
{
    fg=1;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });

};

function AscendOrder()
{
    fg=2;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });

};

function SYSUPMT()
{
    fg=3;

    getData(1);
    $("#pagecount").on('click', "span a",function(){
        var rel = $(this).attr("rel");
        if(rel){
            getData(rel);
        }
    });


};
function plusorder()
{
    var url="addWord.html"; //转向网页的地址;
    var name="Add Word"; //网页名称，可为空;
    var iWidth=400; //弹出窗口的宽度;
    var iHeight=400; //弹出窗口的高度;
//window.screen.height获得屏幕的高，window.screen.width获得屏幕的宽
    var iTop = (window.screen.height-30-iHeight)/2; //获得窗口的垂直位置;
    var iLeft = (window.screen.width-10-iWidth)/2; //获得窗口的水平位置;
    //window.showmodaldialog(url,name,dialogwidth=640px;dialogheight=400px);
    window.open(url,name,'height='+iHeight+',,innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    // window.open ("addusers.html", "newwindow", "height=640, width=400, top=50%, left=50%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")&nbsp; //写成一行
}

function getRowValue(element){
    var node = element.parentNode.parentNode;
    var a= node.children[0].innerHTML;
    var b= node.children[1].innerHTML;
    var c= node.children[2].innerHTML;
    var d= node.children[3].innerHTML;
    var f= node.children[4].innerHTML;
    window.open ("modifyword.html"+"?"+a+"?"+b+"?"+c+"?"+d+"?"+f, "newwindow", "height=580, width=400, top=50%, left=50%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
    //alert(a);


}