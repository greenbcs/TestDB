//var fg=1;

var curPage = 1; //当前页码
var total,pageSize,totalPage;
//获取数据
function getData(page)
{
    var sn= document.getElementById("SN").value;
    $.ajax({
        type: 'POST',
        url: 'backend/pagereveivecheck.php',
        data: {'pageNum': page - 1,"SN":sn,'FG':fg},
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
            table_html += "<table class=\"am-table am-table-striped am-table-hover table-main\"><tr><th width=\"10\">NO</th><th width=\"60\">SN</th><th width=\"60\">WHR</th><th width=\"60\">RD</th><th width=\"60\">MF</th><th width=\"60\">Type</th><th width=\"60\">PD</th><th width=\"60\">BA</th><th width=\"60\">WHN</th><th width=\"60\">Operation Choose</th></tr>";
            var list = json.list;
            $.each(list, function (index, array) { //遍历json数据列
                // if(array['ID'].length > 28){
                //     var title_sub = array['ID'].substring(0,20); // 获取子字符串。
                //  }
                //  else
                var title_sub = array['NO'];
                table_html += "<tr><td>" + title_sub + "</td><td>" + array['SN'] + "</td><td>" + array['WHR'] + "</td><td>" + array['RD'] + "</td><td>" + array['MF'] + "</td><td>" + array['Type'] + "</td><td>" + array['PD'] + "</td><td>" + array['BA'] + "</td><td>" + array['WHN'] + "</td><td><a class=\"am-icon-edit\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"getRowValue(this)\">  Modify  </a><a class=\"am-icon-trash\" class=\"am-btn-primary am-btn-xs\" href=\"#\" onclick=\"{if(confirm('Delete!?')){window.location.href='backend/delete_pmtrc.php?pmtsn="+array['SN']+"';}else return false;}\">  Delete  </a></td><tr>";
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

function getRowValue(element){
    var node = element.parentNode.parentNode;
    var a= node.children[0].innerHTML;
    var b= node.children[1].innerHTML;
    var c= node.children[2].innerHTML;
    var d= node.children[3].innerHTML;
    var f= node.children[4].innerHTML;
    var g= node.children[5].innerHTML;
    var h= node.children[6].innerHTML;
    var j= node.children[7].innerHTML;
    var k= node.children[8].innerHTML;
    window.open ("modifyreceivecheckdata.html"+"?"+a+"?"+b+"?"+c+"?"+d+"?"+f+"?"+g+"?"+h+"?"+j+"?"+k, "newwindow", "height=900, width=400, top=50%, left=50%, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no")
    //alert(a);


}
